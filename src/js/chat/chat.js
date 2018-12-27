import { welcomeTemplate, chatTemplate } from './template.js'

class Chat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(welcomeTemplate.content.cloneNode(true))
    this.chatArea = this.shadowRoot.querySelector('.chat')
    this.username = this.shadowRoot.querySelector('.welcome #username')
  }

  connectedCallback () {
    this.startChat()
  }

  startChat () {
    const startChatBtn = this.shadowRoot.querySelector('.welcome .start-chat')

    startChatBtn.addEventListener('click', (e) => {
      if (this.username.value) {
        console.log('Ready to chat!')
        this.clearWelcomeArea()
        this.chatArea.appendChild(chatTemplate.content.cloneNode(true))
        this.connect()

        const textarea = this.shadowRoot.querySelector('textarea')
        textarea.addEventListener('keypress', (e) => {
          if (e.keyCode === 13) {
            this.sendMessage(e.target.value)
            e.target.value = ''
            e.preventDefault()
          }
        })
      }
    })
  }

  async connect () {
    this.socket = await new WebSocket('ws://vhost3.lnu.se:20080/socket/')

    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === 1) {
        resolve(this.socket)
      }

      this.socket.addEventListener('open', (e) => {
        resolve(this.socket)
      })

      this.socket.addEventListener('message', (e) => {
        const message = JSON.parse(e.data)
        this.printMessage(message)
        if (message.type === 'message') {
          // this.printMessage(message)
        }
      })
    })
  }

  sendMessage (text) {
    const data = {
      type: 'message',
      data: text,
      username: this.username.value,
      time: Date.now(),
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.connect().then(() => {
      this.socket.send(JSON.stringify(data))
      console.log('Sending message', text)
    })
  }

  printMessage (message) {
    const messageDiv = this.shadowRoot.querySelector('.messages')
    messageDiv.querySelectorAll('.text')[0].textContent = message.data
    messageDiv.querySelectorAll('.author')[0].textContent = message.username

    this.chatArea.querySelectorAll('.messages')[0].appendChild(messageDiv)
  }

  clearWelcomeArea () {
    const welcomeArea = this.shadowRoot.querySelector('.welcome')

    if (welcomeArea) {
      while (welcomeArea.hasChildNodes()) {
        welcomeArea.removeChild(welcomeArea.lastChild)
      }
      welcomeArea.parentNode.removeChild(welcomeArea)
    }
  }
}

window.customElements.define('chat-app', Chat)

export {
  Chat
}
