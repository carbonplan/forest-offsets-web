import { useState, useEffect } from 'react'
import { Box, Flex, Grid } from 'theme-ui'
import { Row, Column, FadeIn, Button, Toggle } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'
import { alpha } from '@theme-ui/color'
import { useRouter } from 'next/router'
import Mapbox from './map/mapbox'
import Enhancers from './map/enhancers'
import Loading from './loading'
import About from './projects/about'
import Project from './projects/project'
import MethodsContent from './projects/methods/index.md'
import { displayNames } from '../data/display-names'

const Mobile = ({ data, locations }) => {
  const [map, setMap] = useState(null)
  const [zoomTo, setZoomTo] = useState(null)
  const [section, setSection] = useState('map')
  const [showFires, setShowFires] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    if (map && id) {
      setZoomTo(id)
    }
  }, [map, router])

  useEffect(() => {
    if (map && zoomTo) {
      setSection('map')
      const project = data.filter((d) => d.id === zoomTo)[0]
      const { acreage, shape_centroid } = project
      const center = shape_centroid[0]
      map.easeTo({
        center: center,
        zoom: 100000 * (1 / acreage) + 7.5,
        duration: 0,
      })
    }
  }, [zoomTo])

  return (
    <>
      <Box
        sx={{
          width: 'calc(100vw)',
          height: 'calc(100vh - 120px)',
          display: [section === 'map' ? 'flex' : 'none'],
          ml: [-3],
        }}
      >
        <Mapbox
          locations={locations}
          map={map}
          setMap={setMap}
          setBounds={() => {}}
        />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          left: '0px',
          top: '56px',
          height: '56px',
          width: 'calc(100vw)',
          bg: 'background',
          pl: [3],
          pt: [2],
          pr: [3],
          borderStyle: 'solid',
          borderColor: 'muted',
          borderWidth: '0px',
          borderBottomWidth: '1px',
        }}
      >
        <Row columns={6}>
          <Column start={1} width={5}>
            <Box sx={{ fontSize: [1], color: 'secondary' }}>
              Fire Season 2021 update: click to see where projects overlap
              fires.
            </Box>
          </Column>
          <Column start={6} width={1}>
            <Toggle
              onClick={() => setShowFires((prev) => !prev)}
              value={showFires}
              sx={{
                color: 'red',
                float: 'right',
                position: 'relative',
                top: '5px',
              }}
            />
          </Column>
        </Row>
      </Box>
      {map && <Enhancers map={map} selected={null} showFires={showFires} />}
      {section === 'projects' && (
        <FadeIn>
          <Box sx={{ height: '56px' }} />
          <About mobile={true} />
          {data
            .sort((a, b) => {
              const nameA = displayNames.filter((d) => d.id === a.id)[0].name
              const nameB = displayNames.filter((d) => d.id === b.id)[0].name
              return nameA.localeCompare(nameB)
            })
            .filter((d) => (showFires ? (d.fire ? true : false) : true))
            .map((d, i) => (
              <Project
                key={d.id}
                data={d}
                final={i === data.length - 1 && data.length > 3}
                setSelected={() => {}}
                setZoomTo={setZoomTo}
                showFires={showFires}
              ></Project>
            ))}
          <Box sx={{ height: '64px' }} />
        </FadeIn>
      )}
      {section === 'methods' && (
        <FadeIn>
          <Box sx={{ height: '56px' }} />
          <Box sx={{ mt: 3 }} />
          <Button
            inverted
            size='xs'
            onClick={() => setSection('map')}
            sx={{ cursor: 'pointer', mt: [1] }}
            prefix={<Left />}
          >
            Back
          </Button>
          <MethodsContent />
        </FadeIn>
      )}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          bg: 'background',
          height: '64px',
          borderStyle: 'solid',
          borderWidth: '0px',
          borderTopWidth: '1px',
          borderColor: 'muted',
          fontSize: [3],
          ml: [-3],
          fontFamily: 'heading',
          letterSpacing: 'allcaps',
          textTransform: 'uppercase',
        }}
      >
        <Grid columns={[3]} gap={[0]}>
          <Flex
            onClick={() => setSection('projects')}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '64px',
              cursor: 'pointer',
              bg: section === 'projects' ? alpha('muted', 0.5) : 'background',
            }}
          >
            Projects
          </Flex>
          <Flex
            onClick={() => setSection('map')}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '64px',
              borderStyle: 'solid',
              borderColor: 'muted',
              borderWidth: '0px',
              borderLeftWidth: '1px',
              borderRightWidth: '1px',
              cursor: 'pointer',
              bg: section === 'map' ? alpha('muted', 0.5) : 'background',
            }}
          >
            Map
          </Flex>
          <Flex
            onClick={() => setSection('methods')}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '64px',
              cursor: 'pointer',
              bg: section === 'methods' ? alpha('muted', 0.5) : 'background',
            }}
          >
            Methods
          </Flex>
        </Grid>
      </Box>
    </>
  )
}

export default Mobile
