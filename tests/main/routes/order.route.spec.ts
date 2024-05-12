import { Router } from 'express'
/* import {
  makeUpdateStatusController,
  makeGetOrderByIdController,
  makeGetAllOrdersController,
  makeGetOrderByStatusController
} from '../../../src/main/factories/controllers' */
import orderRoute from '../../../src/main/routes/order.route'

jest.mock('express', () => ({
  Router: () => ({
    post: jest.fn(),
    get: jest.fn()
  })
}))

jest.mock('../../../src/main/factories/controllers', () => ({
  makeUpdateStatusController: jest.fn(() => () => {}),
  makeGetOrderByIdController: jest.fn(() => () => {}),
  makeGetAllOrdersController: jest.fn(() => () => {}),
  makeGetOrderByStatusController: jest.fn(() => () => {})
}))

describe('Order Route', () => {
  it('should call router.post and router.get with correct values', () => {
    const router = Router()
    orderRoute(router)
    expect(router.post).toHaveBeenCalledTimes(1)
    expect(router.get).toHaveBeenCalledTimes(3)
  })
})
