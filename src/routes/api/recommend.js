module.exports = function (express) { // Setting module.exports to a new function that excepts express as a paramater of express.

  var router = express.Router();
  var buckets=require('../../models/recommend');
  var user=require('../../models/user');


  /**
    * @description last object in is subject object
      data sent to recommend model as an object
      this data will be configured to correlate with each unique user info
  */

  var userObj={
    namespace : 'action',
    person    : 'Patrick',
    action    : 'likes',
    thing     : 'game1',
    expires_at: '2020-06-06'
  };

  var userObj2={
    namespace : 'strategy',
    person    : 'Selena',
    action    : 'likes',
    thing     : 'game2',
    expires_at: '2020-06-06'
  };

  var userObj3={
    namespace : 'sports',
    person    : 'Sean',
    action    : 'likes',
    thing     : 'game2',
    expires_at: '2020-06-06'
  };

  var userObj4={
    namespace : 'sports',
    person    : 'Sean',
    action    : 'likes',
    thing     : 'game4',
    expires_at: '2020-06-06'
  };

  buckets(userObj);
  buckets(userObj2);
  buckets(userObj3);
  buckets(userObj4);

  router.get('/recommend', function(req, res) {
    res.send('recommend route');
  });

  return router;

};
