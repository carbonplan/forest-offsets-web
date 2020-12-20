/** @jsx jsx */
import { useState } from 'react'
import { jsx, Box, Flex, IconButton } from 'theme-ui'
import Menu from './menu'
import Logo from './logo'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)

  return (
    <Flex
      sx={{
        margin: '0 auto',
        width: '100%',
        justifyContent: 'space-between',
        pt: [3],
        pb: ['14px'],
        pl: [0],
        pr: [3],
        borderStyle: 'solid',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        borderColor: 'muted',
      }}
    >
      <Box
        sx={{
          pl: [3],
        }}
      >
        <Logo></Logo>
      </Box>
      <Box>
        <IconButton
          onClick={toggleMenu}
          sx={{
            cursor: 'pointer',
            fill: 'none',
            strokeWidth: '2px',
            stroke: 'text',
            '.paren': {
              opacity: '0',
            },
            '&:hover .paren': {
              opacity: '1',
            },
          }}
          aria-label='Toggle Menu'
        >
          {!showMenu && (
            <svg
              sx={{
                width: '50px',
                height: '30px',
                transform: 'scale(2)',
                mt: ['-3px'],
              }}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 68 36'
            >
              <line x1='52' y1='29.9' x2='16' y2='29.9' />
              <line x1='52' y1='6.1' x2='16' y2='6.1' />
              <line x1='52' y1='18' x2='16' y2='18' />
              <path
                sx={{ transition: 'all 0.25s' }}
                className='paren'
                d='M6.4,1.2c-6.3,10.3-6.3,23.3,0,33.6'
              />
              <path
                sx={{ transition: 'all 0.25s' }}
                className='paren'
                d='M61.6,34.8c6.3-10.3,6.3-23.3,0-33.6'
              />
            </svg>
          )}
          {showMenu && (
            <svg
              sx={{
                width: '50px',
                height: '30px',
                transform: 'scale(2)',
                mt: ['-3px'],
              }}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 68 36'
            >
              <line x1='50.85' y1='29.79' x2='17.15' y2='6.21' />
              <line x1='17.15' y1='29.79' x2='50.85' y2='6.21' />
              <path
                sx={{ transition: 'all 0.25s' }}
                className='paren'
                d='M6.4,1.2c-6.3,10.3-6.3,23.3,0,33.6'
              />
              <path
                sx={{ transition: 'all 0.25s' }}
                className='paren'
                d='M61.6,34.8c6.3-10.3,6.3-23.3,0-33.6'
              />
            </svg>
          )}
        </IconButton>
      </Box>
      <Menu visible={showMenu} />
    </Flex>
  )
}

export default Header
