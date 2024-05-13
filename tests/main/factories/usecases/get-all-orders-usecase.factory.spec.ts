import { makeDbGetAllOrders } from '../../../../src/main/factories'
import { DbLoadOrders } from '../../../../src/data/usecases'
import { OrderMondoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMondoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbGetAllOrders Factory', () => {
  it('should call OrderMondoRepository', () => {
    makeDbGetAllOrders()
    expect(OrderMondoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbGetAllOrders()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbLoadOrders)
  })
})
