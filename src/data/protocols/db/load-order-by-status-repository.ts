import { type OrderModel } from '../../../domain/models'

export interface LoadOrderByStatusRepository {
  loadByStatus: (id: string) => Promise<LoadOrderByStatusRepository.Result>
}

export namespace LoadOrderByStatusRepository {
  export type Result = OrderModel[]
}
