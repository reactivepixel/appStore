module.exports = function(express) {
  var router = express.Router();
/**
 * @var {module} router
 * This sets the var router equal to express.Router()
*/
  var voting = require('../../models/voter.js');
/**
 * @var {module} voting
 * This sets the var voting to equal the path to the models/voting.js
*/
  var util = require('../../../lib/util');
/**
 * @var {module} util
 * This sets the util voting to equal the path to the lib/util
*/

  /** Read One. */
  router.get('/vote/:vote_id', function(req, res) {
/**
 * @function get
 * Gathers Data
 * @param req 
 * Requests Data
 * @param res
 * Listens for response  
*/
    req.body.id = req.params.vote_id;
    voting.find(req.body, function(err) { 
/**
 * @function find
 * Finds ID in DB using _find in models/voting.js
 * @param req.body
 * Requests the body information
*/
      /** ERROR Encountered. */
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });


  /** Read All */
  router.get('/votes', function(req, res) {
/**
 * @function get
 * Gathers Data 
 * @param req 
 * Requests Data
 * @param res
 * Listens for response 
*/
    voting.findAll(function(err) {
/**
 * @function findAll
 * Finds all in DB using _findAll in model/voting.js
 * @param err
 * Error
*/
      /** ERROR Encountered. */
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  /** Create */
  router.put('/app/:app_id/vote', function(req, res) {
/**
 * @function put
 * Places Data
 * @param req 
 * Requests Data
 * @param res
 * Listens for response 
*/
    req.body.app_id = req.params.app_id;
    voting.create(req.body, function(err) { 
/**
 * @function create
 * Runs _create in models to clean data and add to DB from app
 * @param req.body
 * Requests the body information
*/
      /** ERROR Encountered. , try removing id and try again.*/
      delete req.body.id;
      voting.create(req.body, function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json(data);
      });
    }, function(data) {
      res.status(200).json(data);
    });
  });

  /** Update */
  router.put('/app/:app_id/vote/:vote_id', function(req, res) { 
/**
 * @function put
 * Places Data
 * @param req 
 * Requests Data
 * @param res
 * Listens for response 
*/
    req.body.app_id = req.params.app_id; 
    req.body.id = req.params.vote_id; 
    util.debug('Voting Update Route Request Body', req.body);
    voting.update(req.body, function(err) { 
/**
 * @function update
 * varifies that app id and body.id match and runs _update in models
 * @param req.body
 * Requests the body information
*/  
    /** ERROR Encountered. */
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  /** Delete One */
  router.delete('/app/:id/vote/:vote_id', function(req, res) {
    req.body.id = req.params.vote_id; 
    voting.destroy(req.body, function(err) {
/**
 * @function destroy
 * Deletes User ID using _destroy in models
 * @param req.body
 * Requests the body information
*/
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json({
        success: data
      });
    });
  });

  return router;
};
