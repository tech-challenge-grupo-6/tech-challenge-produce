import express, { type Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'

export const setupApp = async (): Promise<Express> => {
  const app = express()

  // Documentation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('X-Content-Type-Options', 'nosniff')
    res.setHeader('Content-Security-Policy', "script-src 'self'")
    next()
  })

  app.disable('x-powered-by')

  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
