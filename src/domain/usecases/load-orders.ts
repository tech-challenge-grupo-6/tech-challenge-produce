import { type OrderModel } from '../models'

export interface LoadOrders {
  loadAll: () => Promise<LoadOrders.Result>
}

export namespace LoadOrders {
  export type Result = OrderModel[]
}
