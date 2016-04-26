module.exports = function(express) {
  var g = require('ger');
  var esm = new g.MemESM();//Event Store Manager
  var ger = new g.GER(esm);//Good Enough Recommender----Added to package.json

  var person = 'person variable';
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
  });






};
