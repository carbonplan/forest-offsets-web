import { Box, Text, Grid } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Bar from './bar'
import Check from './check'

const Metrics = ({ data }) => {
  const {
    arb_id,
    arbocs,
    owners,
    developers,
    carbon,
    permanence,
    coordinates,
    attestor,
    apd,
    opo,
    is_opo,
  } = data

  const checkIssuance = (d) => {
    return (
      Math.round(d.issuance) == Math.round(d.reported) &&
      Math.round(d.calculated) == Math.round(d.reported)
    )
  }

  const Row = ({ label, display }) => {
    return (
      <Grid columns={['150px 1fr']} sx={{ pr: [4] }}>
        <Box>
          <Text sx={{ fontFamily: 'faux' }}>{label}</Text>
        </Box>
        <Text
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          {display}
        </Text>
      </Grid>
    )
  }

  const RowBar = ({ label, value, scale, color, display, units }) => {
    return (
      <Grid columns={['150px 120px 1fr']} sx={{}}>
        <Box>
          <Text sx={{ fontFamily: 'faux' }}>{label}</Text>
        </Box>
        <Bar scale={scale} color={color} value={value} />
        <Text
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: color,
          }}
        >
          {display}
          {units && (
            <Text
              sx={{
                display: 'inline-block',
                color: 'secondary',
                textTransform: 'none',
                fontSize: [1],
                ml: [2],
              }}
            >
              {units}
            </Text>
          )}
        </Text>
      </Grid>
    )
  }

  const RowBarIcon = ({
    label,
    value,
    scale,
    color,
    display,
    check,
    units,
  }) => {
    return (
      <Grid columns={['150px 120px 1fr']} sx={{}}>
        <Box>
          <Text sx={{ fontFamily: 'faux' }}>{label}</Text>
        </Box>
        <Bar scale={scale} color={color} value={value} />
        <Text
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: color,
          }}
        >
          {display}
          {check && <Check color={color} />}
        </Text>
      </Grid>
    )
  }

  return (
    <Box
      sx={{
        borderStyle: 'solid',
        borderWidth: '0px',
        borderBottomWidth: '0px',
        borderTopWidth: '0px',
        borderColor: alpha('muted', 0.5),
        pt: [2],
        pb: [1],
        mt: [2],
        mb: [1],
      }}
    >
      <Box sx={{ mb: [3] }}>
        <Row label='ARB ID:' display={arb_id} />
        <Row label='Owner:' display={owners[0]} />
        <Row
          label='Developer:'
          display={developers.length > 0 ? developers[0] : 'N/A'}
        />
        <Row
          label='Attestor:'
          display={`${
            (attestor == 'SEENOTE') | (attestor == 'SEE NOTE')
              ? 'N/A'
              : attestor
          }`}
        />
      </Box>

      <RowBarIcon
        label='ARBOCs issued:'
        color='green'
        scale={{ min: 0, max: 3000000 }}
        value={arbocs.issuance}
        display={arbocs.issuance.toLocaleString()}
        check={checkIssuance(arbocs)}
      />
      <RowBar
        label='Initial stock:'
        color='green'
        scale={{ min: 0, max: 200 }}
        value={carbon.initial_carbon_stock.value}
        display={carbon.initial_carbon_stock.value.toFixed(0)}
        units={'tCO₂/ac'}
      />
      <RowBar
        label='Common practice:'
        color='green'
        scale={{ min: 0, max: 200 }}
        value={carbon.common_practice.value}
        display={carbon.common_practice.value.toFixed(0)}
        units={'tCO₂/ac'}
      />
      <RowBar
        label='ARB total risk:'
        color='orange'
        scale={{ min: 0, max: 50 }}
        value={permanence.arb_total_risk * 100}
        display={`${(permanence.arb_total_risk * 100).toFixed(0)}%`}
      />
      <RowBar
        label='ARB fire risk:'
        color='orange'
        scale={{ min: 0, max: 50 }}
        value={permanence.arb_fire_risk * 100}
        display={`${(permanence.arb_fire_risk * 100).toFixed(0)}%`}
      />
      <RowBar
        label='MTBS fire risk:'
        color='orange'
        scale={{ min: 0, max: 50 }}
        value={permanence.mtbs_fire_risk_baileys * 100}
        display={`${(permanence.mtbs_fire_risk_baileys * 100).toFixed(0)}%`}
      />
    </Box>
  )
}

export default Metrics
