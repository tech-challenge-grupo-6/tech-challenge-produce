/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { isJSON } from 'validator'
import { SQSConsumerClient } from './sqs-conumer-client'
import env from '../../../main/config/env'
import { OrderMongoRepository } from '../../../infra/db/mongodb/order-mongo-repository'
import { SQSClient } from './sqs-client'
import { Status } from '../../../domain/models'

const orderRepo = new OrderMongoRepository()
const SQSClientInstance = new SQSClient()

const isJson = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

const messageHandler = async (message: any): Promise<any> => {
  try {
    console.log('listening', message.Body)
    const body = isJSON(message.Body) ? JSON.parse(message.Body) : message.Body
    console.log('listening', body)
    console.log('type listening', typeof body)
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const obj = {
      order_id: body.orderId,
      status: body.status ? Status.EmProgresso : Status.Criado
    }
    await orderRepo.add(obj)
    const send = await SQSClientInstance.sendMessage({
      orderId: body.orderId,
      status: body.status ? 2 : 0
    })
    console.log('send', send)
    return body
  } catch (error) {
    console.log(error)
  }
}

export const startConsume = async (): Promise<void> => {
  try {
    const pilotQueue = SQSConsumerClient.create(
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
