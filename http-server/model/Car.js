var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CarSchema = new Schema({
    c_plate: {
        type: String,
        unique : true
    },
    d_IMEI: {
        type: String,
        unique : true,
        default : ''
    },
    category_id : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    }
}, {
    collection: "Car",
    versionKey : false
})
module.exports = mongoose.model('Car', CarSchema);