import Index from '../../browser/index.js'
import { withAuth } from '../../lib/auth'

export default withAuth(Index, ['admin', 'collaborator'])
