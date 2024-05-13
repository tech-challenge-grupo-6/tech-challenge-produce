import { makeGetOrderByIdController } from '../../../../src/main/factories'
import { GetOrderByIdController } from '../../../../src/presentation/controllers'
import { makeDbGetOrderById } from '../../../../src/main/factories/usecases'

jest.mock('../../../../src/presentation/controllers', () => ({
  GetOrderByIdController: jest.fn()
}))

jest.mock('../../../../src/main/factories/usecases', () => ({
  makeDbGetOrderById: jest.fn()
}))

describe('makeGetOrderByIdController Factory', () => {
  it('should call GetOrderByIdController with correct values', () => {
    makeGetOrderByIdController()
    expect(GetOrderByIdController).toHaveBeenCalledWith(makeDbGetOrderById())
  })

  it('should return a controller on success', () => {
    const controller = makeGetOrderByIdController()
    expect(controller).toBeTruthy()
    expect(controller).toBeInstanceOf(GetOrderByIdController)
  })
})
