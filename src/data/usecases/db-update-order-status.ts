import { type UpdateOrderStatus } from '../../domain/usecases'
import { type UpdateOrderStatusRepository, type LoadOrderByIdRepository } from '../../data/protocols/db'

export class DbUpdateOrderStatus implements UpdateOrderStatus {
  constructor (
    private readonly _updateOrderStatusRepository: UpdateOrderStatusRepository,
    private readonly _loadOrderResultRepository: LoadOrderByIdRepository
  ) {}

  async update (data: UpdateOrderStatus.Params): Promise<UpdateOrderStatus.Result> {
    await this._updateOrderStatusRepository.update(data)
    return this._loadOrderResultRepository.loadById(data.orderId)
  }
}
