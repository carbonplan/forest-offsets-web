import { useState, useEffect } from 'react'
import { useThemeUI } from 'theme-ui'

function useTheme(map) {
  const { theme } = useThemeUI()
  const { background, muted, primary, green} = theme.colors

  useEffect(() => {
    map.setPaintProperty(
      'background',
      'background-color',
      background
    )
    map.setPaintProperty('background', 'background-opacity', 0)
    map.setPaintProperty('background', 'background-color', muted)
    map.setPaintProperty('land', 'fill-opacity', 0)
    map.setPaintProperty('land', 'fill-color', background)
    map.setPaintProperty('lakes', 'fill-opacity', 0.2)
    map.setPaintProperty('lakes', 'fill-color', muted)
    map.setPaintProperty('countries', 'line-color', primary)
    map.setPaintProperty('countries', 'line-opacity', 1)
    map.setPaintProperty('states', 'line-color', primary)
    map.setPaintProperty('states', 'line-opacity', 0.7)
    map.setPaintProperty('roads', 'line-color', primary)
    map.setPaintProperty('roads', 'line-opacity', 0)
    map.setPaintProperty('projects-fill', 'fill-color', green)
    map.setPaintProperty('projects-fill', 'fill-opacity', 0.5)
    map.setPaintProperty('projects-line', 'line-color', background)
    map.setPaintProperty('projects-line', 'line-opacity', 1)
    map.setPaintProperty('supersections', 'line-color', primary)
    map.setPaintProperty('supersections', 'line-opacity', 0.2)
    map.setPaintProperty('projects-label', 'text-color', green)
    map.setPaintProperty('projects-label', 'text-opacity', 1)
    map.setPaintProperty('projects-center', 'circle-color', green)
    map.setPaintProperty('projects-center', 'circle-opacity', 0)
  }, [theme])
}

export default useTheme
