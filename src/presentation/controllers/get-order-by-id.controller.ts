/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Controller, type HttpResponse } from '../../presentation/protocols'
import { serverError, ok, notFound } from '../../presentation/helpers'
import { type LoadOrderById } from '../../domain/usecases'

export class GetOrderByIdController implements Controller {
  constructor (
    private readonly _loadOrderById: LoadOrderById
  ) {}

  async handle (request: GetOrderByIdController.Request): Promise<HttpResponse> {
    try {
      const id = request.orderId
      const result = await this._loadOrderById.loadById(id)
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

export namespace GetOrderByIdController {
  export type Request = {
    orderId: string
  }
}
