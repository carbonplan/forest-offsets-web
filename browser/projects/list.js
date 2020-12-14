import { useContext } from 'react'
import { Box } from 'theme-ui'
import Project from './project'
import data from '../data'

const List = ({ filters, setSelected }) => {

  const filter = (d) => {
    if (
      (!filters.acr && d.id.includes('ACR')) ||
      (!filters.car && d.id.includes('CAR'))
    ) { 
      return false
    } else {
      return true
    }
  }
  
  return <Box>
    {
      data
      .filter(filter)
      .map((d, i) => <Project key={d.id} data={d} setSelected={setSelected}></Project>)
    }
  </Box>
}

export default List
