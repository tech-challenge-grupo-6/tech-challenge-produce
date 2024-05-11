import { type AddOrder } from '../../domain/usecases'
import { type AddOrderRepository } from '../protocols/db/'

export class AdAddOrder implements AddOrder {
  constructor (private readonly _addOrderRepository: AddOrderRepository) {}

  async add (data: AddOrder.Params): Promise<void> {
    await this._addOrderRepository.add(data)
  }
}
