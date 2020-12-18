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
      <Grid columns={['150px 1fr']}>
        <Box>
          <Text>ARB ID:</Text>
          <Text>Owner:</Text>
          <Text>Developer:</Text>
          <Text>Attestor:</Text>
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          <Text>{arb_id}</Text>
          <Text>{owners[0]}</Text>
          <Text>{developers[0]}</Text>
          <Text>{`${
            (attestor == 'SEENOTE') | (attestor == 'SEE NOTE')
              ? 'N/A'
              : attestor
          }`}</Text>
        </Box>
      </Grid>
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
          <Text>{arbocs.issuance}</Text>
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
          <Text>{carbon.initial_carbon_stock.value}</Text>
          <Text>{carbon.common_practice.value}</Text>
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
          <Text>{permanence.arb_total_risk}</Text>
          <Text>{permanence.arb_fire_risk}</Text>
          <Text>{permanence.mtbs_fire_risk}</Text>
        </Box>
      </Grid>
    </Box>
  )
}

export default Metrics
