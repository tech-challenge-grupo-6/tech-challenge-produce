import request from 'supertest'
import express from 'express'
import healthRoute from '../../../src/main/routes/health.route'

describe('Health Route', () => {
  const app = express()
  app.use(express.json())
  healthRoute(app)
  it('should return status 200 for GET /healthcheck with valid authentication', async () => {
  // Aqui você pode substituir 'your_valid_token' pelo token de autenticação válido
    const response = await request(app)
      .get('/healthcheck')
      .set('Authorization', 'Bearer your_valid_token')

    expect(response.status).toBe(200)
  })

  it('should return status 401 for GET /healthcheck without authentication', async () => {
    const response = await request(app).get('/healthcheck')
    expect(response.status).toBe(401)
  })
})
