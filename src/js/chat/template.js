const welcomeTemplate = document.createElement('template')
welcomeTemplate.innerHTML = /* html */ `
<link rel="stylesheet" href="/css/chat.css">
<drag-able data-title="Chat">

<div class="chat" id="chat">
    <div class="welcome">
        <p>Choose username and channel</p>
        <input type="text" placeholder="Username" maxlength="15" id="username">
        <input type="text" placeholder="Channel" maxlength="30" id="channel">
        <a href="#" class="btn start-chat">Enter</a>
    </div>
</div>

</drag-able>
`

const chatTemplate = document.createElement('template')
chatTemplate.innerHTML = /* html */ `

<div class="messages">
        <div class="message">
            <p class="text"></p>
            <p class="author"></p>
        </div>
    <textarea class="messageArea"></textarea>
</div>
`

export {
  welcomeTemplate, chatTemplate
}
