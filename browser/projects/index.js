import { useState, useEffect } from 'react'
import { Box, Badge, Text, Flex, Slider } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Header from './header'
import About from './about'
import List from './list'
import Filter from './filter'

const Projects = ({ bounds, setSelected }) => {

  const initialFilters = {
    acr: true,
    car: true,
    vcs: true
  }

  const [filters, setFilters] = useState(initialFilters)
  
  const sx = {
    group: {
      borderStyle: 'solid',
      borderWidth: '0px',
      borderBottomWidth: '1px',
      borderColor: 'muted',
    },
    groupTop: {
      borderStyle: 'solid',
      borderWidth: '0px',
      borderBottomWidth: '1px',
      borderTopWidth: '1px',
      borderColor: 'muted',
    }
  }

  return (
    <Box
      sx={{
        minWidth: '600px',
        maxWidth: '600px',
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
          <Box sx={sx.groups}>
            <About />
          </Box>
          <Box sx={sx.groupTop}>
            <Filter filters={filters} setFilters={setFilters}/>
          </Box>
          <Box sx={sx.group}>
            <List bounds={bounds} filters={filters} setSelected={setSelected}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Projects
