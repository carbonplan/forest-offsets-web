import { memo, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box, Badge, Text, Flex, Slider } from 'theme-ui'
import { getScrollbarWidth } from '@carbonplan/components'
import { alpha } from '@theme-ui/color'
import { Arrow } from '@carbonplan/icons'
import { format } from 'd3-format'
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

const Projects = ({
  data,
  bounds,
  showFires,
  setShowFires,
  showMethods,
  setShowMethods,
  showActiveFires,
  setShowActiveFires,
  scrollTo,
  setSelected,
  setZoomTo,
  archive,
}) => {
  const [filters, setFilters] = useState(initialFilters)
  const [count, setCount] = useState(Object.keys(data).length)
  const router = useRouter()

  useEffect(() => {
    if (router.query.methods === 'true') setShowMethods(true)
  }, [router.query.methods])

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

  const ref = useCallback((node) => {
    if (node && document) {
      const delta = getScrollbarWidth(document)
      if (delta > 0) {
        node.classList.add('custom-scrollbar')
      }
    }
  }, [])

  const totalBurnedArea = data
    .filter((d) => d.fire)
    .reduce((a, b) => a + b.area * b.fire.burnedFraction, 0)

  return (
    <>
      <Methods
        showMethods={showMethods}
        toggleMethods={toggleMethods}
        showFires={showFires}
        archive={archive}
      />
      <Box
        sx={{
          minWidth: [
            '100px',
            'calc(4 * 100vw / 8 + 16px)',
            'calc(4 * 100vw / 12 + 22px)',
            'calc(3 * 100vw / 12 + 36px)',
          ],
          maxWidth: [
            '100px',
            'calc(4 * 100vw / 8 + 16px)',
            'calc(4 * 100vw / 12 + 22px)',
            'calc(3 * 100vw / 12 + 36px)',
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
          ref={ref}
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
              <About showFires={showFires} archive={archive} />
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
                  '&:hover > #read-methods > #read-methods-container > #read-methods-arrow':
                    {
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
            <Box sx={{ position: 'sticky', top: '-1px', zIndex: 1000 }}>
              <Box
                sx={{
                  ...sx.group,
                  backgroundColor: 'background',
                }}
              >
                <Filter
                  filters={filters}
                  setFilters={setFilters}
                  showFires={showFires}
                  archive={archive}
                  setShowFires={setShowFires}
                  showActiveFires={showActiveFires}
                  setShowActiveFires={setShowActiveFires}
                  count={count}
                  total={data.length}
                />
              </Box>
            </Box>
            {showFires && (
              <Box
                sx={{
                  pl: [3, 4, 5, 6],
                  pr: [3, 5, 5, 6],
                  py: [4],
                  borderBottom: ({ colors }) => `solid 1px ${colors.muted}`,
                  fontFamily: 'faux',
                  letterSpacing: 'faux',
                  color: 'red',
                }}
              >
                Total project area burned:{' '}
                <Box
                  as='span'
                  sx={{ ml: [2], letterSpacing: 'mono', fontFamily: 'mono' }}
                >
                  {totalBurnedArea > 1 &&
                    format('.3~s')(totalBurnedArea) + ' acres'}
                  {totalBurnedArea < 1 && '<1 acre'}
                </Box>
              </Box>
            )}
            <Box sx={{ ...sx.group, borderBottomWidth: '0px' }}>
              <List
                data={data}
                bounds={bounds}
                filters={filters}
                setCount={setCount}
                scrollTo={scrollTo}
                setSelected={setSelected}
                setZoomTo={setZoomTo}
                showFires={showFires}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(Projects)
