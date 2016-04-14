module.exports = function(express) {
 var express = require('express');
 var histories = require('../models/histories.js');
 var db = require('../models/db.js');
 var router = express.Router();



//middle ware route
//will fire on every route that comes thru express
//create a model for histories

// a middleware function with no mount path. This code is executed for every request to the router


 // Create
router.use(function (req, res, next) {
  var payload = req.body;
  // add raw
  payload.rawRoute = req.originalUrl;
 histories.create(req.body,function(err){
     // Error Encountered
     res.status(500).json(err);
   },function(data) {
     res.status(200).json(data);
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
 router.use('/api/', require('./api/user')(express));
 router.use('/api/', require('./api/app')(express));
 router.use('/api/', require('./api/app_assets')(express));
 router.use('/api/', require('./api/list')(express));
 router.use('/api/', require('./api/listed_apps')(express));


 return router;
};
