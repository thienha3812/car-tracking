var mongoose = require('mongoose')
var Schema = mongoose.Schema



var AccountSchema = new Schema({
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
    email : {
        type : String,
        required:true,
        trim : true
    },
    fullName : {
        type : String,        
        required : true
    },
    role:{
        type : Number,
        required : true,  
        default : 3      
    }
},
{
    collection : "Account"
})

module.exports = mongoose.model('Account',AccountSchema)