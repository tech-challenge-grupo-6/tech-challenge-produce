import { type OrderModel } from '../../../domain/models'

export interface LoadOrderByIdRepository {
  loadById: (id: string) => Promise<LoadOrderByIdRepository.Result>
}

export namespace LoadOrderByIdRepository {
  export type Result = OrderModel
}
