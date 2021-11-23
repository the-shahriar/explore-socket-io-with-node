const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'))


http.listen(port, ()=> {
    console.log('Server is running');
})

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
})


// socket
io.on('connection', (socket)=> {
    socket.on('message', (msg)=> {
        socket.broadcast.emit('message', msg);
    })
})