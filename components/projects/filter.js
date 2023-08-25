import { useState, useRef, useEffect, useContext } from 'react'
import { Box, Text, Flex, Grid, Input } from 'theme-ui'
import { Row, Column, Badge, Toggle } from '@carbonplan/components'

const Filter = ({
  filters,
  setFilters,
  count,
  total,
  showFires,
  archive,
  showHotspots,
  setShowHotspots,
}) => {
  const [value, setValue] = useState('')
  const [hasFocus, setFocus] = useState(false)
  const inputRef = useRef(null)

  const hotspotsToggle = showFires && !archive
  let toggleColor = 'green'
  if (hotspotsToggle) {
    toggleColor = 'orange'
  } else if (showFires) {
    toggleColor = 'primary'
  }

  useEffect(() => {
    function handler(event) {
      const { key, keyCode, metaKey } = event
      if (key === '/' && metaKey) {
        if (!hasFocus) inputRef.current.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const toggle = (value) => {
    setFilters((filters) => {
      return { ...filters, [value]: !filters[value] }
    })
  }

  const search = (value) => {
    setFilters((filters) => {
      return { ...filters, search: value }
    })
  }

  return (
    <Box sx={{ pl: [3, 4, 5, 6], pr: [3, 5, 5, 6], py: [4], mb: [1] }}>
      <Box
        sx={{
          display: 'inline-block',
          fontFamily: 'mono',
          fontSize: [1, 1, 1, 2],
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          color: 'secondary',
        }}
      >
        Search
      </Box>
      <Input
        type='text'
        ref={inputRef}
        placeholder='enter ID or name'
        onChange={(e) => {
          setValue(e.currentTarget.value)
          search(e.currentTarget.value)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        sx={{
          fontSize: [1, 1, 1, 2],
          height: '24px',
          pt: [0],
          pb: [0],
          pl: [0],
          pr: [0],
          ml: [3],
          width: '150px',
          fontFamily: 'mono',
          borderRadius: '0px',
          borderWidth: '0px',
          textAlign: 'left',
          display: 'inline-block',
          ':focus-visible': {
            outline: 'none !important',
            background: 'none !important',
          },
        }}
        value={value}
      />

      <Flex
        sx={{
          width: '100%',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Flex sx={{ mt: [2], minWidth: '200px' }}>
          <Box
            onClick={() => toggle('updateWithMap')}
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              position: 'relative',
              fontSize: [1, 1, 1, 2],
              color: 'secondary',
              pl: [0],
              pr: [3],
              cursor: 'pointer',
              transition: '0.15s',
              mt: [2],
            }}
          >
            {hotspotsToggle ? 'SHOW THERMAL HOTSPOTS' : 'UPDATE W/ MAP'}
          </Box>
          <Toggle
            onClick={() =>
              hotspotsToggle
                ? setShowHotspots(!showHotspots)
                : toggle('updateWithMap')
            }
            value={hotspotsToggle ? showHotspots : filters.updateWithMap}
            sx={{
              color: toggleColor,
              position: 'relative',
              top: '5px',
            }}
          />
        </Flex>
        <Flex sx={{ mt: [2] }}>
          <Box
            sx={{
              textAlign: 'right',
              float: 'right',
              display: 'inline-block',
              mt: ['1px'],
            }}
          >
            <Badge
              sx={{
                color: showFires
                  ? 'red'
                  : filters.updateWithMap || filters.search !== ''
                  ? 'green'
                  : 'secondary',
                transition: '0.1s',
              }}
            >
              {String(count).padStart(2, '0')}
            </Badge>
            <Box sx={{ display: 'inline-block', mx: [2], color: 'secondary' }}>
              /
            </Box>
            <Badge sx={{ color: 'secondary' }}>{total}</Badge>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Filter
