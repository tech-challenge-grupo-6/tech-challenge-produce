import { type UpdateOrderStatus } from '../../../domain/usecases'

export interface UpdateOrderStatusRepository {
  update: (data: UpdateOrderStatusRepository.Params) => Promise<void>
}

export namespace UpdateOrderStatusRepository {
  export type Params = UpdateOrderStatus.Params
}
