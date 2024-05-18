/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Controller, type HttpResponse } from '../protocols'
import { serverError, ok, notFound } from '../helpers'
import { type LoadOrders } from '../../domain/usecases'
import { Get, Route, Security, SuccessResponse, Tags } from 'tsoa'

@Route('orders')
@Tags('orders')
export class GetAllOrdersController implements Controller {
  constructor (
    private readonly _loadOrders: LoadOrders
  ) {}

  @Security('jwt')
  @SuccessResponse(200)
  @Get('/')
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
