var express = require("express");
var router = express.Router();
var Driver = require("../model/Driver");
var formidable = require("formidable");
var uuid = require("uuid");
var boom = require("boom");
router.get("/getall", function(req, res, next) {
  Driver.find({}, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
router.post("/insert", function(req, res, next) {
  var fileName = uuid.v4();
  var form = new formidable.IncomingForm();
  var filePath = process.env.IP + "/image/" + fileName;
  form.parse(req, async (err, fields, files) => {
    let fileType = "";
    if (files["dr_avatar"].type == "image/png") {
      fileType = "png";
    }
    if (files["dr_avatar"].type == "image/jpg") {
      fileType = "jpg";
    }
    if (fields["dr_name"]) {
      var d = new Driver({
        dr_name: fields["dr_name"],
        dr_card: fields["dr_card"],
        dr_sex: fields["dr_sex"],
        dr_avatar: filePath + "." + fileType,
        dr_phone: fields["dr_phone"],
        dr_rank: fields["dr_rank"],
        dr_birthday: fields["dr_birthday"],
        dr_unit: fields["dr_unit"]
      });
      await d.save();
    } else {
      res.status(500).send({message:"Vui lòng nhập lại thông tin!"})
    }
  });
  form.on("fileBegin", async   function (name, file)  {
    if (file.type == "image/png") {
      file.path = "./upload/" + fileName + ".png";            
    }
    if (file.type == "image/jpg") {
      file.path = "./upload/" + fileName + ".jpg";
    }
  })
  form.on("end",()=>{
    res.sendStatus(200)
  })
});
router.post("/delete", function(req, res, next) {
  Driver.findByIdAndRemove({ _id: req.body._id }, function(err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send("OK");
    }
  });
});
router.post("/update", function(req, res, next) {
  var update  = {
        dr_card: req.body.dr_card,
        dr_name: req.body.dr_name ,
        dr_rank: req.body.dr_rank,
        dr_birthday: req.body.dr_birthday,
        dr_card: req.body.dr_card,
        dr_phone: req.body.dr_phone,
        dr_sex: req.body.dr_sex,
        dr_unit: req.body.dr_unit
  }
  for(key of Object.keys(update)){
      if(update[key] == ""){
        delete update[key]
      }
  }  
  Driver.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set : {
        ...update
      }
    },
    {
       
    }, 
    function(err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("OK");
      }
    }
  );
});
module.exports = router;
