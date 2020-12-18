import { Box, Text, Grid } from 'theme-ui'
import { alpha } from '@theme-ui/color'
const Metrics = ({ data }) => {
  const { arbId, owner, developer, carbon, permanence, coordinates } = data

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
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          <Text>{arbId}</Text>
          <Text>{owner}</Text>
          <Text>{developer}</Text>
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
          <Text>{carbon.initialCarbonStock.value}</Text>
          <Text>{carbon.commonPractice.value}</Text>
        </Box>
      </Grid>
      <Grid columns={['150px 1fr']}>
        <Box>
          <Text>ARB Total Risk:</Text>
          <Text>ARB Fire RisK:</Text>
          <Text>MTBS Fire RisK:</Text>
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          }}
        >
          <Text>{permanence.arbTotalRisk}</Text>
          <Text>{permanence.arbFireRisk}</Text>
          <Text>{permanence.mtbsFireRisk}</Text>
        </Box>
      </Grid>
    </Box>
  )
}

export default Metrics
