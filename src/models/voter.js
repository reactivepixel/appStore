module.exports = function() {
      /**
        * @var {file} db
        * Sets db to imported file db.js
      */
  var db = require('./db.js'); 
      /**
        * @var {connection} db
        * Sets sequelize to db.connection
      */
  var sequelize = db.connection; 
      /**
        * @var {file} util
        * Sets util to imported util.js
      */
  var util = require('../../lib/util'); 


  function _create(payload, err, success) { // Accepts the parameters and then creates the data for voting in DB using the payload
    var cleanData = util.scrubData(payload);
    db.voting.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success) { // Accepts the parameters and then updates table data
    var cleanData = util.scrubData(payload);
    db.voting.find({
      where: {
        id: cleanData.id       
      }
    }).then(function(matchedvoting) {
      matchedvoting.updateAttributes(cleanData).then(success).catch(err); // Updates information using updateAttributes 
    }).catch(err);
  }

  function _find(payload, err, success) { // Accepts the parameters and then updates table data
    util.debug('Voting Model _Find Payload', payload);
    var cleanData = util.scrubData(payload);
    db.voting.find({
      where: {
        id: cleanData.id // Varifies that the ID's match 
      },
      include: [{
        all: true, // Includes all data from the matching ID 
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _findAll(err, success) {// Accepts the parameters and then finds all the table data
    db.voting.findAll({
      include: [{
        all: true,  // Includes all data 
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) { // Accepts the parameters and then destroys all the table data in given ID
    var cleanData = util.scrubData(payload);
    db.voting.destroy({
      where: {
        id: cleanData.id  // Destroy data that matches ID 
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
