import { mix } from 'polished'

const style = (locations, tiles, colors) => {
  const { green, red, muted, secondary, background, primary } = colors

  const obj = {
    version: 8,
    glyphs: `https://storage.googleapis.com/carbonplan-data/tiles/glyphs/{fontstack}/{range}.pbf`,
    sources: {
      basemap: {
        type: 'vector',
        tiles: [
          `https://storage.googleapis.com/carbonplan-research/articles/offset-project-fire/basemap/{z}/{x}/{y}.pbf`,
        ],
        maxzoom: 5,
      },
      ecoregions: {
        type: 'vector',
        tiles: [
          `https://carbonplan.blob.core.windows.net/carbonplan-retro/tiles/ecoregions/{z}/{x}/{y}.pbf`,
        ],
        maxzoom: 5,
      },
      projects: {
        type: 'vector',
        tiles: [tiles.projects],
        maxzoom: 9,
      },
      projectLocations: {
        type: 'geojson',
        data: locations.projects,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': 'black',
          'background-opacity': 0,
        },
      },
      {
        id: 'land',
        type: 'fill',
        source: 'basemap',
        'source-layer': 'ne_10m_land',
        layout: { visibility: 'visible' },
        paint: {
          'fill-antialias': false,
          'fill-opacity': 0,
          'fill-color': 'black',
        },
      },
      {
        id: 'lakes',
        type: 'fill',
        source: 'basemap',
        'source-layer': 'ne_10m_lakes',
        layout: { visibility: 'visible' },
        paint: {
          'fill-antialias': false,
          'fill-opacity': 0,
          'fill-color': muted,
        },
      },
      {
        id: 'countries',
        type: 'line',
        source: 'basemap',
        'source-layer': 'ne_10m_admin_0_countries',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-blur': 0.4,
          'line-color': primary,
          'line-opacity': 0,
          'line-width': 0.8,
        },
      },
      {
        id: 'states',
        type: 'line',
        source: 'basemap',
        'source-layer': 'ne_10m_admin_1_states_provinces',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-blur': 0.4,
          'line-color': primary,
          'line-opacity': 0,
          'line-width': 0.8,
        },
      },
      {
        id: 'roads',
        type: 'line',
        source: 'basemap',
        'source-layer': 'ne_10m_roads',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-blur': 0.4,
          'line-color': primary,
          'line-opacity': 0,
          'line-width': 0.8,
        },
      },
      {
        id: 'places-points',
        type: 'circle',
        source: 'basemap',
        'source-layer': 'ne_10m_populated_places',
        minzoom: 6,
        paint: {
          'circle-color': 'white',
          'circle-opacity': 0,
          'circle-radius': 4,
        },
      },
      {
        id: 'places-text',
        type: 'symbol',
        source: 'basemap',
        'source-layer': 'ne_10m_populated_places',
        minzoom: 6,
        paint: {
          'text-color': 'white',
          'text-opacity': 0,
          'text-translate': [0, -20],
        },
        layout: {
          'text-ignore-placement': false,
          'text-font': ['relative-faux-book'],
          'text-field': ['format', ['get', 'name_en'], { 'font-scale': 1.2 }],
        },
      },
      {
        id: 'projects-fill',
        type: 'fill',
        source: 'projects',
        'source-layer': 'projects',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-antialias': false,
          'fill-opacity': 0,
          'fill-color': green,
        },
      },
      {
        id: 'projects-line',
        type: 'line',
        source: 'projects',
        'source-layer': 'projects',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-blur': 0.4,
          'line-color': background,
          'line-opacity': 0,
          'line-width': 1,
        },
      },
      {
        id: 'supersections',
        type: 'line',
        source: 'ecoregions',
        'source-layer': 'supersections',
        layout: {
          visibility: 'visible',
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-blur': 0.4,
          'line-color': primary,
          'line-opacity': 0,
          'line-width': 0.8,
        },
      },
      {
        id: 'projects-center',
        type: 'circle',
        source: 'projectLocations',
        maxzoom: 8,
        paint: {
          'circle-color': mix(0.6, green, background),
          'circle-opacity': 0,
          'circle-radius': 5,
        },
      },
    ],
  }

  if (tiles.fires) {
    obj.sources.fires = {
      type: 'vector',
      tiles: [tiles.fires],
      maxzoom: 9,
    }

    obj.layers.push({
      id: 'fires',
      type: 'fill',
      source: 'fires',
      'source-layer': 'fires',
      layout: {
        visibility: 'visible',
      },
      paint: {
        'fill-antialias': false,
        'fill-opacity': 0,
        'fill-color': green,
      },
    })
  }

  if (locations.fires) {
    obj.sources.fireLocations = {
      type: 'geojson',
      data: locations.fires,
    }

    obj.layers.push({
      id: 'fires-label',
      type: 'symbol',
      source: 'fireLocations',
      paint: {
        'text-color': red,
        'text-opacity': 0,
        'text-halo-color': background,
        'text-halo-width': 2,
        'text-halo-blur': 0.5,
      },
      layout: {
        'text-font': ['relative-faux-book'],
        'text-size': 20,
        'text-justify': 'left',
        'text-field': ['format', ['get', 'name']],
        'text-allow-overlap': false,
      },
    })
  }

  obj.layers.push({
    id: 'projects-label',
    type: 'symbol',
    source: 'projectLocations',
    paint: {
      'text-color': green,
      'text-opacity': 0,
      'text-halo-color': background,
      'text-halo-width': 2,
      'text-halo-blur': 0.5,
    },
    layout: {
      'text-font': ['relative-faux-book'],
      'text-size': 20,
      'text-justify': 'left',
      'text-field': ['format', ['get', 'id']],
      'text-allow-overlap': false,
    },
  })

  return obj
}

export default style
