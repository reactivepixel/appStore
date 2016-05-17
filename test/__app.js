const expect = require('chai').expect;
const faker = require('faker');
const util = require('apex-util');

const app = require('../src/models/app');
const user = require('../src/models/user');

const testData = new Map();
testData.set('user', {
  dispName: faker.name.findName(),
  email: faker.internet.email(),
  password: 'unhash',
  phone: faker.phone.phoneNumber(),
});

testData.set('app', {
  title: faker.commerce.productName(),
});

describe('Model: App ', () => {
  // User Create One
  it('Creating a User as Owner for the App', (done) => {
    user.create(
      util.scrubData(
        testData.get('user')),

      // On Error
      (err) => {
        util.debug('User Create Error', err);
        throw new Error('User Create Error');
      },

      // On Success
      (data) => {
        util.debug('User Create Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('user').dispName).to.be.equal(data.dispName);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('user', Object.assign(testData.get('user'), data.dataValues));
        done();
      });
  });

  // App Create One
  it('Create One', (done) => {
    app.create(
      util.scrubData(
        testData.get('app')),

      // On Error
      (err) => {
        util.debug('App Create Error', err);
        throw new Error('App Create Error');
      },

      // On Success
      (data) => {
        util.debug('App Create Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('app').title).to.be.equal(data.title);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('app', Object.assign(testData.get('app'), data.dataValues));
        done();
      });
  });

  // App Read One
  it('Read One', (done) => {
    app.find(
      util.scrubData(
        testData.get('app')),

      // On Error
      (err) => {
        util.debug('App Read One Error', err);
        throw new Error('App Read One Error');
      },

      // On Success
      (data) => {
        util.debug('App Read Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('app').title).to.be.equal(data.title);
        done();
      });
  });

  // App Read All
  it('Read All', (done) => {
    app.findAll(

      // On Error
      (err) => {
        util.debug('App Read All Error', err);
        throw new Error('App Read All Error');
      },

      // On Success
      (data) => {
        util.debug('App Read All Success', data);
        expect(data.length).to.be.above(0);
        done();
      });
  });

  // App Update One
  it('Update One', (done) => {
    app.update(
      util.scrubData(
        Object.assign(
          testData.get('app'), {
            title: 'xx Force Update xx',
          })),

      // On Error
      (err) => {
        util.debug('App Update One Error', err);
        throw new Error('App Update One Error');
      },

      // On Success
      (data) => {
        util.debug('App Update Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('app').title).to.be.equal(data.title);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('app', Object.assign(testData.get('app'), data.dataValues));
        done();
      });
  });

  // App Delete
  it('Delete One', (done) => {
    app.destroy(
      util.scrubData(
        Object.assign(
          testData.get('app'), {
            force: true,
          })),

      // On Error
      (err) => {
        util.debug('App Delete One Error', err);
        throw new Error('App Delete One Error');
      },

      // On Success
      (data) => {
        util.debug('App Delete One Success', data);

        // Successfully deleting a record results in a bool response of 1
        expect(data).to.be.equal(1);
        done();
      });
  });
});
