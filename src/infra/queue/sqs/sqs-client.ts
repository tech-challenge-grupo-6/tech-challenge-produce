import AWS from 'aws-sdk'
import env from '../../../main/config/env'

export class SQSClient {
  private readonly sqs: AWS.SQS
  private readonly params: AWS.SQS.ReceiveMessageRequest

  constructor () {
    AWS.config.update({ region: env.awsRegion })
    this.sqs = new AWS.SQS()
    this.params = {
      QueueUrl: env.awsQueueUrl ?? '',
      MaxNumberOfMessages: 10,
      VisibilityTimeout: 20, // 20 seconds
      WaitTimeSeconds: 0
    }
  }

  async sendMessage (message: any): Promise<any> {
    return this.sqs.sendMessage({
      MessageBody: JSON.stringify(message),
      QueueUrl: `${env.awsQueueUrl}`,
      // MessageGroupId: `${env.awsMessageGroup}`
    }).promise()
  }

  async receiveMessage (): Promise<any> {
    const data = await this.sqs.receiveMessage(this.params).promise()
    return data.Messages ?? []
  };
}
