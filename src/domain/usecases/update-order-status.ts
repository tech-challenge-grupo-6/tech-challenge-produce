import { type OrderModel, type Status } from '../../domain/models'

export interface UpdateOrderStatus {
  update: (data: UpdateOrderStatus.Params) => Promise<UpdateOrderStatus.Result>
}

export namespace UpdateOrderStatus {
  export type Params = {
    orderId: string
    status: Status
  }

  export type Result = OrderModel
}
