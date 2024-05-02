import { type OrderModel } from '../models'

export interface LoadOrderById {
  loadById: (id: string) => Promise<LoadOrderById.Result>
}

export namespace LoadOrderById {
  export type Result = OrderModel
}
