var mongoose = require('mongoose');
var url = "mongodb://localhost/tracking" // Định nghĩa url cho mongodb


var db = mongoose.connect(url,{useNewUrlParser:true},function(err){
    if (err) throw err
    console.log('Connected to database')
})

module.exports = db