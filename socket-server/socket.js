var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');
var time = require('moment');

//Kết nối database
require('./model/index');
var Car = require("./model/Car")
var Log = require("./model/log")
app.get('/', function (req, res) {
  res.status(500)
})

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data)
  })
  socket.on('gps', async function (data) {
    console.log(data)
    let year = parseInt(data.time.slice(0, 4))
    let month = parseInt(data.time.slice(4, 6))
    let date = parseInt(data.time.slice(6, 8))
    let hour = parseInt(data.time.slice(8, 10)) + 7
    let minute = parseInt(data.time.slice(10, 12))
    let second = parseInt(data.time.slice(12, 14))
    let location = {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng)
    }
    if (parseInt(data.status) !== 0) {
      await Log.findOneAndUpdate({
        d_IMEI: data.imei,
        date: new Date().getDate(),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      }, {
        $push: {
          location: {
            year,
            month,
            date,
            hour,
            minute,
            second,
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng)
          }
        }
      }, {
        upsert: true,
        new: true
      })
    }

    Car.findOne({
      d_IMEI: data.imei
    }, function (err, result) {
      var temp = {
        location,
        speed: parseFloat(data.speed),
        car_information: result
      };
      //console.log(temp);
      socket.broadcast.to('deviceReceive').emit('data', JSON.stringify(temp))
    })
  })
  socket.on('clientConnect', function () {
    socket.join("deviceReceive")
  })
});



http.listen(5023, function () {
  console.log('listening on *:5023');
});