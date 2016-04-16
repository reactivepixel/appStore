/**@namespace*/
var testList = {
/**
* list test
*/
}

module.exports = function (express) {
  var router = express.Router();
  var list = require('../../models/list.js');
  var util = require('../../../lib/util');

  // Read One
  router.get('/list/:id', function(req, res) {
    req.body.id = req.params.id;
    list.find(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/lists', function(req, res) {
    list.findAll(function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/list', function(req, res) {
    util.debug('List Route Create Request', req.body);
    list.create(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/list/:id', function(req, res) {
    req.body.id = req.params.id;
    list.update(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/list/:id', function(req, res) {
    req.body.id = req.params.id;
    list.destroy(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json({success:data});
    });
  });

  return router;
};
