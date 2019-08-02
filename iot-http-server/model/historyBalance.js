var mongoose = require('mongoose')
var Schema = mongoose.Schema


var messageBalance = new Schema({
  d_IMEI: {
    type: String,
    sparse: true
  },
  balance: {
    type: String
  }
}, {
  collection: 'BalanceMessage',
  versionKey: false
})

module.exports = mongoose.model('messageBalance', messageBalance)
