import { StatusValidation } from '../../src/validation/'
import { InvalidParamError } from '../../src/presentation/errors'
import { Status } from '../../src/domain/models'

describe('StatusValidation', () => {
  const sut = new StatusValidation('status')

  it('should return an InvalidParamError if validation fails', () => {
    const input = { status: 'invalidStatus' } as any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = sut.validate(input)
    expect(result).toEqual(new InvalidParamError('status'))
  })

  it('should not return if validation succeeds', () => {
    const input = { status: Status.Criado }
    const result = sut.validate(input)
    expect(result).toBeFalsy()
  })
})
