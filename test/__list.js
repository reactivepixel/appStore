const expect = require('chai').expect;
const faker = require('faker');
const util = require('../lib/util.js');

const app = require('../src/models/app');
const list = require('../src/models/list');
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

testData.set('list', {
  title: faker.commerce.productName(),
});

testData.set('listedApp', {});

describe('Model: List ', () => {
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
  it('Creating an App to be placed in the List', (done) => {
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

  // List Create One
  it('Create One List', (done) => {
    list.create(
      util.scrubData(
        testData.get('list')),

      // On Error
      (err) => {
        util.debug('List Create Error', err);
        throw new Error('List Create Error');
      },

      // On Success
      (data) => {
        util.debug('List Create Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('list').title).to.be.equal(data.title);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('list', Object.assign(testData.get('list'), data.dataValues));
        done();
      });
  });

  // Add App to List
  it('Add App to List', (done) => {
    app.addToList(
      util.scrubData({
        appId: testData.get('app').id,
        listId: testData.get('list').id,
      }),

      // On Error
      (err) => {
        util.debug('Add App to List Error', err);
        throw new Error('Add App to List Error');
      },

      // On Success
      (data) => {
        util.debug('Add App to List Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('app').id).to.be.equal(data.appId);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('listedApp', Object.assign(testData.get('listedApp'), data.dataValues));
        done();
      });
  });

  // List Read One
  it('Read One List', (done) => {
    list.find(
      util.scrubData(
        testData.get('list')),

      // On Error
      (err) => {
        util.debug('List Read One Error', err);
        throw new Error('List Read One Error');
      },

      // On Success
      (data) => {
        util.debug('List Read One Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('list').title).to.be.equal(data.title);
        done();
      });
  });

  // List Read All
  it('Read All Lists', (done) => {
    list.findAll(

      // On Error
      (err) => {
        util.debug('List Read All Error', err);
        throw new Error('List Read All Error');
      },

      // On Success
      (data) => {
        util.debug('List Read All Success', data);
        expect(data.length).to.be.above(0);
        done();
      });
  });

  // List Update One
  it('Update One', (done) => {
    list.update(
      util.scrubData(
        Object.assign(
          testData.get('list'), {
            title: 'xx Force Update xx',
          })),

      // On Error
      (err) => {
        util.debug('List Update One Error', err);
        throw new Error('List Update One Error');
      },

      // On Success
      (data) => {
        util.debug('List Update Success', data);

        // Test the model correctly handled the input data.
        expect(testData.get('list').title).to.be.equal(data.title);

        // Set the testData with the new infomation returned from the db transaction.
        testData.set('list', Object.assign(testData.get('list'), data.dataValues));
        done();
      });
  });

  // List Delete
  it('Delete List', (done) => {
    list.destroy(
      util.scrubData(
        Object.assign(
          testData.get('list'), {
            force: true,
          })),

      // On Error
      (err) => {
        util.debug('List Delete One Error', err);
        throw new Error('List Delete One Error');
      },

      // On Success
      (data) => {
        util.debug('List Delete One Success', data);
        // Successfully deleting a record results in a bool response of 1
        expect(data).to.be.equal(1);
        done();
      });
  });

  // List Delete
  it('Delete User', (done) => {
    user.destroy(
      util.scrubData(
        Object.assign(
          testData.get('user'), {
            force: true,
          })),

      // On Error
      (err) => {
        util.debug('List Delete One Error', err);
        throw new Error('List Delete One Error');
      },

      // On Success
      (data) => {
        util.debug('List Delete One Success', data);
        // Successfully deleting a record results in a bool response of 1
        expect(data).to.be.equal(1);
        done();
      });
  });
});
