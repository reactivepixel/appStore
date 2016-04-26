module.exports = function(userObj) {

    var g = require('ger');
    var esm = new g.MemESM();
    var ger = new g.GER(esm);
    var db = require('./db');


    //object with placeholders for needed values from recommend route
    var userInfo={
      namespace : null,
      person    : null,
      action    : null,
      thing     : null,
      expires_at: null
    };

    //set values of userObj to userInfo
    for(var prop in userInfo){
      if(userInfo[prop] !== 'undefined'){
        userInfo[prop] = userObj[prop];
      }
    };


    /**
      * @function ger.initialize_namespace()
      * @description initialize namespace.
      * @param {string} userObj.namespace - namespace which is the game genre
    */
    ger.initialize_namespace(userInfo.namespace).then(function(){

      /**
        * @array bucket_array
        * @description array stores all the objects of user information to be sent to ger.events()
        * @param {string} userInfo
      */
      var bucket_array=[
      {
        namespace : userInfo.namespace,
        person    : userInfo.person,
        action    : userInfo.action,
        thing     : userInfo.thing,
        expires_at: userInfo.expires_at
      }
    ];

    /**
      * @function ger.events()
      * @description events method performs recommendation algortihms
      * @param {string} userInfo
    */
      ger.events(bucket_array)
      .then(function(){

        //run recommendation method to recommend a game or 'thing' to user
        return ger.recommendations_for_person(userInfo.namespace, userInfo.person, {actions: {likes: 1}});

      })
      .then( function() {

        // return things are similar to the thing
        return ger.recommendations_for_thing(userInfo.namespace, userInfo.thing, {actions: {likes: 1}});

      });
  });

};
