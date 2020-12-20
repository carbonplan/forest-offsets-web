import { useState, useEffect } from 'react'
import { useThemeUI } from 'theme-ui'

function useTheme(map) {
  const context = useThemeUI()
  const theme = context.theme

  useEffect(() => {
    map.setPaintProperty(
      'background',
      'background-color',
      theme.colors.background
    )
    map.setPaintProperty('background', 'background-opacity', 0)
    map.setPaintProperty('background', 'background-color', theme.colors.muted)
    map.setPaintProperty('land', 'fill-opacity', 0)
    map.setPaintProperty('land', 'fill-color', theme.colors.background)
    map.setPaintProperty('lakes', 'fill-opacity', 0.2)
    map.setPaintProperty('lakes', 'fill-color', theme.colors.muted)
    map.setPaintProperty('countries', 'line-color', theme.colors.primary)
    map.setPaintProperty('countries', 'line-opacity', 1)
    map.setPaintProperty('states', 'line-color', theme.colors.primary)
    map.setPaintProperty('states', 'line-opacity', 0.7)
    map.setPaintProperty('roads', 'line-color', theme.colors.primary)
    map.setPaintProperty('roads', 'line-opacity', 0)
    map.setPaintProperty('projects-fill', 'fill-color', theme.colors.green)
    map.setPaintProperty('projects-fill', 'fill-opacity', 0.5)
    map.setPaintProperty('projects-line', 'line-color', theme.colors.background)
    map.setPaintProperty('projects-line', 'line-opacity', 1)
    map.setPaintProperty('supersections', 'line-color', theme.colors.primary)
    map.setPaintProperty('supersections', 'line-opacity', 0.2)
    map.setPaintProperty('projects-label', 'text-color', theme.colors.green)
    map.setPaintProperty('projects-label', 'text-opacity', 1)
    map.setPaintProperty('projects-center', 'circle-color', theme.colors.green)
    map.setPaintProperty('projects-center', 'circle-opacity', 0)
  }, [context])
}

export default useTheme
