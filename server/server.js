// Package Imports
const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

// Local Imports
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

/** 
 * 
 * DIFFERENT WAYS OF SENDING MESSAGES
 * io.emit - to everyone connected
 * socket.broadcast.emit - to everyone except the current user
 * socket.emit - to specific user
 * 
 * CHANNELS
 * socket.join('channel-name') - connects to the channel
 * socket.leave('channel-name') - leaves the channel
 * io.to('channel-name').emit - to everyone in that specific channel
 * socket.broadcast.to('some-channel').emit - to everyone in the channel but current user
 */

io.on('connection', (socket) => {

	console.log('New connection!');
	
	// send welcome message to the new user
	// welcomeUser(socket);

	// send new user joined notification to all the other users
	// newUserJoinedMessage(socket);

	onJoin(socket);
	
	// createMessage listener
    onCreateMessage(socket);

	// createLocationMessage listener
	onCreateLocationMessage(socket);
	
    onLeave(socket);
})

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


// function newUserJoinedMessage(socket) {
// 	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));
// }

function newUserJoinedRoomMessage(socket, name, room) {
	socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} joined`));
}

function onJoin(socket) {
	
	socket.on('join', ({name, room}, callback) => {
		if (!isRealString(name) || !isRealString(room)) {
			return callback('Name and Room Name are required');
		}

		welcomeUser(socket);
		newUserJoinedRoomMessage(socket, name, room);
		
		socket.join(room);
		users.removeUser(socket.id);
		users.addUser(socket.id, name, room);

		io.to(room).emit('updateUsersList', users.getUsersList(room))
		
		callback();
	});
}

function welcomeUser(socket) {
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
}

function onCreateMessage(socket) {
	socket.on('createMessage', (message, callback = null) => {
		// send message to all the users
		io.emit('newMessage', generateMessage(message.from, message.text));
		if (callback) {
			callback();
		}
	});
}

function onCreateLocationMessage(socket) {
	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
	})
}

function onLeave(socket) {
	socket.on('disconnect', () => {
		const user = users.removeUser(socket.id);
		console.log('User Left\n', user);

		if(user) {
			io.to(user.room).emit('updateUsersList', users.getUsersList(user.room))
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left.`))
		}
		
	});
}
