import { useState } from 'react'
import Layout from './layout'
import Map from './map'
import Projects from './projects'
import Filter from './projects/filter'
import { Container, Flex, Box, Text } from 'theme-ui'

const Index = () => {

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
        <Projects setSelected={setSelected}/>
        <Map selected={selected}/>
      </Flex>
    </Layout>
  )
}

export default Index
