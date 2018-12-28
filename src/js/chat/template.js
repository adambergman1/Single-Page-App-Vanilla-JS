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
        <template>
            <div class="my-message">
            <span class="time"></span> 
                <p class="author"></p>
                <p class="text"></p>
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
                    <a href="#" class="write-code"><img src="/image/code.svg"></a>
                </div>
                <div class="message-area" contenteditable="true"></div>
             </div>

            <div class="user-info">
            <p>Signed in as: <span class="logged-in-user"></span>. <a href="#" class="log-out">Log out?</a></p>
            </div>
`

export {
  welcomeTemplate, chatTemplate
}
