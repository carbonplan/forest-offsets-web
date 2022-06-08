import { Box } from 'theme-ui'
import { Layout, Heading, Row, Column, Button } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

const Index = () => {
  return (
    <Layout
      description={
        'Monitor of forest fires affecting improved forest management carbon offset projects.'
      }
      title='Fires and forest offsets – CarbonPlan'
      card='https://images.carbonplan.org/social/forest-offsets.png'
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
          <Button size={'lg'} suffix={<RotatingArrow sx={{ color: 'red' }} />}>
            Fires and forest offsets
          </Button>
          <Box sx={{ mt: [1, 2, 3, 4], mb: [5, 6, 7, 8] }}>
            A public monitor of forest fires affecting improved forest
            management carbon offset projects in California's cap-and-trade
            program, live updating for the 2022 fire season.
          </Box>
        </Column>
        <Column start={[1, 1, 7, 7]} width={[6, 8, 4, 4]}>
          <Button
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
