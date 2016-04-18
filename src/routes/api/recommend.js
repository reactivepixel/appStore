module.exports = function (express) {

  var buckets=require('../../models/recommend');
  var router = express.Router();
  router.use('/recommend', function(req, res){
     res.send("info");
  });

  return router;

};
