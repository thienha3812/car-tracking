var express = require('express');
var router = express.Router();
var socket = require('socket.io-client')('http://localhost:5555');
var deviceNeedCheck = require('../model/deviceNeedCheck');
var deviceBalance = require('../model/deviceBalance');
var Car = require('../model/cars');
var historyBalance = require('../model/historyBalance')
var deviceOnline = require('../model/deviceOnline')
socket.on('connect', function () {
  console.log('connected to socket server')
})

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.query)
  deviceOnline.findOneAndUpdate({
    d_IMEI: req.query.imei
  }, {
    upsert: true,
    new: true
  }, function (err) {
    if (err) throw err
  })
  // Check nếu chưa trong bảng onlineDevice thì thêm vào
  if (req.query.balance) { // Nếu tồn tại biến blance
    console.log(req.query.balance)
    // Tìm và update record nếu ko tồn tại thì tạo
    deviceBalance.findOneAndUpdate({
      d_IMEI: req.query.imei,
    }, {
      balance: req.query.balance
    }, {
      setDefaultsOnInsert: true,
      upsert: true,
      new: true,
    }, function (err, result) {
      if (err) throw err
      let m =  new historyBalance({d_IMEI:req.query.imei,balance:req.query.balance})
      m.save(function(err){
        if(err) throw err;
        console.log('saved balance to history')
      })
    })
  }
  // Gửi thông tin về socket server
  // console.log(parseFloat(gps[4]))
  // socket.send({lng:parseFloat(gps[4]),lat:parseFloat(gps[3]),d(imei:req.query.imei})
  let gps = req.query.gps.split(',')
  let status = gps[1]
  let time = gps[2]
  let lat = gps[3]
  let lng = gps[4]
  let speed  = gps[6]
  socket.emit('gps',{lat : lat,lng :lng,speed:speed,imei:req.query.imei,time:time,status:status})
  //Xóa record trong bảng deviceNeedCheck với imei tương ứng
  deviceNeedCheck.deleteOne({
    IMEI: req.query.imei
  }, function (err, result) { 
    if (result.deletedCount == 0) { // Nếu số lượng xóa = 0 có nghĩa ko có record với imei tương ứng trong bảng 
      res.send("{1,300}")
    } else {
      // Ngược lạis
      res.send("{1,1}")
    }
    // }
  })
});

router.get('/checksimfromimei', function (req, res, next) {
  //Route thêm record với imei tương ứng vào bảng deviceNeedCheck
  var d = new deviceNeedChecđek()
  d.IMEI = req.query.imei
  d.save(function (err) {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send("Ok")
    }
  })
})
module.exports = router;
