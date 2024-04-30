export default {
  mongoUrl:
    process.env.MONGO_URI ?? 'mongodb://localhost:27017/api-boilerplate',
  port: process.env.PORT ?? 3333,
  domain: process.env.DOMAIN ?? 'http://localhost'
}
