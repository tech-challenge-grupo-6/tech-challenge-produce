import { type OrderModel } from '../models'

export interface AddOrder {
  add: (data: AddOrder.Params) => Promise<AddOrder.Params>
}

export namespace AddOrder {
  export type Params = Omit<OrderModel, 'id'>
}
