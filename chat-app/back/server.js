import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3000 })

console.log('Socket is running')

const data = []
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
