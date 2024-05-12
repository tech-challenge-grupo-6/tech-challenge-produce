import { makeDbGetOrderById } from '../../../../src/main/factories'
import { DbLoadOrderById } from '../../../../src/data/usecases'
import { OrderMondoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMondoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbGetOrderById Factory', () => {
  it('should call OrderMondoRepository', () => {
    makeDbGetOrderById()
    expect(OrderMondoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbGetOrderById()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbLoadOrderById)
  })
})
