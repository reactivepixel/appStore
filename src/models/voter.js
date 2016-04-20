module.exports = function() {
  var db = require('./db.js'); // Sets db to imported file db.js
  var sequelize = db.connection; // Sets sequelize to db.connection
  var util = require('../../lib/util'); // Sets util to imported util.js



// _create accepts the parameters and checks for cleanData using payload
  function _create(payload, err, success) // Cleans the data within voting in DB
  {
    var cleanData = util.scrubData(payload);;
    db.voting.create(cleanData).then(success).catch(err);
  }

// _update accepts the parameters and then updates table data
  function _update(payload, err, success) {
    var cleanData = util.scrubData(payload);;
    db.voting.find({
      where: {
        id: cleanData.id // varifies that the ID's match
      }
    }).then(function(matchedvoting) {
      matchedvoting.updateAttributes(cleanData).then(success).catch(err); //updates information using updateAttributes
    }).catch(err);
  }

// _find accepts the parameters and then finds table data
  function _find(payload, err, success) {
    util.debug('Voting Model _Find Payload', payload)
    var cleanData = util.scrubData(payload);;
    db.voting.find({
      where: {
        id: cleanData.id // varifies that the ID's match
      },
      include: [{
        all: true, // includes all data from the matching ID
        nested: true
      }]
    }).then(success).catch(err);
  }

// _findAll accepts the parameters and then finds all the table data
  function _findAll(err, success) {
    db.voting.findAll({
      include: [{
        all: true, // includes all data
        nested: true
      }]
    }).then(success).catch(err);
  }

// _destroy accepts the parameters and then destroys all the table data in given ID
  function _destroy(payload, err, success) {
    var cleanData = util.scrubData(payload);;
    db.voting.destroy({
      where: {
        id: cleanData.id // destroy data that matches ID
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
