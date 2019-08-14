var express = require('express');
var router = express.Router();
var User = require("../model/Account");
var acl = require('acl')
var mongoose = require('module')
var jwt = require('jsonwebtoken');


router.post('/login',function(req,res,next){
    User.findOne({username : req.body.username,password : req.body.password},function(err,result){
        if (err) res.send(err)
        jwt.sign({username : result.username , id: result._id},"carTracking",{expiresIn:60*60},function(err,encoded){
            if(err) res.sendStatus(500)
            res.send({token:encoded})
        })
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