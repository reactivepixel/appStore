module.exports = function() {
  var db = require('./db.js');
  var sequelize = db.connection;
  var util = require('../../lib/util');

  function _create(payload, err, success) {
    var cleanData = payload;
    db.appAsset.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success) {
    var cleanData = payload;
    db.appAsset.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedAppAsset) {
      matchedAppAsset.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
  }

  function _find(payload, err, success) {
    util.debug('App Asset Model _Find Payload', payload)
    var cleanData = payload;
    db.appAsset.find({
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
    db.appAsset.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
    var cleanData = payload;
    db.appAsset.destroy({
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
