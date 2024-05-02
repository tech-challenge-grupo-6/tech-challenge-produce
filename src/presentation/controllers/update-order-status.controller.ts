/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Validation, type Controller, type HttpResponse } from '../../presentation/protocols'
import { serverError, ok, notFound, badRequest } from '../../presentation/helpers'
import { type UpdateOrderStatus } from '../../domain/usecases'
import { type Status } from '../../domain/models'

export class UpdateOrderStatusController implements Controller {
  constructor (
    private readonly _updateOrderStatus: UpdateOrderStatus,
    private readonly _validation: Validation
  ) {}

  async handle (request: UpdateOrderStatusController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const result = await this._updateOrderStatus.update(request)
      if (result === null || result === undefined) {
        return notFound({ message: 'Order not found' })
      }
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateOrderStatusController {
  export type Request = {
    orderId: string
    status: Status
  }
}
