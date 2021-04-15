import { memo, useState, useEffect } from 'react'
import { Box, Badge, Text, Flex, Slider } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Header from './header'
import About from './about'
import List from './list'
import Filter from './filter'
import Methods from './methods'

const initialFilters = {
  acr: true,
  car: true,
  vcs: true,
  updateWithMap: true,
  search: '',
}

const Projects = ({ data, bounds, setSelected }) => {
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
      borderBottomWidth: '0px',
      borderTopWidth: '0px',
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
          minWidth: [
            '100px',
            'calc(3 * 100vw / 6 + 16px)',
            'calc(4 * 100vw / 12 + 22px)',
            'min(calc(4 * 100vw / 12 + 32px), 672px)',
          ],
          maxWidth: [
            '100px',
            'calc(3 * 100vw / 6 + 16px)',
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
            <Box
              sx={{
                ...sx.group,
                backgroundColor: 'background',
                position: 'sticky',
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
                setSelected={setSelected}
              />
            </Box>
            <Box sx={sx.groupTop}>
              <Box
                onClick={toggleMethods}
                sx={{
                  px: [3, 4, 5, 6],
                  py: [3],
                  pb: [4],
                  width: 'fit-content',
                  fontFamily: 'heading',
                  letterSpacing: 'smallcaps',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'secondary',
                  },
                }}
              >
                <Box>
                  READ METHODS<Text sx={sx.arrow}>→</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(Projects)
