var express = require('express');
var router = express.Router();
var Category = require('../model/Category');


router.post('/add',function(req,res,next){
    var c = new Category({name:req.body.name , url_image : req.body.url_image })
    c.save(function(err){
        if(err) res.send(err)
        res.send("1")
    })
})
router.get('/getall',function(req,res,next){
    Category.find({}).then(result=>{
        res.send(result)
    }).catch(err=>{
        console.log(err)
        res.status(500).send("Xảy ra lỗi !")
    })
})
router.post('/edit',function(req,res,next){
    Category.findByIdAndUpdate({_id:req.body.id},{name: req.body.name,url_image:req.body.url_image},function(err,result){
        if(err)res.send(err)
        res.send("1")
    }).catch(err=>{
        res.status(500).send("Xảy ra lỗi !")
    })
})
router.post('/delete',function(req,res,next){
    Category.findByIdAndRemove({_id:req.body.id},function(err,result){
        if(err) res.send(err)
        res.send('OK')
    }).catch(err=>{
        res.status(500).send("Xảy ra lỗi !")
    })
})
module.exports = router