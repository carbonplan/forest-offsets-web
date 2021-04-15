import { Layout, Guide } from '@carbonplan/components'
import Main from '../../../components/main'
import data from '../../../data/projects'

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
      <Guide />
      <Main data={data} locations={locations} />
    </Layout>
  )
}

export default Index
