import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { mix } from 'polished'

function useSelected(map, selected, fires) {
  const { theme } = useThemeUI()
  const { primary, background, green } = theme.rawColors

  useEffect(() => {
    if (!fires) {
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
          primary,
          mix(0.6, green, background),
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
  }, [theme, fires, selected])
}

export default useSelected
