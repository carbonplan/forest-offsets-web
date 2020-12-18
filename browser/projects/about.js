import { Box, Text, Link } from 'theme-ui'

const About = () => {
  return (
    <Box sx={{ px: [3], py: [2] }}>
      <Text
        sx={{
          fontSize: [6],
          fontFamily: 'heading',
          letterSpacing: 'heading',
          my: [2],
        }}
      >
        Forest offset projects
      </Text>
      <Text
        sx={{
          fontSize: [3],
          my: [2],
          mb: [3],
          pr: [3],
        }}
      >
        This is a public database of compliance forest carbon offset projects.
        We assembled it for purposes of research, analysis, transparency, and
        oversight. Download the data as{' '}
        <Link
          target='_blank'
          href='https://www.dropbox.com/s/7pzokjhvce14b02/retro-db-light.csv?dl=0'
        >
          CSV
        </Link>{' '}
        or JSON. Read our article for more info.
      </Text>
    </Box>
  )
}

export default About
