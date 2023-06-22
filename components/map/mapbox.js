import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { Map, Raster, useMapbox } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import style from './style'

const MapListener = ({ locations, tiles, setMap, setBounds }) => {
  const { map } = useMapbox()
  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  useEffect(() => {
    setMap(map)
    setBounds(map.getBounds())
    map.setStyle(style(locations, tiles, colors))

    map.on('moveend', () => {
      setBounds(map.getBounds())
    })

    return function cleanup() {
      setMap(null)
    }
  }, [])
}

const Mapbox = ({ locations, tiles, map, setMap, setBounds }) => {
  const colormap = useThemedColormap('oranges')

  return (
    <Map
      zoom={6.79}
      minZoom={3}
      maxZoom={13}
      center={[-122.99922013524304, 40.02328448336925]}
    >
      <MapListener
        locations={locations}
        tiles={tiles}
        setMap={setMap}
        setBounds={setBounds}
      />
      <Raster
        colormap={colormap}
        clim={[-20, 30]}
        source={
          'https://storage.googleapis.com/carbonplan-maps/v2/demo/2d/tavg'
        }
        variable={'tavg'}
      />
    </Map>
  )
}

export default Mapbox
