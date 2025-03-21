#!/usr/bin/env python3
import datetime
import json
import urllib.parse

import click
import fsspec
import geopandas
import git
import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup
from fuzzywuzzy import process
from tenacity import retry, stop_after_attempt

CRS = "+proj=aea +lat_0=23 +lon_0=-96 +lat_1=29.5 +lat_2=45.5 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"

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
def get_nifc_perimeter_count():
    """Return count of perimeters in nifc dataset to enable pagination

    Previously, we used a static download provided by NIFC, which could go stale.
    Now, we're hitting the underlying database (per NIFC suggestion)
    """
    params = {"where": "OBJECTID >0", "returnCountOnly": "true", "f": "pjson"}

    # TODO: what happens when we're in Jan 2022?

    url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/CY_WildlandFire_Perimeters_ToDate/FeatureServer/0/query"
    r = requests.get(url, params=params)
    return r.json()["count"]


def get_fire_url(url):
    fires = geopandas.read_file(url).to_crs(CRS).reset_index(drop=True)
    return fires


def get_paginated_fire_urls(request_size=1_000):
    """Generate urls for grabbing all NIFC data.

    Geopandas doesnt support requests-style params, so it's easier to just premake the urls
    """
    record_count = get_nifc_perimeter_count()
    record_offsets = range(1, record_count, request_size)

    base_params = {
        "f": "geojson",
        "where": "OBJECTID > 0",
        "resultRecordCount": request_size,
        "returnGeometry": "true",
        "outFields": "*",
    }

    base_url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/CY_WildlandFire_Perimeters_ToDate/FeatureServer/0/query?"
    urls = [
        base_url + urllib.parse.urlencode(base_params) + f"&resultOffset={record_offset}"
        for record_offset in record_offsets
    ]
    return urls


@retry(stop=stop_after_attempt(5))
def get_nifs_fires():
    fire_urls = get_paginated_fire_urls()
    fires = pd.concat([get_fire_url(fire_url) for fire_url in fire_urls]).reset_index(drop=True)
    return fires


@retry(stop=stop_after_attempt(5))
def get_projects_db():
    with fsspec.open(
        "https://carbonplan-forests.s3.us-west-2.amazonaws.com/offsets/database/forest-offsets-database-v1.0.json"
    ) as f:
        projects = json.load(f)
    return projects


@retry(stop=stop_after_attempt(5))
def get_project_shape(pid):
    project_shape = geopandas.read_file(
        f"https://carbonplan-forests.s3.us-west-2.amazonaws.com/offsets/database/projects/{pid}/shape.json"
    ).to_crs(CRS)
    return project_shape

forest-offsets-database-v1.0.json
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

    print("making fire metadata")
    fire_meta = make_fires(fire_names_and_urls, fires_gdf, projects_with_fires)

    if upload_to:
        print("writing projects with fires")
        with fsspec.open(f"{upload_to}/projects_with_fires.json", mode="w") as f:
            json.dump(projects_with_fires, f)

        print("writing raw NIFC perimeter data")
        with fsspec.open(
            f"{upload_to}/fire_perimeter_cache/{now}_raw_nifc_perimeters.parquet", mode="wb"
        ) as f:
            fires_gdf.to_parquet(f, compression="gzip")

        print("writing fire metadata")
        with fsspec.open(f"{upload_to}/fire_meta.json", mode="w") as f:
            json.dump(fire_meta, f)

        print("writing fires.json")
        with fsspec.open(f"{upload_to}/fires.json", mode="w") as f:
            f.write(
                fires_gdf[["irwin_UniqueFireIdentifier", "geometry"]].to_crs("EPSG:4326").to_json()
            )

        combined = {"fire_meta": fire_meta, "projects_with_fires": projects_with_fires}
        print("writing combined fire metadata")
        with fsspec.open(f"{upload_to}/fire_meta_combined.json", mode="w") as f:
            json.dump(combined, f)


if __name__ == "__main__":
    main()
