import Index from '../../article/index.md'
import { withAuth } from '../../lib/auth'

export default withAuth(Index, ['admin', 'collaborator'])
