import { createServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'

const server = createServer()
const wss = new WebSocketServer({ server })

console.log('Socket is running')

wss.on('connection', (socket) => {
  console.log('Connected client')
  socket.on('message', (message) => {
    const messageString = message.toString()
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString)
        console.log(JSON.parse(messageString))
      }
    }
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
