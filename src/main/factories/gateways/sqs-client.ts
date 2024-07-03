import { SQSClient } from '../../../infra/queue/sqs'

export const makeSQSClient = (): SQSClient => {
  return new SQSClient()
}
