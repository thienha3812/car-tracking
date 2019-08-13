var express = require('express');
var router = express.Router();
var Account = require('../model/Account');
var acl = require('acl');
var mongoose = require('mongoose')

mongoose.connection.on('connected', function () {
  acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "_acl"));
})


/* GET home page. */
router.post('/', function(req, res, next) {  

});

module.exports = router;  