import { Box, Text, Grid } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import { format } from 'd3-format'
import Bar from './bar'
import Check from './check'

const Metrics = ({ data }) => {
  const { arbocs, carbon, over_crediting } = data

  const checkIssuance = (d) => {
    return (
      Math.round(d.issuance) == Math.round(d.reported) &&
      Math.round(d.calculated) == Math.round(d.reported)
    )
  }

  const RowBar = ({ label, value, scale, color = 'green', display }) => {
    return (
      <Row columns={[4]} sx={{ mb: [1] }}>
        <Column start={[1]} width={[1]}>
          <Box
            sx={{
              fontSize: [2, 2, 2, 3],
              color: 'green',
              fontFamily: 'mono',
              letterSpacing: 'mono',
              display: 'inline-block',
            }}
          >
            {display}
          </Box>
        </Column>
        <Column start={[2]} width={[1]} dl={1}>
          <Bar scale={scale} color={color} value={value} />
        </Column>
        <Column start={[3]} width={[2]}>
          <Box
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'faux',
            }}
          >
            {label}
          </Box>
        </Column>
      </Row>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          borderStyle: 'solid',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          borderTopWidth: '1px',
          borderColor: 'muted',
          pt: [4],
          pb: [4],
          mt: [4],
          mb: [1],
        }}
      >
        <RowBar
          label='Project size'
          scale={{ min: 0, max: 2000000 }}
          value={arbocs.issuance}
          display={format('.2s')(arbocs.issuance)}
        />
        <RowBar
          label='Initial carbon'
          scale={{ min: 0, max: 200 }}
          value={carbon.initial_carbon_stock.value}
          display={format('.0f')(carbon.initial_carbon_stock.value)}
        />
        <RowBar
          label='Common practice'
          scale={{ min: 0, max: 200 }}
          value={carbon.common_practice.value}
          display={format('.0f')(carbon.common_practice.value)}
        />
        {over_crediting && (
          <RowBar
            label='Over-crediting (%)'
            scale={{ min: 0, max: 1 }}
            value={over_crediting.percent[1]}
            display={format('.0%')(over_crediting.percent[1])}
          />
        )}
      </Box>
      <Box sx={{ mt: [3], color: 'secondary', fontSize: [1, 1, 1, 2] }}>
        Show project on map
      </Box>
    </Box>
  )
}

export default Metrics
