import { makeDbUpdateOrderStatus } from '../../../../src/main/factories'
import { DbUpdateOrderStatus } from '../../../../src/data/usecases'
import { OrderMongoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMongoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbUpdateOrderStatus Factory', () => {
  it('should call OrderMongoRepository', () => {
    makeDbUpdateOrderStatus()
    expect(OrderMongoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbUpdateOrderStatus()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbUpdateOrderStatus)
  })
})
