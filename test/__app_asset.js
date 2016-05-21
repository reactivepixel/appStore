const expect = require('chai').expect;
const faker = require('faker');
const util = require('apex-util');
const appAsset = require('../src/models/app_asset');
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
  type: faker.commerce.productName(),
});
testData.set('appAsset', {
  link: faker.internet.url(),
});

describe('Model: App Assets ', () => {
  // User Create One
  it('Creating a User as Owner for the App Assets', (done) => {
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
        expect(testData.get('user').dispName).to.be.equal(data.dispName);

        // Set the map 'user' with a combiniation of the old 'user' and the new
        testData.set('user', Object.assign(testData.get('user'), data.dataValues));
        done();
      });
  });

  // App  Create One
  it('Create One App', (done) => {
    app.create(
      util.scrubData(
        Object.assign(
          testData.get('app'), {
            user_id: testData.get('user').id,
          })),

      // On Error
      (err) => {
        util.debug('App Create Error', err);
        throw new Error('App Create Error');
      },

      // On Success
      (data) => {
        util.debug('App Create Success', data);

        // Overwrite the returned obj to appAssetData
        expect(testData.get('app').title).to.be.equal(data.title);

        // Set the map 'app' with a combiniation of the old 'app' and the new
        testData.set('app', Object.assign(testData.get('app'), data.dataValues));
        done();
      });
  });

  // App Assets Create One
  it('Create App Asset', (done) => {
    appAsset.create(
      util.scrubData(
        Object.assign(
          testData.get('appAsset'), {
            app_id: testData.get('app').id,
          })),

      // On Error
      (err) => {
        util.debug('App Create Error', err);
        throw new Error('App Create Error');
      },

      // On Success
      (data) => {
        util.debug('App Create Success', data);

        // Overwrite the returned obj to appAssetData
        expect(testData.get('appAsset').link).to.be.equal(data.link);

        // Set the map 'appAsset' with a combiniation of the old 'appAsset' and the new
        testData.set('appAsset', Object.assign(testData.get('appAsset'), data.dataValues));
        done();
      });
  });

  // App Assets Read One
  it('Read One', (done) => {
    appAsset.find(
      util.scrubData(
        testData.get('appAsset')),

      // On Error
      (err) => {
        util.debug('App Assets Read One Error', err);
        throw new Error('App Assets Read One Error');
      },

      // On Success
      (data) => {
        util.debug('App Assets Read One Success', data);

        expect(testData.get('appAsset').link).to.be.equal(data.link);
        done();
      });
  });

  // App Assets Read All
  it('Read All', (done) => {
    appAsset.findAll(

      // On Error
      (err) => {
        util.debug('App Assets Read All Error', err);
        throw new Error('App Assets Read All Error');
      },

      // On Success
      (data) => {
        util.debug('App Assets Read All Success', data);
        expect(data.length).to.be.above(0);
        done();
      });
  });

  // App Assets Update One
  it('Update One', (done) => {
    appAsset.update(
      util.scrubData(
        Object.assign(
          testData.get('appAsset'), {
            link: faker.internet.url(),
          })),

      // On Error
      (err) => {
        util.debug('App Assets Update One Error', err);
        throw new Error('App Assets Update One Error');
      },

      // On Success
      (data) => {
        util.debug('App Assets Update One Success', data);
        expect(testData.get('appAsset').link).to.be.equal(data.link);

        // Set the map 'appAsset' with a combiniation of the old 'appAsset' and the new
        testData.set('appAsset', Object.assign(testData.get('appAsset'), data.dataValues));
        done();
      });
  });
  // App Assets Delete
  it('Delete One', (done) => {
    appAsset.destroy(
      util.scrubData(
        Object.assign(
          testData.get('appAsset'), {
            force: true,
          })),

      // On Error
      (err) => {
        util.debug('App Assets Delete One Error', err);
        throw new Error('App Assets Delete One Error');
      },

      // On Success
      (data) => {
        util.debug('App Assets Delete One Success', data);

        // Successfully deleting a record results in a bool response of 1
        expect(data).to.be.equal(1);
        done();
      });
  });
});
