import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl:
    process.env.MONGO_URI ?? 'mongodb://localhost:27017/tech_challenge_db',
  port: process.env.PORT ?? 3333,
  domain: process.env.DOMAIN ?? 'http://localhost',
  database: process.env.DATABASE ?? 'tech_challenge_db',
  collection: process.env.COLLECTION ?? 'order_status',
  urlPayment: process.env.URL_MICROSERVICE_PAYMENT ?? '',
  awsRegion: process.env.AWS_REGION ?? 'us-east-1',
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsQueueUrl: process.env.AWS_QUEUE_URL,
  awsMessageGroup: process.env.AWS_MESSAGE_GROUP
}
