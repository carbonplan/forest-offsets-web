import { Box, Text, Grid, Button, Slider, Divider } from 'theme-ui'
import { useState, useEffect, useRef } from 'react'
import Enhancers from './enhancers'
import Chart from './chart'
import mapboxgl from 'mapbox-gl'
import style from './style'

const regions = {
  0: {
    center: [-123.14459322723042, 40.01900471979263],
    zoom: 6.810018251901804,
  },
  1: {
    center: [-83.24757469289432, 36.95479710173086],
    zoom: 5.770191808362024,
  },
}

const Region = () => {
  const initOptions = {
    supersections: false,
    baileys: true,
    region: 0,
  }

  const container = useRef(null)
  const [map, setMap] = useState(null)
  const [options, setOptions] = useState(initOptions)
  const [selected, setSelected] = useState(null)
  const [focused, setFocused] = useState([])

  useEffect(() => {
    toggleRadio('region', 0)
  }, [])

  const Radio = ({ name, value }) => {
    return (
      <Box
        onClick={() => toggleRadio(name, value)}
        sx={{
          mt: ['-4px'],
          background: 'none',
          fontFamily: 'monospace',
          ml: [2],
          borderStyle: 'solid',
          borderColor: 'primary',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          cursor: 'pointer',
          color: 'primary',
          display: 'inline-block',
          opacity: options[name] == value ? 1 : 0.2,
        }}
      >
        {value}
      </Box>
    )
  }

  const Option = ({ value, label }) => {
    return (
      <Text
        onClick={() => toggleOption(value)}
        sx={{
          ml: [3],
          pt: [0],
          display: 'inline-block',
          borderStyle: 'solid',
          borderColor: 'primary',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          opacity: options[value] ? 1 : 0.2,
          fontFamily: 'monospace',
          letterSpacing: 'monospace',
          cursor: 'pointer',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    )
  }

  useEffect(() => {
    const { center, zoom } = regions[options['region']]

    const map = new mapboxgl.Map({
      container: container.current,
      style: style,
      center: center,
      zoom: zoom,
      minZoom: 3,
      maxZoom: 9,
      maxBounds: [
        [-155, 5],
        [-45, 65],
      ],
    })

    map.scrollZoom.disable()
    map.dragPan.disable()
    map.dragRotate.disable()
    map.boxZoom.disable()
    map.doubleClickZoom.disable()

    map.on('load', () => {
      setMap(map)
      const features = map.queryRenderedFeatures({
        layers: ['projects'],
      })
      if (features.length > 0) {
        setFocused(features.map((d) => d.properties.id))
      }
    })

    map.on('click', function (e) {
      const bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5],
      ]
      const features = map.queryRenderedFeatures(bbox, {
        layers: ['projects'],
      })
      if (features.length > 0) {
        setSelected(features[0].properties.id)
      }

      // map.on('move', () => {
      //   console.log(map.getZoom())
      //   console.log(map.getCenter())
      // })
    })

    return function cleanup() {
      setMap(null)
      map.remove()
    }
  }, [])

  useEffect(() => {
    if (!map) return

    const { center, zoom } = regions[options['region']]

    map.flyTo({
      center: center,
      zoom: zoom,
      essential: true,
      speed: 2,
    })

    map.once('moveend', () => {
      const features = map.queryRenderedFeatures({
        layers: ['projects'],
      })
      if (features.length > 0) {
        setFocused(features.map((d) => d.properties.id))
      }
    })
  }, [options['region']])

  function toggleOption(value) {
    setOptions((options) => {
      return { ...options, [value]: !options[value] }
    })
  }

  function toggleRadio(name, value) {
    setOptions((options) => {
      return { ...options, [name]: value }
    })
  }

  return (
    <Grid columns={['400px 1fr']} sx={{ mt: [4] }}>
      <Box
        sx={{
          mb: [5],
          position: 'relative',
          width: ['90%', '90%', '400px'],
        }}
      >
        <Divider />
        <Box>
          <Box
            ref={container}
            sx={{
              width: '100%',
              height: '550px',
              'canvas.mapboxgl-canvas:focus': {
                outline: 'none',
              },
              'canvas.mapboxgl-canvas': {
                cursor: 'default',
              },
            }}
          >
            {map && <Enhancers map={map} options={options} />}
          </Box>
          <Divider />
          <Box
            sx={{
              fontSize: [3],
            }}
          >
            <Box
              sx={{
                float: 'left',
                display: 'contents',
              }}
            >
              <Text
                sx={{
                  pl: [1],
                  pt: [0],
                  display: 'inline-block',
                  fontFamily: 'monospace',
                  letterSpacing: 'monospace',
                }}
              >
                REGION
              </Text>
              <Radio name='region' value={0} />
              <Radio name='region' value={1} />
              <Radio name='region' value={2} />
            </Box>
            <Box
              sx={{
                float: 'right',
              }}
            >
              <Option value='baileys' label='baileys' />
              <Option value='supersections' label='car' />
            </Box>
          </Box>
        </Box>
        <Divider />
      </Box>
      <Chart selected={selected} focused={focused} />
    </Grid>
  )
}

export default Region
