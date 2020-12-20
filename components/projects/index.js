import { useState, useEffect } from 'react'
import { Box, Badge, Text, Flex, Slider } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Header from './header'
import About from './about'
import List from './list'
import Filter from './filter'
import Methods from './methods'

const Projects = ({ data, bounds, setSelected }) => {
  const initialFilters = {
    acr: true,
    car: true,
    vcs: true,
    updateWithMap: true,
    search: '',
  }

  const [filters, setFilters] = useState(initialFilters)
  const [showMethods, setShowMethods] = useState(false)
  const [count, setCount] = useState(0)

  const toggleMethods = () => setShowMethods(!showMethods)

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
    },
    arrow: {
      display: 'inline-block',
      fontSize: [4],
      ml: [2],
      top: '3px',
      position: 'relative',
      transition: 'transform 0.2s',
      transform: showMethods ? 'scaleX(-1)' : 'scaleX(1)',
    },
  }

  return (
    <>
      <Methods showMethods={showMethods} toggleMethods={toggleMethods} />
      <Box
        sx={{
          minWidth: '560px',
          maxWidth: '560px',
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
            <Box>
              <About />
            </Box>
            <Box sx={sx.groupTop}>
              <Box
                onClick={toggleMethods}
                sx={{
                  px: [3],
                  py: [2],
                  pb: [3],
                  width: 'fit-content',
                  fontFamily: 'monospace',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'secondary',
                  },
                }}
              >
                <Text>
                  READ METHODS<Text sx={sx.arrow}>→</Text>
                </Text>
              </Box>
            </Box>
            <Box
              sx={{
                ...sx.group,
                backgroundColor: 'background',
                position: 'sticky',
                top: '-1px',
              }}
            >
              <Filter filters={filters} setFilters={setFilters} count={count} />
            </Box>
            <Box sx={sx.group}>
              <List
                data={data}
                bounds={bounds}
                filters={filters}
                setCount={setCount}
                setSelected={setSelected}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Projects
