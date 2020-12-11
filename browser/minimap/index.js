import { useState, useEffect } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'
import data from '../data'

const Minimap = () => {
  const context = useThemeUI()
  const theme = context.theme

  const [path, setPath] = useState(null)
  const [locations, setLocations] = useState([])
  const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])

  useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/'
    const url = prefix + 'nation-albers-10m-simplified.json'
    json(url).then((us) => {
      setPath(geoPath()(feature(us, us.objects.nation)))
    })
    setLocations(data.map((d) => d.coordinates))
  }, [])

  return <Box
    sx={{
      position: 'absolute',
      right: [3],
      bottom: [3],
      height: '350px',
      width: '350px',
      borderRadius: '200px',
      backgroundColor: 'background',
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '1px',
      zIndex: 2000,
    }}
  >
    <Box sx={{
      position: 'relative',
      top: 80,
      left: 25,
      width: '300px',
      height: '300px'
    }}>
      <Box sx={{ fill: 'none', stroke: 'primary' }}>
        <svg viewBox='0 0 975 610'>
          <g strokeLinejoin='round' strokeLinecap='round' strokeWidth='1'>
            <path d={path}></path>
          </g>
          {locations.map((d, i) => {
            if (d.length > 0) return (
              <g key={i} transform={`translate(${projection(d).join(',')})`}>
                <circle
                  r='25'
                  fill={theme.colors.green}
                  strokeWidth='0'
                ></circle>
              </g>
            )
          })}
        </svg>
      </Box>
    </Box>
  </Box>
}

export default Minimap