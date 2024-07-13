import { makeDbGetAllOrders } from '../../../../src/main/factories'
import { DbLoadOrders } from '../../../../src/data/usecases'
import { OrderMongoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMongoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbGetAllOrders Factory', () => {
  it('should call OrderMongoRepository', () => {
    makeDbGetAllOrders()
    expect(OrderMongoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbGetAllOrders()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbLoadOrders)
  })
})
