import { useEffect } from 'react'
import useTheme from './use-theme'
import useSelected from './use-selected'

export default function Enhancers({ map, selected, setSelected }) {
  useTheme(map)
  useSelected(map, selected, setSelected)
  return null
}
