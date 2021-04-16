import { memo, useState, useContext } from 'react'
import { Box, Text, Grid } from 'theme-ui'
import { Expander, Tag } from '@carbonplan/components'
import { alpha } from '@theme-ui/color'
import AnimateHeight from 'react-animate-height'
import Metrics from './metrics'
import displayNames from '../../../data/display-names'

const Project = ({ data, setSelected }) => {
  const [expanded, setExpanded] = useState(false)
  const { id, arbocs, developers, owners, supersection_ids } = data

  const toggle = (e) => {
    setExpanded(!expanded)
  }

  const select = (e) => {
    setSelected(data)
  }

  const unselect = (e) => {
    setSelected(null)
  }

  const displayName = displayNames.filter((d) => d.id === id)[0].name
  const parts = displayName.split(' ')
  const nameStart = parts.slice(0, parts.length - 1).join(' ')
  const nameEnd = parts.slice(parts.length - 1, parts.length)

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
        transition: 'background-color 0.15s',
        '&:hover > #grid > #box > #box-2 > #expander': {
          fill: 'primary',
          stroke: 'primary',
        },
        '&:hover' : {
          bg: alpha('muted', 0.1)
        }
      }}
    >
      <Grid id='grid' columns={['1fr 60px']}>
        <Box
          id='box'
          sx={{ fontSize: [3, 4, 4, 5], lineHeight: 1.15, pb: [1] }}
        >
          {nameStart}{' '}
          <Box id='box-2' as='span' sx={{ whiteSpace: 'nowrap' }}>
            {nameEnd}
            <Expander
              id='expander'
              value={expanded}
              sx={{
                zIndex: -1,
                ml: [2],
                position: 'relative',
                top: ['2px', '2px', '1px', '0px'],
              }}
            />
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', mt: ['0px'] }}>
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
      <Box sx={{ color: 'secondary', mt: [2], fontSize: [1, 1, 1, 3] }}>
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
