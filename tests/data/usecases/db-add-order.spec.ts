import { DbAdAddOrder } from '../../../src/data/usecases/db-add-order'
import { AddOrder } from '../../../src/domain/usecases'
import { Status } from '../../../src/domain/models'

describe('DbAdAddOrder', () => {
  test('Should call AddOrderRepository with correct values', async () => {
    const addOrderRepositoryStub = {
      add: jest.fn().mockReturnValueOnce(Promise.resolve({} as AddOrder.Params))
    }
    const sut = new DbAdAddOrder(addOrderRepositoryStub)
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    const orderData = {
      order_id: 'any_order_id',
      status: Status.Criado
    }
    await sut.add(orderData)
    expect(addSpy).toHaveBeenCalledWith(orderData)
  })
})