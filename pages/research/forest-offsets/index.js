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

  return <Main data={data} locations={locations} />
}

export default Index
