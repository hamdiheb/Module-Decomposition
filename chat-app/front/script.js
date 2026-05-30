const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
const ws = new WebSocket(`${protocol}//${window.location.hostname}:3000`)

ws.onerror = (error) => {
  console.error('WebSocket error:', error)
}

ws.onclose = (event) => {
  console.log('Closed — code:', event.code, 'reason:', event.reason)
}

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
  if (ws.readyState !== 1) {
    console.log('Socket not ready, state:', ws.readyState)
    return
  }

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
