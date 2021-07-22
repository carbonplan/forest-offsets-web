import { useState, useRef, useEffect, useContext } from 'react'
import { Box, Text, Flex, Grid, Input } from 'theme-ui'
import { Row, Column, Badge, Toggle } from '@carbonplan/components'

const Fires = ({ fires, setFires, count, total }) => {

  return (
    <Box sx={{ pl: [3, 4, 5, 6], pr: [3, 5, 5, 6], py: [4], mb: [1] }}>
      <Row columns={[3, 4, 4, 4]}>
        <Column start={[1]} width={[4]}>
          <Flex sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ mt: ['0px'] }}>
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
                SHOW FIRES
              </Box>
              <Toggle
                onClick={() => setFires(prev => !prev)}
                value={fires}
                sx={{ color: 'red', position: 'relative', top: '5px' }}
              />
            </Box>
            <Box
              sx={{ textAlign: 'right', display: 'inline-block' }}
            >
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
                PROJECTS NEAR FIRES
              </Box>
              <Badge
                sx={{
                  color: fires ? 'red' : 'secondary',
                  transition: '0.1s',
                }}
              >
                {String(count).padStart(2, '0')}
              </Badge>
            </Box>
          </Flex>
        </Column>
      </Row>
    </Box>
  )
}

export default Fires
