import { Router } from 'express'
import { adaptRoute } from '../../../src/main/adapters'
import { makeHealthController } from '../../../src/main/factories'
import healthRoute from '../../../src/main/routes/health.route'

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn()
  })
}))

jest.mock('.../../../src/main/adapters', () => ({
  adaptRoute: jest.fn()
}))

jest.mock('../../../src/main/factories', () => ({
  makeHealthController: jest.fn()
}))

describe('Health Route', () => {
  it('should call router.get with correct values', () => {
    const router = Router()
    healthRoute(router)
    expect(router.get).toHaveBeenCalledWith('/healthcheck', adaptRoute(makeHealthController()))
  })
})
