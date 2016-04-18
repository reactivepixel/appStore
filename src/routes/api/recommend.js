module.exports = function (express) {

  var buckets=require('../../models/recommend');
  var router = express.Router();

  router.get('/', function(req, res){
     res.send("info");
  });

  return router;

};
