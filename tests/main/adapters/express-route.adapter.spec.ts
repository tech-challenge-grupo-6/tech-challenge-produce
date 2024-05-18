import { adaptRoute } from '../../../src/main/adapters'
import { type Controller } from '../../../src/presentation/protocols'
import { type Request, type Response } from 'express'

describe('ExpressRouteAdapter', () => {
  test('Should call controller with correct values', async () => {
    const controllerStub: Controller = {
      handle: jest.fn(async () => ({
        statusCode: 200,
        body: { any: 'data' }
      }))
    }
    const req: Partial<Request> = {
      any: 'params',
      user: {
        id: 'user_id',
        email: 'user_email',
        name: 'user_name',
        cpf: 'user_cpf'
      }
    } as any
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await adaptRoute(controllerStub)(
      req as Request & { user: { id: string } },
      res as Response
    )
    expect(controllerStub.handle).toHaveBeenCalledWith({
      user: {
        id: 'user_id',
        email: 'user_email',
        name: 'user_name',
        cpf: 'user_cpf'
      }
    })
  })

  test('Should respond with correct statusCode and body', async () => {
    const controllerStub: Controller = {
      handle: jest.fn(async () => ({
        statusCode: 200,
        body: { any: 'data' }
      }))
    }
    const req: Partial<Request> = {}
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await adaptRoute(controllerStub)(
      req as Request & { user: { id: string } },
      res as Response
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ any: 'data' })
  })

  test('Should respond with error and correct statusCode if statusCode is 400 or more', async () => {
    const controllerStub: Controller = {
      handle: jest.fn(async () => ({
        statusCode: 400,
        body: { message: 'any_error' }
      }))
    }
    const req: Partial<Request> = {}
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await adaptRoute(controllerStub)(req as Request & { user: { id: string } }, res as Response)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
  })
})
