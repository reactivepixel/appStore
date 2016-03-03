var request = require('supertest');
var faker = require('faker');
var util = require('../lib/util.js');

describe('User Routes', function() {
  var server;
  var testUserData = {
    dispName: 'Chapman',
    email: 'none@spam.com',
    password: 'unhashed',
    phone: '407.900.9277'
  }
  var testUser;

  // Before / After each test create / destroy the express server to fully simulate unique requests.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  beforeEach(function() {
    server = require('../src/server.js');
  });
  afterEach(function() {
    server.close();
  });

  // User Create One
  it('User Create One', function(done){
    request(server)
      .put('/api/user')
      .set('Accept', 'application/json')
      .send(testUserData)
      .expect('Content-Type', /json/)
      .expect(function(res){
        if(!util.hayTest(testUserData, res.body)) throw new Error('User not correctly added. Titles do not match.');

        testUser = res.body;
      })
      .expect(200, done);
  });
  //
  // // User Update One
  // it('User Update', function(done){
  //   var payload = testUser;
  //   payload.title = faker.company.bs();
  //   request(server)
  //     .put('/api/user/' + payload.id.toString())
  //     .set('Accept', 'application/json')
  //     .send(payload)
  //     .expect('Content-Type', /json/)
  //     .expect(function(res){
  //       if(res.body.title !== payload.title) throw new Error('Title did not update properly');
  //     })
  //     .expect(200, done);
  // });
  //
  // // User Read One
  // it('User Read One', function(done){
  //   request(server)
  //     .get('/api/user/' + testUser.id.toString())
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(function(res){
  //       if(testUser.id !== res.body.id) throw new Error('Returned ID does not match');
  //     })
  //     .expect(200, done);
  // });
  //
  // // User Read All
  // it('User Read All', function(done){
  //   request(server)
  //     .get('/api/user')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(function(res){
  //       if(res.body.length < 1) throw new Error('Less than 1 entry in the User Table');
  //     })
  //     .expect(200, done);
  // });
  //
  // // User Destroy
  // it('User Destroy', function(done){
  //   request(server)
  //     .delete('/api/user/' + testUser.id.toString())
  //     .set('Accept', 'application/json')
  //     .send({force: true})
  //     .expect('Content-Type', /json/)
  //     .expect(function(res){
  //       if(!res.body.success) throw new Error('Destroy did not correctly work');
  //     })
  //     .expect(200, done);
  // });

});
