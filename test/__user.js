const expect = require('chai').expect;
const faker = require('faker');
const util = require('../lib/util.js');

const user = require('../src/models/user');

const testData = new Map();
testData.set('user', {
  dispName: faker.name.findName(),
  email: faker.internet.email(),
  password: 'unhash',
  phone: faker.phone.phoneNumber(),
});

describe('Model: User ', () => {
  // User Create One
  it('Create One User', (done) => {
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

  // User Read One
  it('Read One User', (done) => {
    user.find(
      util.scrubData(
        testData.get('user')),

      // On Error
      (err) => {
        util.debug('User Read One Error', err);
        throw new Error('User Read One Error');
      },

      // On Success
      (data) => {
        util.debug('User Read One Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('user').dispName).to.be.equal(data.dispName);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('user', Object.assign(testData.get('user'), data.dataValues));
        done();
      });
  });

  // User Read All
  it('Retrieve All Users', (done) => {
    user.findAll(

      // On Error
      (err) => {
        util.debug('User Read All Error', err);
        throw new Error('User Read All Error');
      },

      // On Success
      (data) => {
        util.debug('User Read All Success', data);
        expect(data.length).to.be.above(0);
        done();
      });
  });

  // User Update One
  it('Update A User', (done) => {
    user.update(
      util.scrubData(
        Object.assign(
          testData.get('user'), {
            dispName: 'xx Force Update xx',
          })),

      // On Error
      (err) => {
        util.debug('User Update One Error', err);
        throw new Error('User Update One Error');
      },

      // On Success
      (data) => {
        util.debug('User Read One Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('user').dispName).to.be.equal(data.dispName);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('user', Object.assign(testData.get('user'), data.dataValues));
        done();
      });
  });

  // User Delete
  it('Delete A User', (done) => {
    user.destroy(
      util.scrubData(
        Object.assign(
          testData.get('user'), {
            force: true,
          })),

      // On Error
      (err) => {
        util.debug('User Delete One Error', err);
        throw new Error('User Delete One Error');
      },

      // On Success
      (data) => {
        util.debug('User Delete One Success', data);

        // Successfully deleting a record results in a bool response of 1
        expect(data).to.be.equal(1);
        done();
      });
  });
});
