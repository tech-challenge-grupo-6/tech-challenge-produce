import { type Status } from './'

export type OrderModel = {
  id: string
  clientId: string
  Status: Status
  ValorTotal: Date
  Pagamento: Date
  PagamentoId: Date
}
