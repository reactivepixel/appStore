module.exports = function(express) {
  var g = require('ger');

  /**
   * @var {connection} esm
   *   Event Store Manager
   */
  var esm = new g.MemESM();

  /**
   * @var {connection} ger
   *   Good Enough Recommender----Added to package.json
   */
  var ger = new g.GER(esm);

var genre='sports';

var a='patrick';

//initialize_namespace
  ger.initialize_namespace('sports')
  .then(function(){//send variable a into function
    var genre='sports';
    var person1='patrick';
    var person2='selena';
    var person3='sean';

     ger.events([
      {
        namespace: genre,
        person: person1,
  ger.initialize_namespace('sports') //Creates tracking history for 'sports'
  .then(function(){
    return ger.events([ //Passing to a method through an array
      {
        namespace: 'sports',
        person: 'patrick',
        action: 'likes',
        thing: 'game1',
        expires_at: '2020-06-06'
      },
      {
        namespace: genre,
        person: person2,
        namespace: 'sports',
        person: 'sean',
        action: 'likes',
        thing: 'game2',
        expires_at: '2020-06-06'
      },
      {
        namespace: genre,
        person: person3,
        namespace: 'sports',
        person: 'selena',
        action: 'likes',
        thing: 'game3',
        expires_at: '2020-06-06'
      },
      {
        namespace: genre,
        person: person1,
        namespace: 'sports',
        person: 'patrick',
        action: 'likes',
        thing: 'game3',
        expires_at: '2020-06-06'
      }

  ]);

}).then(function(){
    // return ger.recommendations_for_thing('sports', 'game3', {actions: {likes: 1}});
    return ger.recommendations_for_thing('sports', 'game3', {actions: {likes: 1}});
    return ger.recommendations_for_person('sports', a, {actions: {likes: 1}})

  }).then(function(recommendations){
    return console.log(JSON.stringify(recommendations,null,2)+'//////// %s', ger.events.a)
  });



  //captured by express
  ger.initialize_namespace('movies')
  var esm = new g.MemESM();//Event Store Manager
  var ger = new g.GER(esm);//Good Enough Recommender----Added to package.json
//
//   //change test parameters
//   //might use .put for postman
var person='jeff';
var person2='greg';
var person3='loopy';
//   var sports='sports';
//   var thing='swimming';

// //ger will produce a confidence amount which represents what to recommend to subject user.
// //the higher the confidence the higher the thing/game will be recommended


ger.initialize_namespace('movies')
.then( function() {
  return ger.events([
    {
      namespace: 'movies',
      person: person,
      action: 'likes',
      thing: 'xmen',
      expires_at: '2020-06-06'
    }
  ])
  })
  .then( function() {
    return ger.events([
      {
        namespace: 'movies',
        person: 'bob',
        action: 'likes',
        thing: 'xmen',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'movies',
        person: 'bob',
        action: 'likes',
        thing: 'avengers',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'movies',
        person: 'alice',
        action: 'likes',
        thing: 'xmen',
        expires_at: '2020-06-06'
      },
    ])
  })
  .then( function(express) {
    // What things might alice like?
    // return ger.recommendations_for_person('movies', express, {actions: {likes: 1}})
    return console.log(express);

  })
};
});
sports_bucket_say = console.log("model and route connectted");
sayit: "like this cause json";
sayw=function(){
  console.log('"like this cause json"');
};

return sports_bucket_say;
}

};
module.exports = function(express) {
  var g = require('ger');
  var esm = new g.MemESM();//Event Store Manager
  var ger = new g.GER(esm);//Good Enough Recommender----Added to package.json

     module.exports.person = 5;
  ger.initialize_namespace(express)
  .then(function(){
    return ger.events([
      {
        namespace: 'movies',
        person: 'patrick',
        action: 'likes',
        thing: 'xmen',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'movies',
        person: 'joe',
        action: 'likes',
        thing: 'books',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'movies',
        person: 'john',
        action: 'likes',
        thing: 'xmen',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'movies',
        person: 'joe',
        action: 'likes',
        thing: 'circus',
        expires_at: '2020-06-06'
      }
  ]);
}).then(function(){
    return ger.recommendations_for_thing('movies', 'xmen', {actions: {likes: 1}});
  }).then(function(recommendations){
    console.log(`Person: ${person}`+JSON.stringify(recommendations, null,2));
  ]);
}).then(function(){ //What returns from the module
    return ger.recommendations_for_thing('sports', 'game3', {actions: {likes: 1}});
  }).then(function(recommendations){
    // console.log(`Person: ${person}`+JSON.stringify(recommendations, null,2));
  });

};
















//Plan for the day
//how to store into json
//how to push json into a function and an array
//arrays and functions interact
