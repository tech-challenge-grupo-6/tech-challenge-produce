import { ValidationComposite } from '../../src/validation/'
import { type Validation } from '../../src/presentation/protocols'
import { InvalidParamError } from '../../src/presentation/errors'

type Error = {
  message: string
  name: string
}

class ValidationStub implements Validation {
  validate (input: any): Error {
    return {
      name: 'any_name',
      message: 'any_message'
    }
  }
}

describe('Validation Composite', () => {
  const validationStub = new ValidationStub()
  const sut = new ValidationComposite([validationStub])

  it('should return an error if any validation fails', () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  /* it('should not return if validation succeeds', () => {
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  }) */
})
