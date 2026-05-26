const ws = new WebSocket('ws://nmmkmh5cqmujtouo92qxvoec.178.105.39.91.sslip.io')
const mine = true
// function socket(ws) {}

function messageComponent(user, text, mine) {
  const messages = document.querySelector('.main_chat_section')

  const article = document.createElement('article')
  article.className = `message${mine ? ' mine' : ''}`

  const username = document.createElement('div')
  username.className = 'username'
  username.textContent = user

  const bubble = document.createElement('div')
  bubble.className = 'bubble'
  bubble.textContent = text
  mine = false
  article.appendChild(username)
  article.appendChild(bubble)
  messages.appendChild(article)
}

function sendMessage() {
  const user = document.querySelector('.main_chat_user').value
  const text = document.querySelector('.main_chat_message').value
  const id = self.crypto.randomUUID()
  ws.send(JSON.stringify({ user, text, id }))
}

function main() {
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    messageComponent(message.user, message.text, mine)
  }
  const button = document.querySelector('.send')
  button.addEventListener('click', (event) => {
    sendMessage()
    event.preventDefault()
  })
}

main()
