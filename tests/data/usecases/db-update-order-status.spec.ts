import { type OrderModel, Status } from '../../../src/domain/models'
import { type LoadOrderByIdRepository, type UpdateOrderStatusRepository } from '../../../src/data/protocols/db'
import { DbUpdateOrderStatus } from '../../../src/data/usecases'

describe('DbUpdateOrderStatus', () => {
  let updateOrderStatusRepositoryStub: UpdateOrderStatusRepository
  let loadOrderByIdRepositoryStub: LoadOrderByIdRepository
  let dbUpdateOrderStatus: DbUpdateOrderStatus

  beforeEach(() => {
    updateOrderStatusRepositoryStub = {
      update: jest.fn(async () => Promise.resolve())
    }
    loadOrderByIdRepositoryStub = {
      loadById: jest.fn(async (id: string) => ({
        id,
        Status: Status.Criado
      }) satisfies OrderModel) // Update the return type to OrderModel
    }
    dbUpdateOrderStatus = new DbUpdateOrderStatus(
      updateOrderStatusRepositoryStub,
      loadOrderByIdRepositoryStub
    )
  })

  test('Should call UpdateOrderStatusRepository with correct values', async () => {
    const updateParams = { orderId: 'any_id', status: Status.Criado }
    await dbUpdateOrderStatus.update(updateParams)
    expect(updateOrderStatusRepositoryStub.update).toHaveBeenCalledWith(
      updateParams
    )
  })

  test('Should call LoadOrderByIdRepository with correct value after updating', async () => {
    const updateParams = { orderId: 'any_id', status: Status.Criado } // Change the type of status to C
    await dbUpdateOrderStatus.update(updateParams)
    expect(loadOrderByIdRepositoryStub.loadById).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if UpdateOrderStatusRepository throws', async () => {
    updateOrderStatusRepositoryStub.update = jest.fn(async () =>
      Promise.reject(new Error())
    )
    const updateParams = { orderId: 'any_id', status: Status.Criado } // Change the type of status to Status
    await expect(dbUpdateOrderStatus.update(updateParams)).rejects.toThrow()
  })

  test('Should throw if LoadOrderByIdRepository throws', async () => {
    loadOrderByIdRepositoryStub.loadById = jest.fn(async () =>
      Promise.reject(new Error())
    )
    const updateParams = { orderId: 'any_id', status: Status.Criado } // Change the type of status to Status
    await expect(dbUpdateOrderStatus.update(updateParams)).rejects.toThrow()
  })

  test('Should return the updated order on success', async () => {
    const updateParams = { orderId: 'any_id', status: Status.Criado } // Change the type of status to Status
    const expectedResult: OrderModel = { id: 'any_id', Status: Status.EmProgresso }
    loadOrderByIdRepositoryStub.loadById = jest.fn(async () => expectedResult)
    const result = await dbUpdateOrderStatus.update(updateParams)
    expect(result).toEqual(expectedResult)
  })
})
