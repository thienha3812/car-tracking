var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Log = new Schema({
    d_IMEI:{
        type : String,
        required : true
    },
    year : {
        type : Number,
        default : new Date().getFullYear()
    },
    month : {
        type : Number,
        default : new Date().getMonth() + 1
    },
    date :{
        type : Number,
        default : new Date().getDate()
    },
    location : {
        type : Array,
        default : []
    }
},{
    collection : 'LogHistory',
    versionKey : false,
})
module.exports = mongoose.model('Log',Log)