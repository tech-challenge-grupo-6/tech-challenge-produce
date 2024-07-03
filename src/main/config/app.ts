import express, { type Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'

export const setupApp = async (): Promise<Express> => {
  const app = express()

  // Documentation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.use('/api-docs/swagger.json', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
