import { OrderMondoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { type LoadOrderByStatus } from '../../../domain/usecases'
import { DbLoadOrderByStatus } from '../../../data/usecases'

export const makeDbGetOrderByStatus = (): LoadOrderByStatus => {
  const orderMongoRepository = new OrderMondoRepository()
  return new DbLoadOrderByStatus(orderMongoRepository)
}
