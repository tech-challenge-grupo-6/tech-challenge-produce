import { adaptRoute } from '../../main/adapters'
import { makeHealthController } from '../../main/factories'

import { type Router } from 'express'

export default (router: Router): void => {
  router.get('/healthcheck', adaptRoute(makeHealthController()))
}
