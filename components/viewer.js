import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Projects from './projects'
import Enhancers from './map/enhancers'
import Minimap from './map/minimap'

const Viewer = ({ data, locations, map, bounds }) => {
  const [selected, setSelected] = useState(null)
  const [zoomTo, setZoomTo] = useState(null)
  const [scrollTo, setScrollTo] = useState(null)
  const [tick, setTick] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    if (map && id && data.filter((d) => d.id === id).length > 0) {
      setZoomTo(id)
      setScrollTo(id)
      setSelected(id)
      setTimeout(() => {
        setSelected(null)
      }, 2000)
    }
  }, [map, router])

  useEffect(() => {
    if (map && zoomTo) {
      const project = data.filter((d) => d.id === zoomTo)[0]
      const { acreage, shape_centroid } = project
      const center = shape_centroid[0]
      map.easeTo({
        center: center,
        zoom: 100000 * (1 / acreage) + 7.5,
        duration: 0,
      })
    }
  }, [zoomTo])

  useEffect(() => {
    if (scrollTo) {
      const el = document.getElementById('project-' + scrollTo)
      const container = document.getElementById('projects')
      const y0 = container.scrollTop
      const y1 = el.getBoundingClientRect().top
      const y = y0 + y1 - 166
      container.scrollTo({ top: y, behavior: 'smooth' })
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
