import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'

function useSelected(map, selected) {
  const { theme } = useThemeUI()
  const { primary, green } = theme.rawColors

  useEffect(() => {
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
    } else {
      map.setPaintProperty('projects-label', 'text-color', green)
      map.setPaintProperty('projects-fill', 'fill-color', green)
    }
  }, [theme, selected])
}

export default useSelected
