// intiating a request to server to create a connection and keep it alive
const socket = io()
let changeTitleInterval = null
const defaultTitle = document.title

// event listeners
socket.on('connect', function () {
	const params = $.deparam(window.location.search);
	socket.emit('join', params, function(err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {

		}
	})
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
updateUsersList();