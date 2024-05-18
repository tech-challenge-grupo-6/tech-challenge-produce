import { type Controller } from '../../../presentation/protocols'
import { GetAllOrdersController } from '../../../presentation/controllers'
import { makeDbGetAllOrders } from '../usecases'

export const makeGetAllOrdersController = (): Controller => {
  const controller = new GetAllOrdersController(makeDbGetAllOrders())
  return controller
}
