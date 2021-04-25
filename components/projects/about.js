import { Box, Link } from 'theme-ui'

const About = () => {
  return (
    <Box
      sx={{
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '1px',
      }}
    >
      <Box
        sx={{
          pl: [3, 4, 5, 6],
          pr: [3, 5, 5, 6],
          pt: [3],
          pb: [3],
          fontSize: [6, 6, 6, 7],
          width: 'fit-content',
          fontFamily: 'heading',
          lineHeight: 'heading',
        }}
      >
        Forest offsets
      </Box>
      <Box
        sx={{
          pl: [3, 4, 5, 6],
          pr: [3, 5, 5, 6],
          pt: [0],
          pb: [4],
          mb: [1],
          fontSize: [2, 2, 2, 3],
          fontFamily: 'body',
          lineHeight: 'body',
        }}
      >
        This is a database of project data and results from an analysis of
        improved forest management carbon offset projects in California’s
        cap-and-trade program. Read our{' '}
        <Link
          target='_blank'
          href='https://carbonplan.org/research/forest-offsets-explainer'
        >
          article
        </Link>{' '}
        for more about our analysis. Download the data as{' '}
        <Link
          target='_blank'
          href='https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/forest-offsets-database-v1.0.csv'
        >
          CSV
        </Link>{' '}
        or{' '}
        <Link
          target='_blank'
          href='https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/forest-offsets-database-v1.0.json'
        >
          JSON
        </Link>
        {'. '}
      </Box>
    </Box>
  )
}

export default About
