import { type LoadOrderById } from '../../../src/domain/usecases'
import { DbLoadOrderById } from '../../../src/data//usecases/db-load-order-by-id'
import { type LoadOrderByIdRepository } from '../../../src/data/protocols/db'
import { Status } from '../../../src/domain/models'

describe('DbLoadOrderById', () => {
  test('Should call LoadOrderByIdRepository with correct id', async () => {
    class LoadOrderByIdRepositoryStub implements LoadOrderByIdRepository {
      async loadById (id: string): Promise<LoadOrderById.Result> {
        return {
          id: 'any_id',
          order_id : 'any_order_id',
          status: Status.Criado
        }
      }
    }
    const loadOrderByIdRepositoryStub = new LoadOrderByIdRepositoryStub()
    const loadByIdSpy = jest.spyOn(loadOrderByIdRepositoryStub, 'loadById')
    const sut = new DbLoadOrderById(loadOrderByIdRepositoryStub)
    const orderId = 'any_id'
    await sut.loadById(orderId)
    expect(loadByIdSpy).toHaveBeenCalledWith(orderId)
  })

  test('Should throw if LoadOrderByIdRepository throws', async () => {
    class LoadOrderByIdRepositoryStub implements LoadOrderByIdRepository {
      async loadById (id: string): Promise<LoadOrderById.Result> {
        throw new Error()
      }
    }
    const loadOrderByIdRepositoryStub = new LoadOrderByIdRepositoryStub()
    const sut = new DbLoadOrderById(loadOrderByIdRepositoryStub)
    const orderId = 'any_id'
    await expect(sut.loadById(orderId)).rejects.toThrow()
  })

  test('Should return an order on success', async () => {
    class LoadOrderByIdRepositoryStub implements LoadOrderByIdRepository {
      async loadById (id: string): Promise<LoadOrderById.Result> {
        // Simulação de retorno de sucesso
        return {
          id: 'any_id',
          order_id: 'any_order_id',
          status: Status.Criado
        }
      }
    }
    const loadOrderByIdRepositoryStub = new LoadOrderByIdRepositoryStub()
    const sut = new DbLoadOrderById(loadOrderByIdRepositoryStub)
    const order = await sut.loadById('any_id')
    expect(order).toEqual({
      id: 'any_id',
      order_id: 'any_order_id',
      status: Status.Criado
    })
  })
})
