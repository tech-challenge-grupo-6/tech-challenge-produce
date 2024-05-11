import { GetOrderByIdController } from '../../../src/presentation/controllers'
import { type LoadOrderById } from '../../../src/domain/usecases/load-order-by-id'
import { ok, serverError } from '../../../src/presentation/helpers/'

const makeLoadOrderById = (): LoadOrderById => {
  class LoadOrderByIdStub implements LoadOrderById {
    async loadById (id: string): Promise<any> {
      return { id: 'any_id' }
    }
  }
  return new LoadOrderByIdStub()
}

describe('GetOrderById Controller', () => {
  /* it('should return 404 if LoadOrderById returns null', async () => {
    const loadOrderByIdStub = makeLoadOrderById()
    const sut = new GetOrderByIdController(loadOrderByIdStub)
    jest.spyOn(loadOrderByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ orderId: 'any_id' })
    expect(httpResponse).toEqual(notFound({ message: 'Order not found' }))
  }) */

  it('should return 200 if LoadOrderById returns an order', async () => {
    const loadOrderByIdStub = makeLoadOrderById()
    const sut = new GetOrderByIdController(loadOrderByIdStub)
    const httpResponse = await sut.handle({ orderId: 'any_id' })
    expect(httpResponse).toEqual(ok({ id: 'any_id' }))
  })

  it('should return 500 if LoadOrderById throws', async () => {
    const loadOrderByIdStub = makeLoadOrderById()
    const sut = new GetOrderByIdController(loadOrderByIdStub)
    jest.spyOn(loadOrderByIdStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ orderId: 'any_id' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
