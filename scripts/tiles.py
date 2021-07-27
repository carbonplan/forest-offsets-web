#!/usr/bin/env python3
import json
import os
import tempfile

import click
import fsspec


def get_projects(tempdir):
    with fsspec.open(
        "https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/forest-offsets-database-v1.0.json"
    ) as f:
        projects = json.load(f)

    fs = fsspec.get_filesystem_class("http")()
    for project in projects:
        pid = project["id"]
        slug = f"projects/{pid}/shape.json"
        print(slug, "slug")
        path = os.path.join(tempdir, f"raw/{slug}")
        print(path, "path")
        fs.download(
            f"https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/{slug}",
            path,
        )


def get_ecoregions(tempdir):
    fs = fsspec.get_filesystem_class("http")()
    for kind in ["baileys", "supersections"]:
        path = os.path.join(tempdir, f"raw/{kind}.geojson")
        fs.download(
            f"https://storage.googleapis.com/carbonplan-data/raw/ecoregions/{kind}.geojson", path
        )


def get_fires(tempdir):
    fs = fsspec.get_filesystem_class("http")()
    path = os.path.join(tempdir, "raw/fires.geojson")
    fs.download("https://storage.googleapis.com/carbonplan-research/offset-fires/fires.json", path)


def build_projects(tempdir):
    cmds = []
    cmds.append(
        "tippecanoe "
        "-z9 "
        f"-o {tempdir}/tmp/projects.mbtiles "
        "-l projects "
        "--no-feature-limit "
        "--no-tile-size-limit "
        "--extend-zooms-if-still-dropping "
        "--no-tile-compression "
        f"{tempdir}/raw/projects/*/*.json"
    )
    cmds.append(
        "mb-util "
        "--image_format=pbf "
        f"{tempdir}/tmp/projects.mbtiles "
        f"{tempdir}/processed/projects"
    )
    [os.system(cmd) for cmd in cmds]


def build_ecoregions(tempdir):
    cmds = []
    cmds.append(
        "tippecanoe "
        "-z5 "
        f"-o {tempdir}/tmp/ecoregions.mbtiles "
        "--no-feature-limit "
        "--no-tile-size-limit "
        "--extend-zooms-if-still-dropping "
        "--no-tile-compression "
        f"{tempdir}/raw/baileys.geojson {tempdir}/raw/supersections.geojson"
    )
    cmds.append(
        "mb-util "
        "--image_format=pbf "
        f"{tempdir}/tmp/ecoregions.mbtiles "
        f"{tempdir}/processed/ecoregions"
    )
    [os.system(cmd) for cmd in cmds]


def build_fires(tempdir):
    cmds = []
    cmds.append(
        "tippecanoe "
        "-z5 "
        f"-o {tempdir}/tmp/fires.mbtiles "
        "--no-feature-limit "
        "--no-tile-size-limit "
        "--extend-zooms-if-still-dropping "
        "--no-tile-compression "
        f"{tempdir}/raw/fires.geojson"
    )
    cmds.append(
        "mb-util "
        "--image_format=pbf "
        f"{tempdir}/tmp/fires.mbtiles "
        f"{tempdir}/processed/fires"
    )
    [os.system(cmd) for cmd in cmds]


def setup_directories(tempdir):
    os.makedirs(os.path.join(tempdir, "tmp"), exist_ok=True)
    os.makedirs(os.path.join(tempdir, "processed"), exist_ok=True)


def upload_tiles(kind, tempdir, upload_to):
    print(f"uploading {kind} to {upload_to}")
    fs = fsspec.get_filesystem_class(upload_to.split(":")[0])()
    lpath = f"{tempdir}/processed/{kind}"
    rpath = f"{upload_to}/{kind}"
    fs.put(lpath, rpath, recursive=True)


@click.command()
@click.option("--projects", is_flag=True, help="Build projects tile set")
@click.option("--ecoregions", is_flag=True, help="Build ecoregion tile set")
@click.option("--fires", is_flag=True, help="Build fire tile set")
@click.option("--tempdir", type=str, default=None, help="Temporary directory to use for processing")
@click.option("--upload-to", type=str, default=None, help="Where to put the workflow contents")
def main(projects, ecoregions, fires, tempdir, upload_to):

    if tempdir is None:
        tempdir = tempfile.mkdtemp(suffix="_data")

    print(tempdir)
    setup_directories(tempdir)

    if projects:
        get_projects(tempdir)
        build_projects(tempdir)
        if upload_to:
            upload_tiles("projects", tempdir, upload_to)
    if ecoregions:
        get_ecoregions(tempdir)
        build_ecoregions(tempdir)
        if upload_to:
            upload_tiles("ecoregions", tempdir, upload_to)
    if fires:
        get_fires(tempdir)
        build_fires(tempdir)
        if upload_to:
            upload_tiles("fires", tempdir, upload_to)


if __name__ == "__main__":
    main()
