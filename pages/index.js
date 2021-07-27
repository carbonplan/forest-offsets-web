import { Box } from 'theme-ui'
import { Button, Link } from '@carbonplan/components'

function Index() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Link
        sx={{
          display: 'block',
          textDecoration: 'none',
          mt: [-1, -2, -3, -4],
        }}
        href='/research/forest-offsets'
      >
        <Button size='xl' fill='green' label='Go to map' />
      </Link>
    </Box>
  )
}

export default Index
