import { type OrderModel } from '../models'

export interface AddOrder {
  add: (data: AddOrder.Params) => Promise<void>
}

export namespace AddOrder {
  export type Params = Omit<OrderModel, 'id'>
}
