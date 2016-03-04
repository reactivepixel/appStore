var request = require('supertest');
var faker = require('faker');
var util = require('../lib/util.js');

describe('API: App Routes', function() {
  var server;
  var testingObjData = {
    title: faker.company.companyName(),
    description: faker.company.bs(),
    user_id: '3341f2aa-c8dd-465c-b6c8-a793d4426db9'
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

  // App Create One
  it('App Create One', function(done) {
    request(server)
      .put('/api/app')
      .set('Accept', 'application/json')
      .send(testingObjData)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (!util.hayTest(testingObjData, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');

        util.debug('App Create Route Request Data', testingObjData);
        util.debug('App Create Route Response', res.body);

        // Save info about the created as our Testing Object
        testingObj = res.body;
      })
      .expect(200, done);
  });

  // App Update One
  it('App Update', function(done) {
    var payload = testingObj;
    var testingObjDataKeys = Object.keys(testingObjData);
    payload[testingObjDataKeys[0]] = faker.company.bs();
    request(server)
      .put('/api/app/' + payload.id.toString())
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (!util.hayTest(payload, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
        util.debug('App Update Payload', payload);
        util.debug('App Update Route Response', res.body);
      })
      .expect(200, done);
  });

  // App Read One
  it('App Read One', function(done) {
    request(server)
      .get('/api/app/' + testingObj.id.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (!util.hayTest(testingObj, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
        util.debug('App Read Testing Data', testingObj);
        util.debug('App Read Route Response', res.body);
      })
      .expect(200, done);
  });

  // App Read All
  it('App Read All', function(done) {
    request(server)
      .get('/api/apps')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (res.body.length < 1) throw new Error('Less than 1 entry in the App Table');
        util.debug('App Read All Route Response', res.body);
      })
      .expect(200, done);
  });

  // App Destroy
  it('App Destroy', function(done) {
    request(server)
      .delete('/api/app/' + testingObj.id.toString())
      .set('Accept', 'application/json')
      .send({
        force: true
      })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if (!res.body.success) throw new Error('Destroy did not correctly work');
        util.debug('App Delete App Data', testingObj);
        util.debug('App Delete Route Response', res.body);
      })
      .expect(200, done);
  });

});
