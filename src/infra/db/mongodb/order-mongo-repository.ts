import { MongoHelper } from './'
import {
  type UpdateOrderStatusRepository,
  type LoadOrderByIdRepository
} from '../../../data/protocols/db'
import { ObjectId } from 'mongodb'
import { type UpdateOrderStatus } from '../../../domain/usecases'

export class OrderMondoRepository implements UpdateOrderStatusRepository, LoadOrderByIdRepository {
  async update (data: UpdateOrderStatus.Params): Promise<void> {
    const orderCollection = MongoHelper.getCollection('orders')
    await orderCollection.updateOne({
      _id: new ObjectId(data.orderId)
    }, {
      $set: {
        status: data.status
      }
    })
  }

  async loadById (id: string): Promise<LoadOrderByIdRepository.Result> {
    const orderCollection = MongoHelper.getCollection('orders')
    const order = await orderCollection.findOne({ _id: new ObjectId(id) })
    return order && MongoHelper.map(order)
  }
}
