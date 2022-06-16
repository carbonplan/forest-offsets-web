import { useEffect } from 'react'
import useTheme from './use-theme'
import useSelected from './use-selected'
import useFires from './use-fires'
import useRuler from './use-ruler'

export default function Enhancers({ map, selected, showFires }) {
  useTheme(map, showFires)
  useFires(map, showFires)
  useSelected(map, selected, showFires)
  useRuler(map, 1)
  return null
}
