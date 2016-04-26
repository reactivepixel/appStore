module.exports = function(express) {

    var g = require('ger');
    var esm = new g.MemESM();
    var ger = new g.GER(esm);


    //initialize namespace
    //namespace will be the game genre
    ger.initialize_namespace('sports').then(function(){

      //create array treated as a 'bucket'
      //buckets will contain user information
      var bucket_array=[
      {
        namespace : 'sports',
        person    : 'patrick',
        action    : 'likes',
        thing     : 'game1',
        expires_at: '2020-06-06'
      },
      {
        namespace : 'sports',
        person    : 'sean',
        action    : 'likes',
        thing     : 'game2',
        expires_at: '2020-06-06'
      }];

      //send bucket_array into events method
      //events method will allow algortihm to be run on user information
      //we will then use that algortihm to return the recommendations methods
      //those methods will display the game or 'thing' to recommend to user
      ger.events(bucket_array)
      .then(function(){
        //display our array for testing purpose
        console.log(bucket_array);
        //run recommendation method to recommend a game or 'thing' to user
        return ger.recommendations_for_person('sports', 'patrick', {actions: {likes: 1}});
      })
      .then(function(recommendations){
        //display result of recommendations_for_person()
        return console.log(JSON.stringify(recommendations,null,2));
      });
  });
};
