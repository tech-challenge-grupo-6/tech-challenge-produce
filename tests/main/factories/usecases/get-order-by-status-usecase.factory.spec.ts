import { makeDbGetOrderByStatus } from '../../../../src/main/factories'
import { DbLoadOrderByStatus } from '../../../../src/data/usecases'
import { OrderMondoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMondoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbGetOrderByStatus Factory', () => {
  it('should call OrderMondoRepository', () => {
    makeDbGetOrderByStatus()
    expect(OrderMondoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbGetOrderByStatus()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbLoadOrderByStatus)
  })
})
