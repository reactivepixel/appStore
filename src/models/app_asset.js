
  const db = require('./db.js');
  const sequelize = db.connection;
  const util = require('../../lib/util');

  /**
   * @function _create
   * @param payload
   * Test info for payload param.
   * @param err
   * Test info for err param.
   * @param success
   * Test info for success param.
  */
  exports.create = (payload, err, success) => {
    if (!payload.cleaned) return false;
    util.debug('App Asset Create', payload);
    db.appAsset.create(payload).then(success).catch(err);
    return true;
  };

  /*
   New function _update accepts 3 parameters, payload, err, and success
   Sets in scope variable cleanData to passed parameter payload
   todo's research lines 26 through 32 and explain
  */

  exports.update = (payload, err, success) => {
    var cleanData = payload;
    db.appAsset.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedAppAsset) {
      matchedAppAsset.updateAttributes(cleanData).then(success).catch(err);
    }).catch(err);
  }

  /*
    New function _find accepts 3 parameters, payload, err, and success
    Sets in scope variable cleanData to passed parameter Payload
    todos' research line 41 and lines 43 - 51
  */
  exports.find = (payload, err, success) => {
    util.debug('App Asset Model _Find Payload', payload);
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

  /*
    New function _findAll accepts 2 parameters, error and success
    todo's research lines 59 - 64
  */
  exports.findAll = (err, success) => {
    db.appAsset.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  /*
    New function _destroy accepts 3 paramaters, palyoad, err, and success
    Sets in scope variable cleanData to passed paramater paylaod
    todo's research lines 75 - 80
  */

  exports.destroy = (payload, err, success) => {
    var cleanData = payload;
    db.appAsset.destroy({
      where: {
        id: cleanData.id
      },
      force: payload.force
    }).then(success).catch(err);
  }
