var express = require("express");
var router = express.Router();
var Driver = require("../model/Driver");
var formidable = require("formidable");
var uuid = require("uuid");
var boom = require("boom");
router.get("/getall", function (req, res, next) {
  Driver.find({}, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});
router.post("/insert", function (req, res, next) {
  try {
    var d = new Driver({
      dr_card: req.body.dr_card,
      dr_name: req.body.dr_name,
      dr_birthday: req.body.dr_birthday,
      dr_rank: req.body.dr_rank,
    });
    d.save(function (err) {
      if (err) throw err;
      res.status(200).send("Ok");
    });
  } catch (err) {
    boom.boomify(err, { statusCode: 500 })
  }
});
router.post("/delete", function (req, res, next) {
  Driver.findByIdAndRemove({ _id: req.body._id }, function (err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send("OK");
    }
  });
});
router.post("/update", function (req, res, next) {
  Driver.findOneAndUpdate(
    { _id: req.body._id },
    {
      dr_card: req.body.dr_card,
      dr_name: req.body.dr_name,
      dr_rank: req.body.dr_rank,
      dr_birthday: req.body.dr_birthday
    },
    function (err, result) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("OK");
      }
    }
  );
});
module.exports = router;
