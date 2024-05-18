import { makeDbAddOrder } from '../../../../src/main/factories'
import { DbAdAddOrder } from '../../../../src/data/usecases'
import { OrderMondoRepository } from '../../../../src/infra/db/mongodb/order-mongo-repository'

jest.mock('../../../../src/infra/db/mongodb/order-mongo-repository', () => ({
  OrderMondoRepository: jest.fn().mockImplementation(() => ({
    // Aqui você pode definir os métodos que você quer mockar
  }))
}))

describe('makeDbAddOrder Factory', () => {
  it('should call OrderMondoRepository', () => {
    makeDbAddOrder()
    expect(OrderMondoRepository).toHaveBeenCalled()
  })

  it('should return a usecase on success', () => {
    const usecase = makeDbAddOrder()
    expect(usecase).toBeTruthy()
    expect(usecase).toBeInstanceOf(DbAdAddOrder)
  })
})