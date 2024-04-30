/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Controller, type HttpResponse } from '../../presentation/protocols'
import { serverError, ok } from '../../presentation/helpers'
import { type UpdateOrderStatus } from '../../domain/usecases'
import { type Status } from '../../domain/models'

export class UpdateOrderStatusController implements Controller {
  constructor (
    private readonly _updateOrderStatus: UpdateOrderStatus
  ) {}

  async handle (request: UpdateOrderStatusController.Request): Promise<HttpResponse> {
    try {
      const result = await this._updateOrderStatus.update(request)
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
