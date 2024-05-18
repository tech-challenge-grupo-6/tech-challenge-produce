import { AuthMiddleware } from '../../../src/presentation/middlewares/auth-middleware'
import { unauthorized, serverError } from '../../../src/presentation/helpers'

jest.mock('aws-sdk', () => ({
  CognitoIdentityServiceProvider: jest.fn(() => ({
    getUser: jest.fn().mockReturnValue({
      promise: jest.fn()
    })
  }))
}))

describe('AuthMiddleware', () => {
  describe('handle', () => {
    it('should return 401 if no authorization token is provided', async () => {
      const authMiddleware = new AuthMiddleware()
      const httpResponse = await authMiddleware.handle({})

      expect(httpResponse).toEqual(unauthorized())
    })

    it('should return 200 with user data if authorization token is provided', async () => {
      const mockUser = {
        UserAttributes: [
          { Name: 'sub', Value: '123' },
          { Name: 'email', Value: 'test@example.com' },
          { Name: 'custom:name', Value: 'Test User' },
          { Name: 'custom:cpf', Value: '1234567890' }
        ]
      }

      // Mocking the behavior of getUser method
      const mockGetUser = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue(mockUser) })

      // Creating an instance of AuthMiddleware with the mocked getUser method
      const authMiddleware = new AuthMiddleware()
      authMiddleware.identityServiceProvider.getUser = mockGetUser

      const httpResponse = await authMiddleware.handle({ authorization: 'mockToken' })

      expect(httpResponse.statusCode).toBe(200)
      expect(httpResponse.body).toHaveProperty('user')
      expect(httpResponse.body.user).toEqual({
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        cpf: '1234567890'
      })
    })

    it('should return 401 if authentication fails', async () => {
      // Mocking the behavior of getUser method
      const mockGetUser = jest.fn().mockReturnValue({ promise: jest.fn().mockRejectedValue({ code: 'NotAuthorizedException' }) })

      // Creating an instance of AuthMiddleware with the mocked getUser method
      const authMiddleware = new AuthMiddleware()
      authMiddleware.identityServiceProvider.getUser = mockGetUser

      const httpResponse = await authMiddleware.handle({ authorization: 'invalidToken' })

      expect(httpResponse).toEqual(unauthorized())
    })

    it('should return 500 if an internal server error occurs', async () => {
      // Mocking the behavior of getUser method
      const mockGetUser = jest.fn().mockReturnValue({ promise: jest.fn().mockRejectedValue(new Error('Internal server error')) })

      // Creating an instance of AuthMiddleware with the mocked getUser method
      const authMiddleware = new AuthMiddleware()
      authMiddleware.identityServiceProvider.getUser = mockGetUser

      const httpResponse = await authMiddleware.handle({ authorization: 'validToken' })

      expect(httpResponse).toEqual(serverError(new Error('Internal server error')))
    })
  })
})
