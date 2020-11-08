import { useState } from 'react'
import { Box, Badge, Text, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Header from './header'
import Menu from './menu'

function Projects({
  options,
  setOptions,
  children,
}) {
  const [showMenu, setShowMenu] = useState(false)

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
        display: ['none', 'none', 'flex']
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
      </Box>
    </Box>
  )
}

export default Projects
