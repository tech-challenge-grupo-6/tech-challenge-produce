import { type Validation } from '../presentation/protocols'
import { InvalidParamError } from '../presentation/errors'
import { Status } from '../domain/models'

export class StatusValidation implements Validation {
  constructor (
    private readonly _status: string
  ) {}

  validate (input: Record<string, Status>): any {
    const inputValueLowercase = input[this._status].toLowerCase()
    const statusValuesLowercase = Object.values(Status).map(status => status.toLowerCase())
    if (!statusValuesLowercase.includes(inputValueLowercase)) {
      return new InvalidParamError(this._status)
    }
  }
}
