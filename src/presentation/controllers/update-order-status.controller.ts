/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Validation, type Controller, type HttpResponse } from '../../presentation/protocols'
import { serverError, ok, notFound, badRequest } from '../../presentation/helpers'
import { type AddOrder, type UpdateOrderStatus } from '../../domain/usecases'
import { type OrderModel, Status } from '../../domain/models'
import { getCorrectValueStatus } from '../../common/helpers'
import { type AxiosHttpClient } from '../../infra/http-client/axios'

export class UpdateOrderStatusController implements Controller {
  constructor (
    private readonly _addOrder: AddOrder,
    private readonly _updateOrderStatus: UpdateOrderStatus,
    private readonly _validation: Validation,
    private readonly _axiosClient: AxiosHttpClient
  ) {}

  async handle (request: UpdateOrderStatusController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      request.status = getCorrectValueStatus(request.status) as Status
      const result = await this._updateOrderStatus.update(request)
      const response = await this.addOrUpdateOrder(request.orderId, result)
      if (response === null) {
        return notFound({ message: 'Order not found' })
      }
      return ok(response)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }

  async addOrUpdateOrder (orderId: string, order: OrderModel): Promise<any> {
    const orderFound = await this._axiosClient.get({
      url: `/${orderId}`,
      params: {}
    })
    let result: any = null
    // Se o status do pedido for true e o pedido ainda não existe no banco de dados, cria e retorna o pedido
    if (order === null && orderFound.status) {
      const addOrderResult = await this._addOrder.add({
        order_id: orderFound.id,
        status: Status.Recebido
      })
      result = addOrderResult
    // Se o pedido existe no banco de dados e o status do pedido for true, retorna o pedido atualizado
    } else if (order !== null && orderFound.status) {
      result = order
    }
    return result
  }
}

export namespace UpdateOrderStatusController {
  export type Request = {
    orderId: string
    status: Status
  }
}
