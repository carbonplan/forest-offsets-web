import Seo from './seo'
import Switch from './switch'
import { Container, Flex, Box, Text } from 'theme-ui'

const Layout = ({ children }) => {
  return (
    <>
      <Seo />
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            width: '100%',
            flex: '1 1 auto',
          }}
        >
          {children}
        </Box>
        <Box sx={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          zIndex: 2000,
          backgroundColor: 'background'
        }}>
        <Switch />
        </Box>
      </Flex>
    </>
  )
}

export default Layout
