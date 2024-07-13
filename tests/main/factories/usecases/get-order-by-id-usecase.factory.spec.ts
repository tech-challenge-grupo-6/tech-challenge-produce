import { makeDbGetOrderById } from '../../../../src/main/factories'
import { DbLoadOrderById } from '../../../../src/data/usecases'
import { OrderMongoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMongoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbGetOrderById Factory', () => {
  it('should call OrderMongoRepository', () => {
    makeDbGetOrderById()
    expect(OrderMongoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbGetOrderById()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbLoadOrderById)
  })
})
