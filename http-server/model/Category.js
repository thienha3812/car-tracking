var mongoose = require('mongoose')
var Schema = mongoose.Schema


var CategorySchema = new Schema({
    type : {
        type : String,
        required : true,
        default : "",
    },
    url_icon : {
        type: String,
        required : true,
        default :""
    },
    url_icon : {
        type: String,
        required : true,
        default :""
    }
},
{
    collection : "Category",
    versionKey  : false
})
module.exports = mongoose.model('Category',CategorySchema);