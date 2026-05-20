const api = 'http://localhost'
const port = 3000

async function fetchMessage() {
  const req = await fetch(`${api}:${port}/get`)
  const res = await req.json()
  return res
}

function renderMessages(messages) {
  const messagesSection = document.querySelector('.main_chat_section')
  messages.forEach((element) => {
    const { user, Messages } = element
    const messageArticle = document.createElement('article')

    const userName = document.createElement('h3')
    const userMessage = document.createElement('p')

    userName.innerText = user
    userMessage.innerText = Messages

    messageArticle.append(userName, userMessage)
    messagesSection.append(messageArticle)
  })
}

async function main() {
  const Messages = await fetchMessage()
  renderMessages(Messages)
}

main()
