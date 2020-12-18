import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'

function useSelected(map, selected, setSelected) {
  const context = useThemeUI()
  const theme = context.theme

  useEffect(() => {
    if (selected) {
      map.setPaintProperty('projects-label', 'text-color', [
        'match',
        ['get', 'id'],
        selected.id,
        theme.colors.primary,
        theme.colors.green,
      ])
      map.setPaintProperty('projects-fill', 'fill-color', [
        'match',
        ['get', 'id'],
        selected.id,
        theme.colors.primary,
        theme.colors.green,
      ])
    } else {
      map.setPaintProperty('projects-label', 'text-color', theme.colors.green)
      map.setPaintProperty('projects-fill', 'fill-color', theme.colors.green)
    }
  }, [context, selected])
}

export default useSelected
