const welcomeTemplate = document.createElement('template')
welcomeTemplate.innerHTML = /* html */ `
<link rel="stylesheet" href="./css/chat.css">
<drag-able data-title="Chat">

<img src="./image/chat.png" class="app-icon">

<div class="chat" id="chat">
    <div class="welcome">
        <p>Choose username and channel</p>
        <input type="text" placeholder="Username" maxlength="15" id="username">
        <input type="text" placeholder="Channel" maxlength="30" id="channel">

        <label for="remember-me">Remember me</label>
        <input type="checkbox" id="remember-me">
        
        <a href="#" class="btn start-chat">Enter</a>
    </div>
</div>

</drag-able>
`

const chatTemplate = document.createElement('template')
chatTemplate.innerHTML = /* html */ `
    <div class="messages">
        <template>
            <div class="my-message">
                <p class="author"></p>
                <p class="text"></p>
                <span class="time"></span> 
            </div>

            <div class="received-message">
            <span class="time"></span>
                <p class="author"></p>
                <p class="text"></p>
            </div>
        </template>
        </div>

            <div class="send-msg">
            <div class="buttons">
                </div>
                <div class="message-area" contenteditable="true"></div>
             </div>
`

export {
  welcomeTemplate, chatTemplate
}
