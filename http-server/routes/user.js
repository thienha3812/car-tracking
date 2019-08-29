var express = require('express');
var router = express.Router();
var User = require("../model/Account");
var acl = require('acl')
var mongoose = require('module')
var jwt = require('jsonwebtoken');


router.post('/login', async function (req, res, next) {    
    const user = await User.findOne({ username: req.body.username, password: req.body.password })    
    if (user) {
        jwt.sign({ username: user.username, id: user._id }, "carTracking", { expiresIn: '1d' }, function (err, encoded) {
            if (err) throw err
            res.json({ token: encoded })
        })
    }else{
        res.status(500).send("Vui lòng kiểm tra lại thông tin");
    }

})
router.post('/register', function (req, res, next) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        email: req.body.email,
    }
    User.create(user).then((result) => {
        console.log(result)
    }).catch(err => {
        res.statusCode(500)
    })
})
router.post('/logout', function () {

})
module.exports = router