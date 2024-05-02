/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Controller, type HttpResponse } from '../protocols'
import { serverError, ok, notFound } from '../helpers'
import { type LoadOrders } from '../../domain/usecases'

export class GetAllOrdersController implements Controller {
  constructor (
    private readonly _loadOrders: LoadOrders
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const result = await this._loadOrders.loadAll()
      if (result === null || result === undefined) {
        return notFound({ message: 'Order not found' })
      }
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
