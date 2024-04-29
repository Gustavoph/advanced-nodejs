import http from 'http'
import { Server } from 'socket.io'
import { Routes } from './routes'

const PORT = 3000

const handler = function(request, response) {
  const defaultRoute = async (request, response) => response.end('Hello!')
  const routes = new Routes(io)
  const chosen = routes[request.method.toLowerCase()] || defaultRoute

  return chosen.apply(routes, [request, response]);
}

const server = http.createServer(handler)
const io = new Server(server, {
  cors: {
    origin: '*',
    Credentials: false
  }
})

io.on('connection', (socket) => console.log('someone connected', socket.id))


const bootstrap = () => console.log(`App running at http://localhost:${PORT}`)
server.listen(PORT, bootstrap)
