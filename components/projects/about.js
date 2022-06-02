import { Colors } from '@carbonplan/components'
import { Box, Link } from 'theme-ui'

const Wrapper = ({ title, children }) => {
  return (
    <Box
      sx={{
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        ml: [-3, 0, 0, 0],
        mr: [-3, 0, 0, 0],
      }}
    >
      <Box
        sx={{
          pl: [3, 4, 5, 6],
          pr: [3, 5, 5, 6],
          pt: [3, 3, 3, 3],
          pb: [3, 3, 3, 3],
          fontSize: [5, 6, 6, 7],
          width: 'fit-content',
          fontFamily: 'heading',
          lineHeight: 'heading',
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          pl: [3, 4, 5, 6],
          pr: [3, 5, 5, 6],
          pt: [0],
          pb: [3, 3, 3, 3],
          mb: [2],
          fontSize: [2, 2, 2, 3],
          fontFamily: 'body',
          lineHeight: 'body',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

const About = ({ showFires }) => {
  if (!showFires)
    return (
      <Wrapper title='Forest offsets over-crediting'>
        This is a public database of improved forest management carbon offset
        projects in California’s cap-and-trade program from our analysis of
        over-crediting. Read our{' '}
        <Link
          target='_blank'
          href='https://carbonplan.org/research/forest-offsets-explainer'
        >
          article
        </Link>{' '}
        or download the data as{' '}
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
      </Wrapper>
    )

  if (showFires)
    return (
      <Wrapper title='Forest offsets burning'>
        This is a public monitor of forest fires affecting forest carbon offset
        projects. <Colors.Red>Live updating for 2022.</Colors.Red>
      </Wrapper>
    )
}

export default About
