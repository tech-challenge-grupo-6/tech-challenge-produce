import { ValidationComposite, StatusValidation } from '../../../validation/'
import { type Validation } from '../../../presentation/protocols'

export const makeStatusValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new StatusValidation('status'))
  return new ValidationComposite(validations)
}
