console.log('Welcome to live-screen-share ...')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = 3000

io.on('connection', function (socket) {

  console.log('a user connected', socket.id)

  socket.broadcast.emit('** NEW_USER_CONNECTED', socket.id);

  socket.on('disconnect', function () {
    console.log('user disconnected!')
    console.log('======================')
    socket.broadcast.emit('USER_DISCONNECTED', socket.id);
  })

  socket.on('VIDEO_IS_LIVE', function(base64Image) {
    socket.broadcast.emit('JOIN_LIVE', base64Image);
  })
})

http.listen(PORT, function () {
  console.log(`Listening on *:3000`)
})