var request = require('supertest'); // Sets request to imported file of supertest module
var faker = require('faker'); // Sets faker to imported file of faker module
var util = require('../lib/util.js'); // Sets util to imported file of util.js

describe('API: User Routes', function() {
  var server;
  var testingObjData = {
    dispName: faker.name.findName(),
    email: faker.internet.email(),
    password: '',
    phone: faker.phone.phoneNumber()
  }
  var testingObj;

  // Before / After each test create / destroy the express server to fully simulate unique requests.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  beforeEach(function() {
    server = require('../src/server.js');
  });
  afterEach(function() {
    server.close();
  });

  // User Create One
  it('User Create One', function(done) {
    request(server)
      .put('/api/user')
      .set('Accept', 'application/json')
      .send(testingObjData)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('User Create Route Request Data', testingObjData);
        util.debug('User Create Route Response', res.body);

        if (!util.hayTest(testingObjData, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');

        // Save info about the created as our Testing Object
        testingObj = res.body;
      })
      .expect(200, done);
  });

  // User Update One
  it('User Update', function(done) {
    var payload = testingObj;
    var testingObjDataKeys = Object.keys(testingObjData);
    payload[testingObjDataKeys[0]] = faker.company.bs();
    request(server)
      .put('/api/user/' + payload.id.toString())
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('User Update Payload', payload);
        util.debug('User Update Route Response', res.body);

        if (!util.hayTest(payload, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
      })
      .expect(200, done);
  });

  // User Read One
  it('User Read One', function(done) {
    request(server)
      .get('/api/user/' + testingObj.id.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('User Read Testing Data', testingObj);
        util.debug('User Read Route Response', res.body);

        if (!util.hayTest(testingObj, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
      })
      .expect(200, done);
  });

  // User Read All
  it('User Read All', function(done) {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('User Read All Route Response', res.body);

        if (res.body.length < 1) throw new Error('Less than 1 entry in the User Table');
      })
      .expect(200, done);
  });

  // User Destroy
  it('User Destroy', function(done) {
    request(server)
      .delete('/api/user/' + testingObj.id.toString())
      .set('Accept', 'application/json')
      .send({
        force: true
      })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('User Delete User Data', testingObj);
        util.debug('User Delete Route Response', res.body);

        if (!res.body.success) throw new Error('Destroy did not correctly work');
      })
      .expect(200, done);
  });

});
