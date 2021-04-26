import { Box, Text, Grid } from 'theme-ui'
import { Row, Column, Buttons } from '@carbonplan/components'
import { format } from 'd3-format'
import Bar from './bar'
import Check from './check'

const { ArrowButton } = Buttons

const Metrics = ({ data, setZoomTo }) => {
  const { id, arbocs, carbon, over_crediting, shape_centroid } = data

  const checkIssuance = (d) => {
    return (
      Math.round(d.issuance) == Math.round(d.reported) &&
      Math.round(d.calculated) == Math.round(d.reported)
    )
  }

  const onClick = (e) => {
    e.stopPropagation()
    setZoomTo({ id: id, center: shape_centroid[0] })
  }

  const RowBar = ({ label, value, scale, color = 'green', display, units }) => {
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
              fontSize: [2, 2, 2, 3],
            }}
          >
            {label}
            <Box
              as='span'
              sx={{
                fontFamily: 'faux',
                letterSpacing: 'faux',
                fontSize: [1, 1, 1, 2],
                color: 'secondary',
                ml: [2],
              }}
            >
              {units}
            </Box>
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
          label='Total credits'
          scale={{ min: 0, max: 20000000 }}
          value={arbocs.issuance}
          display={format('.2s')(arbocs.issuance)}
          units={'tCO₂'}
        />
        <RowBar
          label='Initial carbon'
          scale={{ min: 0, max: 300 }}
          value={carbon.initial_carbon_stock.value}
          display={format('.0f')(carbon.initial_carbon_stock.value)}
          units={'tCO₂/ac'}
        />
        <RowBar
          label='Common practice'
          scale={{ min: 0, max: 300 }}
          value={carbon.common_practice.value}
          display={format('.0f')(carbon.common_practice.value)}
          units={'tCO₂/ac'}
        />
        {over_crediting && (
          <RowBar
            label='Over-crediting'
            scale={{ min: 0, max: 1 }}
            value={over_crediting.percent[1]}
            display={format('.0%')(over_crediting.percent[1])}
            units={'%'}
          />
        )}
        {over_crediting && (
          <RowBar
            label='Over-crediting'
            scale={{ min: 0, max: 1000000 }}
            value={over_crediting.arbocs[1]}
            display={format('.2s')(over_crediting.arbocs[1])}
            units={'tCO₂'}
          />
        )}
      </Box>
      <Box sx={{ mt: [3], color: 'secondary', fontSize: [2, 2, 2, 3] }}>
        <ArrowButton
          onClick={onClick}
          size='xs'
          color='secondary'
          fill='secondary'
          label='Show project on a map'
        />
      </Box>
    </Box>
  )
}

export default Metrics
