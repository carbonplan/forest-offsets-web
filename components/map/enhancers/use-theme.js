import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { mix } from 'polished'

function useTheme(map, showFires) {
  const { theme } = useThemeUI()
  const { background, muted, red, primary, green } = theme.rawColors

  useEffect(() => {
    // Only try to update colors when style is fully loaded.
    // In the event of a race condition on initial load, this color update would be a no-op anyway.
    if (map.isStyleLoaded()) {
      map.setPaintProperty('background', 'background-color', muted)
      map.setPaintProperty('land', 'fill-color', background)
      map.setPaintProperty('lakes', 'fill-color', muted)
      map.setPaintProperty('countries', 'line-color', primary)
      map.setPaintProperty('states', 'line-color', primary)
      map.setPaintProperty('projects-line', 'line-color', background)
      map.setPaintProperty('supersections', 'line-color', primary)
      map.setPaintProperty('places-points', 'circle-color', primary)
      map.setPaintProperty('places-text', 'text-color', primary)
      map.setPaintProperty('projects-label', 'text-halo-color', background)
      if (showFires) {
        map.setPaintProperty('fires-label', 'text-halo-color', background)
        map.setPaintProperty('fires', 'fill-color', red)
        map.setPaintProperty('projects-fill', 'fill-color', primary)
        map.setPaintProperty(
          'projects-center',
          'circle-color',
          mix(0.5, primary, background)
        )
        map.setPaintProperty('projects-label', 'text-color', primary)
      } else {
        map.setPaintProperty('projects-fill', 'fill-color', green)
        map.setPaintProperty(
          'projects-center',
          'circle-color',
          mix(0.5, green, background)
        )
        map.setPaintProperty('projects-label', 'text-color', green)
      }
    }
  }, [theme, showFires])
}

export default useTheme
