console.log('Welcome to live-screen-share ...')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')

const PORT = 3000

app.use(cors())

io.on('connection', function (socket) {

  console.log('a user connected', socket.id)

  socket.broadcast.emit('** NEW_USER_CONNECTED', socket.id);

  socket.on('disconnect', function () {
    console.log('user disconnected!')
    console.log('======================')
    socket.broadcast.emit('USER_DISCONNECTED', socket.id);
  })

  socket.on('VIDEO_IS_LIVE', function(payload) {
    const { base64Image, videoNumber } = payload;
    socket.broadcast.emit(`JOIN_LIVE-${videoNumber}`, base64Image);
  })
})

http.listen(PORT, function () {
  console.log(`Listening on *:3000`)
})