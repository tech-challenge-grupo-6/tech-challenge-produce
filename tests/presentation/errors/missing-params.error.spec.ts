import { MissingParamError } from '../../../src/presentation/errors/'

describe('MissingParamError', () => {
  it('should be an instance of Error', () => {
    const error = new MissingParamError('exampleParam')
    expect(error).toBeInstanceOf(Error)
  })

  it('should have the correct name', () => {
    const error = new MissingParamError('exampleParam')
    expect(error.name).toEqual('MissingParamError')
  })

  it('should have the correct message', () => {
    const paramName = 'exampleParam'
    const error = new MissingParamError(paramName)
    expect(error.message).toEqual(`Missing param: ${paramName}`)
  })

  it('should include the parameter name in the message', () => {
    const paramName = 'exampleParam'
    const error = new MissingParamError(paramName)
    expect(error.message).toContain(paramName)
  })

  it('should have a stack trace', () => {
    const error = new MissingParamError('exampleParam')
    expect(error.stack).toBeDefined()
  })

  it('should be able to be thrown and caught', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fn = () => {
      throw new MissingParamError('exampleParam')
    }
    expect(fn).toThrow(MissingParamError)
  })
})
