import { OrderMongoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { type UpdateOrderStatus } from '../../../domain/usecases'
import { DbUpdateOrderStatus } from '../../../data/usecases'

export const makeDbUpdateOrderStatus = (): UpdateOrderStatus => {
  const orderMongoRepository = new OrderMongoRepository()
  return new DbUpdateOrderStatus(orderMongoRepository, orderMongoRepository)
}
