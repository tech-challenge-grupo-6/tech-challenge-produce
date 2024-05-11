import { type LoadOrderById } from '../../domain/usecases'
import { type LoadOrderByIdRepository } from '../protocols/db'

export class DbLoadOrderById implements LoadOrderById {
  constructor (private readonly _loadByIdRepository: LoadOrderByIdRepository) {}

  async loadById (id: string): Promise<LoadOrderById.Result> {
    return this._loadByIdRepository.loadById(id)
  }
}
