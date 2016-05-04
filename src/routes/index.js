module.exports = function(express) {
  var history = require('../models/history');
  var util = require('../../lib/util');
  var router = express.Router();

  // Middleware
  router.use(function (req, res, next) {
    var payload = req.body;

    // create full rawRoute of the url and store in db
    payload.rawRoute = req.originalUrl;
    history.create(payload,function(err){
      // Error Encountered
      util.debug('History Tracking Middleware Error', err);
      next();
    },function(data) {
      util.debug('History Tracking Middleware Success', data);
      next();
    });
  });

  // Standard Routes
  router.get('/', function(req, res) {
    res.status(200).json({
      msg: 'Hello World',
      healthy: true
    });
  });

  router.get('/status', function(req, res) {
    res.status(200).json({
      healthy: true
    });
  });


  // Routes
  router.use('/jsdoc', express.static(__dirname + './../../build/jsdocs'));
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));

  return router;
};
