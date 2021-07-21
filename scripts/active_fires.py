#!/usr/bin/env python3
import json

import fsspec
import geopandas
from tenacity import retry, stop_after_attempt

crs = "+proj=aea +lat_0=23 +lon_0=-96 +lat_1=29.5 +lat_2=45.5 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
buffer = 80 * 1000  # m


@retry(stop=stop_after_attempt(5))
def load_offsets_db():
    with fsspec.open(
        "https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/forest-offsets-database-v1.0.json"
    ) as f:
        projects = json.load(f)
    return projects


@retry(stop=stop_after_attempt(5))
def load_project_shape(pid):
    project_shape = geopandas.read_file(
        f"https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/projects/{pid}/shape.json"
    ).to_crs(crs)
    return project_shape


@retry(stop=stop_after_attempt(5))
def load_fires():
    # fires
    fires = (
        geopandas.read_file(
            "https://opendata.arcgis.com/api/v3/datasets/2191f997056547bd9dc530ab9866ab61_0/downloads/data?format=geojson&spatialRefId=4326"
        )
        .to_crs(crs)
        .reset_index()
    )
    return fires


def find_fires_near_projects(project_ids, fires):
    projects_with_fires = []
    fire_names = []

    for pid in project_ids:

        project_shape = load_project_shape(pid)
        buffered_project = project_shape.buffer(80 * 1000)

        fire_inds = fires.sindex.query(buffered_project.geometry[0], predicate="intersects")
        if fire_inds.size > 0:
            near_fires = fires["poly_IncidentName"][fire_inds].tolist()
            projects_with_fires.append(pid)
            fire_names.extend(near_fires)
            print(f"found fires near {pid}:", near_fires)

    fires_subset = fires[fires["poly_IncidentName"].isin(list(set(fire_names)))]

    return fires_subset, projects_with_fires


def main():

    print("loading projects")
    projects = load_offsets_db()
    project_ids = [p["id"] for p in projects]

    print("loading fires")
    fires = load_fires()

    print("finding fires near projects")
    fires_subset, projects_with_fires = find_fires_near_projects(project_ids, fires)
    print("all projects with nearby fires: ", projects_with_fires)

    print("writing fires to json")
    # with fsspec.open('gs://carbonplan-scratch/fires-near-offset-projects.json', mode='w') as f:
    with open("fires-near-offset-projects.json", mode="w") as f:
        f.write(fires_subset.to_crs("EPSG:4326").to_json())


if __name__ == "__main__":
    main()
