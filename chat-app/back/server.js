import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const chat = []

app.get('/get', (req, res) => {
  res.json(chat)
})

app.post('/post', (req, res) => {
  const newMessage = req.body
  chat.push(newMessage)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
