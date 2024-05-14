/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Validation, type Controller, type HttpResponse } from '../../presentation/protocols'
import { serverError, ok, notFound, badRequest } from '../../presentation/helpers'
import { type UpdateOrderStatus } from '../../domain/usecases'
import { type Status } from '../../domain/models'
import { getCorrectValueStatus } from '../../common/helpers'
import { type AxiosHttpClient } from '../../infra/http-client/axios'

export class UpdateOrderStatusController implements Controller {
  constructor (
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
      // TO DO
      // Utilizar aqui o axiosClient para buscar o pedido no microserviço de pagamento
      const response = await this._axiosClient.get({
        url: `/${request.orderId}`,
        params: {}
      })
      console.log(response)
      // Se o status do pedido for false então não faz nada
      // Seo status for true eo pedido existir, atualiza o status
      // Se o status for true e o pedido não existir, cria o pedido e retorna com status atualizado
      // Implementar a logica de adicionar pedido no banco de dados
      const result = await this._updateOrderStatus.update(request)

      if ((result === null || result === undefined)) {
        return notFound({ message: 'Order not found' })
      }
      return ok(result)
    } catch (error) {
      console.log(error)
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
