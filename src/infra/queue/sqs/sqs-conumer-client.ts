import { Consumer, type ConsumerOptions } from 'sqs-consumer'
import { SQSClient } from '@aws-sdk/client-sqs'
import env from '../../../main/config/env'

export type SQSErrorHandler = (err: any) => any

export class SQSConsumerClient {
  private readonly _queueConsumer: Consumer
  private readonly _config: ConsumerOptions

  private constructor (config: ConsumerOptions) {
    this._config = config
    this._queueConsumer = Consumer.create(this._config)
  }

  get queueConsumer (): Consumer {
    return this._queueConsumer
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static create (
    messageHandler: (message: unknown) => Promise<void>
  ) {
    /* const sqsConfig: ConsumerOptions = {
      ...config,
      handleMessage: messageHandler,
      queueUrl: config.queueUrl ?? '',
      region: config.region ?? 'us-east-1'
    } */

    const sqsConfig: ConsumerOptions = {
      queueUrl: env.awsQueueListeningUrl ?? '',
      handleMessage: messageHandler,
      sqs: new SQSClient({
        region: env.awsRegion ?? 'use-east-1',
        credentials: {
          accessKeyId: env.awsAnotherAccessKey ?? '',
          secretAccessKey: env.awsAnotherSecretKey ?? ''
        }
      })
    }

    return new SQSConsumerClient(sqsConfig)
  }

  handleError (errhandlerFn: SQSErrorHandler): this {
    this.queueConsumer.on('error', errhandlerFn)
    return this
  }

  start (): this {
    this.queueConsumer.start()
    return this
  }
}
