var mongoose = require('mongoose')
var Schema = mongoose.Schema


var deviceOnline = new Schema({
  d_IMEI: {
    type: Number,
  }
}, {
  collection: 'DeviceOnline',
  versionKey : false
})

module.exports = mongoose.model('deviceOnline', deviceOnline)
