/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Controller, type HttpResponse, type Validation } from '../protocols'
import { serverError, ok, notFound, badRequest } from '../helpers'
import { type LoadOrderByStatus } from '../../domain/usecases'
import { getCorrectValueStatus } from '../../common/helpers'

export class GetOrderByStatusController implements Controller {
  constructor (
    private readonly _loadOrderByStatus: LoadOrderByStatus,
    private readonly _validation: Validation
  ) {}

  async handle (request: GetOrderByStatusController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const status = getCorrectValueStatus(request.status)
      const result = await this._loadOrderByStatus.loadByStatus(status)
      if (result === null || result === undefined) {
        return notFound({ message: 'Order not found' })
      }
      return ok(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

export namespace GetOrderByStatusController {
  export type Request = {
    status: string
  }
}
