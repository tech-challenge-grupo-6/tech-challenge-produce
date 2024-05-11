import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesPath = path.join(__dirname, '../routes')
  const routeFiles = readdirSync(routesPath)

  routeFiles
    .filter(file => !file.includes('.test.'))
    .forEach(file => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const routeModule = require(path.join(routesPath, file))
      if (typeof routeModule === 'function') {
        routeModule.default(router)
      } else if (typeof routeModule === 'object' && typeof routeModule.default === 'function') {
        routeModule.default(router)
      } else {
        throw new Error(`Invalid route module: ${file}`)
      }
    })

  // Printando todas as rotas
  console.log('Rotas registradas:')
  router.stack.forEach(layer => {
    if (layer.route) {
      console.log(`${layer.route.stack[0].method.toUpperCase()}: ${layer.route.path}`)
    }
  })
}
