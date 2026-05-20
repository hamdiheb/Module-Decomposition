const api = 'http://localhost'
const port = 3000

async function fetchMessage() {
  const req = await fetch(`${api}:${port}/get`)
  const res = await req.json()
}

function renderMessages(messages) {
  const messagesSection = document.querySelector('.main_chat_section')
  const messageArticle = document.createElement('article')

  const userName = document.createElement('h3')
  const userMessage = document.createElement('p')

  userName.innerText = messages.user
  userMessage.innerText = messages.Messages

  messageArticle.append(userName, userMessage)
  messagesSection.append(messageArticle)
}

function main() {
  const Messages = fetchMessage()
  renderMessages(Messages)
}

main()
