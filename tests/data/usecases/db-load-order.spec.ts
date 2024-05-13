import { Status } from '../../../src/domain/models'
import { type LoadOrders } from '../../../src/domain/usecases/'
import { type LoadOrdersRepository } from '../../../src/data/protocols/db'
import { DbLoadOrders } from '../../../src/data/usecases/'

describe('DbLoadOrders', () => {
  test('Should call LoadOrdersRepository', async () => {
    class LoadOrdersRepositoryStub implements LoadOrdersRepository {
      async loadAll (): Promise<LoadOrders.Result> {
        // Simulação de retorno de todos os pedidos
        return []
      }
    }
    const loadOrdersRepositoryStub = new LoadOrdersRepositoryStub()
    const loadAllSpy = jest.spyOn(loadOrdersRepositoryStub, 'loadAll')
    const dbLoadOrders = new DbLoadOrders(loadOrdersRepositoryStub)
    await dbLoadOrders.loadAll()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should throw if LoadOrdersRepository throws', async () => {
    class LoadOrdersRepositoryStub implements LoadOrdersRepository {
      async loadAll (): Promise<LoadOrders.Result> {
        throw new Error()
      }
    }
    const loadOrdersRepositoryStub = new LoadOrdersRepositoryStub()
    const dbLoadOrders = new DbLoadOrders(loadOrdersRepositoryStub)
    await expect(dbLoadOrders.loadAll()).rejects.toThrow()
  })

  test('Should return a list of orders on success', async () => {
    const returnOrders = [
      {
        id: 'any_id',
        Status: Status.Criado
      }
    ]
    class LoadOrdersRepositoryStub implements LoadOrdersRepository {
      async loadAll (): Promise<LoadOrders.Result> {
        return returnOrders
      }
    }
    const loadOrdersRepositoryStub = new LoadOrdersRepositoryStub()
    const dbLoadOrders = new DbLoadOrders(loadOrdersRepositoryStub)
    const orders = await dbLoadOrders.loadAll()
    expect(orders).toEqual(returnOrders)
  })
})
