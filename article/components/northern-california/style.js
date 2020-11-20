const projects = require('./data/projects')

const style = {
  version: 8,
  glyphs: `https://storage.googleapis.com/carbonplan-data/tiles/glyphs/{fontstack}/{range}.pbf`,
  sources: {
    basemap: {
      type: 'vector',
      tiles: [
        `https://storage.googleapis.com/carbonplan-data/tiles/processed/basemap-expanded/{z}/{x}/{y}.pbf`,
      ],
      maxzoom: 5,
    },
    ecoregions: {
      type: 'vector',
      tiles: [
        `https://storage.googleapis.com/carbonplan-data/tiles/processed/ecoregions/{z}/{x}/{y}.pbf`,
      ],
      maxzoom: 5,
    },
    projects: {
      type: 'geojson',
      data: projects,
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
        'fill-color': 'black',
      },
    },
    {
      id: 'rivers',
      type: 'line',
      source: 'basemap',
      'source-layer': 'ne_10m_rivers_lake_centerlines',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-blur': 0.4,
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 5,
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
        'line-color': 'black',
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
        'line-color': 'black',
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
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 0.8,
      },
    },
    {
      id: 'places-points',
      type: 'circle',
      source: 'basemap',
      'source-layer': 'ne_10m_populated_places',
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
      paint: {
        'text-color': 'white',
        'text-opacity': 0,
        'text-translate': [0, -18],
      },
      layout: {
        'text-ignore-placement': true,
        'text-font': ['relative-faux-book'],
        'text-field': ['format', ['get', 'name_en'], { 'font-scale': 1.2 }],
      },
    },
    {
      id: 'baileys',
      type: 'line',
      source: 'ecoregions',
      'source-layer': 'baileys',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-blur': 0.4,
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 0.8,
      },
    },
    {
      id: 'supersections',
      type: 'line',
      source: 'ecoregions',
      'source-layer': 'supersections',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-blur': 0.4,
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 0.8,
      },
    },
    {
      id: 'projects',
      type: 'circle',
      source: 'projects',
      paint: {
        'circle-color': 'white',
        'circle-opacity': 0,
        'circle-radius': 5.5,
      },
    },
  ],
}

export default style
