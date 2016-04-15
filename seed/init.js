var faker = require('faker');
var async = require('async');

// Dot Env File Loader
if (!process.env.PORT) dotenv = require('dotenv').load();

var user = require('../src/models/user.js');
var app = require('../src/models/app.js');
var list = require('../src/models/list.js');

var util = require('../lib/util');

var apps = [];
var users = [];
var lists = [];

function stdErr(err) {
    util.debug("Error", err);
}

function genSeedUser() {
    var userSeed = {
        dispName: faker.company.companyName(),
        email: faker.internet.email(),
        password: "unhashed",
        phone: faker.phone.phoneNumber()
    };
    users.push(userSeed);
    return userSeed;
}

function genSeedApp(input) {
    var appSeed = {
        title: faker.company.companyName(),
        description: faker.company.bs(),
        user_id: input.user_id || users[0].id,
        readme: faker.internet.url(),
        sourceLink: faker.internet.url(),
        exeLink: faker.internet.url(),
        iOSAppStoreLink: faker.internet.url(),
        releaseDate: faker.date.future(),
    };
    apps.push(appSeed);
    return appSeed;
}

function genSeedList(input) {
    var listSeed = {
        title: faker.company.companyName(),
        user_id: input.user_id || users[0].id
    };
    lists.push(listSeed);
    return listSeed;
}

function done(data) {
    console.log('all done', data);
}
async.series([

    function(callback) {
        user.create(genSeedUser(), stdErr, (data) => {
            callback(null, data);
        });
    },
    function(createdUser, callback) {
        list.create(genSeedList({
            user_id: createdUser.id
        }), stdErr, (data) => {
            callback(null, data);
        });
    },
    function(createdUser, callback) {
        app.create(genSeedApp({
            user_id: createdUser.id
        }), stdErr, (data) => {
            callback(null, data);
        });
    },
], done);
