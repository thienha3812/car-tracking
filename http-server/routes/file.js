var formidable = require('formidable')
var express = require('express');
var router = express.Router();
var fs = require("fs");
var uuid = require('uuid')
router.post("/upload",function(req,res,next){
    var form = new formidable.IncomingForm();
    var fileName = uuid.v4() + ".jpg"
    form.parse(req, async function(err, fields, files) {
        if(err) throw err;
        
    });
    form.on('fileBegin', function (name, file){        
        file.path = './upload/' + fileName
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    res.send(process.env.IP + "/image/" + fileName)
})
module.exports = router;


