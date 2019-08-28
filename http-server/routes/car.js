var express = require('express');
var router = express.Router();
var Car =  require('../model/Car')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(404)
});
router.post('/insert',function(req,res,next){
    var c = new Car()
    c.c_plate = req.body.plate
    c.d_IMEI = req.body.imei
    c.category_id = req.body.category_id 
    c.save(function(err){
      if(err){
        if(err.code === 11000){
        res.status(404).send('Địa chỉ imei hoặc biển số xe đã tồn tại')}
        else{
          res.status(404).send(err)
        }
      }else{
        res.status(200).send('Ok')
      }
    })
});
router.post('/delete',function(req,res,next){
  Car.findByIdAndRemove({_id : req.body._id},function(err,result){
    if(err){
      res.status(404).send(err)
    }else{
      res.status(200).send('OK')
    }
  })
})
router.post('/update',function(req,res,next){
  console.log(req.body)
    Car.findByIdAndUpdate({_id:req.body._id},{c_plate : req.body.c_plate,d_IMEI:req.body.d_IMEI},function(err,result){
      if(err){
        throw err;
        res.status(404).send(err)
      }else{
        res.status(200).send("Ok")
      }
    })
});
router.get('/getall',function(req,res,next){
  Car.find({}).then((result)=>{
    res.send(result)
  })
});

module.exports = router;
