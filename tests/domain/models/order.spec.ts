import { type OrderModel, Status } from '../../../src/domain/models/'

describe('OrderModel', () => {
  it('should be able to create an order model with valid properties', () => {
    const order: OrderModel = {
      id: 'any_id',
      Status: Status.Criado
    }

    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('Status')
    expect(order.id).toBe('any_id')
    expect(order.Status).toBe(Status.Criado)
  })
})
