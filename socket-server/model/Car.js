var mongoose = require('mongoose')
var Schema = mongoose.Schema


var Car = new Schema({
    c_plate:{
        type : String,
        required : true
    },
    d_IMEI:{
        type : String,
        required : true
    }
},{
    collection : 'Car'
})
module.exports = mongoose.model('Car',Car)