import { AccessDeniedError } from '../../../src/presentation/errors'

describe('AccessDeniedError', () => {
  it('should be an instance of Error', () => {
    expect(new AccessDeniedError()).toBeInstanceOf(Error)
  })

  it('should have name = "AccessDeniedError"', () => {
    const error = new AccessDeniedError()
    expect(error.name).toEqual('AccessDeniedError')
  })

  it('should have a message "Access denied"', () => {
    const error = new AccessDeniedError()
    expect(error.message).toEqual('Access denied')
  })
})
