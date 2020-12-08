import { useState } from 'react'
import { Box, Badge, Text, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Header from './header'
import Menu from './menu'
import About from './about'
import List from './list'

function Projects({ options, setOptions, children }) {
  const [showMenu, setShowMenu] = useState(false)

  const Group = ({ children }) => {
    return (
      <Box
        sx={{
          borderStyle: 'solid',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          borderColor: 'muted',
          px: [3],
          py: [3],
        }}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minWidth: '550px',
        maxWidth: '550px',
        height: '100%',
        flexBasis: '100%',
        flexDirection: 'column',
        borderStyle: 'solid',
        borderWidth: '0px',
        borderRightWidth: '1px',
        borderColor: 'muted',
        zIndex: 2000,
        backgroundColor: 'background',
        display: ['none', 'none', 'flex'],
      }}
    >
      <Header showMenu={showMenu} toggleMenu={() => setShowMenu(!showMenu)} />
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          overflowY: 'scroll',
        }}
      >
        <Menu visible={showMenu} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Group>
            <About />
          </Group>
          <Group>
            Filters
          </Group>
          <Group>
            <List />
          </Group>
        </Box>
      </Box>
    </Box>
  )
}

export default Projects
