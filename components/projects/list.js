import { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import Project from './project'

const List = ({
  data,
  bounds,
  filters,
  scrollTo,
  setSelected,
  setCount,
  setZoomTo,
  showFires,
}) => {
  const [filtered, setFiltered] = useState(data.map((d) => d.id))

  const inBounds = (bounds, point) => {
    if (point.length == 0) return false
    return (
      point[0] > bounds._sw.lng &&
      point[0] < bounds._ne.lng &&
      point[1] > bounds._sw.lat &&
      point[1] < bounds._ne.lat
    )
  }

  const inFields = (d, target) => {
    target = target.toLowerCase()
    return (
      d.id.toLowerCase().includes(target) ||
      (d.developers?.length > 0 &&
        d.developers[0].toLowerCase().includes(target)) ||
      (d.owners?.length > 0 && d.owners[0].toLowerCase().includes(target)) ||
      d.attestor?.toLowerCase().includes(target) ||
      d.name.toLowerCase().includes(target) ||
      d.opr_name?.toLowerCase().includes(target)
    )
  }

  const filter = (d) => {
    if (
      (!filters.acr && d.id.includes('ACR')) ||
      (!filters.car && d.id.includes('CAR')) ||
      (filters.updateWithMap &&
        bounds &&
        !inBounds(bounds, d.shape_centroid)) ||
      (filters.search && !inFields(d, filters.search)) ||
      (showFires ? (d.fire ? false : true) : false)
    ) {
      return false
    } else {
      return true
    }
  }

  const compare = (a, b) => {
    if (a.shape_centroid[1] > b.shape_centroid[1]) {
      return -1
    }
    if (a.shape_centroid[1] < b.shape_centroid[1]) {
      return 1
    }
    return 0
  }

  useEffect(() => {
    setFiltered(data.filter(filter).map((d) => d.id))
  }, [bounds, filters, showFires])

  useEffect(() => {
    setCount(data.filter((d) => filtered.includes(d.id)).length)
  }, [filtered])

  return (
    <Box>
      {data
        .filter((d) => filtered.includes(d.id))
        .sort(compare)
        .map((d, i) => (
          <Project
            key={d.id}
            data={d}
            final={i === filtered.length - 1 && filtered.length > 3}
            scrollTo={scrollTo}
            setSelected={setSelected}
            setZoomTo={setZoomTo}
            showFires={showFires}
          ></Project>
        ))}
    </Box>
  )
}

export default List
