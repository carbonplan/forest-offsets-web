import { useState, useContext } from 'react'
import { Box, Badge, Text, Flex, Slider } from 'theme-ui'
import Option from './option'

const Filter = ({ filters, setFilters }) => {


  const toggle = (value) => {
    setFilters((filters) => {
      return { ...filters, [value]: !filters[value]}
    })
  }

  return <Box sx={{px: [4], py: [3]}}>
    <Option value={filters['acr']} display='ACR' toggle={() => {toggle('acr')}} color='primary' />
    <Option value={filters['car']} display='CAR' toggle={() => {toggle('car')}} color='primary' />
    <Option value={filters['vcs']} display='VCS' toggle={() => {toggle('vcs')}} color='primary' />
  </Box>
}

export default Filter