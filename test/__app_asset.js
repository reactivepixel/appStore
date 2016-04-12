var request = require('supertest');
var faker = require('faker');
var util = require('../lib/util.js');

describe('API: App Asset Routes', function() {
  var server;
  var testingObjData = {
    app_id: '075d3674-e0b4-47f2-9428-d28fb1d53604',
    link: faker.image.imageUrl(),
    type: 'image'
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

  // App Asset Create One
  it('App Asset Create One', function(done) {
    request(server)
      .put('/api/app/' + testingObjData.app_id + '/asset')
      .set('Accept', 'application/json')
      .send(testingObjData)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('App Asset Create Route Request Data', testingObjData);
        util.debug('App Asset Create Route Response', res.body);

        if (!util.hayTest(testingObjData, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');

        // Save info about the created as our Testing Object
        testingObj = res.body;
      })
      .expect(200, done);
  });

  // App Asset Update One
  it('App Asset Update', function(done) {
    var payload = testingObj;
    payload.link = faker.image.imageUrl() + '?update=true';
    request(server)
      .put('/api/app/' + testingObjData.app_id + '/asset/' + payload.id.toString())
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('App Asset Update Payload', payload);
        util.debug('App Asset Update Route Response', res.body);

        if (!util.hayTest(payload, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
      })
      .expect(200, done);
  });

  // App Asset Read One
  it('App Asset Read One', function(done) {
    request(server)
      .get('/api/asset/' + testingObj.id.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('App Asset Read Testing Data', testingObj);
        util.debug('App Asset Read Route Response', res.body);

        if (!util.hayTest(testingObj, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
      })
      .expect(200, done);
  });

  // App Asset Read All
  it('App Asset Read All', function(done) {
    request(server)
      .get('/api/assets')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('App Asset Read All Route Response', res.body);

        if (res.body.length < 1) throw new Error('Less than 1 entry in the App Asset Table');
      })
      .expect(200, done);
  });

  // App Asset Destroy
  it('App Asset Destroy', function(done) {
    request(server)
      .delete('/api/app/' + testingObjData.app_id + '/asset/' + testingObj.id.toString())
      .set('Accept', 'application/json')
      .send({
        force: true
      })
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('App Asset Delete App Asset Data', testingObj);
        util.debug('App Asset Delete Route Response', res.body);

        if (!res.body.success) throw new Error('Destroy did not correctly work');
      })
      .expect(200, done);
  });

});
