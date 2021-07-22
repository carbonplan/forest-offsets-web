import { memo } from 'react'
import { Box } from 'theme-ui'

const Chart = ({ locations, path, theme, selected, projection, fires }) => {
  const { background, primary, red, green } = theme.colors

  return (
    <>
      <g
        fill={background}
        style={{ pointerEvents: 'none' }}
        strokeLinejoin='round'
        strokeLinecap='round'
        strokeWidth='1'
      >
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
                r={selected && d.properties.id == selected ? 25 : 10}
                fill={fires ? (d.properties.fire ? red : primary) : green}
                fillOpacity={selected && d.properties.id == selected ? 1 : 1}
                strokeWidth='0'
                sx={{
                  transition: 'fill 0.15s, r 0.15s, fill-opacity 0.15s',
                }}
              ></Box>
            </Box>
          )
      })}
      {locations
        .filter((d) => selected && d.properties.id == selected)
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
                  r={selected && d.properties.id == selected ? 25 : 10}
                  fill={fires ? (d.properties.fire ? red : primary) : primary}
                  fillOpacity={selected && d.properties.id == selected ? 1 : 0}
                  strokeWidth='0'
                  sx={{
                    transition: 'r 0.15s, fill-opacity 0.15s',
                  }}
                ></Box>
              </Box>
            )
        })}
    </>
  )
}

export default memo(Chart)
