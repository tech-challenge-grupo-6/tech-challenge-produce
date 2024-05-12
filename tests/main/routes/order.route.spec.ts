import { Router } from 'express'
import {
  makeUpdateStatusController,
  makeGetOrderByIdController,
  makeGetAllOrdersController,
  makeGetOrderByStatusController
} from '../../../src/main/factories/controllers'
import { auth } from '../../../src/main/middlewares/auth'
import orderRoute from '../../../src/main/routes/order.route'
import { adaptRoute } from '../../../src/main/adapters'

jest.mock('express', () => ({
  Router: () => ({
    post: jest.fn(),
    get: jest.fn()
  })
}))

jest.mock('.../../../src/main/adapters', () => ({
  adaptRoute: jest.fn()
}))

jest.mock('../../../src/main/middlewares/auth', () => ({
  auth: jest.fn()
}))

jest.mock('../../../src/main/factories/controllers', () => ({
  makeUpdateStatusController: jest.fn(() => () => {}),
  makeGetOrderByIdController: jest.fn(() => () => {}),
  makeGetAllOrdersController: jest.fn(() => () => {}),
  makeGetOrderByStatusController: jest.fn(() => () => {})
}))

describe('Order Route', () => {
  it('should call router.post route with correct values', () => {
    const router = Router()
    orderRoute(router)
    expect(router.post).toHaveBeenCalledWith('/orders/:orderId/status/:status', auth, adaptRoute(makeUpdateStatusController()))
  })

  it('should call router.post with correct values', () => {
    const router = Router()
    orderRoute(router)
    expect(router.get).toHaveBeenCalledWith('/orders/:orderId/', auth, adaptRoute(makeGetOrderByIdController()))
    expect(router.get).toHaveBeenCalledWith('/orders/', auth, adaptRoute(makeGetAllOrdersController()))
    expect(router.get).toHaveBeenCalledWith('/orders/status/:status', auth, adaptRoute(makeGetOrderByStatusController()))
  })
})
