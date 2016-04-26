module.exports = function(express) {

  var router = express.Router();
  var voting = require('../../models/voter.js');
  var util = require('../../../lib/util');

  router.get('/vote/:vote_id', function(req, res) {

    req.body.id = req.params.vote_id;

    voting.find(req.body, function(err) {
      // ERROR Encountered.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });



  router.get('/votes', function(req, res) {

    voting.findAll(function(err) {
      // ERROR Encountered.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  router.put('/app/:app_id/vote', function(req, res) {
    req.body.app_id = req.params.app_id;

    voting.create(req.body, function(err) {
      // ERROR Encountered. , try removing id and try again.
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


  router.put('/app/:app_id/vote/:vote_id', function(req, res) {
    req.body.app_id = req.params.app_id;
    req.body.id = req.params.vote_id;
    util.debug('Voting Update Route Request Body', req.body);

    voting.update(req.body, function(err) {
    // ERROR Encountered.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });


  router.delete('/app/:id/vote/:vote_id', function(req, res) {
    req.body.id = req.params.vote_id;

    voting.destroy(req.body, function(err) {
      // ERROR Encountered.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json({
        success: data
      });
    });
  });

  return router;
};
