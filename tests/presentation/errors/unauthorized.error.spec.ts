import { UnauthorizedError } from '../../../src/presentation/errors/'

describe('UnauthorizedError', () => {
  it('should be an instance of Error', () => {
    expect(new UnauthorizedError()).toBeInstanceOf(Error)
  })

  it('should have name = "UnauthorizedError"', () => {
    const error = new UnauthorizedError()
    expect(error.name).toEqual('UnauthorizedError')
  })

  it('should have a message "Unauthorized"', () => {
    const error = new UnauthorizedError()
    expect(error.message).toEqual('Unauthorized')
  })
})
