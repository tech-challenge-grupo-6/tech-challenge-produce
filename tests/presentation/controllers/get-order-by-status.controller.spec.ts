import { GetOrderByStatusController } from '../../../src/presentation/controllers'
import { type Validation } from '../../../src/presentation/protocols/validation'
import { InvalidParamError } from '../../../src/presentation/errors'
import { badRequest, serverError } from '../../../src/presentation/helpers/'
import { type LoadOrderByStatus } from '../../../src/domain/usecases'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return {
        message: 'any_error',
        name: 'any_name'
      }
    }
  }
  return new ValidationStub()
}

const makeLoadOrderByStatus = (): LoadOrderByStatus => {
  class LoadOrderByStatusStub implements LoadOrderByStatus {
    async loadByStatus (status: string): Promise<any> {
      return { id: 'any_id' }
    }
  }
  return new LoadOrderByStatusStub()
}
describe('GetOrderByStatusController', () => {
  it('should call Validation with correct values', async () => {
    const validationStub = makeValidation()
    const loadByStatusStub = makeLoadOrderByStatus()
    const sut = new GetOrderByStatusController(loadByStatusStub, validationStub)
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = { status: 'any_status' }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('should return 400 if Validation returns an error', async () => {
    const validationStub = makeValidation()
    const loadByStatusStub = makeLoadOrderByStatus()
    const sut = new GetOrderByStatusController(loadByStatusStub, validationStub)
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamError('status'))
    const httpResponse = await sut.handle({ status: 'invalid_status' })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('status')))
  })

  it('should return 500 if Validation throws', async () => {
    const validationStub = makeValidation()
    const loadByStatusStub = makeLoadOrderByStatus()
    const sut = new GetOrderByStatusController(loadByStatusStub, validationStub)
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ status: 'any_status' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
