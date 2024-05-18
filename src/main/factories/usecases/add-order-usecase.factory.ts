import { OrderMondoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { type AddOrder } from '../../../domain/usecases'
import { DbAdAddOrder } from '../../../data/usecases'

export const makeDbAddOrder = (): AddOrder => {
  const orderMongoRepository = new OrderMondoRepository()
  return new DbAdAddOrder(orderMongoRepository)
}
