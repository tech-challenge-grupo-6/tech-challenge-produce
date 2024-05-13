import { type Controller } from '../../../presentation/protocols'
import { GetOrderByStatusController } from '../../../presentation/controllers'
import { makeDbGetOrderByStatus } from '../usecases'
import { makeStatusValidation } from './status-validation.factory'

export const makeGetOrderByStatusController = (): Controller => {
  const controller = new GetOrderByStatusController(makeDbGetOrderByStatus(), makeStatusValidation())
  return controller
}
