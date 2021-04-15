import { Layout, Guide } from '@carbonplan/components'
import Main from '../../../components/main'
import data from '../../../data'

const Index = () => {
  const locations = {
    type: 'FeatureCollection',
    features: data.map((d) => {
      return {
        type: 'Feature',
        properties: {
          id: d.id,
        },
        geometry: {
          type: 'Point',
          coordinates: d.shape_centroid,
        },
      }
    }),
  }

  return (
    <Layout
      description={
        'Project data and analysis results on improved forest management carbon offset projects.'
      }
      title='forest offsets / research / carbonplan'
      card='https://images.carbonplan.org/social/forest-offsets.png'
      header={false}
      dimmer={false}
      footer={false}
      metadata={false}
    >
      <Main data={data} locations={locations} />
    </Layout>
  )
}

export default Index
