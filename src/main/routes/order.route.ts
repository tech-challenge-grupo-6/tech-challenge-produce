import { adaptRoute } from '../../main/adapters'
import {
  makeUpdateStatusController,
  makeGetOrderByIdController,
  makeGetAllOrdersController,
  makeGetOrderByStatusController
} from '../../main/factories'
import { auth } from '../../main/middlewares/auth'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/orders/:orderId/status/:status', auth, adaptRoute(makeUpdateStatusController()))
  router.get('/orders/:orderId/', auth, adaptRoute(makeGetOrderByIdController()))
  router.get('/orders/', auth, adaptRoute(makeGetAllOrdersController()))
  router.get('/orders/status/:status', auth, adaptRoute(makeGetOrderByStatusController()))
}
