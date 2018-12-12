const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

const io = socketIO(server);

io.on('connection', (socket) => {

	console.log('New connection!');
	
	// send welcome message to the new user
	socket.emit('newMessage', generateMessage('Admin', 'Welcome user!'))

	// send new user joined notification to all the other users
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'))
    
    socket.on('createMessage', (message, callback = null) => {

		// send message to all the users
		io.emit('newMessage', generateMessage(message.from, message.text));
		if (callback) {
			callback('some data');
		}
    })

    socket.on('disconnect', () => {
        console.log('Connection lost\n')
    })
})

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});