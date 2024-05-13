import express, { type Express } from 'express'

import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import swaggerUi from 'swagger-ui-express'

export const setupApp = async (): Promise<Express> => {
  const app = express()

  // DOcumentation
  app.use(express.static('public'))
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: '/swagger.json'
      }
    })
  )

  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
