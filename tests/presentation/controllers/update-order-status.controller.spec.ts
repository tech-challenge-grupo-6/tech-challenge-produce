import { UpdateOrderStatusController } from '../../../src/presentation/controllers'
import { type UpdateOrderStatus } from '../../../src/domain/usecases/update-order-status'
import { badRequest, notFound, ok, serverError } from '../../../src/presentation/helpers/'

const makeUpdateOrderStatus = (): UpdateOrderStatus => {
  class UpdateOrderStatusStub implements UpdateOrderStatus {
    async update (request: UpdateOrderStatusController.Request): Promise<any> {
      return { id: 'any_id' }
    }
  }
  return new UpdateOrderStatusStub()
}

const makeSut = (): UpdateOrderStatusController => {
  const updateOrderStatusStub = makeUpdateOrderStatus()
  return new UpdateOrderStatusController(updateOrderStatusStub)
}

describe('UpdateOrderStatusController', () => {
  it('should return 400 if Validation returns an error', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ status: 'invalid_status' })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('should return 404 if UpdateOrderStatus returns null', async () => {
    const { sut, updateOrderStatusStub } = makeSut()
    jest.spyOn(updateOrderStatusStub, 'update').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ status: 'any_status' })
    expect(httpResponse).toEqual(notFound({ message: 'Order not found' }))
  })

  it('should return 200 if UpdateOrderStatus returns an order', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ status: 'any_status' })
    expect(httpResponse).toEqual(ok({ id: 'any_id' }))
  })

  it('should return 500 if UpdateOrderStatus throws', async () => {
    const { sut, updateOrderStatusStub } = makeSut()
    jest.spyOn(updateOrderStatusStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ status: 'any_status' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
