module.exports = function (express) {
  var router = express.Router();
  var app = require('../../models/app.js');

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

  // Read All
  router.get('/app', function(req, res) {
    app.findAll(function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/app', function(req, res) {
    app.create(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

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

  return router;
};
