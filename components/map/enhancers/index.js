import useTheme from './use-theme'
import useSelected from './use-selected'
import useRuler from './use-ruler'

export default function Enhancers({ map, selected, showFires }) {
  useTheme(map, showFires)
  useSelected(map, selected, showFires)
  useRuler(map, 1)
  return null
}
