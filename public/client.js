const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    name = prompt('Please enter your name');
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

const sendMessage = (message) => {
    let msg = {
        user: name,
        message: message.trim()
    }
    // appendMessage
    appendMessage(msg, 'outgoing');

    // clear input
    textarea.value = '';

    scrollToBottom();

    // send to server
    socket.emit('message', msg)
}

// append
const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);

}

// receive message from server
socket.on('message', (msg)=> {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})


const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}