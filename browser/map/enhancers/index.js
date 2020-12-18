import { useEffect } from 'react'
import useTheme from './use-theme'
import useSelected from './use-selected'
import useRuler from './use-ruler'

export default function Enhancers({ map, selected, setSelected }) {
  useTheme(map)
  useSelected(map, selected, setSelected)
  useRuler(map, 1)
  return null
}
