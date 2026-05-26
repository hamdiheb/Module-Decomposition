const ws = new WebSocket('ws://localhost:3000')

function socket(ws) {}

function messageComponent(user, text) {
  const message = document.querySelector('.main_chat_section')
  const article = document.createElement('article')
  const title = document.createElement('h1')
  const chat = document.createElement('p')

  title.innerText = user
  chat.innerText = text

  article.append(title, chat)
  message.append(article)
}

function sendMessage() {
  const user = document.querySelector('.main_chat_user').value
  const text = document.querySelector('.main_chat_message').value

  ws.send(JSON.stringify({ user, text }))
}

function main() {
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    messageComponent(message.user, message.text)
  }
  const button = document.querySelector('.send')
  button.addEventListener('click', (event) => {
    sendMessage()
    event.preventDefault()
  })
}

main()
