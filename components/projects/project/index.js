import { memo, useRef, useState, useEffect, useContext } from 'react'
import { Box, Text, Grid } from 'theme-ui'
import { Expander, Tag } from '@carbonplan/components'
import { alpha } from '@theme-ui/color'
import AnimateHeight from 'react-animate-height'
import Metrics from './metrics'

const Project = ({
  data,
  final,
  scrollTo,
  setSelected,
  setZoomTo,
  showFires,
}) => {
  const ref = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const { id, name, location, arbocs, developers, owners, supersection_ids } =
    data

  const scrolled = scrollTo && scrollTo === id && !showFires

  const toggle = (e) => {
    setExpanded(!expanded)
  }

  const select = (e) => {
    setSelected(id)
  }

  const unselect = (e) => {
    setSelected(null)
  }

  const parts = name.split(' ')
  const nameStart = parts.slice(0, parts.length - 1).join(' ')
  const nameEnd = parts.slice(parts.length - 1, parts.length)

  return (
    <Box
      ref={ref}
      onClick={toggle}
      onMouseEnter={select}
      onMouseLeave={unselect}
      id={'project-' + id}
      sx={{
        cursor: 'pointer',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: final ? '0px' : '1px',
        pl: [3, 4, 5, 6],
        pr: [3, 5, 5, 6],
        ml: [-3, 0, 0, 0],
        mr: [-3, 0, 0, 0],
        pb: [3, 4, 4, 4],
        pt: ['13px', '21px', '21px', '21px'],
        bg: scrolled ? alpha('muted', 0.1) : 'transparent',
        transition: 'background-color 0.15s',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover > #grid > #box > #box-2 > #expander': {
            fill: 'primary',
            stroke: 'primary',
          },
          '&:hover > #grid > #tag-container > #tag': {
            color: 'primary',
            borderColor: 'primary',
          },
          '&:hover': {
            bg: alpha('muted', 0.1),
          },
        },
        '@media (hover: none) and (pointer: coarse)': {
          bg: expanded ? alpha('muted', 0.1) : 'transparent',
        },
      }}
    >
      <Grid
        id='grid'
        columns={['1fr 80px', '1fr 60px', '1fr 60px', '1fr 60px']}
      >
        <Box id='box' sx={{ fontSize: [3, 4, 4, 4], lineHeight: 1.15 }}>
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
        <Box id='tag-container' sx={{ textAlign: 'right', mt: ['0px'] }}>
          <Tag
            id='tag'
            variant='primary'
            sx={{
              transition: 'color 0.15s, border 0.15s',
              color: showFires ? 'primary' : scrolled ? 'primary' : 'green',
            }}
          >
            {id}
          </Tag>
        </Box>
      </Grid>
      <Box sx={{ color: 'secondary', mt: [2], fontSize: [2, 2, 2, 3] }}>
        {(developers || owners) && (developers[0] || owners[0])}
        {(developers || owners) && ' / '}
        {location}
      </Box>
      <AnimateHeight
        duration={200}
        height={expanded ? 'auto' : 0}
        easing={'linear'}
      >
        {expanded && (
          <Box>
            <Metrics data={data} setZoomTo={setZoomTo} showFires={showFires} />
          </Box>
        )}
      </AnimateHeight>
    </Box>
  )
}

export default memo(Project)
