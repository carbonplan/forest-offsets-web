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
  const [showFires, setShowFires] = useState(null)

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
        zoom: Math.min(100000 * (1 / acreage) + 7.5, 9.75),
        duration: 0,
      })
      setZoomTo(null)
    }
  }, [zoomTo])

  useEffect(() => {
    if (scrollTo && !showFires) {
      const el = document.getElementById('project-' + scrollTo)
      if (el) {
        const container = document.getElementById('projects')
        const y0 = container.scrollTop
        const y1 = el.getBoundingClientRect().top
        const y = y0 + y1 - 167
        container.scrollTo({ top: y, behavior: 'smooth' })
        if (tick) clearTimeout(tick)
        setTick(
          setTimeout(() => {
            setScrollTo(null)
          }, 2000)
        )
      }
    }
  }, [scrollTo])

  const mouseover = (e) => {
    map.getCanvas().style.cursor = 'pointer'
    setSelected(e.features[0].properties.id)
  }

  const mouseleave = (e) => {
    map.getCanvas().style.cursor = ''
    setSelected(null)
  }

  const click = (e) => {
    const id = e.features[0].properties.id
    setScrollTo(id)
  }

  useEffect(() => {
    if (map) {
      if (showFires) {
        map.on('mouseover', 'projects-label', (e) => {
          map.getCanvas().style.cursor = ''
          setSelected(null)
        })
        map.on('mouseleave', 'projects-label', (e) => {
          map.getCanvas().style.cursor = ''
          setSelected(null)
        })
        map.off('click', 'projects-label')
      } else {
        map.on('mouseover', 'projects-label', mouseover)
        map.on('mouseleave', 'projects-label', mouseleave)
        map.on('click', 'projects-label', click)
      }
    }
  }, [map, scrollTo, showFires])

  return (
    <>
      <Projects
        data={data}
        bounds={bounds}
        scrollTo={scrollTo}
        setSelected={setSelected}
        setZoomTo={setZoomTo}
        showFires={showFires}
        setShowFires={setShowFires}
      />
      {map && <Enhancers map={map} selected={selected} showFires={showFires} />}
      <Minimap
        map={map}
        locations={locations.projects.features}
        selected={selected}
        showFires={showFires}
      />
    </>
  )
}

export default Viewer
