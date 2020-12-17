import { memo, useEffect, useState, useRef, useContext } from 'react'
import { Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import style from './style'
import Enhancers from './enhancers'
import Projects from '../projects'
import Minimap from './minimap'

mapboxgl.accessToken = ''

const Map = ({ selected, setSelected, setBounds }) => {
  console.log('rendering map')
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const [focus, setFocus] = useState([])

  useEffect(() => {
    console.log('rerunning')
    const map = new mapboxgl.Map({
      container: container.current,
      style: style,
      center: [-121.9, 43.11],
      zoom: 6.79,
      minZoom: 3,
      maxZoom: 10,
    })

    map.on('load', () => {
      setMap(map)
    })

    map.on('moveend', () => {
      setBounds(map.getBounds())
    })

    return function cleanup() {
      setMap(null)
      map.remove()
    }
  }, [])

  useEffect(() => {
    if (map && focus.length > 0) {
      map.easeTo({ center: focus })
    }
  }, [focus])

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
        {map && (
          <Enhancers map={map} selected={selected} setSelected={setSelected} />
        )}
      </Box>
      <Minimap
        map={map}
        selected={selected}
        initCenter={[-121.9, 43.11]}
        initZoom={6.79}
        setFocus={setFocus}
      />
    </>
  )
}

export default memo(Map)
