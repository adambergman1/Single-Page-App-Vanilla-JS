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
  }

  connectedCallback () {
    this.startChat()
    this.getUsername()
  }

  /**
   * Initiates loading of the chat application
   *
   * @memberof Chat
   */
  startChat () {
    const rememberMe = this.shadowRoot.querySelector('input[id="remember-me"]')
    const startChatBtn = this.shadowRoot.querySelector('.welcome .start-chat')

    if (window.localStorage.hasOwnProperty('username')) {
      this.getUsername()
      this.enterChat()
    } else {
      startChatBtn.addEventListener('click', (e) => {
        if (this.username.value && rememberMe.checked) {
          this.setUsername()
          this.enterChat()
        } else if (this.username.value) {
          this.enterChat()
        }
        startChatBtn.removeEventListener('click', (e))
      })
    }
  }

  /**
   * Connects to the chat channel
   *
   * @memberof Chat
   */
  enterChat () {
    this.clearWelcomeArea()
    this.chatArea.appendChild(chatTemplate.content.cloneNode(true))
    this.connect()
    this.listenToEnterBtn()
  }

  /**
   * Connects to the WebSocket, returns an error message if connection refused and prints all messages being sent to the socket
   *
   * @returns a connection
   * @memberof Chat
   */
  async connect () {
    if (this.socket && this.socket.readyState === 1) {
      return this.socket
    }

    this.socket = await new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')

    this.socket.addEventListener('error', e => {
      this.chatOffline()
    })

    this.socket.addEventListener('message', e => {
      const message = JSON.parse(e.data)
      if (message.type === 'message' && message.username !== 'MyFancyUsername') {
        if (message.channel === this.channel.value) {
          this.printMessage(message)
          const audio = new window.Audio('./music/new-message.mp3')
          audio.play()
        }
      }
    })
  }

  /**
   * Sends the submitted message to the socket
   *
   * @param {*} text
   * @memberof Chat
   */
  async sendMessage (text) {
    const data = {
      type: 'message',
      data: text,
      username: this.username.value || 'Pro',
      channel: this.channel.value || '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    const connection = await this.connect()
    connection.send(JSON.stringify(data))
  }

  /**
   * Prints the messages that has been and received by the socket
   *
   * @param {*} message
   * @memberof Chat
   */
  printMessage (message) {
    let template = this.shadowRoot.querySelectorAll('template')[0]
      .content.firstElementChild.cloneNode(true)

    if (this.username.value !== message.username) {
      // Not my message, target the last div
      template = this.shadowRoot.querySelectorAll('template')[0]
        .content.lastElementChild.cloneNode(true)
    }

    template.querySelectorAll('.author')[0].textContent = message.username + ':'
    template.querySelectorAll('.text')[0].textContent = message.data
    template.querySelectorAll('.time')[0].textContent = `Sent: ${new Date().toLocaleString('sv-se')}`

    // Check if textarea is clicked, reveal timestamp in that case
    template.querySelectorAll('.text')[0].addEventListener('click', (e) => {
      template.querySelectorAll('.time')[0].classList.toggle('visible')
    })

    const messagesDiv = this.shadowRoot.querySelector('.messages')
    messagesDiv.appendChild(template)

    // Scroll down to latest sent message
    const divHeight = messagesDiv.scrollHeight
    messagesDiv.scrollTop = divHeight
  }

  /**
   * Removes the div that asks user for username and channel
   *
   * @memberof Chat
   */
  clearWelcomeArea () {
    const welcomeArea = this.shadowRoot.querySelector('.welcome')

    if (welcomeArea) {
      while (welcomeArea.hasChildNodes()) {
        welcomeArea.removeChild(welcomeArea.lastChild)
      }
      welcomeArea.parentNode.removeChild(welcomeArea)
    }
  }

  /**
   * Listens to any values submitted in the message box and sends them if  Enter button is pressed
   *
   * @memberof Chat
   */
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
  }

  /**
   * Saves the username submitted by user
   *
   * @memberof Chat
   */
  setUsername () {
    if (this.username.value !== null) {
      window.localStorage.setItem('username', JSON.stringify(this.username.value))
    }
  }

  /**
   * Pre-defining the username if it has been entered before
   *
   * @memberof Chat
   */
  getUsername () {
    if (window.localStorage.getItem('username') !== null) {
      this.username.value = JSON.parse(window.localStorage.getItem('username'))
    }
  }

  /**
   * Sends an offline message to the user that the chat couldnt connect
   *
   * @memberof Chat
   */
  chatOffline () {
    const messageBox = this.shadowRoot.querySelector('.message-area')
    messageBox.classList.toggle('offline')

    const data = {
      username: 'Server',
      data: 'Could not connect. Please check your internet connection.'
    }
    this.printMessage(data)
  }
}

window.customElements.define('chat-app', Chat)

export {
  Chat
}
