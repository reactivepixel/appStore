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

<<<<<<< HEAD
// Import NPM dependencies like this:
// var React = require('react');
// var ReactDOM = require('react-dom');
=======
 // NOTES
 //  made a variable point to history.js in model folder.
 //  middleware function is placed after the route.get
 //  ^^ because middleware won’t execute for GET requests
 //  will fire on every route that comes thru express
 //  created a homepage view to test bootstrap and routing connection
>>>>>>> 83c06624570a1040839620c6ae114a6ebe0699cd



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


<<<<<<< HEAD
  //router.use('/home', require('./public/index'); // route to index.html
=======

>>>>>>> 83c06624570a1040839620c6ae114a6ebe0699cd

// Routes
  router.use('/jsdoc', express.static(__dirname + './../../build/jsdocs'));
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));
  router.use('/api/', require('./api/voting')(express));
  // router.use('/api/', require('./api/recommend')(express));

  // MIDDLE-WARE
  // MIDDLE-WARE FOR history

  // used the existing module on index.js to add track user browsering in the url.
  // this middleware function has no mount path.
  // this code is executed for every request to the router.
  // rawRoute of url is stored in database.
  router.use(function (req, res, next) {
        /**
          * @var {Data} payload
          * Payload is where we store the req.body data for later use
        */
    var payload = req.body;
    //rawRoute is db name
    // create full rawRoute of the url and store in db
    payload.rawRoute = path.join(req.protocol + '://' + req.get('host') + req.originalUrl);
    history.create(payload,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
<<<<<<< HEAD
      res.status(200).json(data); //spits out data
      next(); // end the request - restarts process
=======
      res.status(200).json(data);
      // End the request
      next();
>>>>>>> 83c06624570a1040839620c6ae114a6ebe0699cd
    });
  });
  return router;
};