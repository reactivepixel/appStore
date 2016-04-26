module.exports = function (express) {
  var router = express.Router();
  var review = require('../../models/review.js');
  var util = require('../../../lib/util');

  //create
  router.put('/review',function(req, res){
    review.create(req.body,function(err){
    },  function(){
        res.status(200).json(data);
      });
  });

  //update
  router.put('/review/:id',function(req, res){
    review.body.id = req.params.id;
    review.update(req.body,function(err){
      //errors
        res.status(500).json(err);
      },function(data) {
        res.status(200).json(data);
      });
  });

  //delete
  router.delete('/review/:id',function(req, res){
    req.body.id = req.params.id;
    review.destroy(req.body,function(err){
      res.status(500).json(err);
    },function(data) {
      res.status(200).json({success:data});
    });
  });


return router;
};
