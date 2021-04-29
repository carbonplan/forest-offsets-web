import { Box, Text } from 'theme-ui'
import { Buttons } from '@carbonplan/components'
import MethodsContent from './index.md'

const { BackButton } = Buttons

function Methods({ showMethods, toggleMethods }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1,
        borderStyle: 'solid',
        borderWidth: 0,
        borderRightWidth: showMethods ? 1 : 0,
        borderColor: 'muted',
        height: '100%',
        left: [
          0,
          'calc(4 * 100vw / 8 + 16px)',
          'calc(4 * 100vw / 12 + 22px)',
          'min(calc(4 * 100vw / 12 + 32px), 672px)',
        ],
        backgroundColor: 'background',
        width: [
          0,
          'calc(4 * 100vw / 8 - 14px)',
          'calc(4 * 100vw / 12 - 12px)',
          'min(calc(5 * 100vw / 12 - 20px), 780px)',
        ],
        transition: 'transform 0.3s',
        transform: showMethods ? 'translateX(0px)' : 'translateX(-1200px)',
        overflowY: 'scroll',
        display: ['none', 'initial', 'initial'],
      }}
    >
      <Box
        sx={{
          px: [3, 5, 5, 6],
          opacity: 1,
          pt: ['13px'],
          mb: [4],
        }}
      >
        <BackButton onClick={toggleMethods} sx={{ cursor: 'pointer' }} />
        <Box
          sx={{
            position: 'relative',
            top: '-3px',
          }}
        >
          <MethodsContent />
        </Box>
      </Box>
    </Box>
  )
}

export default Methods
