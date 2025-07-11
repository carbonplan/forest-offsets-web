import { Box, Text } from 'theme-ui'
import { Button } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import CreditingMethodsContent from './crediting.md'
import FireMethodsContent from './fires.md'
import ArchiveMethodsContent from './archive.md'

function Methods({ showMethods, toggleMethods, showFires, archive }) {
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
            pb: [3, 3, 3, 4],
          }}
        >
          {showFires && archive && <ArchiveMethodsContent archive={archive} />}
          {showFires && !archive && <FireMethodsContent />}
          {!showFires && <CreditingMethodsContent />}
        </Box>
      </Box>
    </Box>
  )
}

export default Methods
