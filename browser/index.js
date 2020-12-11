import { useState } from 'react'
import Layout from './layout'
import Map from './map'
import Minimap from './minimap'
import Projects from './projects'
import { Container, Flex, Box, Text } from 'theme-ui'
import data from './data'

const Index = () => {
  const initialOptions = {
    selected: null,
  }

  const [options, setOptions] = useState(initialOptions)
  const [selected, setSelected] = useState(null)

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
        <Minimap />
        <Projects setSelected={setSelected} />
        <Map />
      </Flex>
    </Layout>
  )
}

export default Index
