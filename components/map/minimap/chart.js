/** @jsx jsx */
import { memo } from 'react'
import { jsx } from 'theme-ui'

const Chart = ({ locations, path, theme, selected, projection }) => {
  return (
    <>
      <g strokeLinejoin='round' strokeLinecap='round' strokeWidth='1'>
        <path d={path}></path>
      </g>
      {locations.map((d, i) => {
        if (d.geometry.coordinates.length > 0)
          return (
            <g
              key={i}
              transform={`translate(${projection(d.geometry.coordinates).join(
                ','
              )})`}
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
                transform={`translate(${projection(d.geometry.coordinates).join(
                  ','
                )})`}
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
    </>
  )
}

export default Chart
