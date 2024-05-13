import { OrderMondoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { type LoadOrderById } from '../../../domain/usecases'
import { DbLoadOrderById } from '../../../data/usecases'

export const makeDbGetOrderById = (): LoadOrderById => {
  const orderMongoRepository = new OrderMondoRepository()
  return new DbLoadOrderById(orderMongoRepository)
}
