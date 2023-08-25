import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Projects from './projects'
import Enhancers from './map/enhancers'
import Minimap from './map/minimap'

const Viewer = ({
  data,
  locations,
  map,
  bounds,
  showFires,
  archive = false,
  showHotspots,
  setShowHotspots,
}) => {
  const [selected, setSelected] = useState(null)
  const [zoomTo, setZoomTo] = useState(null)
  const [zoomToBox, setZoomToBox] = useState(null)
  const [zoomInitialized, setZoomInitialized] = useState(false)
  const [scrollTo, setScrollTo] = useState(null)
  const [tick, setTick] = useState(null)
  const [showMethods, setShowMethods] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const { id, center, zoom } = router.query

    if (map && id && data.filter((d) => d.id === id).length > 0) {
      setZoomTo(id)
      setScrollTo(id)
      setSelected(id)
      setTimeout(() => {
        setSelected(null)
      }, 2000)
    }

    if (map && center && zoom && !zoomInitialized) {
      setZoomToBox({
        center: center.split(',').map((d) => parseFloat(d)),
        zoom: parseFloat(zoom),
      })
    }
  }, [map, router])

  useEffect(() => {
    if (map && zoomToBox) {
      const { center, zoom } = zoomToBox
      map.easeTo({
        center: center,
        zoom: zoom,
        duration: 0,
      })
      setZoomInitialized(true)
      setZoomToBox(null)
    }
  }, [zoomToBox])

  useEffect(() => {
    if (map && zoomTo) {
      const project = data.filter((d) => d.id === zoomTo)[0]
      const { area, shape_centroid } = project
      const center = shape_centroid
      map.easeTo({
        center: center,
        zoom: Math.min(100000 * (1 / area) + 7.5, 9.75),
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
      map.on('moveend', (e) => {
        const { pathname } = router
        const center = map.getCenter()
        const zoom = map.getZoom()
        let suffix = `?center=${center.lng},${center.lat}&zoom=${zoom}`
        router.replace(pathname + suffix, null, {
          scroll: false,
          shallow: true,
        })
      })
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
        showMethods={showMethods}
        setShowMethods={setShowMethods}
        showHotspots={showHotspots}
        setShowHotspots={setShowHotspots}
        archive={archive}
      />
      {map && (
        <Enhancers
          map={map}
          selected={selected}
          showFires={showFires}
          showHotspots={showHotspots}
        />
      )}
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
