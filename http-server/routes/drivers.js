var express = require('express');
var router = express.Router();
var Driver = require('../model/Driver')

router.get('/getall',function(req,res,next){
    Driver.find({},function(err,result){
        if(err) throw err;
        res.json(result)    
    })
})
router.post('/insert',function(req,res,next){
    var d = new Driver({dr_name:req.body.dr_name,dr_birthday:req.body.dr_birthday,dr_avatar:req.body.dr_avatar})
    d.save(function(err){
        if(err) throw err;
        console.log(err)
        res.status(200).send("Ok")
    })
})
router.post('/delete',function(req,res,next){
    Driver.findByIdAndRemove({_id : req.body._id},function(err,result){
      if(err){
        res.status(404).send(err)
      }else{
        res.status(200).send('OK')
      }
    })
  })
module.exports = router