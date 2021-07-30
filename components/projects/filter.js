import { useState, useRef, useEffect, useContext } from 'react'
import { Box, Text, Flex, Grid, Input } from 'theme-ui'
import { Row, Column, Badge, Toggle } from '@carbonplan/components'

const Filter = ({
  filters,
  setFilters,
  count,
  total,
  setShowFires,
  showFires,
}) => {
  const [value, setValue] = useState('')
  const [hasFocus, setFocus] = useState(false)
  const inputRef = useRef(null)

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
          width: ['130px', '130px', '150px', '150px'],
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
      <Row columns={[4]} sx={{ mt: [3] }}>
        <Column start={[1]} width={[2]}>
          <Box
            onClick={() => toggle('updateWithMap')}
            sx={{
              display: ['block', 'block', 'block', 'inline-block'],
              fontFamily: 'mono',
              letterSpacing: 'mono',
              position: 'relative',
              fontSize: [1, 1, 1, 2],
              color: 'secondary',
              pl: [0],
              pr: [3],
              cursor: 'pointer',
              transition: '0.15s',
            }}
          >
            UPDATE W/ MAP
          </Box>
          <Toggle
            onClick={() => toggle('updateWithMap')}
            value={filters.updateWithMap}
            toggle={() => toggle('updateWithMap')}
            sx={{
              color: showFires ? 'primary' : 'green',
              position: 'relative',
              top: '5px',
            }}
          />
        </Column>
        <Column start={[3]} width={[2]}>
          <Box sx={{ textAlign: 'right' }}>
            <Box
              onClick={() => toggle('updateWithMap')}
              sx={{
                display: ['block', 'block', 'block', 'inline-block'],
                fontFamily: 'mono',
                letterSpacing: 'mono',
                position: 'relative',
                fontSize: [1, 1, 1, 2],
                color: 'secondary',
                pl: [0],
                pr: [0, 0, 0, 3],
                cursor: 'pointer',
                transition: '0.15s',
              }}
            >
              W/ FIRES
            </Box>
            <Toggle
              onClick={() => setShowFires((prev) => !prev)}
              value={showFires}
              sx={{ color: 'red', position: 'relative', top: '5px' }}
            />
          </Box>
        </Column>
      </Row>
    </Box>
  )
}

export default Filter
