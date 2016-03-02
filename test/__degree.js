var request = require('supertest');
var faker = require('faker');

describe('Degree Routes', function() {
  var server;
  var testDegreeData = {title: faker.company.bs(), description: faker.company.bs()};
  var testDegree;
  // Before / After each test create / destroy the express server to fully simulate unique requests.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  beforeEach(function() {
    server = require('../src/server.js');
  });
  afterEach(function() {
    server.close();
  });

  // Degree Create One
  it('Degree Create One', function(done){
    request(server)
      .put('/api/v1/degree')
      .set('Accept', 'application/json')
      .send(testDegreeData)
      .expect('Content-Type', /json/)
      .expect(function(res){
        if(res.body.title !== testDegreeData.title) throw new Error('Degree not correctly added. Titles do not match.');
        testDegree = res.body;
      })
      .expect(200, done);
  });

  // Degree Update One
  it('Degree Update', function(done){
    var payload = testDegree;
    payload.title = faker.company.bs();
    request(server)
      .put('/api/v1/degree/' + payload.id.toString())
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(function(res){
        if(res.body.title !== payload.title) throw new Error('Title did not update properly');
      })
      .expect(200, done);
  });

  // Degree Read One
  it('Degree Read One', function(done){
    request(server)
      .get('/api/v1/degree/' + testDegree.id.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res){
        if(testDegree.id !== res.body.id) throw new Error('Returned ID does not match');
      })
      .expect(200, done);
  });

  // Degree Read All
  it('Degree Read All', function(done){
    request(server)
      .get('/api/v1/degree')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res){
        if(res.body.length < 1) throw new Error('Less than 1 entry in the Degree Table');
      })
      .expect(200, done);
  });

  // Degree Destroy
  it('Degree Destroy', function(done){
    request(server)
      .delete('/api/v1/degree/' + testDegree.id.toString())
      .set('Accept', 'application/json')
      .send({force: true})
      .expect('Content-Type', /json/)
      .expect(function(res){
        if(!res.body.success) throw new Error('Destroy did not correctly work');
      })
      .expect(200, done);
  });

});
