import Seo from './seo'
import Header from './header'
import Footer from './footer'
import Switch from './switch'
import { Container, Flex, Box, Text } from 'theme-ui'

const Layout = ({
  hideFooter,
  shareCard,
  shareDescription,
  shareTitle,
  children,
  status,
}) => {
  return (
    <>
      <Seo
        shareCard={shareCard}
        shareDescription={shareDescription}
        shareTitle={shareTitle}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
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
        <Box
          sx={{
            width: '100%',
            flex: '1 1 auto',
          }}
        >
          {children}
        </Box>
        {!hideFooter && (
          <Box
            sx={{
              width: '100%',
              borderStyle: 'solid',
              borderColor: 'muted',
              borderWidth: '0px',
              borderTopWidth: '1px',
            }}
          >
            <Container
              sx={{
                px: [3, 3, 4],
              }}
            >
              <Footer />
            </Container>
          </Box>
        )}
        <Box
          sx={{
            position: 'fixed',
            bottom: '0px',
            right: '32px',
            display: ['none', 'none', 'inherit'],
          }}
        >
          <Switch />
        </Box>
      </Flex>
    </>
  )
}

export default Layout
