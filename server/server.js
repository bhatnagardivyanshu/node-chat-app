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

    socket.emit('newMessage', {
        from: 'Divyanshu',
        text: 'Hey there!',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (data) => {
        console.log('New message created', data);
    })

    // socket.on('disconnect', () => {
    //     console.log('Connection lost')
    // })
})

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});