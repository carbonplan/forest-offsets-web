const style = (locations) => {
  return {
    version: 8,
    glyphs: `https://storage.googleapis.com/carbonplan-data/tiles/glyphs/{fontstack}/{range}.pbf`,
    sources: {
      basemap: {
        type: 'vector',
        tiles: [
          `https://carbonplan.blob.core.windows.net/carbonplan-data/tiles/processed/basemap/{z}/{x}/{y}.pbf`,
        ],
        maxzoom: 5,
      },
      ecoregions: {
        type: 'vector',
        tiles: [
          `https://carbonplan.blob.core.windows.net/carbonplan-retro/tiles//processed/ecoregions/{z}/{x}/{y}.pbf`,
        ],
        maxzoom: 5,
      },
      projects: {
        type: 'vector',
        tiles: [
          `https://carbonplan.blob.core.windows.net/carbonplan-retro/tiles/processed/projects_v2/{z}/{x}/{y}.pbf`,
        ],
        maxzoom: 9,
      },
      locations: {
        type: 'geojson',
        data: locations,
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
          'fill-color': 'black',
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
          'line-color': 'black',
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
          'line-color': 'black',
          'line-opacity': 0,
          'line-width': 0.8,
        },
      },
      {
        id: 'projects-center',
        type: 'circle',
        source: 'locations',
        paint: {
          'circle-color': 'white',
          'circle-opacity': 0,
          'circle-radius': 20,
        },
      },
      {
        id: 'projects-label',
        type: 'symbol',
        source: 'locations',
        paint: {
          'text-color': 'white',
          'text-opacity': 0,
        },
        layout: {
          'text-font': ['relative-faux-book'],
          'text-size': 20,
          'text-justify': 'left',
          'text-field': ['format', ['get', 'id']],
        },
      },
    ],
  }
}

export default style
