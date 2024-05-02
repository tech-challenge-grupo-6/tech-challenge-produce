import { OrderMondoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { type LoadOrders } from '../../../domain/usecases'
import { DbLoadOrders } from '../../../data/usecases'

export const makeDbGetAllOrders = (): LoadOrders => {
  const orderMongoRepository = new OrderMondoRepository()
  return new DbLoadOrders(orderMongoRepository)
}
