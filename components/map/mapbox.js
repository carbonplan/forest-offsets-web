import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { Map, useMapbox } from '@carbonplan/maps'
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
    </Map>
  )
}

export default Mapbox
