import { memo, useState, useEffect } from 'react'
import { Box, Badge, Text, Flex, Slider } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { Arrow } from '@carbonplan/components'
import Header from './header'
import About from './about'
import List from './list'
import Filter from './filter'
import Methods from './methods'

const initialFilters = {
  acr: true,
  car: true,
  vcs: true,
  updateWithMap: false,
  search: '',
}

const Projects = ({ data, bounds, scrollTo, setSelected, setZoomTo }) => {
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
      borderTopWidth: '0px',
      borderColor: 'muted',
    },
  }

  return (
    <>
      <Methods showMethods={showMethods} toggleMethods={toggleMethods} />
      <Box
        sx={{
          minWidth: [
            '100px',
            'calc(4 * 100vw / 8 + 16px)',
            'calc(4 * 100vw / 12 + 22px)',
            'min(calc(4 * 100vw / 12 + 32px), 672px)',
          ],
          maxWidth: [
            '100px',
            'calc(4 * 100vw / 8 + 16px)',
            'calc(4 * 100vw / 12 + 22px)',
            'min(calc(4 * 100vw / 12 + 32px), 672px)',
          ],
          height: '100%',
          flexBasis: '100%',
          flexDirection: 'column',
          borderStyle: 'solid',
          borderWidth: '0px',
          borderRightWidth: '1px',
          borderColor: 'muted',
          zIndex: 1,
          backgroundColor: 'background',
          display: ['none', 'flex', 'flex'],
        }}
      >
        <Header />
        <Box
          id='projects'
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
                  pl: [3, 4, 5, 6],
                  pr: [3, 5, 5, 6],
                  py: [3],
                  pb: [4],
                  fontSize: [2, 2, 2, 3],
                  width: 'fit-content',
                  fontFamily: 'heading',
                  letterSpacing: 'smallcaps',
                  textTransform: 'uppercase',
                  transition: 'color 0.15s',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'secondary',
                  },
                  '&:hover > #read-methods > #read-methods-container > #read-methods-arrow': {
                    fill: 'secondary',
                  },
                }}
              >
                <Box
                  id='read-methods'
                  sx={{
                    mt: ['6px'],
                  }}
                >
                  READ METHODS
                  <Box
                    id='read-methods-container'
                    sx={{
                      position: 'relative',
                      top: '2px',
                      ml: [2],
                      display: 'inline-block',
                      transition: 'transform 0.2s',
                      transform: showMethods ? 'scaleX(-1)' : 'scaleX(1)',
                    }}
                  >
                    <Arrow
                      id='read-methods-arrow'
                      sx={{
                        width: 16,
                        height: 16,
                        transition: 'fill 0.15s',
                        transform: 'rotate(45deg)',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                ...sx.group,
                backgroundColor: 'background',
                position: 'sticky',
                zIndex: 1000,
                top: '-1px',
              }}
            >
              <Filter
                filters={filters}
                setFilters={setFilters}
                count={count}
                total={data.length}
              />
            </Box>
            <Box sx={{ ...sx.group, borderBottomWidth: '0px' }}>
              <List
                data={data}
                bounds={bounds}
                filters={filters}
                setCount={setCount}
                scrollTo={scrollTo}
                setSelected={setSelected}
                setZoomTo={setZoomTo}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(Projects)
