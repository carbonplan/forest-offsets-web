import { useEffect } from 'react'
import useTheme from './use-theme'
import useSelected from './use-selected'
import useFires from './use-fires'
import useRuler from './use-ruler'

export default function Enhancers({ map, selected, fires }) {
  useTheme(map)
  useFires(map, fires)
  useSelected(map, selected, fires)
  useRuler(map, 1)
  return null
}
