module.exports = function(express) {

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
