import { type AddOrder } from '../../../domain/usecases'

export interface AddOrderRepository {
  add: (data: AddOrderRepository.Params) => Promise<void>
}

export namespace AddOrderRepository {
  export type Params = AddOrder.Params
}
