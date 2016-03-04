var request = require('supertest');
var faker = require('faker');
var util = require('../lib/util.js');

describe('API: Listed App Routes', function() {
  var server;
  var testingObjData = {
    listId: '1',
    appId: '524ba389-53c2-449b-a7d4-e77aa8b5c07f'
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
  it('Listed App Relation Create', function(done) {
    request(server)
      .put('/api/listed_app/' + testingObjData.listId.toString() + '/' + testingObjData.appId.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('Unit Test Listed App Create Route Request Data', testingObjData);
        util.debug('Unit Test Listed App Create Route Response', res.body);

        if (!util.hayTest(testingObjData, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
      })
      .expect(200, done);
  });

  // App Destroy
  it('Listed App Relation Destroy', function(done) {
    request(server)
      .delete('/api/listed_app/' + testingObjData.listId.toString() + '/' + testingObjData.appId.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        util.debug('Unit Test App Delete App Data', testingObjData);
        util.debug('Unit Test App Delete Route Response', res.body);

        if (!res.body.success) throw new Error('Destroy did not correctly work');
      })
      .expect(200, done);
  });

});
