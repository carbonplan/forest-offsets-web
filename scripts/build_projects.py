#!/usr/bin/env python3

import json

import click
import compliance2020


@click.command()
@click.argument('databases', nargs=-1)
@click.option('--output', default='data.json', show_default=True)
def main(databases, output):

    projects = []

    if 'compliance2020' in databases:
        projects.extend(compliance2020.make_projects())

    write_projects(projects, output)


def write_projects(project_collection, output):
    with open(output, "w") as outfile:
        json.dump(project_collection, outfile, indent=2)


if __name__ == "__main__":
    main()
