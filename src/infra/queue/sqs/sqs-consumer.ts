/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { isJSON } from 'validator'
import { SQSConsumerClient } from './sqs-conumer-client'
import env from '../../../main/config/env'

const isJson = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

const messageHandler = async (message: any): Promise<any> => {
  const body = isJSON(message.Body) ? JSON.parse(message.Body) : message.Body
  return body
}

export const startConsume = async (): Promise<void> => {
  try {
    const pilotQueue = SQSConsumerClient.create(
      {
        queueUrl: env.awsQueueListeningUrl,
        region: env.awsRegion
      },
      messageHandler
    )

    pilotQueue
      .handleError((err: any) => {
        console.log(err)
      })
      .start()
  } catch (error: any) {
    console.log(error)
  }
}
