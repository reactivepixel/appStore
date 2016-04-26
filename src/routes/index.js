module.exports = function(express) {
      /**
        * @var {file} history
        * Sets history to imported file history.js in the models
      */
  var history = require('../models/history');
      /**
        * @var {file} path
        * This is
      */
  var path = require('path');
      /**
        * @var {connection} router
        * This sets the var router equal to express.Router()
      */
  var router = express.Router();

 // NOTES
 //  made a variable point to history.js in model folder.
 //  middleware function is placed after the route.get
 //  ^^ because middleware won’t execute for GET requests
 //  will fire on every route that comes thru express
 //  created a homepage view to test bootstrap and routing connection



// Standard Routes
  router.get('/', function(req, res) {
    res.render('../src/routes/public/index');
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
  router.use('/api/', require('./api/voting')(express));

         // THE USE FUNCTION MUST COME AFTER THE GET FUNCTIONS ABOVE
  router.use(function (req, res, next) {
        /**
          * @var {Data} payload
          * Payload is where we store the req.body data for later use
        */
    var payload = req.body;
            /**
              * @function rawRoute
              * @Create full url and store in db under rawRoute
            */
    payload.rawRoute = path.join(req.protocol + '://' + req.get('host') + req.originalUrl);
            /**
              * @function create
              * @Uses the create function in the history model
              * @param payload
              * Holds the req.body in a variable
              * @param err
              * Errors
            */
    history.create(payload,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
      // End the request
      next();
    });
  });
  return router;
};
