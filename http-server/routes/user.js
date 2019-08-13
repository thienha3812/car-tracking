var express = require('express');
var router = express.Router();
var User = require("../model/User");

router.post('/login',function(req,res,next){
    User.findOne({username : req.body.username,password : req.body.password},function(err,result){
        if (err) res.send(err)
        console.log(result)
    })
})
router.post('/register',function(req,res,next){
    const user = {
        username : req.body.username,
        password : req.body.password,
        fullName : req.body.fullName,
        email : req.body.email,        
    }
    User.create(user).then((result)=>{
        console.log(result)
    }).catch(err=>{
        res.statusCode(500)
    })
})
router.post('/logout',function(){

})
module.exports = router