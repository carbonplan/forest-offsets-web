import { memo, useState, useEffect } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'
import Rect from './rect'
import Chart from './chart'

const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
const initCenter = [-121.9, 43.11]
const initZoom = 6.79

const Minimap = ({ map, selected, locations }) => {
  const { theme } = useThemeUI()

  const [focus, setFocus] = useState([])
  const [dragging, setDragging] = useState(false)

  const [path, setPath] = useState(null)

  const setPosition = (e) => {
    var bounds = e.target.getBoundingClientRect()
    var x = e.clientX - bounds.left
    var y = e.clientY - bounds.top
    setFocus(projection.invert([(x * 1185) / 300 - 120, (y * 1185) / 300 - 95]))
  }

  useEffect(() => {
    if (map && focus.length > 0) {
      map.easeTo({ center: focus })
    }
  }, [focus])

  useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/'
    const url = prefix + 'nation-albers-10m-simplified.json'
    json(url).then((us) => {
      setPath(geoPath()(feature(us, us.objects.nation)))
    })
  }, [])

  const onMouseDown = () => {
    setDragging(true)
  }

  const onMouseMove = (e) => {
    if (dragging) {
      var bounds = e.target.getBoundingClientRect()
      var x = e.clientX - bounds.left
      var y = e.clientY - bounds.top
      setFocus(
        projection.invert([(x * 1185) / 300 - 120, (y * 1185) / 300 - 95])
      )
    }
  }

  const onMouseUp = () => {
    setDragging(false)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        right: [3],
        bottom: [3],
        height: '300px',
        width: '300px',
        borderRadius: '200px',
        backgroundColor: 'background',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '1px',
        zIndex: 500,
        display: ['none', 'none', 'inherit'],
      }}
    >
      <Box
        sx={{
          position: 'relative',
          top: 45,
          left: 0,
          width: '300px',
          height: '300px',
        }}
      >
        <Box sx={{ fill: 'none', stroke: 'primary' }}>
          <Box
            as='svg'
            viewBox='-125 -100 1185 810'
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onClick={setPosition}
            sx={{ cursor: 'move' }}
          >
            <Chart
              locations={locations}
              selected={selected}
              path={path}
              theme={theme}
              projection={projection}
            />
            <Rect
              map={map}
              projection={projection}
              initCenter={initCenter}
              initZoom={initZoom}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(Minimap)
