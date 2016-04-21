module.exports = function() {
  var db = require('./db.js'); 
/**
 * @var {module} db
 * Sets db to imported file db.js
*/
  var sequelize = db.connection; 
/**
 * @var {module} db
 * Sets sequelize to db.connection
*/
  var util = require('../../lib/util'); 
/**
 * @var {module} db
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
    var cleanData = util.scrubData(payload);;
    db.voting.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success) {
/**
 * @function _update
 * Accepts the parameters and then updates table data
 * @param payload 
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run  
*/
    var cleanData = util.scrubData(payload);;
    db.voting.find({
      where: {
        id: cleanData.id  /** varifies that the ID's match */
      }
    }).then(function(matchedvoting) {
      matchedvoting.updateAttributes(cleanData).then(success).catch(err); /** Updates information using updateAttributes */
    }).catch(err);
  }

  function _find(payload, err, success) {
/**
 * @function _find
 * Accepts the parameters and then updates table data
 * @param payload 
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run  
*/
    util.debug('Voting Model _Find Payload', payload)
    var cleanData = util.scrubData(payload);;
    db.voting.find({
      where: {
        id: cleanData.id /** varifies that the ID's match */
      },
      include: [{
        all: true, /** includes all data from the matching ID */
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _findAll(err, success) {
/**
 * @function _findAll
 * Accepts the parameters and then finds all the table data
 * @param payload 
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run  
*/
    db.voting.findAll({
      include: [{
        all: true,  /** includes all data */
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
/**
 * @function _destroy
 * Accepts the parameters and then destroys all the table data in given ID
 * @param payload 
 * Holds the req.body in a variable
 * @param err
 * Errors
 * @success
 * Run  
*/  
    var cleanData = util.scrubData(payload);;
    db.voting.destroy({
      where: {
        id: cleanData.id  /** destroy data that matches ID */
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
  }
}();
