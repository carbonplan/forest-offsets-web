import { useState, useEffect } from 'react'
import Projects from './projects'
import Enhancers from './map/enhancers'
import Minimap from './map/minimap'

const Viewer = ({ data, locations, map, bounds }) => {
  const [selected, setSelected] = useState(null)
  const [zoomTo, setZoomTo] = useState(null)
  const [scrollTo, setScrollTo] = useState(null)
  const [tick, setTick] = useState(null)

  useEffect(() => {
    if (map && zoomTo) {
      map.easeTo({ center: zoomTo.center })
    }
  }, [zoomTo])

  // useEffect(() => {
  //   if (scrollTo) {
  //     console.log('creating timeout')
  //     setTimeout(() => {
  //       console.log('clearing')
  //       setScrollTo(null)
  //     }, 1500)
  //   }
  // }, [scrollTo])

  useEffect(() => {
    if (scrollTo) {
      if (tick) clearTimeout(tick)
      setTick(
        setTimeout(() => {
          setScrollTo(null)
        }, 2000)
      )
    }
  }, [scrollTo])

  useEffect(() => {
    if (map) {
      map.on('mouseover', 'projects-label', (e) => {
        map.getCanvas().style.cursor = 'pointer'
        setSelected(e.features[0].properties.id)
      })
      map.on('mouseleave', 'projects-label', (e) => {
        map.getCanvas().style.cursor = ''
        setSelected(null)
      })
      map.on('click', 'projects-label', (e) => {
        const id = e.features[0].properties.id
        const el = document.getElementById('project-' + id)
        const container = document.getElementById('projects')
        const y0 = container.scrollTop
        const y1 = el.getBoundingClientRect().top
        const y = y0 + y1 - 166
        container.scrollTo({ top: y, behavior: 'smooth' })
        setScrollTo(id)
      })
    }
  }, [map, scrollTo])

  return (
    <>
      <Projects
        data={data}
        bounds={bounds}
        scrollTo={scrollTo}
        setSelected={setSelected}
        setZoomTo={setZoomTo}
      />
      {map && <Enhancers map={map} selected={selected} />}
      <Minimap map={map} locations={locations.features} selected={selected} />
    </>
  )
}

export default Viewer
