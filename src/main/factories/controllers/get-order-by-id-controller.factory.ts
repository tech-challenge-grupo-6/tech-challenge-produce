import { type Controller } from '../../../presentation/protocols'
import { GetOrderByIdController } from '../../../presentation/controllers'
import { makeDbGetOrderById } from '../usecases'

export const makeGetOrderByIdController = (): Controller => {
  const controller = new GetOrderByIdController(makeDbGetOrderById())
  return controller
}
