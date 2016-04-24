module.exports = function(express) {
  /**
    * @var {connection} router
    * This sets the var router equal to express.Router()
  */
  var router = express.Router();
  /**
    * @var {file} voting
    * This sets the var voting to equal the path to the models/voting.js
  */
  var voting = require('../../models/voter.js');
  /**
    * @var {file} util
    * This sets the util voting to equal the path to the lib/util
  */
  var util = require('../../../lib/util');
<<<<<<< ef0643890e9b9989d9386876a507aefb4a93aaa6
          /**
            * @function get
            * @description Gathers Data
            * @param req
            * Requests Data
            * @param res
            * Listens for response
          */
  router.get('/vote/:vote_id', function(req, res) {
    /**
      * @property req.body
      * @description holds parameters that are sent up from the client as part of a POST request
      * @property req.params
      * @description will return parameters in the matched routes
    */
    req.body.id = req.params.vote_id;
            /**
              * @function find
              * @description Finds ID in DB using _find in models/voting.js
              * @param req.body
              * Requests the body information
            */
    voting.find(req.body, function(err) {
      // ERROR Encountered.
=======
/**
 * @var {file} util
 * This sets the util voting to equal the path to the lib/util
*/

/**
 * @function get
 * @description Gathers Data
 * @param req
 * Requests Data
 * @param res
 * Listens for response
*/
  /** Read One. */
  router.get('/voting/:vote_id', function(req, res) {

    /**
     * @property req.body
     * @description holds parameters that are sent up from the client as part of a POST request
    */
    /**
     * @property {attribute} id
     * Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking
    */
    /**
     * @property req.params
     * @description will return parameters in the matched route
    */
    req.body.id = req.params.vote_id;

    /**
     * @function find
     * @description Finds ID in DB using _find in models/voting.js
     * @param req.body
     * Requests the body information
    */
    voting.find(req.body, function(err) {

      /** ERROR Encountered. */
>>>>>>> Moved annotations around for uniformity.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

<<<<<<< ef0643890e9b9989d9386876a507aefb4a93aaa6


  router.get('/votes', function(req, res) {

    voting.findAll(function(err) {
      // ERROR Encountered.
=======
  /**
   * @function get
   * @description Gathers Data
   * @param req
   * Requests Data
   * @param res
   * Listens for response
  */
  /** Read All */
  router.get('/votes', function(req, res) {

    /**
     * @function findAll
     * @description Finds all in DB using _findAll in model/voting.js
     * @param err
     * Error
    */
    voting.findAll(function(err) {

      /** ERROR Encountered. */
>>>>>>> Moved annotations around for uniformity.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });
<<<<<<< ef0643890e9b9989d9386876a507aefb4a93aaa6
          /**
            * @function put
            * @description Places Data
            * @param req
            * Requests Data
            * @param res
            * Listens for response
          */
  router.put('/app/:app_id/vote', function(req, res) {
    req.body.app_id = req.params.app_id;
            /**
              * @function create
              * @description Runs _create in models to clean data and add to DB from app
              * @param req.body
              * Requests the body information
            */
    voting.create(req.body, function(err) {
      // ERROR Encountered. , try removing id and try again.
=======

  /**
   * @function put
   * @description Places Data
   * @param req
   * Requests Data
   * @param res
   * Listens for response
  */
  /** Create */
  router.put('/app/:app_id/vote', function(req, res) {

    req.body.app_id = req.params.app_id;
    /**
     * @function create
     * @description Runs _create in models to clean data and add to DB from app
     * @param req.body
     * Requests the body information
    */
    voting.create(req.body, function(err) {

      /** ERROR Encountered. , try removing id and try again.*/
>>>>>>> Moved annotations around for uniformity.
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

<<<<<<< ef0643890e9b9989d9386876a507aefb4a93aaa6

  router.put('/app/:app_id/vote/:vote_id', function(req, res) {
    req.body.app_id = req.params.app_id;
    req.body.id = req.params.vote_id;
    util.debug('Voting Update Route Request Body', req.body);
            /**
              * @function update
              * @description varifies that app id and body.id match and runs _update in models
              * @param req.body
              * Requests the body information
            */
    voting.update(req.body, function(err) {
    // ERROR Encountered.
=======
  /**
   * @function put
   * @description Places Data
   * @param req
   * Requests Data
   * @param res
   * Listens for response
  */
  /** Update */
  router.put('/app/:app_id/vote/:vote_id', function(req, res) {

    req.body.app_id = req.params.app_id;
    req.body.id = req.params.vote_id;
    util.debug('Voting Update Route Request Body', req.body);

    /**
     * @function update
     * @description varifies that app id and body.id match and runs _update in models
     * @param req.body
     * Requests the body information
    */
    voting.update(req.body, function(err) {

    /** ERROR Encountered. */
>>>>>>> Moved annotations around for uniformity.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });


  router.delete('/app/:id/vote/:vote_id', function(req, res) {
    req.body.id = req.params.vote_id;
<<<<<<< ef0643890e9b9989d9386876a507aefb4a93aaa6
            /**
              * @function destroy
              * @description Deletes User ID using _destroy in models
              * @param req.body
              * Requests the body information
            */
    voting.destroy(req.body, function(err) {
      // ERROR Encountered.
=======
    /**
     * @function destroy
     * @description Deletes User ID using _destroy in models
     * @param req.body
     * Requests the body information
    */
    voting.destroy(req.body, function(err) {

      // Error Encountered
>>>>>>> Moved annotations around for uniformity.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json({
        success: data
      });
    });
  });

  return router;
};
