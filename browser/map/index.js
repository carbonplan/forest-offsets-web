import { useEffect, useState, useRef, useContext } from 'react'
import { Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import style from './style'
import Enhancers from './enhancers'
import Projects from '../projects'
import Minimap from './minimap'

mapboxgl.accessToken = ''

function Map({ options, selected }) {
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const [center, setCenter] = useState([])

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

  useEffect(() => {
    console.log(center)
  }, [center])

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <>
      <Box
        ref={container}
        sx={{
          flexBasis: '100%',
          'canvas.mapboxgl-canvas:focus': {
            outline: 'none',
          },
        }}
      >
        {map && <Enhancers map={map} options={options} />}
      </Box>
      <Minimap center={center} setCenter={setCenter}/>
    </>
  )
}

export default Map
