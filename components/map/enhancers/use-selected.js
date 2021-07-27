import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { mix } from 'polished'

function useSelected(map, selected, showFires) {
  const { theme } = useThemeUI()
  const { primary, background, green } = theme.rawColors

  useEffect(() => {
    if (!showFires) {
      if (selected) {
        map.setPaintProperty('projects-label', 'text-color', [
          'match',
          ['string', ['get', 'id']],
          selected,
          primary,
          green,
        ])
        map.setPaintProperty('projects-fill', 'fill-color', [
          'match',
          ['string', ['get', 'id']],
          selected,
          primary,
          green,
        ])
        map.setPaintProperty('projects-center', 'circle-color', [
          'match',
          ['string', ['get', 'id']],
          selected,
          mix(0.5, primary, background),
          mix(0.5, green, background),
        ])
      } else {
        map.setPaintProperty('projects-label', 'text-color', green)
        map.setPaintProperty('projects-fill', 'fill-color', green)
        map.setPaintProperty(
          'projects-center',
          'circle-color',
          mix(0.5, green, background)
        )
      }
    }
  }, [theme, showFires, selected])
}

export default useSelected
