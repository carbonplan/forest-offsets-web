import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { mix } from 'polished'

function useFires(map, fires) {
  const { theme } = useThemeUI()
  const { primary, background, green, red } = theme.rawColors

  useEffect(() => {
    if (fires) {
      map.setPaintProperty('fires', 'fill-color', red)
      map.setPaintProperty('fires', 'fill-opacity', 0.7)
      map.setPaintProperty('projects-fill', 'fill-color', primary)
      map.setPaintProperty(
        'projects-center',
        'circle-color',
        mix(0.5, primary, background)
      )
      map.setPaintProperty('projects-label', 'text-color', primary)
    } else {
      map.setPaintProperty('fires', 'fill-color', red)
      map.setPaintProperty('fires', 'fill-opacity', 0)
      map.setPaintProperty('projects-fill', 'fill-color', green)
      map.setPaintProperty('projects-label', 'text-color', green)
      map.setPaintProperty(
        'projects-center',
        'circle-color',
        mix(0.5, green, background)
      )
    }
  }, [map, fires, theme])
}

export default useFires
