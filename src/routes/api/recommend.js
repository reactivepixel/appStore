
var buckets=require('../../models/recommend');


//data sent to recommend model as an object
//this data will be configured to correlate with each unique user info
var userObj={
  namespace : 'sports',
  person    : 'Patrick',
  action    : 'likes',
  thing     : 'game1',
  expires_at: '2020-06-06'
};

buckets(userObj);
