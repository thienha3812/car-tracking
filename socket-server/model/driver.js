const mongoose = require('mongoose');
 

var dit = new mongoose.Schema({
    dr_name : String,
    dr_avatar : String,
    dr_birthday : String
});

module.exports = mongoose.model('Driver',dit,'Driver')