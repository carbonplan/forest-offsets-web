import { useRef, useEffect } from 'react'
import { useThemeUI, Box, Flex, Button } from 'theme-ui'
import projects from './data/projects'

import * as d3 from 'd3'

const Chart = ({ selected, focused }) => {
  const boxRef = useRef(null)
  const { theme } = useThemeUI()

  const data = projects.features
    .filter((d) => focused.includes(d.properties.id))
    .sort((a, b) => {
      const diff1 = a.geometry.coordinates[1]
      const diff2 = b.geometry.coordinates[1]
      if (diff1 < diff2) {
        return -1
      }
      if (diff1 > diff2) {
        return 1
      }
      return 0
    })
    .map((d, i) => {
      return {
        id: d.properties.id,
        x1: d.properties.common_practice,
        x2: d.properties.bailey,
        y: i,
      }
    })

  useEffect(() => {
    const margin = { top: 10, right: 11, bottom: 10, left: 9 }
    const width = boxRef.current.offsetWidth - margin.left - margin.right
    const height = boxRef.current.offsetHeight - margin.top - margin.bottom

    const svg = d3
      .select(boxRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear().domain([0, 300]).range([0, width])
    const y = d3.scaleLinear().domain([0, data.length]).range([height, 0])

    // svg
    //   .append('path')
    //   .datum([
    //     { x: domain[0], y: 0 },
    //     { x: domain[0] + 3, y: 0 },
    //   ])
    //   .attr('fill', 'none')
    //   .attr('stroke', theme.colors.secondary)
    //   .attr('stroke-width', 1)
    //   .attr('stroke-opacity', 1)
    //   .attr(
    //     'd',
    //     d3
    //       .line()
    //       .x(function (d) {
    //         return x(d.x)
    //       })
    //       .y(function (d) {
    //         return y(d.y)
    //       })
    //   )

    // svg
    //   .append('text')
    //   .attr('transform', `translate(${0 + 20},${height + 5})`)
    //   .style('text-anchor', 'left')
    //   .style('fill', theme.colors.secondary)
    //   .style('font-size', 14)
    //   .style('font-family', theme.fonts.faux)
    //   .text(range[0])

    // svg
    //   .append('path')
    //   .datum([
    //     { x: domain[0], y: range[1] },
    //     { x: domain[0] + 3, y: range[1] },
    //   ])
    //   .attr('fill', 'none')
    //   .attr('stroke', theme.colors.secondary)
    //   .attr('stroke-width', 1)
    //   .attr('stroke-opacity', 1)
    //   .attr(
    //     'd',
    //     d3
    //       .line()
    //       .x(function (d) {
    //         return x(d.x)
    //       })
    //       .y(function (d) {
    //         return y(d.y)
    //       })
    //   )

    // svg
    //   .append('text')
    //   .attr('transform', `translate(${0 + 20},${5})`)
    //   .style('text-anchor', 'left')
    //   .style('fill', theme.colors.secondary)
    //   .style('font-size', 14)
    //   .style('font-family', theme.fonts.faux)
    //   .text(range[1])

    const intervals = data
      .map((d) => {
        return [
          { x: x(d.x1), y: y(d.y), defined: true },
          { x: x(d.x2), y: y(d.y), defined: true },
          { x: x(d.x1), y: y(d.y), defined: false },
        ]
      })
      .flat()

    svg
      .append('path')
      .datum(intervals)
      .attr(
        'd',
        d3
          .line()
          .x((d) => d.x)
          .y((d) => d.y)
          .defined((d) => d.defined)
      )
      .attr('fill', 'none')
      .attr('stroke', theme.colors.primary)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 1)

    svg
      .selectAll('.group1')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x1))
      .attr('cy', (d) => y(d.y))
      .attr('r', 5.5)
      .attr('r', (d) => (d.id == selected ? 10 : 5.5))
      .attr('fill', theme.colors['green'])
      .attr('fill-opacity', 0.5)

    svg
      .selectAll('.group2')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x2))
      .attr('cy', (d) => y(d.y))
      .attr('r', (d) => (d.id == selected ? 10 : 5.5))
      .attr('fill', theme.colors['green'])
      .attr('fill-opacity', 1)

    return function cleanup() {
      boxRef.current.innerHTML = ''
    }
  }, [data, focused, selected, theme])

  return <Box ref={boxRef} sx={{ height: '550px' }} />
}

export default Chart
