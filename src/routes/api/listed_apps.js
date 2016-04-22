module.exports = function (express) {
  /**
   * @var {module} router
   * This sets the express.Router function to the variable, router.
  */
  var router = express.Router();
<<<<<<< 3a1b874af3a839672f4590e9b7cc62c6e1d90516
  var list = require('../../models/listed_apps');
=======

  /**
   * @var {file} list
   * This sets the imported file listed_apps.js to the variable, list.
  */
  var list = require('../../models/listed_apps.js');

  /**
   * @var {file} util
   * This sets the imported file util.js to the variable, util.
  */
>>>>>>> Added annotations to listed_apps.js
  var util = require('../../../lib/util');

  // Create
  /**
   * @function put
   * @param filePath
   * ATTN: A route or filepath with unqiue data.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
  router.put('/listed_app/:list_id/:app_id', function(req, res) {
    req.body.listId = req.params.list_id;
    req.body.appId = req.params.app_id;
    util.debug('Listed Apps Route Create Request', req.body);
    list.create(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });


  // Delete One
  /**
   * @function delete
   * @param filePath
   * ATTN: A route or filepath with unqiue data.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
  router.delete('/listed_app/:list_id/:app_id', function(req, res) {
    req.body.listId = req.params.list_id;
    req.body.appId = req.params.app_id;
    list.destroy(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json({success:data});
    });
  });

  return router;
};
