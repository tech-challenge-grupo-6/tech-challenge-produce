/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { isJSON } from 'validator'
import { SQSConsumerClient } from './sqs-conumer-client'

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
  console.log(body)
  return body
}

export const startConsume = async (): Promise<void> => {
  try {
    const pilotQueue = SQSConsumerClient.create(
      {
        queueUrl: 'https://sqs.us-east-1.amazonaws.com/318353297187/tc_status_queue.fifo',
        region: 'us-east-1'
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
