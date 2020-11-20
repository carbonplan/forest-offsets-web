import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'

function useOptions(map, options) {
  const context = useThemeUI()
  const theme = context.theme

  useEffect(() => {

    const updateLayer = (name) => {
      if (options[name]) {
        map.setPaintProperty(name, 'line-opacity', 1)
      } else {
        map.setPaintProperty(name, 'line-opacity', 0)
      }
    }

    updateLayer('supersections')
    updateLayer('baileys')
  }, [context, options])
}

export default useOptions
