import request from 'supertest'
import express, { Router } from 'express'
import setupRoutes from '../../../src/main/routes/health.route'
import { makeHealthController } from '../../../src/main/factories'
import { auth } from '../../../src/main/middlewares/auth'

const authMock = jest.fn()
const makeHealthControllerMock = jest.fn()
jest.mock('../../../src/main/factories/controllers/get-health-controller.factory')
jest.mock('../../../src/main/middlewares/auth')

describe('Health Route', () => {
  const router = Router()
  const app = express()
  app.use(router)
  setupRoutes(router)

  test('should call auth middleware and health controller on GET /healthcheck', async () => {
    authMock.mockImplementationOnce((req, res, next) => next())
    makeHealthControllerMock.mockImplementationOnce(() => (req, res) => res.status(200).send())

    await request(app).get('/healthcheck').expect(200)

    expect(auth).toHaveBeenCalled()
    expect(makeHealthController).toHaveBeenCalled()
  })
})
