import { Box } from 'theme-ui'

const Project = ({ data }) => {
  const { id, arbId } = data
  return <Box>
    {id}
    {arbId}
  </Box>
}

export default Project
