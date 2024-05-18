import { makeStatusValidation } from '../../../../src/main/factories'
import { ValidationComposite, StatusValidation } from '../../../../src/validation/'

jest.mock('../../../../src/validation/', () => ({
  ValidationComposite: jest.fn(),
  StatusValidation: jest.fn()
}))

describe('makeStatusValidation Factory', () => {
  it('should call StatusValidation with correct value', () => {
    makeStatusValidation()
    expect(StatusValidation).toHaveBeenCalledWith('status')
  })

  it('should return a ValidationComposite on success', () => {
    const validationComposite = makeStatusValidation()
    expect(validationComposite).toBeTruthy()
    expect(validationComposite).toBeInstanceOf(ValidationComposite)
  })
})
