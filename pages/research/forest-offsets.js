import { Box } from 'theme-ui'
import { Layout, Heading, Row, Column, Button } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

const Index = () => {
  return (
    <Layout
      description={
        'Index of tools and data related to analysis of carbon offset projects.'
      }
      title='Forest offsets – CarbonPlan'
      nav={'research'}
    >
      <Heading>Forest offsets</Heading>
      <Row>
        <Column start={[1, 1, 2, 2]} width={[6, 8, 10, 10]}>
          <Box sx={{ mb: [5, 6, 7, 8] }}>
            Here we index tools we have released for analyzing and mapping
            forest carbon offsets.
          </Box>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 1, 2, 2]} width={[6, 8, 4, 4]}>
          <Button
            href='/research/forest-offsets-fires'
            size={'lg'}
            suffix={<RotatingArrow sx={{ color: 'red' }} />}
          >
            Fires and forest offsets
          </Button>
          <Box sx={{ mt: [1, 2, 3, 4], mb: [5, 6, 7, 8] }}>
            A public monitor of forest fires affecting improved forest
            management carbon offset projects in California's cap-and-trade
            program, live updating for the 2024 fire season.
          </Box>
        </Column>
        <Column start={[1, 1, 7, 7]} width={[6, 8, 4, 4]}>
          <Button
            href='/research/forest-offsets-crediting'
            size={'lg'}
            suffix={<RotatingArrow sx={{ color: 'green' }} />}
          >
            Over-crediting of forest offsets
          </Button>
          <Box sx={{ mt: [1, 2, 3, 4], mb: [5, 6, 7, 8] }}>
            A map summarizing our analysis of over-crediting of improved forest
            management carbon offset projects in California’s cap-and-trade
            program.
          </Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
