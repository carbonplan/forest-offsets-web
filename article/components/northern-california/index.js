import { Box, Divider } from 'theme-ui'
import Region from './region'

const Index = () => {
  return <Box
      sx={{
        mt: [5],
        mb: [5],
        position: 'relative',
        width: ['90%', '90%', '650px'],
      }}
    >
      <Divider />
      <Region />
      <Divider />
    </Box>
}

export default Index