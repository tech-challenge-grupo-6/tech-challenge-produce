import { MongoHelper } from './'
import {
  type UpdateOrderStatusRepository,
  type LoadOrderByIdRepository,
  type LoadOrdersRepository,
  type LoadOrderByStatusRepository,
  type AddOrderRepository
} from '../../../data/protocols/db'
import { type UpdateOrderStatus } from '../../../domain/usecases'
import env from '../../../main/config/env'

const DATABASE = env.database

export class OrderMondoRepository implements UpdateOrderStatusRepository, LoadOrderByIdRepository, LoadOrdersRepository, LoadOrderByStatusRepository, AddOrderRepository {
  async add (data: AddOrderRepository.Params): Promise<AddOrderRepository.Params> {
    const surveyCollection = MongoHelper.getCollection(DATABASE)
    await surveyCollection.insertOne(data)
    return data
  }

  async update (data: UpdateOrderStatus.Params): Promise<void> {
    const orderCollection = MongoHelper.getCollection(DATABASE)
    await orderCollection.updateOne({
      order_id: data.orderId
    }, {
      $set: {
        status: data.status
      }
    })
  }

  async loadById (id: string): Promise<LoadOrderByIdRepository.Result> {
    const orderCollection = MongoHelper.getCollection(DATABASE)
    const order = await orderCollection.findOne({ order_id: id })
    return order && MongoHelper.map(order)
  }

  async loadByStatus (status: string): Promise<LoadOrderByStatusRepository.Result> {
    const orderCollection = MongoHelper.getCollection(DATABASE)
    const orders = await orderCollection.find({ status }).toArray()
    return MongoHelper.mapCollection(orders)
  }

  async loadAll (): Promise<LoadOrdersRepository.Result> {
    const orderCollection = MongoHelper.getCollection(DATABASE)
    const orders = await orderCollection.find({}).toArray()
    return MongoHelper.mapCollection(orders)
  }
}
