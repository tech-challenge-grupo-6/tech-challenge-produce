import { UpdateOrderStatusController } from '../../../../src/presentation/controllers/update-order-status.controller'
import { makeUpdateStatusController, makeStatusValidation } from '../../../../src/main/factories/controllers'
import { makeDbUpdateOrderStatus } from '../../../../src/main/factories/usecases/update-order-status-usecase.factory'
import { makeAxiosHttpClient } from '../../../../src/main/factories/gateways/axios-client'

jest.mock('../../../../src/presentation/controllers/update-order-status.controller', () => ({
  UpdateOrderStatusController: jest.fn()
}))

jest.mock('../../../../src/main/factories/usecases/update-order-status-usecase.factory', () => ({
  makeDbUpdateOrderStatus: jest.fn()
}))

jest.mock('../../../../src/main/factories/controllers/status-validation.factory', () => ({
  makeStatusValidation: jest.fn()
}))

jest.mock('../../../../src/main/factories/gateways/axios-client', () => ({
  makeAxiosHttpClient: jest.fn()
}))

describe('makeUpdateStatusController Factory', () => {
  it('should call UpdateOrderStatusController with correct values', () => {
    makeUpdateStatusController()
    expect(UpdateOrderStatusController).toHaveBeenCalledWith(
      makeDbUpdateOrderStatus(),
      makeStatusValidation(),
      makeAxiosHttpClient()
    )
  })

  it('should return a controller on success', () => {
    const controller = makeUpdateStatusController()
    expect(controller).toBeTruthy()
    expect(controller).toBeInstanceOf(UpdateOrderStatusController)
  })
})
