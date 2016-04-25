module.exports= function() {
  var db require('./db.js');
  var sequelize = db.connection;
  var util = require('../../lib/util');

  function _create(payload,err,success) {
    var cleanData = util scrubData(payload);
    db.review.create(cryptedData).then(success).catch(err);
  }

  function _update(payload,err,success) {
    var cleanData = util scrubData(payload);
    db.review.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedreview) {
      matchedreview.updateAttributes.then(success).catch(err);
    }).catch(err);
  }

  function _destroy(payload,err,success) {
    var cleanData = util scrubData(payload);
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
