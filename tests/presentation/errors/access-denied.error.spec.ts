import { AccessDeniedError } from '../../../src/presentation/errors'

describe('AccessDeniedError', () => {
  it('should be an instance of Error', () => {
    const error = new AccessDeniedError()
    expect(error).toBeInstanceOf(Error)
  })

  it('should have the correct name', () => {
    const error = new AccessDeniedError()
    expect(error.name).toEqual('AccessDeniedError')
  })

  it('should have the correct message', () => {
    const error = new AccessDeniedError()
    expect(error.message).toEqual('Access denied')
  })

  it('should have a stack trace', () => {
    const error = new AccessDeniedError()
    expect(error.stack).toBeDefined()
  })

  it('should be able to be thrown and caught', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fn = () => {
      throw new AccessDeniedError()
    }
    expect(fn).toThrow(AccessDeniedError)
  })
})
