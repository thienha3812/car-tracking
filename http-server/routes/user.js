var express = require('express');
var router = express.Router();
var User = require("../model/User");

router.post('/login',function(req,res,next){
    User.findOne({username : req.body.username,password : req.body.password},function(err,result){
        if (err) res.send(err)
        console.log(result)
    })
})
module.exports = router