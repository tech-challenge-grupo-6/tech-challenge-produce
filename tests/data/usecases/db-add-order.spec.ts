import { AdAddOrder } from '../../../src/data/usecases/db-add-order'
import { type AddOrderRepository } from '../../../src/data/protocols/db'
import { type AddOrder } from '../../../src/domain/usecases/add-order'

describe('DbAddOrder', () => {
  test('Should call AddOrderRepository with correct values', async () => {
    class AddOrderRepositoryStub implements AddOrderRepository {
      async add (data: AddOrder.Params): Promise<void> {
        return Promise.resolve()
      }
    }
    const addOrderRepositoryStub = new AddOrderRepositoryStub()
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    const sut = new AdAddOrder(addOrderRepositoryStub)
    const orderData = {
      id: 'any_id',
      status: 'any_status'
    } as any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await sut.add(orderData)
    expect(addSpy).toHaveBeenCalledWith(orderData)
  })
})
