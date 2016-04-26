var expect = require('chai').expect;
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
