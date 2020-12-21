import { Box, Text, Link } from 'theme-ui'

const About = () => {
  return (
    <Box sx={{ px: [3], py: [2] }}>
      <Text
        sx={{
          fontSize: [6],
          fontFamily: 'heading',
          letterSpacing: 'heading',
          my: [0],
        }}
      >
        Forest offset projects
      </Text>
      <Text
        sx={{
          fontSize: [3],
          my: [2],
          mb: ['12px'],
          pr: [3],
        }}
      >
        This is a public database of improved forest management carbon offset
        projects in California’s cap-and-trade program. We assembled it for
        research, transparency, and oversight. Download the data as{' '}
        <Link
          target='_blank'
          href='https://carbonplan.blob.core.windows.net/carbonplan-retro/projects/retro-db-light.csv'
        >
          CSV
        </Link>{' '}
        or{' '}
        <Link
          target='_blank'
          href='https://carbonplan.blob.core.windows.net/carbonplan-retro/projects/retro-db-light.json'
        >
          JSON
        </Link>
        {'. '}
      </Text>
    </Box>
  )
}

export default About
