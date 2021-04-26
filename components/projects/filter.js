import { useState, useRef, useEffect, useContext } from 'react'
import { Box, Text, Flex, Grid, Input } from 'theme-ui'
import { Row, Column, Badge, Toggle } from '@carbonplan/components'

const Filter = ({ filters, setFilters, count, total }) => {
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
      <Box>
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
            pb: [2],
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
      </Box>
      <Row columns={[3, 4, 4, 4]} sx={{ mt: [1] }}>
        <Column start={[1]} width={[2]} dr={1}>
          <Box
            onClick={() => toggle('updateWithMap')}
            sx={{
              display: 'inline-block',
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
            sx={{ color: 'green', position: 'relative', top: '5px' }}
          />
        </Column>
        <Column start={[3]} width={[2]}>
          <Box sx={{ textAlign: 'right' }}>
            <Box
              sx={{
                display: 'inline-block',
                fontFamily: 'mono',
                fontSize: [1, 1, 1, 2],
                letterSpacing: 'mono',
                textTransform: 'uppercase',
                color: 'secondary',
                mr: [3],
                mt: ['6px'],
              }}
            >
              COUNT
            </Box>
            <Badge sx={{ color: count < total ? 'green' : 'secondary', transition: '0.1s'}}>
              {String(count).padStart(2, '0')}
            </Badge>
            <Box sx={{ display: 'inline-block', mx: [2], color: 'secondary' }}>
              /
            </Box>
            <Badge sx={{ color: 'secondary' }}>{total}</Badge>
          </Box>
        </Column>
      </Row>
    </Box>
  )
}

export default Filter
