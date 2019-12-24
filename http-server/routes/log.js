var express = require('express');
var router = express.Router();
var Log =  require("../model/Log");


router.post('/getlog',function(req,res,next){
    Log.find({date:req.body.date,month:req.body.month,year:req.body.year},function(err,result){
        if(err) res.status(404).send(err)
        res.json(result)
    })
})

module.exports = router