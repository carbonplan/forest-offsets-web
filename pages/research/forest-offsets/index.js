import { Box } from 'theme-ui'
import { Layout, Guide, Dimmer } from '@carbonplan/components'
import Main from '../../../components/main'
import { projects } from '../../../data/projects'

const Index = () => {
  const locations = {
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

  return (
    <Layout
      description={
        'Data and results from analyzing improved forest management carbon offset projects.'
      }
      title='forest offsets / research / carbonplan'
      card='https://images.carbonplan.org/social/forest-offsets.png'
      header={false}
      dimmer={false}
      footer={false}
      metadata={false}
    >
      <Guide color='teal' />
      <Main data={projects} locations={locations} />
      <Box
        sx={{
          display: ['none', 'initial', 'initial', 'initial'],
          position: ['fixed'],
          right: [13],
          bottom: [17, 17, 15, 15],
        }}
      >
        <Dimmer />
      </Box>
    </Layout>
  )
}

export default Index
