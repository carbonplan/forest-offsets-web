import { useState, useEffect } from 'react'
import { Box, Flex, Grid } from 'theme-ui'
import { Row, Column, FadeIn, Buttons } from '@carbonplan/components'
import { alpha } from '@theme-ui/color'
import { useRouter } from 'next/router'
import Mapbox from './map/mapbox'
import Enhancers from './map/enhancers'
import Viewer from './viewer'
import Loading from './loading'
import About from './projects/about'
import Project from './projects/project'
import MethodsContent from './projects/methods/index.md'
import { displayNames } from '../data/display-names'

const { BackButton } = Buttons

const Mobile = ({ data, locations }) => {
  const [map, setMap] = useState(null)
  const [zoomTo, setZoomTo] = useState(null)
  const [section, setSection] = useState('map')

  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    if (map && id) {
      setZoomTo(id)
    }
  }, [map, router])

  useEffect(() => {
    if (map && zoomTo) {
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
      {map && <Enhancers map={map} selected={null} />}
      {section === 'projects' && (
        <FadeIn>
          <About />
          {data
            .sort((a, b) => {
              const nameA = displayNames.filter((d) => d.id === a.id)[0].name
              const nameB = displayNames.filter((d) => d.id === b.id)[0].name
              return nameA.localeCompare(nameB)
            })
            .map((d, i) => (
              <Project
                key={d.id}
                data={d}
                final={i === data.length - 1 && data.length > 3}
                setSelected={() => {}}
                setZoomTo={setZoomTo}
              ></Project>
            ))}
          <Box sx={{ height: '56px' }} />
        </FadeIn>
      )}
      {section === 'methods' && (
        <FadeIn>
          <Box sx={{ mt: 3 }} />
          <BackButton
            onClick={() => setSection('map')}
            sx={{ cursor: 'pointer' }}
          />
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
