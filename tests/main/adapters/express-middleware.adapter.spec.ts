import { adaptMiddleware } from '../../../src/main/adapters/express-middleware.adapter'
import { type Middleware } from '../../../src/presentation/protocols'
import { type Request, type Response, type NextFunction } from 'express'

describe('ExpressMiddlewareAdapter', () => {
  test('Should call middleware with correct values', async () => {
    const middleware: Middleware = {
      handle: jest.fn(async () => ({
        statusCode: 200,
        body: { any: 'data' }
      }))
    }
    const req: Partial<Request> = {
      headers: { 'x-access-token': 'any_token' }
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next: NextFunction = jest.fn()
    await adaptMiddleware(middleware)(req as Request, res as Response, next)
    expect(middleware.handle).toHaveBeenCalledWith({
      accessToken: 'any_token',
      ...req.headers
    })
  })

  test('Should call next on success', async () => {
    const middleware: Middleware = {
      handle: jest.fn(async () => ({
        statusCode: 200,
        body: { any: 'data' }
      }))
    }
    const req: Partial<Request> = {
      headers: { 'x-access-token': 'any_token' }
    }
    const res: Partial<Response> = {}
    const next: NextFunction = jest.fn()
    await adaptMiddleware(middleware)(req as Request, res as Response, next)
    expect(next).toHaveBeenCalled()
  })

  test('Should respond with error if middleware returns error', async () => {
    const middleware: Middleware = {
      handle: jest.fn(async () => ({
        statusCode: 400,
        body: { message: 'any_error' }
      }))
    }
    const req: Partial<Request> = {
      headers: { 'x-access-token': 'any_token' }
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next: NextFunction = jest.fn()
    await adaptMiddleware(middleware)(req as Request, res as Response, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
  })
})
