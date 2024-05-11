import { MongoHelper } from '../infra/db'
import env from '../main/config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`🚀 Server running at ${env.domain}:${env.port}`) }
    )
  })
  .catch(console.error)
