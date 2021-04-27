import { Box, Flex } from 'theme-ui'

const Loading = ({ map }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        fontFamily: 'mono',
        transition: 'opacity 0.15s',
        opacity: map ? 0 : 1,
        position: 'absolute',
        maxWidth: '1920px',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: [
            '0',
            'calc(4 * 100vw / 8 + 16px)',
            'calc(4 * 100vw / 12 + 22px)',
            'min(calc(4 * 100vw / 12 + 32px), 672px)',
          ],
          width: [
            'calc(100vw)',
            'calc(100vw - (4 * 100vw / 8 + 16px))',
            'calc(100vw - (4 * 100vw / 12 + 22px))',
            'calc(min(1920px, 100vw) - (min(calc(4 * 100vw / 12 + 32px), 672px)))',
          ],
        }}
      >
        <Flex
          sx={{
            justifyContent: 'center',
            lineHeight: 'body',
            alignItems: 'center',
            textTransform: 'uppercase',
            letterSpacing: 'mono',
            height: '100vh',
            width: '100%',
            color: 'secondary',
            fontSize: [2, 2, 2, 3],
          }}
        >
          loading map...
        </Flex>
      </Box>
    </Box>
  )
}

export default Loading
