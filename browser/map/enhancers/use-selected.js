import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'

function useSelected(map, selected, setSelected) {
  const context = useThemeUI()
  const theme = context.theme

  useEffect(() => {
    if (selected && selected.coordinates.length > 0) {
      console.log(selected.arbId)
      //map.easeTo({center: selected.coordinates, zoom: 9})
      map.setPaintProperty('projects-fill', 'fill-color', [
        'match',
        ['get', 'arb_id'],
        selected.arbId,
        theme.colors.primary,
        theme.colors.green,
      ])
    } else {
      map.setPaintProperty('projects-fill', 'fill-color', theme.colors.green)
    }
  }, [context, selected])
}

export default useSelected
