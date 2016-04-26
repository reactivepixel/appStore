module.exports = function() {
  /**
   * @var {file} db
   * This imports the file db.js and sets it to the variable, db.
  */
  var db = require('./db');

  /**
   * @var {connection} sequelize
   * This sets up the database connection and sets it to the variable, sequelize.
  */
  var sequelize = db.connection;

  /**
   * @var {file} util
   * This imports the file util.js and sets it to the variable, util.
  */
  var util = require('../../lib/util'); // Sets util to imported util.js


  /*
    New function _create accepts 3 parameters, payload, err, and success
    Sets in scope variable cleanData to passed paramaeter payload.
    todo's, research line 15 and explain
  */
  /**
   * @function _create
   * @param payload
   * Test info for payload param.
   * @param err
   * Test info for err param.
   * @param success
   * Test info for success param.
  */
  function _create(payload, err, success)
  {
    var cleanData = payload;
    db.appAsset.create(cleanData).then(success).catch(err);
  }

  /*
   New function _update accepts 3 parameters, payload, err, and success
   Sets in scope variable cleanData to passed parameter payload
   todo's research lines 26 through 32 and explain
  */

  function _update(payload, err, success) {
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
  function _find(payload, err, success) {
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
  function _findAll(err, success) {
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

  function _destroy(payload, err, success) {
    var cleanData = payload;
    db.appAsset.destroy({
      where: {
        id: cleanData.id
      },
      force: payload.force
    }).then(success).catch(err);
  }


  /*
    Returns an object with the functions?
    todo's look more into this return
  */
  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy,
  };
}();
