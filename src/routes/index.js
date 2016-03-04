module.exports = function(express) {
  var router = express.Router();

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
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));


  return router;
};
