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
import CreditingMethodsContent from './projects/methods/crediting.md'
import FireMethodsContent from './projects/methods/fires.md'
import ArchiveMethodsContent from './projects/methods/archive.md'

const Mobile = ({ data, locations, tiles, showFires, archive }) => {
  const [map, setMap] = useState(null)
  const [zoomTo, setZoomTo] = useState(null)
  const [zoomToBox, setZoomToBox] = useState(null)
  const [zoomInitialized, setZoomInitialized] = useState(false)
  const [section, setSection] = useState('map')

  const router = useRouter()

  useEffect(() => {
    const { id, zoom, center } = router.query

    if (map && id) {
      setZoomTo(id)
    }

    if (map && center && zoom && !zoomInitialized) {
      setZoomToBox({
        center: center.split(',').map((d) => parseFloat(d)),
        zoom: parseFloat(zoom),
      })
    }
  }, [map, router])

  useEffect(() => {
    if (map && zoomToBox) {
      const { center, zoom } = zoomToBox
      map.easeTo({
        center: center,
        zoom: zoom,
        duration: 0,
      })
      setZoomInitialized(true)
      setZoomToBox(null)
    }
  }, [zoomToBox])

  useEffect(() => {
    if (map && zoomTo) {
      setSection('map')
      const project = data.filter((d) => d.id === zoomTo)[0]
      const { area, shape_centroid } = project
      const center = shape_centroid
      map.easeTo({
        center: center,
        zoom: 100000 * (1 / area) + 7.5,
        duration: 0,
      })
    }
  }, [zoomTo])

  useEffect(() => {
    if (map) {
      map.on('moveend', (e) => {
        const { pathname, asPath } = router
        const center = map.getCenter()
        const zoom = map.getZoom()
        let suffix = `?center=${center.lng},${center.lat}&zoom=${zoom}`
        router.replace(pathname + suffix, null, {
          scroll: false,
          shallow: true,
        })
      })
    }
  }, [map])

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
          tiles={tiles}
          map={map}
          setMap={setMap}
          setBounds={() => {}}
          showFires={showFires}
          archive={archive}
        />
      </Box>

      {map && <Enhancers map={map} selected={null} showFires={showFires} />}
      {section === 'projects' && (
        <>
          <FadeIn>
            <About showFires={showFires} archive={archive} />
            {data
              .sort((a, b) => {
                const nameA = a.name
                const nameB = b.name
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
        </>
      )}
      {section === 'methods' && (
        <FadeIn>
          {showFires && archive && <ArchiveMethodsContent />}
          {showFires && !archive && <FireMethodsContent />}
          {!showFires && <CreditingMethodsContent />}
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
