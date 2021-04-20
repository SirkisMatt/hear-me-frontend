const jsonServer = require('json-server')
const db = require('./db')
const { PORT } = require('../configJson')

const server = jsonServer.create()
const router = jsonServer.router(db())
const middlewares = jsonServer.defaults()
const cors = require('cors');
server.use(
  cors({
      origin: true,
      credentials: true,
      preflightContinue: false,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
server.use(middlewares)
server.use(router)

server.listen(PORT, () => {
  console.log(`json-server started at ${PORT}`)
})
