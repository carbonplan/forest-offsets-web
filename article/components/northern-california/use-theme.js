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
    map.setPaintProperty('lakes', 'fill-opacity', 0)
    map.setPaintProperty('lakes', 'fill-color', theme.colors.muted)
    map.setPaintProperty('countries', 'line-color', theme.colors.primary)
    map.setPaintProperty('countries', 'line-opacity', 1)
    map.setPaintProperty('states', 'line-color', theme.colors.primary)
    map.setPaintProperty('states', 'line-opacity', 0)
    map.setPaintProperty('roads', 'line-color', theme.colors.primary)
    map.setPaintProperty('roads', 'line-opacity', 0)
    map.setPaintProperty('rivers', 'line-color', theme.colors.muted)
    map.setPaintProperty('rivers', 'line-opacity', 0)
    map.setPaintProperty('places-points', 'circle-color', theme.colors.primary)
    map.setPaintProperty('places-points', 'circle-opacity', 0)
    map.setPaintProperty('places-text', 'text-color', theme.colors.primary)
    map.setPaintProperty('places-text', 'text-opacity', 0)
    map.setPaintProperty('projects', 'circle-color', theme.colors.green)
    map.setPaintProperty('projects', 'circle-opacity', 1)
    map.setPaintProperty('baileys', 'line-color', theme.colors.primary)
    map.setPaintProperty('baileys', 'line-opacity', 0.7)
    map.setPaintProperty('supersections', 'line-color', theme.colors.primary)
    map.setPaintProperty('supersections', 'line-opacity', 0.7)
  }, [context])
}

export default useTheme
