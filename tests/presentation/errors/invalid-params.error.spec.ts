import { InvalidParamError } from '../../../src/presentation/errors'

describe('InvalidParamError', () => {
  it('should be an instance of Error', () => {
    const error = new InvalidParamError('exampleParam')
    expect(error).toBeInstanceOf(Error)
  })

  it('should have the correct name', () => {
    const error = new InvalidParamError('exampleParam')
    expect(error.name).toEqual('InvalidParamError')
  })

  it('should have the correct message', () => {
    const paramName = 'exampleParam'
    const error = new InvalidParamError(paramName)
    expect(error.message).toEqual(`Invalid param: ${paramName}`)
  })

  it('should include the parameter name in the message', () => {
    const paramName = 'exampleParam'
    const error = new InvalidParamError(paramName)
    expect(error.message).toContain(paramName)
  })

  it('should have a stack trace', () => {
    const error = new InvalidParamError('exampleParam')
    expect(error.stack).toBeDefined()
  })

  it('should be able to be thrown and caught', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fn = () => {
      throw new InvalidParamError('exampleParam')
    }
    expect(fn).toThrow(InvalidParamError)
  })
})
