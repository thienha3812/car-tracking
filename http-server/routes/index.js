var express = require('express');
var router = express.Router();
var Account = require('../model/Account');
var acl = require('acl');
var mongoose = require('mongoose')

mongoose.connection.on('connected', function () {
  acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "Acl_"));
})
/* GET home page. */
router.get('/', function(req, res, next) {  
  acl.addUserRoles("5d51382f8ec84c1704172671","user",function(){
    res.send("123")
  })
});

module.exports = router;  