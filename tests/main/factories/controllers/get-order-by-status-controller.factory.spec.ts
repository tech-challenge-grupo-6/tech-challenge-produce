import { makeGetOrderByStatusController } from '../../../../src/main/factories/controllers/get-order-by-status-controller.factory'
import { GetOrderByStatusController } from '../../../../src/presentation/controllers/get-order-by-status.controller'
import { makeDbGetOrderByStatus } from '../../../../src/main/factories/usecases/get-order-by-status-usecase.factory'
import { makeStatusValidation } from '../../../../src/main/factories/controllers/status-validation.factory'

jest.mock('.../../../../src/presentation/controllers/get-order-by-status.controller', () => ({
  GetOrderByStatusController: jest.fn()
}))

jest.mock('../../../../src/main/factories/usecases/get-order-by-status-usecase.factory', () => ({
  makeDbGetOrderByStatus: jest.fn()
}))

jest.mock('../../../../src/main/factories/controllers/status-validation.factory', () => ({
  makeStatusValidation: jest.fn()
}))

describe('makeGetOrderByStatusController Factory', () => {
  it('should call GetOrderByStatusController with correct values', () => {
    makeGetOrderByStatusController()
    expect(GetOrderByStatusController).toHaveBeenCalledWith(makeDbGetOrderByStatus(), makeStatusValidation())
  })

  it('should return a controller on success', () => {
    const controller = makeGetOrderByStatusController()
    expect(controller).toBeTruthy()
    expect(controller).toBeInstanceOf(GetOrderByStatusController)
  })
})
