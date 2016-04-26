module.exports = function(express) {
  var history = require('../models/history');
  var path = require('path');
  var router = express.Router();

  // Import NPM dependencies like this:
// var React = require('react');
// var ReactDOM = require('react-dom');

// NOTES
  // made a variable point to history.js in model folder.
  // middleware function is placed after the route.get
  // ^^ because middleware won’t execute for GET requests
  // will fire on every route that comes thru express
  //created a homepage view to test bootstrap and routing connection


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
  router.use('/jsdoc', express.static(__dirname + './../../build/jsdocs')); // JSdoc route


  //router.use('/home', require('./public/index'); // route to index.html

  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));
  router.use('/api/', require('./api/voting')(express));

  // MIDDLE-WARE FOR history

  // used the existing module on index.js to add track user browsering in the url.
  // this middleware function has no mount path.
  // this code is executed for every request to the router.
  // rawRoute of url is stored in database.
  router.use(function (req, res, next) { //no slash to save every page
    var payload = req.body;
    //rawRoute is db name
    // create full rawRoute of the url and store in db
    payload.rawRoute = req.protocol + '://' + req.get('host') + req.originalUrl; //original - anything with slash
    history.create(payload,function(err){
      // Error Encountered
      res.status(500).json(err); //spits out error
    },function(data) {
      res.status(200).json(data); //spits out data
      next(); // end the request
    });
  });
  return router;
};
