#!/usr/bin/env python3
import datetime
import json

import click
import fsspec
import geopandas
import git
import numpy as np
from bs4 import BeautifulSoup
from fuzzywuzzy import process
from tenacity import retry, stop_after_attempt

crs = "+proj=aea +lat_0=23 +lon_0=-96 +lat_1=29.5 +lat_2=45.5 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"

# Current datetime
now = datetime.datetime.utcnow().isoformat()

# Git info
repo = git.Repo(search_parent_directories=True)
sha = repo.head.commit.hexsha
short_sha = repo.git.rev_parse(sha, short=7)


def base_schema(name=None):
    return {"name": name, "created_datetime": now, "git_sha": short_sha}


def project_fires_schema():
    return {"burned_frac": None, "overlapping_fires": []}


def fire_schema():
    return {"name": None, "url": None, "start_date": "", "status": "", "centroid": []}


@retry(stop=stop_after_attempt(5))
def get_fire_urls():
    uri = "https://inciweb.nwcg.gov/accessible-view/"

    with fsspec.open(uri) as fp:
        soup = BeautifulSoup(fp, "html.parser")

    links_with_text = {}
    for a in soup.find_all("a", href=True):
        if a.text and "incident" in a["href"]:
            links_with_text[a.text] = a["href"]
    return links_with_text


@retry(stop=stop_after_attempt(5))
def get_nifs_fires():
    fires = (
        geopandas.read_file(
            "https://opendata.arcgis.com/api/v3/datasets/2191f997056547bd9dc530ab9866ab61_0/downloads/data?format=geojson&spatialRefId=4326"
        )
        .to_crs(crs)
        .reset_index()
    )
    return fires


@retry(stop=stop_after_attempt(5))
def get_projects_db():
    with fsspec.open(
        "https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/forest-offsets-database-v1.0.json"
    ) as f:
        projects = json.load(f)
    return projects


@retry(stop=stop_after_attempt(5))
def get_project_shape(pid):
    project_shape = geopandas.read_file(
        f"https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/projects/{pid}/shape.json"
    ).to_crs(crs)
    return project_shape


def calc_burned_frac(project_shape, fires):

    project_area = project_shape.area.sum()

    fire_geom = fires.unary_union.buffer(0)

    burned_frac = project_shape.buffer(0).intersection(fire_geom).area.sum() / project_area

    print("burned_frac", burned_frac)

    return burned_frac


def find_projects_with_fires(projects, fires_gdf):

    out = base_schema(name="Projects with fires")

    projects_with_fires = {}

    for project in projects:
        pid = project["id"]

        project_shape = get_project_shape(pid)

        fire_inds = fires_gdf.sindex.query(project_shape.geometry[0], predicate="intersects")
        if fire_inds.size > 0:
            project_fires = fires_gdf.loc[fire_inds]
            print(
                f"found fire in {pid}:",
                project_fires["irwin_UniqueFireIdentifier"].tolist(),
                project_fires["poly_IncidentName"].tolist(),
            )
            obj = project_fires_schema()
            obj["overlapping_fires"] = project_fires["irwin_UniqueFireIdentifier"].tolist()

            obj["burned_frac"] = calc_burned_frac(project_shape, project_fires)

            projects_with_fires[pid] = obj

    out["projects"] = projects_with_fires

    return out


def get_fire_label_coords(geometry):
    g = geometry.convex_hull

    # centroid
    centroid = g.centroid.x, g.centroid.y

    # northern most point
    coords = np.array(g.exterior.coords)
    max_ind = np.argmax(coords[:, 1])
    max_coords = coords[max_ind].tolist()

    return centroid, max_coords


def make_fires(fire_names_and_urls, fires_gdf, projects_with_fires):

    fire_ids = []
    for p in projects_with_fires["projects"].values():
        fire_ids.extend(p["overlapping_fires"])

    out = base_schema(name="Fire metadata")

    url_keys = list(fire_names_and_urls)

    meta_fires = fires_gdf[fires_gdf["irwin_UniqueFireIdentifier"].isin(fire_ids)]

    fires = {}
    for i, row in meta_fires.to_crs("epsg:4326").iterrows():
        obj = fire_schema()
        obj["name"] = row["irwin_IncidentName"].title()
        match = process.extractOne(row["irwin_IncidentName"], url_keys, score_cutoff=90)
        if match is not None:
            obj["url"] = "https://inciweb.nwcg.gov" + fire_names_and_urls[match[0]]
        obj["start_date"] = row["irwin_FireDiscoveryDateTime"]
        centroid, max_coord = get_fire_label_coords(row.geometry)
        obj["centroid"] = centroid
        obj["label_geom"] = max_coord
        fires[row["irwin_UniqueFireIdentifier"]] = obj

    out["fires"] = fires

    return out


@click.command()
@click.option("--upload-to", type=str, default=None, help="Where to put the workflow contents")
def main(upload_to):

    print("loading fire names and urls")
    fire_names_and_urls = get_fire_urls()

    print("loading nifs fires")
    fires_gdf = get_nifs_fires()

    print("loading project db")
    projects = get_projects_db()

    print("making projects with fires")
    projects_with_fires = find_projects_with_fires(projects, fires_gdf)
    if upload_to:
        print("writing projects with fires")
        with fsspec.open(f"{upload_to}/projects_with_fires.json", mode="w") as f:
            json.dump(projects_with_fires, f)

    print("making fire metadata")
    fire_meta = make_fires(fire_names_and_urls, fires_gdf, projects_with_fires)
    if upload_to:
        print("writing fire metadata")
        with fsspec.open(f"{upload_to}/fire_meta.json", mode="w") as f:
            json.dump(fire_meta, f)

    if upload_to:
        print("writing fires.json")
        with fsspec.open(f"{upload_to}/fires.json", mode="w") as f:
            f.write(
                fires_gdf[["irwin_UniqueFireIdentifier", "geometry"]].to_crs("EPSG:4326").to_json()
            )


if __name__ == "__main__":
    main()
