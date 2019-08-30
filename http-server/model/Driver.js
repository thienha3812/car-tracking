var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DriverSchema = new Schema({
    dr_name: {
        type: String,
        required:true
    },
    dr_avatar:{
        type : String,
        default : ''
    },
    dr_birthday:{
        type : String,
        default : ''
    },
    dr_rank : {
        type : String,
        default : ''
    },
    dr_card : {
        type : String,
        default : ''
    },
    dr_sex : {
        type : String,
        default : ''
    },
    dr_unit : {
        type : String,
        default : ''
    },
    dr_phone : {
        type : Number,
        default : ''
    },
}, {
    collection: "Driver",
    versionKey : false
})
module.exports = mongoose.model('Driver', DriverSchema);
