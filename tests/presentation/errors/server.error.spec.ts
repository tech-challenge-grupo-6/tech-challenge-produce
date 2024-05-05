import { ServerError } from '../../../src/presentation/errors'

describe('ServerError', () => {
  it('should be an instance of Error', () => {
    expect(new ServerError('error')).toBeInstanceOf(Error)
  })

  it('should have name = "ServerError"', () => {
    const error = new ServerError('error')
    expect(error.name).toEqual('ServerError')
  })

  it('should have a message "Internal server error"', () => {
    const error = new ServerError('error')
    expect(error.message).toEqual('Internal server error')
  })

  it('should store the stack trace', () => {
    const stack = 'stack_trace'
    const error = new ServerError(stack)
    expect(error.stack).toEqual(stack)
  })
})
