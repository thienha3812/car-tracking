var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next){
  let data = req.query.gps.toString().split(',')
  console.log(data)
  res.send('respond with a resource');
});

module.exports = router;
