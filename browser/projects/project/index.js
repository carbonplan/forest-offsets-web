import { memo, useState, useContext } from 'react'
import { Box, Text, Grid, Badge } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import Expander from './expander'
import Metrics from './metrics'

const Project = ({ data, setSelected }) => {
  const [expanded, setExpanded] = useState(false)
  const { id, name, arbocsReceived, bufferContribution  } = data

  const toggle = (e) => {
    setExpanded(!expanded)
  }

  const select = (e) => {
    e.stopPropagation()
    setSelected(data)
  }

  const Slash = () => <Text sx={{
      display: 'inline-block',
      color: 'text',
      mx: [2]
    }}>
    /
  </Text>

  const Inline = ({value, color}) => <Text sx={{
    color: color,
    display: 'inline-block',
    fontFamily: 'monospace',
    letterSpacing: 'wide',
    fontSize: [2]
  }}>
    {value}
  </Text>

  const Arrow = () => <Text 
    onClick={select}
    sx={{
      color: 'secondary',
      display: 'inline-block',
      fontFamily: 'monospace',
      fontSize: [5],
      '&:hover' : {
        color: 'primary'
      }
    }}>↗
  </Text>

  return <Box onClick={toggle} sx={{
    cursor: 'pointer',
    borderStyle: 'solid',
    borderColor: 'muted',
    borderWidth: '0px',
    borderBottomWidth: '1px',
    px: [4],
    py: [4],
    '&:hover > #grid > #box > #expander': {
      fill: 'primary',
      stroke: 'primary',
    },
  }}>
    <Grid columns={['1fr 140px']}>
      <Text sx={{fontSize: [4], lineHeight: 1.2, mb: [3]}}>
        {name}
      </Text>
      <Box sx={{textAlign: 'right', pr: [1]}}>
        <Badge variant='primary' sx={{
          color: 'green', 
          borderColor: 'green',
        }}>
          IFM
        </Badge>
      </Box>
    </Grid>
    <Grid id='grid' columns={['1fr 150px']}>
      <Box>
        <Inline value={id} color='secondary'/>
        <Slash/>
        <Inline value={arbocsReceived} color='green'/>
        <Slash/>
        <Inline value={bufferContribution} color='orange'/>
      </Box>
      <Box id='box' sx={{textAlign: 'right', mt: ['-6px']}}>
        <Expander id='expander' expanded={expanded}/>
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
      {expanded && 
        <Box>
          <Box>
            <Metrics data={data}/>
          </Box>
          <Arrow/>
        </Box>
      }
    </Box>
    </AnimateHeight>
  </Box>
}

export default memo(Project)
