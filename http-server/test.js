//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app.js');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('/user/login user', () => {
  it('it should be login', (done) => {
    let user = {
      username : "",
      password : "admin"
    }
    chai.request(server)
      .post('/user/login')
      .send(user)
      .end((err, res) => {        
        done()
      })
  });
});