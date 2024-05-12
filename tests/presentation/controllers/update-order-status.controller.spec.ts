import { UpdateOrderStatusController } from '../../../src/presentation/controllers/update-order-status.controller'

jest.mock('../../../src/presentation/helpers', () => ({
  serverError: jest.fn(),
  ok: jest.fn(),
  notFound: jest.fn(),
  badRequest: jest.fn()
}))

jest.mock('../../../src/common/helpers', () => ({
  getCorrectValueStatus: jest.fn()
}))

jest.mock('../../../src/infra/http-client/axios', () => ({
  AxiosHttpClient: jest.fn()
}))

describe('UpdateOrderStatusController', () => {
  it('should call UpdateOrderStatus with correct values', async () => {
    const updateOrderStatusStub = {
      update: jest.fn()
    }
    const validationStub = {
      validate: jest.fn()
    }
    const axiosClientStub = {
      get: jest.fn()
    }
    const sut = new UpdateOrderStatusController(updateOrderStatusStub, validationStub, axiosClientStub)
    const params = {
      orderId: 'any_id',
      status: 'Criado'
    } as any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await sut.handle(params)
    expect(updateOrderStatusStub.update).toHaveBeenCalledWith(params)
  })

  // Add more test cases for different scenarios
})
