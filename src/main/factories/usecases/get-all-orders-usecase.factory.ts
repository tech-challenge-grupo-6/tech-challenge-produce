import { OrderMongoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { type LoadOrders } from '../../../domain/usecases'
import { DbLoadOrders } from '../../../data/usecases'

export const makeDbGetAllOrders = (): LoadOrders => {
  const orderMongoRepository = new OrderMongoRepository()
  return new DbLoadOrders(orderMongoRepository)
}
