import { welcomeTemplate, chatTemplate } from './template.js'

class Chat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(welcomeTemplate.content.cloneNode(true))

    this.chatArea = this.shadowRoot.querySelector('.chat')
    this.textarea = this.shadowRoot.querySelector('textarea')

    this.username = 'Adam'
    this.channel = ''
    this.socket = new WebSocket('wss://vhost3.lnu.se:20080/socket/')
    this.key = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  }

  connectedCallback () {
    this.startChat()
  }

  startChat () {
    const startChatBtn = this.shadowRoot.querySelector('.welcome .start-chat')
    const username = this.shadowRoot.querySelector('.welcome #username')

    startChatBtn.addEventListener('click', (e) => {
      if (username.value) {
        console.log('Ready to chat!')
        this.clearWelcomeArea()
        this.chatArea.appendChild(chatTemplate.content.cloneNode(true))

        this.connect()
        this.textarea.addEventListener('keypress', (e) => {
          if (e.keyCode === 13) {
            e.preventDefault()
            this.sendMessage(e.target.value)
            e.target.value = ''
          }
        })
      }
    })
  }

  connect () {
    this.socket.addEventListener('open', (e) => {
      const sendChat = this.element.querySelector('.sendChat')
      sendChat.addEventListener('click', function (event) {
        event.preventDefault()
        this.send()
      }.bind(this), false)
    })
  }

  sendMessage (text) {
    const data = {
      type: 'message',
      data: text,
      username: this.username,
      channel: this.channel,
      key: this.key
    }
    this.socket.send(JSON.stringify(data))
    console.log('Sending message', text)
  }

  printMessage () {

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
