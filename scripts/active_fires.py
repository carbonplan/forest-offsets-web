#!/usr/bin/env python3
import json

import click
import fsspec
import geopandas
import numpy as np
from bs4 import BeautifulSoup
from fuzzywuzzy import process
from tenacity import retry, stop_after_attempt

crs = "+proj=aea +lat_0=23 +lon_0=-96 +lat_1=29.5 +lat_2=45.5 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"


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

    return projects_with_fires


def get_fire_label_coords(geometry):
    g = geometry.convex_hull
    coords = np.array(g.exterior.coords)
    max_ind = np.argmax(coords[:, 1])
    max_coords = coords[max_ind].tolist()
    return max_coords


def make_fires(fire_names_and_urls, fires_gdf):
    fires = {}

    url_keys = list(fire_names_and_urls)

    for i, row in fires_gdf.to_crs("epsg:4326").iterrows():
        obj = fire_schema()
        obj["name"] = row["irwin_IncidentName"].title()
        match = process.extractOne(row["irwin_IncidentName"], url_keys, score_cutoff=85)
        if match is not None:
            obj["url"] = "https://inciweb.nwcg.gov" + fire_names_and_urls[match[0]]
        obj["start_date"] = row["irwin_FireDiscoveryDateTime"]
        obj["centroid"] = get_fire_label_coords(row.geometry)

        fires[row["irwin_UniqueFireIdentifier"]] = obj

    return fires


@click.command()
@click.option("--upload-to", type=str, default=None, help="Where to put the workflow contents")
def main(upload_to):

    print("loading fire names and urls")
    fire_names_and_urls = get_fire_urls()

    print("loading nifs fires")
    fires_gdf = get_nifs_fires()

    print("loading project db")
    projects = get_projects_db()

    print("making fire metadata")
    fire_meta = make_fires(fire_names_and_urls, fires_gdf)
    if upload_to:
        print("writing fire metadata")
        with fsspec.open(f"{upload_to}/fire_meta.json", mode="w") as f:
            json.dump(fire_meta, f)

    print("making projects with fires")
    projects_with_fires = find_projects_with_fires(projects, fires_gdf)
    if upload_to:
        print("writing projects with fires")
        with fsspec.open(f"{upload_to}/projects_with_fires.json", mode="w") as f:
            json.dump(projects_with_fires, f)

    if upload_to:
        print("writing fires.json")
        with fsspec.open(f"{upload_to}/fires.json", mode="w") as f:
            f.write(
                fires_gdf[["irwin_UniqueFireIdentifier", "geometry"]].to_crs("EPSG:4326").to_json()
            )


if __name__ == "__main__":
    main()
