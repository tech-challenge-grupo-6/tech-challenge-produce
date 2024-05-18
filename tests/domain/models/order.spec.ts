import { type OrderModel, Status } from '../../../src/domain/models/'

describe('OrderModel', () => {
  it('should be able to create an order model with valid properties', () => {
    const order: OrderModel = {
      id: 'any_id',
      order_id: 'any_order_id',
      status: Status.Criado
    }

    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('order_id')
    expect(order).toHaveProperty('status')
    expect(order.id).toBe('any_id')
    expect(order.order_id).toBe('any_order_id')
    expect(order.status).toBe(Status.Criado)
  })
})
