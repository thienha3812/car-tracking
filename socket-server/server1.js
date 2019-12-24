var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var uuid = require('uuid/v4');
var moongose = require('mongoose')
moongose.connect('mongodb://localhost/ffchat', {
  useNewUrlParser: true,
}, function (err) {
  if (err) throw err;
  console.log('conected to database')
})
app.get('/', function (req, res) {
  res.status(500)
});
var queue = new Array()

function findPeerAndConnect(socket) {
  console.log(queue.length)
  if (queue.length == 0) {
    queue.push(socket)
  } else {
    var peer = queue.pop()
    var room = uuid()
    peer.join(peer.id + '' + socket.id)
    socket.join(peer.id + '' + socket.id)
    socket.emit('Bắt đầu trò chuyện', room)
    peer.emit('Bắt đầu trò chyện', room)
  }
}
io.on('connection', function (socket) {
  socket.on('login', function (data) {
      console.log("---->Login")
      console.log(socket.id)
      findPeerAndConnect(socket)
    }),
    socket.on('chat', function (message) {
      console.log("---->Chat")
      console.log(Object.keys(socket.rooms)[1])
      socket.broadcast.to(Object.keys(socket.rooms)[1]).emit('data', message)

    })
  socket.on('disconnect', function () {

  })
  socket.on('disconnecting', function () {
    console.log("---->Disconecting")
    var currentRoom = Object.keys(socket.rooms)[1]
    console.log(Object.keys(socket.rooms)[1])
    var clients = io.sockets.adapter.rooms[currentRoom]
    if (!clients.sockets) {
      return;
    } else {
      socket.broadcast.to(currentRoom).emit('data', 'someone disconnect')
      Object.keys(clients.sockets).forEach(x => {
        io.sockets.clients().connected[x].leave(currentRoom)
      })
    }
    console.log(clients)
  })
});



http.listen(5555, function () {
  console.log('listening on *:5555');
});