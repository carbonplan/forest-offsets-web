import { useEffect, useState, useRef } from 'react'
import { Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import style from './style'
import Enhancers from './enhancers'

mapboxgl.accessToken = ''

function Map({ options }) {
  const container = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: style,
      center: [-121.9, 43.11],
      zoom: 6.79,
      minZoom: 3,
      maxZoom: 9,
      maxBounds: [
        [-155, 5],
        [-45, 65],
      ],
    })

    map.on('load', () => {
      setMap(map)
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
    >
      {map && (
        <Enhancers
          map={map}
          options={options}
        />
      )}
    </Box>
  )
}

export default Map
