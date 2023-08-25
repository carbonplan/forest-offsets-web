import useTheme from './use-theme'
import useSelected from './use-selected'
import useRuler from './use-ruler'
import useHotspots from './use-hotspots'

export default function Enhancers({ map, selected, showFires, showHotspots }) {
  useTheme(map, showFires)
  useHotspots(map, showHotspots)
  useSelected(map, selected, showFires)
  useRuler(map, 1)
  return null
}
