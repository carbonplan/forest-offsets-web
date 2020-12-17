import { useContext } from 'react'
import { Box } from 'theme-ui'
import Project from './project'
import data from '../data'

const List = ({ bounds, filters, setSelected }) => {
  const inBounds = (bounds, point) => {
    if (point.length == 0) return false
    return (
      point[0] > bounds._sw.lng &&
      point[0] < bounds._ne.lng &&
      point[1] > bounds._sw.lat &&
      point[1] < bounds._ne.lat
    )
  }

  const filter = (d) => {
    if (
      (!filters.acr && d.id.includes('ACR')) ||
      (!filters.car && d.id.includes('CAR')) ||
      (bounds && !inBounds(bounds, d.coordinates))
    ) {
      return false
    } else {
      return true
    }
  }

  return (
    <Box>
      {data.filter(filter).map((d, i) => (
        <Project key={d.id} data={d} setSelected={setSelected}></Project>
      ))}
    </Box>
  )
}

export default List
