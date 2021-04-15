/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { scaleLinear } from 'd3-scale'

const Bar = ({ value, color, scale }) => {
  const width = scaleLinear().domain([scale.min, scale.max]).range([0, 100])(
    value
  )

  return (
    <Box
      sx={{
        display: 'inline-block',
      }}
    >
      <svg height='12px' width='100%' stroke='none' fill='none'>
        <rect
          sx={{ fill: color, opacity: 0.2 }}
          x='0'
          y='0'
          width='100%'
          height='12'
        />
        <rect
          sx={{ fill: color, opacity: 1 }}
          x='0'
          y='0'
          width={width ? `${width}%` : 0}
          height='12'
        />
      </svg>
    </Box>
  )
}

export default Bar
