import { type OrderModel } from '../../../domain/models'

export interface LoadOrdersRepository {
  loadAll: () => Promise<LoadOrdersRepository.Result>
}

export namespace LoadOrdersRepository {
  export type Result = OrderModel[]
}
