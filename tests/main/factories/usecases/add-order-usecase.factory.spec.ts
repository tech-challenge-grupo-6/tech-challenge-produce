import { makeDbAddOrder } from '../../../../src/main/factories'
import { DbAdAddOrder } from '../../../../src/data/usecases'
import { OrderMongoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMongoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbAddOrder Factory', () => {
  it('should call OrderMongoRepository', () => {
    makeDbAddOrder()
    expect(OrderMongoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbAddOrder()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbAdAddOrder)
  })
})