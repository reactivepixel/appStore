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

  //Route for JSdocs
  router.use('/api', express.static(__dirname + '/out'));
  
  // Routes
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));


  return router;
};
