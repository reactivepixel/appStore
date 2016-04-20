module.exports = function() {
  var db = require('./db.js'); // Sets db to imported file db.js
  var sequelize = db.connection; // Sets sequelize to db.connection
  var util = require('../../lib/util'); // Sets util to imported util.js

  function _create(payload, err, success) // Cleans the data within voting in DB
  {
    var cleanData = util.scrubData(payload);;
    db.voting.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success) {
    var cleanData = util.scrubData(payload);;
    db.voting.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedvoting) {
      matchedvoting.updateAttributes(cleanData).then(success).catch(err);
    }).catch(err);
  }

  function _find(payload, err, success) {
    util.debug('Voting Model _Find Payload', payload)
    var cleanData = util.scrubData(payload);;
    db.voting.find({
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
    db.voting.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
    var cleanData = util.scrubData(payload);;
    db.voting.destroy({
      where: {
        id: cleanData.id
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
