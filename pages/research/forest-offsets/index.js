import { useBreakpointIndex } from '@theme-ui/match-media'
import { Box } from 'theme-ui'
import { Layout, Guide, Dimmer } from '@carbonplan/components'
import Desktop from '../../../components/desktop'
import Mobile from '../../../components/mobile'
import { projects } from '../../../data/projects'

const projectsWithFires = {
  CAR1314: ['Chuweah Creek Fire', 'Summit Trail'],
  ACR273: [
    'Juniper',
    'Coyote',
    'Tennant',
    'Bootleg',
    'Log',
    'Jack',
    'Darlene 0572 NE',
  ],
  ACR274: ['Lava', 'Coyote', 'Tennant', 'Bootleg'],
  CAR1066: ['Salt', 'Lava', 'Coyote', 'Tennant'],
  CAR1041: ['Salt', 'Lava', 'Tennant'],
  ACR303: ['Turkey'],
  CAR1297: ['Rocky Road', 'Divide Complex', 'Rock Creek'],
  ACR260: ['Grandview', 'Bruler', 'Rattlesnake'],
  ACR255: ['Chuweah Creek Fire', 'Summit Trail', 'Cedar Creek', 'Cub Creek 2'],
  ACR211: ['Turkey'],
}

const Index = () => {
  const locations = {
    type: 'FeatureCollection',
    features: projects.map((d) => {
      return {
        type: 'Feature',
        properties: {
          id: d.id,
          fire: projectsWithFires[d.id],
        },
        geometry: {
          type: 'Point',
          coordinates: d.shape_centroid[0],
        },
      }
    }),
  }

  const merged = projects.map((d) => {
    d.fire = projectsWithFires[d.id]
    return d
  })

  const index = useBreakpointIndex()

  return (
    <>
      {index > 0 && (
        <Layout
          description={
            'Data and results from analyzing improved forest management carbon offset projects.'
          }
          title='forest offsets / research / carbonplan'
          card='https://images.carbonplan.org/social/forest-offsets.png'
          nav={'research'}
          header={false}
          dimmer={false}
          footer={false}
          metadata={false}
        >
          <Desktop data={projects} locations={locations} />
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
            title='forest offsets / research / carbonplan'
            card='https://images.carbonplan.org/social/forest-offsets.png'
            header={true}
            nav={'research'}
            dimmer={true}
            footer={false}
            metadata={false}
          >
            <Guide />
            <Mobile data={projects} locations={locations} />
          </Layout>
        </Box>
      )}
    </>
  )
}

export default Index
