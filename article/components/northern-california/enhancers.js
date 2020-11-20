import { useEffect } from 'react'
import useTheme from './use-theme'
import useOptions from './use-options'

export default function Enhancers({ map, options }) {
  useTheme(map)
  useOptions(map, options)
  return null
}
