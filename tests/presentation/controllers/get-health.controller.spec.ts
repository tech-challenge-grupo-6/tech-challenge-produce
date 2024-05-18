import { GetHealthController } from '../../../src/presentation/controllers'
import { ok } from '../../../src/presentation/helpers'
// import { serverError, ok } from '../../../src/presentation/helpers'
// import { ServerError } from '../../../src/presentation/errors/'

describe('GetHealthController', () => {
  const sut = new GetHealthController()

  it('should return 200 and a message if API is running', async () => {
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok({ message: 'API is running' }))
  })

  /* it('should return server error if an error is thrown', async () => {
    const sut = new GetHealthController()
    jest.spyOn(sut, 'handle').mockImplementationOnce(() => {
      throw new ServerError('eerror')
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new ServerError('eerror')))
  }) */
})
