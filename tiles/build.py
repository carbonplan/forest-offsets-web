import os
import sys

def build_projects():
    cmds = []
    cmds.append('rm -rf processed/projects ')
    cmds.append('rm -rf tmp ')
    cmds.append('mkdir tmp ')
    cmds.append(
        'tippecanoe '
        '-z9 '
        '-o tmp/projects.mbtiles '
        '-l projects '
        '--no-feature-limit '
        '--no-tile-size-limit '
        '--extend-zooms-if-still-dropping '
        '--no-tile-compression '
        'raw/projects/*/*.json'
    )
    cmds.append(
        'mb-util '
        '--image_format=pbf '
        'tmp/projects.mbtiles '
        'processed/projects'
    )
    cmds.append('rm -rf tmp ')
    [os.system(cmd) for cmd in cmds]

def build_ecoregions():
    cmds = []
    cmds.append('rm -rf processed/ecoregions ')
    cmds.append('rm -rf tmp ')
    cmds.append('mkdir tmp ')
    cmds.append(
        'tippecanoe '
        '-z5 '
        '-o tmp/ecoregions.mbtiles '
        '--no-feature-limit '
        '--no-tile-size-limit '
        '--extend-zooms-if-still-dropping '
        '--no-tile-compression '
        'raw/baileys.geojson raw/supersections.geojson'
    )
    cmds.append(
        'mb-util '
        '--image_format=pbf '
        'tmp/ecoregions.mbtiles '
        'processed/ecoregions'
    )
    cmds.append('rm -rf tmp ')
    [os.system(cmd) for cmd in cmds]

def build_fires():
    cmds = []
    cmds.append('rm -rf processed/fires ')
    cmds.append('rm -rf tmp ')
    cmds.append('mkdir tmp ')
    cmds.append(
        'tippecanoe '
        '-z5 '
        '-o tmp/fires.mbtiles '
        '--no-feature-limit '
        '--no-tile-size-limit '
        '--extend-zooms-if-still-dropping '
        '--no-tile-compression '
        'raw/fires.json'
    )
    cmds.append(
        'mb-util '
        '--image_format=pbf '
        'tmp/fires.mbtiles '
        'processed/fires'
    )
    cmds.append('rm -rf tmp ')
    [os.system(cmd) for cmd in cmds]
    
if __name__ == '__main__':
    args = sys.argv
    choice = args[1]
    switcher = {
        'ecoregions': build_ecoregions,
        'projects': build_projects,
        'fires': build_fires
    }
    if choice not in switcher.keys():
        print(f'choice "{choice}" not recognized')
    else:
        switcher[choice]()