// Make client side socket connection

var socket = io.connect('http://localhost:4000');

var chatMessage = document.getElementById('chat-message');
var chatHandle = document.getElementById('chat-handle');
var chatOutput = document.getElementById('chat-output');
var sendBtn = document.getElementById('send-buttom');
var chatFeedback = document.getElementById('chat-feedback');

// emit event

sendBtn.addEventListener('click',()=>{
    socket.emit('chat',{
        message : chatMessage.value,
        handle : chatHandle.value
    })
});

chatMessage.addEventListener('keypress', () =>{
    socket.emit('typing',chatHandle.value);
})

// listen for events
socket.on('chat',(data)=>{
    chatOutput.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>';
    chatFeedback.innerHTML ='';
})

socket.on('typing',(data) =>{
    chatFeedback.innerHTML = '<p> <em>' + data + 'is typing...</em> </p>';
})