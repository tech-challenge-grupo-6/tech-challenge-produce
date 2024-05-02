import { type Controller } from '../../../presentation/protocols/'
import { UpdateOrderStatusController } from '../../../presentation/controllers'
import { makeDbUpdateOrderStatus } from '../usecases'
import { makeStatusValidation } from './status-validation.factory'

export const makeUpdateStatusController = (): Controller => {
  const controller = new UpdateOrderStatusController(makeDbUpdateOrderStatus(), makeStatusValidation())
  return controller
}
