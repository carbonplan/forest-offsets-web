import { Box, Text } from 'theme-ui'
import MethodsContent from './index.md'

function Methods({ showMethods, toggleMethods }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1000,
        borderStyle: 'solid',
        borderWidth: 0,
        borderRightWidth: showMethods ? 1 : 0,
        borderColor: 'muted',
        height: '100%',
        left: 560,
        backgroundColor: 'background',
        width: 600,
        transition: 'transform 0.3s',
        transform: showMethods ? 'translateX(0px)' : 'translateX(-1200px)',
        overflowY: 'scroll',
        display: ['none', 'none', 'initial'],
      }}
    >
      <Box
        sx={{
          px: [4],
          opacity: 1,
        }}
      >
        <Box
          onClick={toggleMethods}
          sx={{
            cursor: 'pointer',
            width: '75px',
            '&:hover': {
              color: 'secondary',
            },
          }}
        >
          <Text
            sx={{
              display: 'inline-block',
              fontSize: [6],
              top: '-3px',
              position: 'relative',
            }}
          >
            ←
          </Text>
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: '-40px',
          }}
        >
          <MethodsContent />
        </Box>
      </Box>
    </Box>
  )
}

export default Methods
