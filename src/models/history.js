module.exports = function() {

  var db = require('./db');
/**
 * @var {file} db
 * Sets db to imported file db.js
*/
  var sequelize = db.connection;
/**
 * @var {connection} db
 * Sets sequelize to db.connection
*/
  var util = require('../../lib/util');
/**
 * @var {file} util
 * Sets util to imported util.js
*/


  function _create(payload, err, success) {
/**
 * @function _create

 * Cleans the data within voting in DB

 * @param payload
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run
*/
    var cleanData = util.scrubData(payload);
    db.history.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success) {
/**
 * @function _update

 * @description Accepts the parameters and then updates table data
 * @param payload
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run
*/
    var cleanData = util.scrubData(payload);
    db.history.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedhistory) {
      matchedhistory.updateAttributes(cleanData).then(success).catch(err);
    }).catch(err);
  }

  function _find(payload, err, success) {
/**
 * @function _find

 * @description Accepts the parameters and then updates table data
 * @param payload
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run
*/
    var cleanData = util.scrubData(payload);
    db.history.find({
      where: {
        id: cleanData.id
      },
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _findAll(err, success) {
/**
 * @function _findAll

 * @description Accepts the parameters and then finds all the table data
 * @param payload
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run
*/
    db.history.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
/**
 * @function _destroy

 * @description Accepts the parameters and then destroys all the table data in given ID
 * @param payload
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run
*/
    var cleanData = util.scrubData(payload);
    db.history.destroy({
      where: {
        id: cleanData.id
/**
 * @var {attribute} id
 * Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking
*/
      },
      force: payload.force
    }).then(success).catch(err);
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy,
  };
}();
