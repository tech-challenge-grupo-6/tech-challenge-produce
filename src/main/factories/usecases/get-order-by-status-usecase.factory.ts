import { OrderMongoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { type LoadOrderByStatus } from '../../../domain/usecases'
import { DbLoadOrderByStatus } from '../../../data/usecases'

export const makeDbGetOrderByStatus = (): LoadOrderByStatus => {
  const orderMongoRepository = new OrderMongoRepository()
  return new DbLoadOrderByStatus(orderMongoRepository)
}
