import { memo } from 'react'
import { Box } from 'theme-ui'

const Chart = ({ locations, path, theme, selected, projection }) => {
  return (
    <>
      <g strokeLinejoin='round' strokeLinecap='round' strokeWidth='1'>
        <path d={path}></path>
      </g>
      {locations.map((d, i) => {
        if (d.geometry.coordinates.length > 0)
          return (
            <Box
              as='g'
              key={i}
              transform={`translate(${projection(d.geometry.coordinates).join(
                ','
              )})`}
              sx={{ pointerEvents: 'none' }}
            >
              <Box
                as='circle'
                r='25'
                fill={theme.colors.green}
                strokeWidth='0'
                sx={{ transition: '0.25s' }}
              ></Box>
            </Box>
          )
      })}
      {locations
        .filter((d) => selected && d.properties.id == selected.id)
        .map((d, i) => {
          if (d.geometry.coordinates.length > 0)
            return (
              <Box
                as='g'
                key={i}
                transform={`translate(${projection(d.geometry.coordinates).join(
                  ','
                )})`}
                sx={{ pointerEvents: 'none' }}
              >
                <Box
                  as='circle'
                  r='25'
                  fill={theme.colors.primary}
                  strokeWidth='0'
                  sx={{ transition: '0.25s' }}
                ></Box>
              </Box>
            )
        })}
    </>
  )
}

export default Chart
