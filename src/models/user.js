module.exports = function() {
  var db = require('./db.js');
  var sequelize = db.connection;

  function _create(payload, err, success){
    var cleanData = payload;
    db.user.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success){
    var cleanData = payload;
    db.user.find({where:{id:cleanData.id}}).then(function(matcheduser){
        matcheduser.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
  }

  function _find(payload, err, success) {
    var cleanData = payload;
    db.user.find({
      where: {
        id: cleanData.id
      },
      include: [{
        model: db.app,
        where: {
          user_id: sequelize.col('user.id')
        }
      }]
    }).then(success).catch(err);
  }

  function _findAll(err, success){
    db.user.findAll().then(success).catch(err);
  }

  function _destroy(payload, err, success){
    var cleanData = payload;
    db.user.destroy({where:{id:cleanData.id}, force: payload.force}).then(success).catch(err);
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy,
  }
}();
