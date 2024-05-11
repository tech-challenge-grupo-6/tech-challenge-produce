import { adaptRoute } from '../../main/adapters'
import {
  makeUpdateStatusController,
  makeGetOrderByIdController,
  makeGetAllOrdersController,
  makeGetOrderByStatusController
} from '../../main/factories'
// import { auth } from '../../main/middlewares/auth'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/orders/:orderId/status/:status', adaptRoute(makeUpdateStatusController()))
  router.get('/orders/:orderId/', adaptRoute(makeGetOrderByIdController()))
  router.get('/orders/', adaptRoute(makeGetAllOrdersController()))
  router.get('/orders/status/:status', adaptRoute(makeGetOrderByStatusController()))
}
