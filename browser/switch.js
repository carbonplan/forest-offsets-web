/** @jsx jsx */
import { jsx, IconButton, useColorMode } from 'theme-ui'
import { useCallback } from 'react'

const Switch = (props) => {
  const [colorMode, setColorMode] = useColorMode()

  const toggle = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }, [colorMode])

  return (
    <IconButton aria-label='Toggle dark mode' onClick={toggle}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        strokeWidth='2'
        fill='none'
      >
        <circle cx='12' cy='12' r='4.77' />
        <line x1='12' x2='12' y2='4.06' />
        <line x1='12' y1='19.94' x2='12' y2='24' />
        <line x1='20.49' y1='3.51' x2='17.61' y2='6.39' />
        <line x1='6.39' y1='17.61' x2='3.51' y2='20.49' />
        <line x1='20.49' y1='20.49' x2='17.61' y2='17.61' />
        <line x1='6.39' y1='6.39' x2='3.51' y2='3.51' />
        <line x1='24' y1='12' x2='19.94' y2='12' />
        <line x1='4.06' y1='12' y2='12' />
      </svg>
    </IconButton>
  )
}

export default Switch