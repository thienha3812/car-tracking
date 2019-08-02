var mongoose = require('mongoose')
var Schema = mongoose.Schema


var Car = new Schema({
  c_plate: {
    type: String,
  },
  d_IMEI: {
    type: String
  }
}, {
  collection: 'Car'
})

module.exports = mongoose.model('Car', Car)
