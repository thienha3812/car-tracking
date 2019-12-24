var mongoose = require('mongoose');
var acl = require('acl')


mongoose.connection.on('connected', function () {
    acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "Acl_"));
    acl.allow([
        {
            roles: ['user'],
            allows: [
                // Car
                {
                    resources: ['/car/getall'],
                    permissions: ['GET'],
                },
                {
                    resources: ['/car/insert','/car/update'],
                    permissions: ['POST'],
                },
                // Driver
                {
                    resources: ['/driver/getall'],
                    permissions: ['GET'],
                },
                {
                    resources: ['/driver/insert','/driver/update'],
                    permissions: ['POST'],
                },
            ],
        },
        {
            roles: ['admin'],
            allows: [
                {
                    resources: ['/car/getall','/car/delete','/car/insert','/car/update'],
                    permissions: ['GET', 'POST'],                    
                },
            ],
        },
    ], () => {
        console.log("done")
    });
})
module.exports = acl