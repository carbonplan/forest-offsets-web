import { Box } from 'theme-ui'
import Project from './project'
import data from '../data'

const List = () => {
  return <Box>
    {data.map((d, i) => <Project key={i} data={d}></Project>)}
  </Box>
}

export default List
