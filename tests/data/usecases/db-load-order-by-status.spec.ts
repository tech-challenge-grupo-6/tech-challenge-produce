import { DbLoadOrderByStatus } from '../../../src/data/usecases/db-load-order-by-status'
import { type LoadOrderByStatusRepository } from '../../../src/data/protocols/db'
import { type LoadOrderByStatus } from '../../../src/domain/usecases'
import { Status } from '../../../src/domain/models'

describe('DbLoadOrderByStatus', () => {
  test('Should call LoadOrderByStatusRepository with correct status', async () => {
    class LoadOrderByStatusRepositoryStub
    implements LoadOrderByStatusRepository {
      async loadByStatus (status: string): Promise<LoadOrderByStatus.Result> {
        // Simulação de retorno de pedidos por status, não é necessário implementar lógica real aqui
        return []
      }
    }
    const loadOrderByStatusRepositoryStub =
      new LoadOrderByStatusRepositoryStub()
    const loadByStatusSpy = jest.spyOn(
      loadOrderByStatusRepositoryStub,
      'loadByStatus'
    )
    const sut = new DbLoadOrderByStatus(loadOrderByStatusRepositoryStub)
    const status = 'any_status'
    await sut.loadByStatus(status)
    expect(loadByStatusSpy).toHaveBeenCalledWith(status)
  })

  test('Should throw if LoadOrderByStatusRepository throws', async () => {
    class LoadOrderByStatusRepositoryStub
    implements LoadOrderByStatusRepository {
      async loadByStatus (status: string): Promise<LoadOrderByStatus.Result> {
        throw new Error()
      }
    }
    const loadOrderByStatusRepositoryStub =
      new LoadOrderByStatusRepositoryStub()
    const sut = new DbLoadOrderByStatus(loadOrderByStatusRepositoryStub)
    const status = 'any_status'
    await expect(sut.loadByStatus(status)).rejects.toThrow()
  })

  test('Should return an array of orders on success', async () => {
    class LoadOrderByStatusRepositoryStub
    implements LoadOrderByStatusRepository {
      async loadByStatus (status: string): Promise<LoadOrderByStatus.Result> {
        // Simulação de retorno de sucesso
        return [
          {
            id: 'valid_id',
            Status: Status.Criado
          }
        ]
      }
    }
    const loadOrderByStatusRepositoryStub =
      new LoadOrderByStatusRepositoryStub()
    const sut = new DbLoadOrderByStatus(loadOrderByStatusRepositoryStub)
    const orders = await sut.loadByStatus('any_status')
    expect(orders).toEqual([
      {
        id: 'valid_id',
        Status: Status.Criado
      }
    ])
  })
})
