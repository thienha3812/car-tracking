var mongoose = require('mongoose');
var acl = require('acl')


mongoose.connection.on('connected', function () {
    acl = new acl(new acl.mongodbBackend(mongoose.connection.db, "_acl"));
    acl.allow([
        {
            roles: ['user'],
            allows: [
                {
                    resources: ['/api/events', '/api/categories'],
                    permissions: ['get', 'post', 'put', 'delete'],
                },
            ],
        },
        {
            roles: ['admin'],
            allows: [
                {
                    resources: ['/api/users'],
                    permissions: ['get', 'post', 'put', 'delete'],
                },
            ],
        },
    ], () => {
        console.log("done")
    });
    acl.addRoleParents('user', 'guest');
    acl.addRoleParents('admin', 'user');
    
})
module.exports = acl