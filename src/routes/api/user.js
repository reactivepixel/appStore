module.exports = function (express) {
  var router = express.Router();
  var user = require('../../models/user.js');
  var util = require('../../../lib/util');

  // Read One
  router.get('/user/:id', function(req, res) {
    req.body.id = req.params.id;
    user.find(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/users', function(req, res) {
    user.findAll(function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/user', function(req, res) {
    user.create(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/user/:id', function(req, res) {
    req.body.id = req.params.id;
    user.update(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/user/:id', function(req, res) {
    req.body.id = req.params.id;
    user.destroy(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json({success:data});
    });
  });

  return router;
};
