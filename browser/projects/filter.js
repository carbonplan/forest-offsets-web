import { useState, useContext } from 'react'
import { Box, Badge, Text, Flex, Grid, Input } from 'theme-ui'
import Option from './option'
import Toggle from './toggle'

const Filter = ({ filters, setFilters, count }) => {
  const toggle = (value) => {
    setFilters((filters) => {
      return { ...filters, [value]: !filters[value] }
    })
  }

  const search = (value) => {
    setFilters((filters) => {
      return { ...filters, 'search': value }
    })
  }

  const Count = ({ value }) => {
    return (
      <Box
        sx={{
          display: 'inline-block',
          width: 'fit-content',
          height: '24px',
          borderRadius: '5px',
          backgroundColor: 'muted',
          ml: [2],
          mr: [2],
          textAlign: 'center',
        }}
      >
        <Text
          sx={{
            fontFamily: 'monospace',
            mt: ['0px'],
            px: [1],
            color: 'secondary'
          }}
        >
          {value}
        </Text>
      </Box>
    )
  }

  return (
    <Box sx={{ px: [3], py: [2], pt: [3], pb: [3] }}>
      <Grid gap={['16px 32px']} columns={['250px 1fr 38px']}>
        <Box>
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
            fontSize: [2]
          }}>
            UPDATE WITH MAP
          </Text>
        </Box>
        <Input
          type='text'
          autoFocus='true'
          placeholder='search'
          onChange={(e) => search(e.currentTarget.value)}
          sx={{ 
            fontSize: [2],
            height: '24px',
            pt: [2],
            pb: [3],
            pl: [0],
            pr: [0],
            fontFamily: 'monospace',
            borderRadius: '0px',
            borderStyle: 'solid',
            borderColor: 'muted',
            borderWidth: '0px',
            borderBottomWidth: '1px',
            textAlign: 'right', 
            display: 'inline-block'
          }}
          value={filters.search}
        />
        <Count value={String(count).padStart(2, '0')} />
      </Grid>
      
    </Box>
  )
}

export default Filter
