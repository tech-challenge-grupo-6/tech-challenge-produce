import { makeAuthMiddleware } from '../../../../src/main/factories/middlewares/auth-middleware.factory'
import { AuthMiddleware } from '../../../../src/presentation/middlewares'

jest.mock('../../../../src/presentation/middlewares', () => ({
  AuthMiddleware: jest.fn()
}))

describe('makeAuthMiddleware Factory', () => {
  it('should return a Middleware on success', () => {
    const middleware = makeAuthMiddleware()
    expect(middleware).toBeTruthy()
    expect(middleware).toBeInstanceOf(AuthMiddleware)
  })
})
