/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { scaleLinear } from 'd3-scale'
import { useThemeUI } from 'theme-ui'

const Bar = ({ value, color, scale }) => {

  const width = scaleLinear().domain([scale.min, scale.max]).range([0, 120])(value)

  return (
    <Box
      sx={{
        mt: ['1px'],
      }}
    >
      <svg height='12px' width='120px' stroke='none' fill='none'>
        <rect
          sx={{ fill: color, opacity: 0.2 }}
          x='0'
          y='0'
          width='150'
          height='12'
        />
        <rect
          sx={{ fill: color, opacity: 1 }}
          x='0'
          y='0'
          width={width}
          height='12'
        />
      </svg>
    </Box>
  )
}

export default Bar
