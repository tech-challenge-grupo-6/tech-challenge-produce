import { adaptRoute } from '../../main/adapters'
import { makeHealthController } from '../../main/factories'
import { auth } from '../../main/middlewares/auth'

import { type Router } from 'express'

export default (router: Router): void => {
  router.get('/healthcheck', auth, adaptRoute(makeHealthController()))
}
