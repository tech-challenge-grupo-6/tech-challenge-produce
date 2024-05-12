import { makeGetAllOrdersController } from '../../../../src/main/factories/controllers/'
import { GetAllOrdersController } from '../../../../src/presentation/controllers'
import { makeDbGetAllOrders } from '../../../../src/main/factories/usecases'

jest.mock('../../../../src/presentation/controllers', () => ({
  GetAllOrdersController: jest.fn()
}))

jest.mock('../../../../src/main/factories/usecases', () => ({
  makeDbGetAllOrders: jest.fn()
}))

describe('makeGetAllOrdersController Factory', () => {
  it('should call GetAllOrdersController with correct values', () => {
    makeGetAllOrdersController()
    expect(GetAllOrdersController).toHaveBeenCalledWith(makeDbGetAllOrders())
  })

  it('should return a controller on success', () => {
    const controller = makeGetAllOrdersController()
    expect(controller).toBeTruthy()
    expect(controller).toBeInstanceOf(GetAllOrdersController)
  })
})
