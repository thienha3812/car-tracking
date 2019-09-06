var express = require('express');
var router = express.Router();
var DeviceOnline = require("../model/DeviceOnline");

router.get("/getdeviceonline", function (req, res, next) {
    DeviceOnline.find({}).then(result=>{
        res.send(result)
    })
});

module.exports = router