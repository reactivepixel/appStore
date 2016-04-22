module.exports = function(express) {

//   var express=require('express');
//   var router = express.Router();
//   var history =require('./history');
//   var db =require('./db');
  var g = require('ger');
  var esm = new g.MemESM();//Event Store Manager
  var ger = new g.GER(esm);//Good Enough Recommender----Added to package.json

  //change test parameters
  //might use .put for postman
  var person='patrick';
  var person2='greg';
  var person3='loopy';
  //   var sports='sports';
  //   var thing='swimming';

// //ger will produce a confidence amount which represents what to recommend to subject user.
// //the higher the confidence the higher the thing/game will be recommended

//initialize namespace
//namespace is a bucket of events that wont interfere with other buckets
ger.initialize_namespace('movies')
.then( function() {
  //add an event.
  //all events come in triple or more (person, action, thing) person(bob) actions(likes) thing(sports app game)
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
  ])
})
.then(function(){
  //generate recommendations for a thing (what would a person who likes xmen movie thing like?)
  return ger.recommendations_for_thing('movies', 'books', {actions: {likes: 1}});

  //generate recommendations for a person (what would person like?)
  // return ger.recommendations_for_person('movies', person, {actions: {likes: 1}});

})
.then(function(recommendations){
  console.log(`Person: ${person}`+JSON.stringify(recommendations, null,2));
});
  //use events to compare two people  by their history(bob and alice like xmen thus they are similar)
  //use events to to provide recommendations from a persons history (bob liked xmen, alice might like it too)

  //what does actions represent?
  // ger.recommendations_for_person('movies', 'alcie', {actions: likes: 1});

  //configuarion recommendation for persons
  ger.recommendations_for_person('movies', 'oatrick', {
    //config actions
    "actions":{
      "like":1, //start with 1?
      "watch":5 //watch up to 5 likes ithink?
    },
    "neighbourhood_size":20,
    "recommendations_per_neighbour":4,
    "filter_previous_actions":["watch"]//if user has done the watch action then discard next watch action
  })
}
//find_events use
//4 types in api: person: string, thign: string, actionLstring, weight:integer
//an event is a person performing an aciotn on a thing
//set_action_weight(action, weight);
