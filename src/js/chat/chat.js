import { welcomeTemplate, chatTemplate } from './template.js'

class Chat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(welcomeTemplate.content.cloneNode(true))
    this.socket = null
    this.chatArea = this.shadowRoot.querySelector('.chat')
    this.username = this.shadowRoot.querySelector('.welcome #username')
    this.channel = this.shadowRoot.querySelector('.welcome #channel')
    this.currentTime = new Date().toLocaleString('sv-se')
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
        this.listenToEnterBtn()
      }
      startChatBtn.removeEventListener('click', (e))
    })
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === 1) {
        resolve(this.socket)
        return
      }

      this.socket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')

      this.socket.addEventListener('open', e => {
        resolve(this.socket)
      })

      this.socket.addEventListener('error', e => {
        reject(new Error('could not connect to server'))
      })

      this.socket.addEventListener('message', e => {
        const message = JSON.parse(e.data)
        if (message.type === 'message' && message.username !== 'MyFancyUsername') {
          this.printMessage(message)
        }
      })
    })
  }

  sendMessage (text) {
    const data = {
      type: 'message',
      data: text,
      username: this.username.value || 'Pro',
      time: this.currentTime,
      channel: this.channel.value | '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.connect().then(() => {
      this.socket.send(JSON.stringify(data))
      console.log('Sending message', text)
    })
  }

  printMessage (message) {
    let template = this.shadowRoot.querySelectorAll('template')[0]
      .content.firstElementChild.cloneNode(true)

    if (this.username.value === message.username) {
      console.log('My message')
    } else {
      console.log('Not my message')
      template = this.shadowRoot.querySelectorAll('template')[0]
        .content.lastElementChild.cloneNode(true)
    }

    template.querySelectorAll('.author')[0].textContent = message.username + ':'
    template.querySelectorAll('.text')[0].textContent = message.data
    template.querySelectorAll('.time')[0].textContent = `Sent: ${message.time}`

    const messagesDiv = this.shadowRoot.querySelector('.messages')
    messagesDiv.appendChild(template)

    // Scroll down to latest sent message
    const divHeight = messagesDiv.scrollHeight
    messagesDiv.scrollTop = divHeight
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

  listenToEnterBtn () {
    const messageBox = this.shadowRoot.querySelector('.message-area')
    messageBox.focus()
    messageBox.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        this.sendMessage(messageBox.textContent)
        messageBox.textContent = ''
      }
    })

    const writeCode = this.shadowRoot.querySelector('.write-code')
    writeCode.addEventListener('click', (e) => {
      writeCode.classList.toggle('clicked')
      messageBox.classList.toggle('code')
    })
  }

  addLogOutOption () {
    const loggedInUser = this.shadowRoot.querySelector('.logged-in-user')
    loggedInUser.textContent = this.username.value

    const logOut = this.shadowRoot.querySelector('.log-out')
    logOut.addEventListener('click', (e) => {
      this.username.value = ''
    })
  }
}

window.customElements.define('chat-app', Chat)

export {
  Chat
}
