import { Box, Text, Grid } from 'theme-ui'
import { alpha } from '@theme-ui/color'
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

  const Row = ({ label, children }) => {
    return (
      <Grid columns={['150px 1fr']} sx={{ pr: [4] }}>
        <Box>
          <Text>{label}</Text>
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          {children}
        </Box>
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
      <Row label='ARB ID:'>
        <Text>{arb_id}</Text>
      </Row>
      <Row label='Owner:'>
        <Text>{owners[0]}</Text>
      </Row>
      <Row label='Developer:'>
        <Text>{developers.length > 0 ? developers[0] : 'N/A'}</Text>
      </Row>
      <Row label='Attestor:'>
        <Text>{`${
          (attestor == 'SEENOTE') | (attestor == 'SEE NOTE') ? 'N/A' : attestor
        }`}</Text>
      </Row>

      <Grid columns={['150px 1fr']}>
        <Box>
          <Text>ARBOCs issued:</Text>
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          <Text>{arbocs.issuance.toLocaleString()}</Text>
        </Box>
      </Grid>
      <Grid columns={['150px 1fr']}>
        <Box>
          <Text>Initial stock:</Text>
          <Text>Common practice:</Text>
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          <Text>{carbon.initial_carbon_stock.value.toFixed(0)}</Text>
          <Text>{carbon.common_practice.value.toFixed(0)}</Text>
        </Box>
      </Grid>
      <Grid columns={['150px 1fr']}>
        <Box>
          <Text>ARB Total Risk:</Text>
          <Text>ARB Fire Risk:</Text>
          <Text>MTBS Fire Risk:</Text>
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          <Text>{`${(permanence.arb_total_risk * 100).toFixed(0)}%`}</Text>
          <Text>{`${(permanence.arb_fire_risk * 100).toFixed(0)}%`}</Text>
          <Text>{`${(permanence.mtbs_fire_risk * 100).toFixed(0)}%`}</Text>
        </Box>
      </Grid>
    </Box>
  )
}

export default Metrics
