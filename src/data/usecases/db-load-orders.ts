import { type LoadOrders } from '../../domain/usecases'
import { type LoadOrdersRepository } from '../protocols/db'

export class DbLoadOrders implements LoadOrders {
  constructor (private readonly _loadBOrdersepository: LoadOrdersRepository) {}

  async loadAll (): Promise<LoadOrders.Result> {
    return this._loadBOrdersepository.loadAll()
  }
}
