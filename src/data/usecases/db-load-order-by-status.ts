import { type LoadOrderByStatus } from '../../domain/usecases'
import { type LoadOrderByStatusRepository } from '../protocols/db'

export class DbLoadOrderByStatus implements LoadOrderByStatus {
  constructor (private readonly _loadByStatusRepository: LoadOrderByStatusRepository) {}

  async loadByStatus (status: string): Promise<LoadOrderByStatus.Result> {
    return this._loadByStatusRepository.loadByStatus(status)
  }
}
