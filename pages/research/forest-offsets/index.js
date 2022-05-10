import { useState } from 'react'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { Box } from 'theme-ui'
import { Layout, Guide, Dimmer, Tray } from '@carbonplan/components'
import Desktop from '../../../components/desktop'
import Mobile from '../../../components/mobile'
import { projects } from '../../../data/projects'

const Index = () => {
  const projectLocations = {
    type: 'FeatureCollection',
    features: projects.map((d) => {
      return {
        type: 'Feature',
        properties: {
          id: d.id,
        },
        geometry: {
          type: 'Point',
          coordinates: d.shape_centroid[0],
        },
      }
    }),
  }

  const locations = { projects: projectLocations }

  const tiles = {
    projects: `https://carbonplan.blob.core.windows.net/carbonplan-retro/tiles/projects/{z}/{x}/{y}.pbf`,
    fires: `https://storage.googleapis.com/carbonplan-research/offset-fires/tiles/fires/fires/{z}/{x}/{y}.pbf`,
  }

  const index = useBreakpointIndex()

  return (
    <>
      {index > 0 && (
        <Layout
          description={
            'Data and results from analyzing improved forest management carbon offset projects.'
          }
          title='Forest offsets – CarbonPlan'
          card='https://images.carbonplan.org/social/forest-offsets.png'
          nav={'research'}
          header={false}
          dimmer={false}
          footer={false}
          metadata={false}
        >
          <Desktop data={projects} tiles={tiles} locations={locations} />
          <Box
            sx={{
              position: ['fixed'],
              right: [13],
              bottom: [17, 17, 15, 15],
              zIndex: 5000,
            }}
          >
            <Dimmer />
          </Box>
        </Layout>
      )}
      {index === 0 && (
        <Box sx={{ display: ['initial', 'none', 'none', 'none'] }}>
          <Layout
            description={
              'Data and results from analyzing improved forest management carbon offset projects.'
            }
            title='Forest offsets – CarbonPlan'
            card='https://images.carbonplan.org/social/forest-offsets.png'
            header={true}
            nav={'research'}
            dimmer={false}
            footer={false}
            metadata={false}
          >
            <Guide />
            <Mobile data={projects} tiles={tiles} locations={locations} />
          </Layout>
        </Box>
      )}
    </>
  )
}

export default Index
