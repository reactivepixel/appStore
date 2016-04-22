module.exports = function(express) {
  var g = require('ger');
  var esm = new g.MemESM();//Event Store Manager
  var ger = new g.GER(esm);//Good Enough Recommender----Added to package.json

var genre='sports';

  ger.initialize_namespace('sports')
  .then(function(){
    return ger.events([
      {
        namespace: 'sports',
        person: 'patrick',
        action: 'likes',
        thing: 'game1',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'sports',
        person: 'sean',
        action: 'likes',
        thing: 'game2',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'sports',
        person: 'selena',
        action: 'likes',
        thing: 'game3',
        expires_at: '2020-06-06'
      },
      {
        namespace: 'sports',
        person: 'patrick',
        action: 'likes',
        thing: 'game3',
        expires_at: '2020-06-06'
      }
  ]);
}).then(function(){
    return ger.recommendations_for_thing('sports', 'game3', {actions: {likes: 1}});
  }).then(function(recommendations){
    // console.log(`Person: ${person}`+JSON.stringify(recommendations, null,2));
  });



};
