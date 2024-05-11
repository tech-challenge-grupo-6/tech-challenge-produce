import { GetAllOrdersController } from '../../../src/presentation/controllers'
import { type LoadOrders } from '../../../src/domain/usecases'
import { ok, serverError } from '../../../src/presentation/helpers'

const makeLoadOrders = (): LoadOrders => {
  class LoadOrdersStub implements LoadOrders {
    async loadAll (): Promise<any[]> {
      return [{ id: 'any_id' }]
    }
  }
  return new LoadOrdersStub()
}

describe('GetAllOrders Controller', () => {
  /* it('should return 404 if LoadOrders returns null', async () => {
    const loadOrdersStub = makeLoadOrders()
    const sut = new GetAllOrdersController(loadOrdersStub)
    jest.spyOn(loadOrdersStub, 'loadAll').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(notFound({ message: 'Order not found' }))
  }) */

  it('should return 200 if LoadOrders returns a list of orders', async () => {
    const loadOrdersStub = makeLoadOrders()
    const sut = new GetAllOrdersController(loadOrdersStub)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok([{ id: 'any_id' }]))
  })

  it('should return 500 if LoadOrders throws', async () => {
    const loadOrdersStub = makeLoadOrders()
    const sut = new GetAllOrdersController(loadOrdersStub)
    jest.spyOn(loadOrdersStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
