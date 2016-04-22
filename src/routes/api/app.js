module.exports = function (express) { // Setting module.exports to a new function that excepts express as a paramater of express.

<<<<<<< b71989d7ea7a43bd3a422bda5aabd415d410b334
=======

  /**
   * @var {module} router
   * This sets the express.Router function to the variable, router.
  */
  var router = express.Router();
>>>>>>> Began annotating app.js

  /**
   * @var {file} app
   * This sets the imported file app.js to the variable, app.
  */
  var app = require('../../models/app');

  /**
   * @var {file} util
   * This sets the imported file util.js to the variable, util.
  */
  var util = require('../../../lib/util');




/*
  The following are all routes that will either display an error with status 500,
  Or the proper data with a status of 200.

*/

/**
 * @function get
 * @param filePath
 * ATTN: A route or filepath with unqiue data.
 * @param function(req,res)
 * This is a function that takes in req and res as parameters
 * @desc ATTN: What does this do?
*/
  // Read One
  router.get('/app/:id', function(req, res) {
    req.body.id = req.params.id;
    app.find(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  /**
   * @function get
   * @param filePath
   * ATTN: A route or filepath.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
  // Read All
  router.get('/apps', function(req, res) {
    app.findAll(function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  /**
   * @function put
   * @param filePath
   * ATTN: A route or filepath.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
  // Create
  router.put('/app', function(req, res) {
    app.create(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  /**
   * @function put
   * @param filePath
   * ATTN: A route or filepath with unqiue data.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
  // Update
  router.put('/app/:id', function(req, res) {
    req.body.id = req.params.id;
    app.update(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  /**
   * @function delete
   * @param filePath
   * ATTN: A route or filepath with unqiue data.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
  // Delete One
  router.delete('/app/:id', function(req, res) {
    req.body.id = req.params.id;
    app.destroy(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json({success:data});
    });
  });

   saytest=function(){
    return "testing works";
  };
   // This returns the router to where ever it is called with the appropriate data.
   return router;

};
