import { Box, Text } from 'theme-ui'
import { mix } from '@theme-ui/color'

const Toggle = ({ value, toggle, labels }) => {
  return (
    <Box onClick={toggle} sx={{ cursor: 'pointer', display: 'inline-block' }}>
      <Box
        sx={{
          width: '50px',
          height: '20px',
          borderRadius: '20px',
          backgroundColor: value ? mix('primary', 'background', 0.5) : 'muted',
          position: 'relative',
          transition: '0.15s',
          display: 'inline-block',
        }}
      >
        <Box
          sx={{
            width: '14px',
            height: '14px',
            borderRadius: '7px',
            position: 'absolute',
            left: value ? '32px' : '4px',
            top: '3px',
            backgroundColor: value ? 'primary' : 'secondary',
            transition: '0.15s',
          }}
        ></Box>
      </Box>
    </Box>
  )
}

export default Toggle
