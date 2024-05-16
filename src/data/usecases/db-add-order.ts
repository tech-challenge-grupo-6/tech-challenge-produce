import { type AddOrder } from '../../domain/usecases'
import { type AddOrderRepository } from '../protocols/db/'

export class DbAdAddOrder implements AddOrder {
  constructor (private readonly _addOrderRepository: AddOrderRepository) {}

  async add (data: AddOrder.Params): Promise<AddOrder.Params> {
    return this._addOrderRepository.add(data)
  }
}
