var mongoose = require('mongoose')
var Schema = mongoose.Schema



var UserSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        trim :true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    role:{
        type : Number,
        required : true,        
    }

})

module.exports = mongoose.model('User',UserSchema)