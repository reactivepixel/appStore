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
        action: 'likes',
        thing: 'game1',
        expires_at: '2020-06-06'
      },
      {
        namespace: genre,
        person: person2,
        action: 'likes',
        thing: 'game2',
        expires_at: '2020-06-06'
      },
      {
        namespace: genre,
        person: person3,
        action: 'likes',
        thing: 'game3',
        expires_at: '2020-06-06'
      },
      {
        namespace: genre,
        person: person1,
        action: 'likes',
        thing: 'game3',
        expires_at: '2020-06-06'
      }

  ]);

}).then(function(){
    // return ger.recommendations_for_thing('sports', 'game3', {actions: {likes: 1}});
    return ger.recommendations_for_person('sports', a, {actions: {likes: 1}})

  }).then(function(recommendations){
    return console.log(JSON.stringify(recommendations,null,2)+'//////// %s', ger.events.a)
  });

  //returns object literal or function





//   var express=require('express');
//   var router = express.Router();
//   var history =require('./history');
//   var db =require('./db');
  var g = require('ger');
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
  // What things might alice like?
    return ger.recommendations_for_person('movies', person3, {actions: {likes: 1}})
  })
  .then( function(recommendations) {
    // console.log(JSON.stringify(recommendations,null,2))
  });
};
