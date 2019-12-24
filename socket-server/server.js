var mosca = require('mosca');
var socket = require('socket.io-client')('http://localhost:3000');
// Khỏi tạo kết nối tới database
require('./model/index')
// Schema
var Driver = require('./model/driver')

// Khi kết nối đến server socket thành công
socket.on('connect', function(){
  console.log('connected to socket server')
});
//
var ascoltatore = {
  // Định nghĩa mongodb
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};
var settings = {
  port: 8000,
  backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  var dataReceive = packet.payload.toString().split(',')
  console.log(packet.topic)
  console.log(dataReceive)
  if(packet.topic === 'CarTrackingZ'){
    let info = new Object()
    info.lat = dataReceive[3]
    info.lng = dataReceive[4]
    info.imei = client.id
    socket.send(JSON.stringify(info))
  }
  // console.log(packet.topic)
//  var driver =  new Driver({dr_name :" 123"})
//  driver.save()
//  socket.send(packet.payload.toString())
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
//   server.authenticate = function (client, username, password, callback) {
//     console.log(username)
//     // To authenticate
//     callback(null, true);
//     // To reject
//  }
}