import { MissingParamError } from '../../../src/presentation/errors/'

describe('MissingParamError', () => {
  it('should be an instance of Error', () => {
    expect(new MissingParamError('param')).toBeInstanceOf(Error)
  })

  it('should have name = "MissingParamError"', () => {
    const error = new MissingParamError('param')
    expect(error.name).toEqual('MissingParamError')
  })

  it('should have a message indicating the missing param', () => {
    const error = new MissingParamError('param')
    expect(error.message).toEqual('Missing param: param')
  })
})
