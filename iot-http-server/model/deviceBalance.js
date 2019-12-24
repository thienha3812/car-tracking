var mongoose = require('mongoose')

var Schema = mongoose.Schema


var deviceBalance = new Schema({
    d_IMEI :{
        type : String,  
        index : true      
    },
    balance:{
        type : String,
    }
},{
    collection : "DeviceBalance",
    versionKey:false
})

module.exports = mongoose.model('deviceBalance',deviceBalance)