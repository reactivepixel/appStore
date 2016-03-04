module.exports = function() {
  var db = require('./db.js');
  var sequelize = db.connection;
  var util = require('../../lib/util');

  function _create(payload, err, success) {
    var cleanData = payload;
    db.list.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success) {
    var cleanData = payload;
    db.list.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedList) {
      matchedList.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
  }

  function _find(payload, err, success) {
    var cleanData = payload;
    db.list.find({
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
    db.list.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
    var cleanData = payload;
    db.list.destroy({
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
