var mongoose = require('mongoose')
var Schema = mongoose.Schema


var CategorySchema = new Schema({
    name : {
        type : String,
        required : true,
        default : "",
    },
    url_image : {
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