var mongoose = require('mongoose')

var Schema = mongoose.Schema


var deviceNeedCheck = new Schema({
    IMEI :{
        type : String,
    }
},{
    collection : "DeviceNeedCheck",
    versionKey:false,
    timestamps :true
})

module.exports = mongoose.model('deviceNeedCheck',deviceNeedCheck)