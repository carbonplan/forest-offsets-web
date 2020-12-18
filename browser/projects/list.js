import { useEffect } from 'react'
import { Box } from 'theme-ui'
import Project from './project'
import data from '../data'

const List = ({ bounds, filters, setSelected, setCount }) => {
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
      (d.developers.length > 0 &&
        d.developers[0].toLowerCase().includes(target)) ||
      (d.owners.length > 0 && d.owners[0].toLowerCase().includes(target)) ||
      d.attestor.toLowerCase().includes(target) ||
      d.name.toLowerCase().includes(target)
    )
  }

  const filter = (d) => {
    if (
      (!filters.acr && d.id.includes('ACR')) ||
      (!filters.car && d.id.includes('CAR')) ||
      (filters.updateWithMap &&
        bounds &&
        !inBounds(bounds, d.shape_centroid)) ||
      (filters.search && !inFields(d, filters.search))
    ) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    setCount(data.filter(filter).length)
  }, [bounds, filters])

  return (
    <Box>
      {data.filter(filter).map((d, i) => (
        <Project key={d.id} data={d} setSelected={setSelected}></Project>
      ))}
    </Box>
  )
}

export default List
