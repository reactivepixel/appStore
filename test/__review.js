var expect = require('chai').expect;
<<<<<<< HEAD
var util = require('../lib/util.js');

var review = require('../src/models/review');

describe("Model: Review", function () {
  it('Creating a text post',function(done){
    var reviewCreate = _create();
    expect(true).to.be.equal(true);
    done();
  });
});
=======
var faker = require('faker');
var util = require('../lib/util.js');

var app = require('../src/models/app');
var list = require('../src/models/list');
var listed_apps = require('../src/models/listed_apps');
var user = require('../src/models/user');
var review = require('../src/models/review')

var userData = {
  dispName: faker.name.findName(),
  email: faker.internet.email(),
  password: 'unhash',
  phone: faker.phone.phoneNumber()
};
>>>>>>> 8b34125bd6e09fb42e4a87de795ada0b3d51f0bb
