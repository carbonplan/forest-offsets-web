import { memo, useEffect, useRef } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import style from './style'

mapboxgl.accessToken = ''

const Mapbox = ({ locations, map, setMap, setBounds }) => {
  const container = useRef(null)

  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: style(locations, colors),
      center: [-121.9, 43.11],
      zoom: 6.79,
      minZoom: 3,
      maxZoom: 10,
    })

    map.on('load', () => {
      setMap(map)
      setBounds(map.getBounds())
    })

    map.on('moveend', () => {
      setBounds(map.getBounds())
    })

    return function cleanup() {
      setMap(null)
      map.remove()
    }
  }, [])

  return (
    <Box
      ref={container}
      sx={{
        flexBasis: '100%',
        'canvas.mapboxgl-canvas:focus': {
          outline: 'none',
        },
      }}
    />
  )
}

export default memo(Mapbox)
