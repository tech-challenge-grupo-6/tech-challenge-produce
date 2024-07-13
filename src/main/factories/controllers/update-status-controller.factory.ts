import { type Controller } from '../../../presentation/protocols/'
import { UpdateOrderStatusController } from '../../../presentation/controllers'
import { makeDbUpdateOrderStatus, makeDbAddOrder } from '../usecases'
import { makeStatusValidation } from './status-validation.factory'
import { makeAxiosHttpClient, makeSQSClient } from '../gateways'

export const makeUpdateStatusController = (): Controller => {
  const controller = new UpdateOrderStatusController(
    makeDbAddOrder(),
    makeDbUpdateOrderStatus(),
    makeStatusValidation(),
    makeAxiosHttpClient(),
    makeSQSClient()
  )
  return controller
}
