var acl = require('acl');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

mongoose.connection.on('connected', function () {
    acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "Acl_"));
})

module.exports.accessControlList = function () {
    return function (req, res, next) {            
        jwt.verify(req.headers.authorization, "carTracking", function (err, decoded) {
            if (err) res.send(err)            
            acl.isAllowed(decoded.id, req.originalUrl, req.method, function (err, allowed) {
                console.log(decoded.id)
                if (err) res.send(err)
                console.log(allowed)                
                if(allowed){
                    next()
                }else{
                    res.status(500).send("Bạn không có quyền sử dụng chức năng này")
                }
            })
        })
    }
}