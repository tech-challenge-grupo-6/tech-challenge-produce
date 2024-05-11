import { type OrderModel } from '../models'

export interface LoadOrderByStatus {
  loadByStatus: (status: string) => Promise<LoadOrderByStatus.Result>
}

export namespace LoadOrderByStatus {
  export type Result = OrderModel[]
}
