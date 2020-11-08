import { Box, Container, Heading, Link } from 'theme-ui'
import { withAuth } from '../lib/auth'
import { default as NextLink } from 'next/link'
import Layout from '../components/layout'

const Index = () => {
  return (
    <Layout hideFooter={true}>
      <Container sx={{ px: [3, 3, 4] }}>
        <Heading sx={{ my: [4, 4, 5], fontSize: [5, 5, 7] }}>
          Forest offsets
          <br />
          retrospective
        </Heading>
        <NextLink href={`/browser`} passHref={true}>
          <Link sx={{ fontSize: [4, 4, 5], display: 'block', mt: [2, 2, 4] }}>
            Browser
          </Link>
        </NextLink>
        <NextLink href={`/article`} passHref={true}>
          <Link sx={{ fontSize: [4, 4, 5], display: 'block', mt: [2, 2, 4] }}>
            Article
          </Link>
        </NextLink>
      </Container>
    </Layout>
  )
}

export default withAuth(Index, ['admin', 'collaborator'])
