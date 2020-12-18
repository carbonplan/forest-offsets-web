/** @jsx jsx */
import { useState, useEffect } from 'react'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'
import { scaleOrdinal } from 'd3-scale'
import { ticks } from 'd3-array'
import { jsx, IconButton, useThemeUI } from 'theme-ui'

// ruler modes
const OFF = 0 // show nothing
const AXES = 1 // show axes only

const TICK_SEPARATION = 150 // target distance between ticks
const TICK_SIZE = 6 // tick length
const TICK_MARGIN = 2 // distance between gridlines and tick text

function useRuler(map, mode = AXES) {
  const context = useThemeUI()
  const theme = context.theme

  useEffect(() => {
    if (mode === OFF) {
      return
    }

    let rulerContainer = null
    let setRulerTicks = null

    function addRuler() {
      const mapContainer = map.getContainer()
      const height = mapContainer.offsetHeight
      const width = mapContainer.offsetWidth
      const numXTicks = width / TICK_SEPARATION
      const numYTicks = height / TICK_SEPARATION

      rulerContainer = select(mapContainer)
        .append('svg')
        .classed('ruler', true)
        .attr('width', width)
        .attr('height', height)
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)
        .style('pointer-events', 'none')

      // x-axis
      const gx = rulerContainer
        .append('g')
        .classed('ruler-axis', true)
        .style('font-size', '14px')
        .style('font-family', theme.fonts.faux)

      const xAxis = (g, x) =>
        g
          .call(
            axisBottom(x)
              .tickValues(x.domain())
              .tickFormat((d) => `${d}°`)
              .tickSize(TICK_SIZE)
          )
          .call((g) => g.select('.domain').remove())

      // y-axis
      const gy = rulerContainer
        .append('g')
        .classed('ruler-axis', true)
        .attr('transform', `translate(${width},0)`)
        .style('font-size', '14px')
        .style('font-family', theme.fonts.faux)

      const yAxis = (g, y) =>
        g
          .call(
            axisLeft(y)
              .tickValues(y.domain())
              .tickFormat((d) => `${d}°`)
              .tickSize(TICK_SIZE)
          )
          .call((g) => g.select('.domain').remove())

      setRulerTicks = () => {
        const b = map.getBounds()

        const xDomain = ticks(b.getWest(), b.getEast(), numXTicks)
        const xRange = xDomain.map((lng) => map.project([lng, 0]).x)
        const x = scaleOrdinal().domain(xDomain).range(xRange)

        const yDomain = ticks(b.getNorth(), b.getSouth(), numYTicks)
        const yRange = yDomain.map((lat) => map.project([0, lat]).y)
        const y = scaleOrdinal().domain(yDomain).range(yRange)

        gx.call(xAxis, x)
        gy.call(yAxis, y)
      }

      setRulerTicks()
      map.on('move', setRulerTicks)
    }

    function removeRuler() {
      if (rulerContainer) {
        rulerContainer.remove()
      }
      if (setRulerTicks) {
        map.off('move', setRulerTicks)
      }
    }

    function resetRuler() {
      removeRuler()
      addRuler()
    }

    addRuler()
    map.on('resize', resetRuler)

    return function cleanup() {
      removeRuler()
      map.off('resize', resetRuler)
    }
  }, [mode, theme])
}

export default useRuler