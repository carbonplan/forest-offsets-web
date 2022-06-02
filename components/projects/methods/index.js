import { Box, Text } from 'theme-ui'
import { Button } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import BaselinesMethodsContent from './baselines.md'
import FireMethodsContent from './fires.md'

function Methods({ showMethods, toggleMethods, showFires }) {
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
          'calc(3 * 100vw / 12 + 36px)',
        ],
        backgroundColor: 'background',
        width: [
          0,
          'calc(4 * 100vw / 8 - 15px)',
          'calc(4 * 100vw / 12 - 12px)',
          'calc(3 * 100vw / 12 - 12px)',
        ],
        transition: 'transform 0.2s',
        transform: showMethods ? 'translateX(0px)' : 'translateX(-100%)',
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
        <Button
          size='xs'
          inverted
          prefix={<Left />}
          onClick={toggleMethods}
          sx={{ mt: [1], cursor: 'pointer' }}
        >
          Back
        </Button>
        <Box
          sx={{
            position: 'relative',
            top: '-3px',
          }}
        >
          {showFires && <FireMethodsContent />}
          {!showFires && <BaselinesMethodsContent />}
        </Box>
      </Box>
    </Box>
  )
}

export default Methods
