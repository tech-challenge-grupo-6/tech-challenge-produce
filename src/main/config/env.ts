export default {
  mongoUrl:
    process.env.MONGO_URI ?? 'mongodb://localhost:27017/order_status',
  port: process.env.PORT ?? 3333,
  domain: process.env.DOMAIN ?? 'http://localhost',
  database: process.env.DATABASE ?? 'order_status',
  urlPayment: process.env.URL_MICROSERVICE_PAYMENT ?? ''
}
