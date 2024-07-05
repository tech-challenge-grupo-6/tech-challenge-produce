import path from 'path'
import { MongoHelper } from '../infra/db'
import { startConsume } from '../infra/queue/sqs/sqs-consumer'
import env from '../main/config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    await startConsume()

    app.use('/swagger', (req, res) => {
      res.sendFile(path.join(__dirname, 'docs', 'swagger.json'))
    })

    app.listen(env.port, () => { console.log(`🚀 Server running at ${env.domain}:${env.port}`) }
    )
  })
  .catch(console.error)
