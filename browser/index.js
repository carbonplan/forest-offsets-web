import { useState } from 'react'
import Layout from './layout'
import Map from './map'
import Projects from './projects'
import Filter from './projects/filter'
import { Container, Flex, Box, Text } from 'theme-ui'
import data from './data'

const Index = () => {
  const [selected, setSelected] = useState(null)
  const [bounds, setBounds] = useState(null)

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
    <Layout>
      <Flex
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          flexDirection: ['column', 'row', 'row'],
          overflow: 'hidden',
        }}
      >
        <Projects bounds={bounds} setSelected={setSelected} />
        <Map locations={locations} selected={selected} setBounds={setBounds} />
      </Flex>
    </Layout>
  )
}

export default Index
