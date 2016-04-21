var expect = require('chai').expect;
/**
 * @var {connection} expect
 * This sets the var expect to equal chai
*/
var faker = require('faker');
/**
 * @var {connection} faker
 * This sets the var faker to equal faker
*/
var util = require('../lib/util.js');
/**
 * @var {file} util
 * This sets the var util to equal the path to the lib/util.js
*/
var voter = require('../src/models/voter');
/**
 * @var {file} voter
 * This sets the var voter to equal the path to the src/models/voter.js
*/
var app = require('../src/models/app');
/**
 * @var {file} app
 * This sets the var app to equal the path to the src/models/app.js
*/
var user = require('../src/models/user');
/**
 * @var {file} user
 * This sets the var user to equal the path to the src/models/user.js
*/

var userData = { /** userData stores dispName, email, hashed pass, and phone# */
  dispName: faker.name.findName(),
  email: faker.internet.email(),
  password: 'unhash',
  phone: faker.phone.phoneNumber()
};

var appData = {
  title: faker.commerce.productName() /** appData will equal the name of the app from title in the DB */
};

var votingData = {
  link: faker.internet.url() /** votingData will equal the URL in the DB */
};

describe('Model: Voter ', function() {
  /** User Create One */
  it('Creating a User as Owner for the Vote', function(done) {
    user.create(userData,

    /** On Error */
    (err) => {
      util.debug('User Create Error', err);
      throw new Error('User Create Error');
    },

    /** On Success */
    (data) => {
      util.debug('User Create Success', data);

      /** Overwrite the returned obj to userData */
      appData.user_id = userData.id;
      expect(data.dispName).to.be.equal(data.dispName);
      done();
    });
  });


  /** App  Create One */
  it('Create One App', function(done) {
    app.create(appData,

    /** On Error */
    (err) => {
      util.debug('App Create Error', err);
      throw new Error('App Create Error');
    },

    /** On Success */
    (data) => {
      util.debug('App Create Success', data);

      /** Overwrite the returned obj to votingData */
      expect(data.title).to.be.equal(appData.title);
      appData = data;
      votingData.app_id = data.id; /** The Link plus appId will equal data.id for later use */
      done();
    });
  });

  /** Voter Create One */
  it('Create Voter', function(done) {
    voter.create(votingData,

    /** On Error */
    (err) => {
      util.debug('Vote Create Error', err);
      throw new Error('Vote Create Error');
    },

    /** On Success */
    (data) => {
      util.debug('Vote Create Success', data);

      /** Overwrite the returned obj to votingData */
      expect(data.link).to.be.equal(votingData.link);
      votingData = data;
      done();
    });
  });

  /** Voter Read One */
  it('Read One', function(done) {
    voter.find(votingData,

    /** On Error */
    (err) => {
      util.debug('Voter Read One Error', err);
      throw new Error('Voter Read One Error');
    },

    /** On Success */
    (data) => {
      util.debug('Voter Read One Success', data);
      expect(data.link).to.be.equal(votingData.link);
      done();
    });
  });

  /** Voter Read All */
  it('Read All', function(done) {
    voter.findAll(

    /** On Error */
    (err) => {
      util.debug('Voter Read All Error', err);
      throw new Error('Voter Assets Read All Error');
    },

    /** On Success */
    (data) => {
      util.debug('Voter Read All Success', data);
      expect(data.length).to.be.above(0);
      done();
    });
  });

  /** Voter Update One */
  it('Update One', function(done) {
    var updateInfo = {id: votingData.id, title: 'image'};
    voter.update(updateInfo,

    /** On Error */
    (err) => {
      util.debug('Voter Update One Error', err);
      throw new Error('Voter Update One Error');
    },

    /** On Success */
    (data) => {
      /** Overwrite the returned obj to votingData */
      votingData = data;

      util.debug('Voter Update One Success', data);
      expect(data.dispName).to.be.equal(updateInfo.dispName);
      done();
    });
  });

  /** Voter Delete */
  it('Delete One', function(done) {

    votingData.force = true;
    voter.destroy(votingData,

    /** On Error */
    (err) => {
      util.debug('Voter Delete One Error', err);
      throw new Error('Voter Delete One Error'); /** Shows ERROR */
    },

    /** On Success */
    (data) => {
      util.debug('Voter Delete One Success', data);
      /** Successfully deleting a record results in a bool response of 1 */
      expect(data).to.be.equal(1);
      done();
    });
  });
});
