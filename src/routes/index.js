module.exports = function (express) {
  var router = express.Router();

  function success(data){
    console.log('success', data);
  }
  function err(data){
    console.log('error', data);
  }

  router.get('/', function(req, res) {
    res.status(200).json({ msg:'Hello World', healthy: true });
  });

  router.get('/status', function(req, res) {
    res.status(200).json({ healthy: true });
  });


  // Routes
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));



  return router;
};
