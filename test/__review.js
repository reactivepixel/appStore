var expect = require('chai').expect;
var util = require('../lib/util.js');

var review = require('../src/models/review');

describe("Model: Review", function () {
  it('Creating a text post',function(done){
    var reviewCreate = _create();
    expect(true).to.be.equal(true);
    done();
  });
});
