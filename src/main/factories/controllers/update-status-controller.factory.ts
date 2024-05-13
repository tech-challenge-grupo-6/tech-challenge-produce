import { type Controller } from '../../../presentation/protocols/'
import { UpdateOrderStatusController } from '../../../presentation/controllers'
import { makeDbUpdateOrderStatus } from '../usecases'
import { makeStatusValidation } from './status-validation.factory'
import { makeAxiosHttpClient } from '../gateways'

export const makeUpdateStatusController = (): Controller => {
  const controller = new UpdateOrderStatusController(makeDbUpdateOrderStatus(), makeStatusValidation(), makeAxiosHttpClient())
  return controller
}
