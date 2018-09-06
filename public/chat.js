// Make client side socket connection

var socket = io.connect('http://localhost:4000');

const accessKey = "73996054a5bc21d080d8dd06376ae5c5";

var chatMessage = document.getElementById('chat-message');
var chatHandle = document.getElementById('chat-handle');
var chatOutput = document.getElementById('chat-output');
var sendBtn = document.getElementById('send-buttom');
var chatFeedback = document.getElementById('chat-feedback');




// load all messages in a particular room

document.addEventListener('DOMContentLoaded',()=>{
    var hostname =  window.location.hostname;
    var publicIp = getPublicIp();
    

    //loadPublicMessage(room);

    socket.emit('joinRom',{
        room : hostname,
        machinePublicIp :"72.192.250.214"
    })
})


function getPublicIp (){
    var machineIp;
   $.get("https://ipinfo.io", function(response){
   },'jsonp');
   return machineIp;
}
/* 
function loadPublicMessage(room){
    const Http  = new XMLHttpRequest();
    const url = '';
    Http.open('GET',url);
    Http.send();

    Http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          //  appendMessagesToDom(Http.responseText);
        }
    }
} */

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


$.get("https://api.ipify.org?format=json", function(response) {
  console.log(response.ip, response.country);
}, "json")