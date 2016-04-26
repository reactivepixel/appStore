module.exports = function(userObj) {

    var g = require('ger');
    var esm = new g.MemESM();
    var ger = new g.GER(esm);


    //initialize namespace
    //namespace will be the game genre
    ger.initialize_namespace(userObj.namespace).then(function(){

      //create an empty array of objects treated as a 'bucket' in ger module
      var bucket_array=[
      {
        namespace : '',
        person    : '',
        action    : '',
        thing     : '',
        expires_at: ''
      }
    ];


    //store our info from the recommend route into our array/bucket
    bucket_array[0].namespace=userObj.namespace;
    bucket_array[0].person=userObj.person;
    bucket_array[0].action=userObj.action;
    bucket_array[0].thing=userObj.thing;
    bucket_array[0].expires_at=userObj.expires_at;

    //create new object to push into bucket array

      //send bucket_array into events method
      //events method will allow algortihm to be run on user information
      //we will then use that algortihm to return the recommendations methods
      //those methods will display the game or 'thing' to recommend to user
      ger.events(bucket_array)
      .then(function(){
        //display our array for testing purpose
        // console.log(bucket_array);
        //run recommendation method to recommend a game or 'thing' to user
        return ger.recommendations_for_person('sports', 'patrick', {actions: {likes: 1}});
      })
      .then(function(recommendations){
        //display result of recommendations_for_person()
        // return console.log(JSON.stringify(recommendations,null,2));
      });
  });
};
