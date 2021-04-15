import { memo, useState, useContext } from 'react'
import { Box, Text, Grid } from 'theme-ui'
import { Expander, Tag } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'
import Metrics from './metrics'

const Project = ({ data, setSelected }) => {
  const [expanded, setExpanded] = useState(false)
  const { id, name, arbocs, developers, owners, supersection_ids } = data

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
        px: [3, 4, 5, 6],
        py: [4],
        '&:hover > #grid > #box > #expander': {
          fill: 'primary',
          stroke: 'primary',
        },
      }}
    >
      <Grid id='grid' columns={['1fr 60px']}>
        <Box
          id='box'
          sx={{ fontSize: [3, 3, 4, 5], lineHeight: 1.15, pb: [1] }}
        >
          {name}&nbsp;
          <Expander
            id='expander'
            value={expanded}
            sx={{
              zIndex: -1,
              position: 'relative',
              top: ['2px', '2px', '1px', '0px'],
            }}
          />
        </Box>
        <Box sx={{ textAlign: 'right', pr: [1], mt: ['0px'] }}>
          <Tag
            variant='primary'
            sx={{
              color: 'green',
            }}
          >
            {id}
          </Tag>
        </Box>
      </Grid>
      <Box sx={{ color: 'secondary', mt: [2], fontSize: [1, 1, 1, 2] }}>
        {developers[0] || owners[0]} / {supersection_ids[0]}
      </Box>
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
              <Metrics data={data} />
            </Box>
          )}
        </Box>
      </AnimateHeight>
    </Box>
  )
}

export default memo(Project)
