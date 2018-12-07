const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New connection received');

    // send only to the new user, a welcome message
    socket.emit('newMessage', {
        from: 'Application',
        text: 'Welcome user!',
        createdAt: new Date().getTime()
    })
    
    socket.broadcast.emit('newMessage', {
        from: 'Application',
        text: 'New user joined!',
        createdAt: new Date().getTime()
    })
    
    // socket.emit('newMessage', {
    //     from: 'Divyanshu',
    //     text: 'Hey there!',
    //     createdAt: new Date().getTime()
    // })

    socket.on('createMessage', (message) => {
        // console.log('New message created', message);

        // send message to all the open connections
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    // socket.on('disconnect', () => {
    //     console.log('Connection lost')
    // })
})

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});