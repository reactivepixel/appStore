module.exports = function(express) {
<<<<<<< 176439a384f31a2fb667658851d88e45f669d0cb
  var histories = require('../models/histories'); // histories tag will be changed to tracking
  // var path = require('path');
  var db = require('../models/db');
=======
  // var express = require('express');
  var histories = require('../models/histories');
  // var recommend = require('../models/recommend');
  var db = require('../models/db');
  var fs = require('fs'); //read from index file in public folder
>>>>>>> testing url routing with path join
  var router = express.Router();


// NOTES
// made a variable point to histories.js in model folder
// middleware function is placed after the route.get
// ^^ because middleware won’t execute for GET requests
// will fire on every route that comes thru express

  // NOTES___________________________________________________
  // made a variable point to histories.js in model folder
  // middleware function is placed after the route.get
  // ^^ because middleware won’t execute for GET requests
  // will fire on every route that comes thru express

  //created a homepage view to test bootstrap and routing connection

  /*
  ********************************************************
  */

  // Standard Routes
  router.get('/', function(req, res) {
    // res.status(200).json({
    //   msg: 'Hello World',
    //   healthy: true
    // });

    //display recommend.html as homepage view by pipeing to client
    fs.createReadStream(__dirname+"/public/index.html").pipe(res);
  });


  router.get('/status', function(req, res) {

    res.status(200).json({
      healthy: true
    });
  });


/*
  ********************************************************
*/
// Route for JSDocs
  router.use('/api', express.static(__dirname + '/out'));

// Routes
  router.use('/jsdoc', express.static(__dirname + './../../build/JSdocs')); // JSdoc route
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));
  router.use('/api/', require('./api/voting')(express));
  // router.use('/api/', require('./api/recommend')(express));


  // MIDDLE-WARE
  // used the existing module on index.js to add track user browsering in the url.
  // this middleware function has no mount path.
  // this code is executed for every request to the router.
  // rawRoute of url is stored in database.
  router.use(function (req, res, next) {
    var payload = req.body;
    // create full rawRoute of the url and store in db
    payload.rawRoute = req.protocol + '://' + req.get('host') + req.originalUrl;
    histories.create(payload,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
      next(); // end the request
    });
  });
  return router;
};
