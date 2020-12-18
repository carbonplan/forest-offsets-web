import { memo, useState, useContext } from 'react'
import { Box, Text, Grid, Badge } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import Expander from './expander'
import Metrics from './metrics'

const Project = ({ data, setSelected }) => {
  const [expanded, setExpanded] = useState(false)
  const { id, name, arbocs, permanence } = data

  const toggle = (e) => {
    setExpanded(!expanded)
  }

  const select = (e) => {
    setSelected(data)
  }

  const unselect = (e) => {
    setSelected(null)
  }

  const Slash = () => (
    <Text
      sx={{
        display: 'inline-block',
        color: 'text',
        mx: [2],
      }}
    >
      /
    </Text>
  )

  const Inline = ({ value, color }) => (
    <Text
      sx={{
        color: color,
        display: 'inline-block',
        fontFamily: 'monospace',
        letterSpacing: 'wide',
        fontSize: [2],
      }}
    >
      {value}
    </Text>
  )

  const Arrow = () => (
    <Text
      onClick={select}
      sx={{
        color: 'secondary',
        display: 'inline-block',
        fontFamily: 'monospace',
        fontSize: [5],
        '&:hover': {
          color: 'primary',
        },
      }}
    >
      ↗
    </Text>
  )

  return (
    <Box
      onClick={toggle}
      onMouseEnter={select}
      onMouseLeave={unselect}
      sx={{
        cursor: 'pointer',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        px: [3],
        py: [3],
        '&:hover > #grid > #box > #expander': {
          fill: 'primary',
          stroke: 'primary',
        },
      }}
    >
      <Grid columns={['1fr 140px']}>
        <Text sx={{ fontSize: [3], lineHeight: 1.2, pb: [1] }}>{name}</Text>
        <Box sx={{ textAlign: 'right', pr: [1], mt: ['-6px'] }}>
          <Badge
            variant='primary'
            sx={{
              color: 'green',
              borderColor: 'green',
            }}
          >
            IFM
          </Badge>
        </Box>
      </Grid>
      <Grid id='grid' columns={['1fr 150px']}>
        <Box>
          <Inline value={id} color='secondary' />
          <Slash />
          <Inline value={arbocs.issuance} color='green' />
          <Slash />
          <Inline value={permanence.mtbs_fire_risk} color='orange' />
        </Box>
        <Box id='box' sx={{ textAlign: 'right', mt: ['-5px'] }}>
          <Expander id='expander' expanded={expanded} />
        </Box>
      </Grid>
      <AnimateHeight
        duration={200}
        height={expanded ? 'auto' : 0}
        easing={'linear'}
      >
        <Box
          sx={{
            opacity: expanded ? 1 : 0,
          }}
        >
          {expanded && (
            <Box>
              <Box>
                <Metrics data={data} />
              </Box>
            </Box>
          )}
        </Box>
      </AnimateHeight>
    </Box>
  )
}

export default memo(Project)
