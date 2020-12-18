/** @jsx jsx */
import { memo, useState, useEffect, useContext } from 'react'
import { jsx, useThemeUI, Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'
import Rect from './rect'
import data from '../../data'

const Minimap = ({
  map,
  selected,
  locations,
  initCenter,
  initZoom,
  setFocus,
}) => {
  const context = useThemeUI()
  const theme = context.theme

  const [path, setPath] = useState(null)
  const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])

  const setPosition = (e) => {
    var bounds = e.target.getBoundingClientRect()
    var x = e.clientX - bounds.left
    var y = e.clientY - bounds.top
    setFocus(projection.invert([(x * 980) / 250, (y * 980) / 250]))
  }

  useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/'
    const url = prefix + 'nation-albers-10m-simplified.json'
    json(url).then((us) => {
      setPath(geoPath()(feature(us, us.objects.nation)))
    })
  }, [])

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
        zIndex: 2000,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          top: 80,
          left: 27,
          width: '250px',
          height: '250px',
        }}
      >
        <Box sx={{ fill: 'none', stroke: 'primary' }}>
          <svg viewBox='-5 0 980 610' onClick={(e) => setPosition(e)}>
            <g strokeLinejoin='round' strokeLinecap='round' strokeWidth='1'>
              <path d={path}></path>
            </g>
            {locations.map((d, i) => {
              if (d.geometry.coordinates.length > 0)
                return (
                  <g
                    key={i}
                    transform={`translate(${projection(
                      d.geometry.coordinates
                    ).join(',')})`}
                    sx={{ pointerEvents: 'none' }}
                  >
                    <circle
                      r='25'
                      fill={theme.colors.green}
                      strokeWidth='0'
                      sx={{ transition: '0.25s' }}
                    ></circle>
                  </g>
                )
            })}
            {locations
              .filter((d) => selected && d.properties.id == selected.id)
              .map((d, i) => {
                if (d.geometry.coordinates.length > 0)
                  return (
                    <g
                      key={i}
                      transform={`translate(${projection(
                        d.geometry.coordinates
                      ).join(',')})`}
                      sx={{ pointerEvents: 'none' }}
                    >
                      <circle
                        r='25'
                        fill={theme.colors.primary}
                        strokeWidth='0'
                        sx={{ transition: '0.25s' }}
                      ></circle>
                    </g>
                  )
              })}
            <Rect
              map={map}
              projection={projection}
              initCenter={initCenter}
              initZoom={initZoom}
            />
          </svg>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(Minimap)
