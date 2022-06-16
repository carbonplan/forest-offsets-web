import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { mix } from 'polished'

function useFires(map, showFires) {
  const { theme } = useThemeUI()
  const { primary, background, green, red } = theme.rawColors

  useEffect(() => {
    if (showFires) {
      map.setPaintProperty('fires', 'fill-color', red)
      map.setPaintProperty('fires', 'fill-opacity', 0.7)
      map.setPaintProperty('projects-fill', 'fill-color', primary)
      map.setPaintProperty(
        'projects-center',
        'circle-color',
        mix(0.5, primary, background)
      )
      map.setPaintProperty('projects-label', 'text-color', primary)
      map.setPaintProperty('fires-label', 'text-opacity', 1)
    }
  }, [map, showFires, theme])
}

export default useFires
