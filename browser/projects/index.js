import { useState } from 'react'
import { Box, Badge, Text, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Header from './header'
import About from './about'
import List from './list'

function Projects({ options, setOptions, setSelected }) {
  
  console.log('rendering projects')

  const Group = ({ children }) => {
    return (
      <Box
        sx={{
          borderStyle: 'solid',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          borderColor: 'muted',
        }}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minWidth: '650px',
        maxWidth: '650px',
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
      <Header />
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          overflowY: 'scroll',
        }}
      >
        
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
            <Box sx={{px: [4], py: [3]}}>
              Filters
            </Box>
          </Group>
          <Group>
            <List setSelected={setSelected}/>
          </Group>
        </Box>
      </Box>
    </Box>
  )
}

export default Projects
