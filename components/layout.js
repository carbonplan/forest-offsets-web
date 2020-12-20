import Seo from './seo'
import Switch from './switch'
import Header from './header'
import { Container, Flex, Box, Text } from 'theme-ui'

const Layout = ({ children, status, showHeader }) => {
  return (
    <>
      <Seo />
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {showHeader && <Box
            sx={{
              width: '100%',
              borderStyle: 'solid',
              borderColor: 'muted',
              borderWidth: '0px',
              borderBottomWidth: '1px',
              position: 'sticky',
              top: 0,
              bg: 'background',
              height: '56px',
              zIndex: 1000,
            }}
          >
            <Container
              sx={{
                px: [3, 3, 4],
              }}
            >
              <Header status={status} />
            </Container>
          </Box>
        }
        <Box
          sx={{
            width: '100%',
            flex: '1 1 auto',
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            zIndex: 2000,
            backgroundColor: 'background',
          }}
        >
          <Switch />
        </Box>
      </Flex>
    </>
  )
}

export default Layout
