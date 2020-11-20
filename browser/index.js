import { useState } from 'react'
import Layout from './layout'
import Map from './map'
import Projects from './projects'
import { Container, Flex, Box, Text } from 'theme-ui'

const Index = () => {
  const initialOptions = {
    selected: 1,
  }

  const [options, setOptions] = useState(initialOptions)

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
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: '200px',
            width: '300px',
            backgroundColor: 'background',
            borderStyle: 'solid',
            borderColor: 'muted',
            borderWidth: '0px',
            borderLeftWidth: '1px',
            borderTopWidth: '1px',
            zIndex: 2000,
          }}
        ></Box>
        <Projects options={options} setOptions={setOptions} />
        <Map options={options} setOptions={setOptions} />
      </Flex>
    </Layout>
  )
}

export default Index
