import { useState } from 'react'
import { Flex } from 'theme-ui'
import Layout from './layout'
import Map from './map'
import Projects from './projects'
import Filter from './projects/filter'

const Main = ({ data, locations }) => {
  const [selected, setSelected] = useState(null)
  const [bounds, setBounds] = useState(null)

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
        <Projects data={data} bounds={bounds} setSelected={setSelected} />
        <Map locations={locations} selected={selected} setBounds={setBounds} />
      </Flex>
    </Layout>
  )
}

export default Main
