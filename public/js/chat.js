// intiating a request to server to create a connection and keep it alive
const socket = io()
let changeTitleInterval = null
const defaultTitle = document.title

// event listeners
socket.on('connect', function () {
  console.log('Connected to server!')
})

socket.on('disconnect', function () {
  console.log('Disconnected to server!')
})

// socket.on('newMessage', function (message) {
// 	console.log('New message received', message);
// })

createMessage();
readMessage();
sendLocation();