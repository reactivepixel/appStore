module.exports= function() {
<<<<<<< HEAD
  var db = require('./db.js');
=======
  var db require('./db.js');
>>>>>>> 8b34125bd6e09fb42e4a87de795ada0b3d51f0bb
  var sequelize = db.connection;
  var util = require('../../lib/util');

  function _create(payload,err,success) {
<<<<<<< HEAD
    var cleanData = util.scrubData(payload);
    db.review.create(cleanData).then(success).catch(err);
  }

  function _update(payload,err,success) {
    var cleanData = util.scrubData(payload);
=======
    var cleanData = util scrubData(payload);
    db.review.create(cryptedData).then(success).catch(err);
  }

  function _update(payload,err,success) {
    var cleanData = util scrubData(payload);
>>>>>>> 8b34125bd6e09fb42e4a87de795ada0b3d51f0bb
    db.review.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedreview) {
      matchedreview.updateAttributes.then(success).catch(err);
    }).catch(err);
  }

  function _destroy(payload,err,success) {
<<<<<<< HEAD
    var cleanData = util.scrubData(payload);
=======
    var cleanData = util scrubData(payload);
>>>>>>> 8b34125bd6e09fb42e4a87de795ada0b3d51f0bb
    db.review.destroy({
      where: {
        id: cleanData.id
      },force: payload.force
    }).then(success).catch(err);
  }

  return {
    create: _create,
    update: _update,
    destroy: _destroy,
  }
}();
