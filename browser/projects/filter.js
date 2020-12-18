import { useState, useContext } from 'react'
import { Box, Badge, Text, Flex, Slider } from 'theme-ui'
import Option from './option'
import Toggle from './toggle'

const Filter = ({ filters, setFilters }) => {
  const toggle = (value) => {
    setFilters((filters) => {
      return { ...filters, [value]: !filters[value] }
    })
  }

  return (
    <Box sx={{ px: [3], py: [2], pt: [3], pb: [3] }}>
      <Toggle value={filters.updateWithMap} toggle={() => toggle('updateWithMap')}/>
      <Text onClick={() => toggle('updateWithMap')} sx={{
        display: 'inline-block',
        fontFamily: 'monospace',
        letterSpacing: 'wide',
        top: ['-5px'],
        position: 'relative',
        color: filters.updateWithMap ? 'primary' : 'secondary',
        pl: [3],
        cursor: 'pointer',
        transition: '0.15s',
      }}>
        UPDATE WITH MAP
      </Text>
    </Box>
  )
}

export default Filter
