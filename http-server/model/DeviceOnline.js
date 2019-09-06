var mongoose = require('mongoose')
var Schema = mongoose.Schema



var DeviceOnline = new Schema({
    d_IMEI:{
        type : String
    }
},{
    collection : "DeviceOnline",
    versionKey  : false
})

module.exports = mongoose.model("DeviceOnline",DeviceOnline)