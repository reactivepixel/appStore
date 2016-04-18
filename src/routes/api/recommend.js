module.exports = function(express) {

  var router = express.Router();
  var g = require('ger');
  var esm = new g.MemESM();//Event Store Manager
  var ger = new g.GER(esm);//Good Enough Recommender

//change test parameters
//might use .put for postman
var person='jeff';
var sports='sports';
var thing='swimming';

//ger will produce a confidence amount which represents what to recommend to subject user.
//the higher the confidence the higher the thing/game will be recommended

ger.initialize_namespace('sports')//bucket of events with name sport. other buckets will be made
.then( function() {
  return ger.events([
    {
      namespace: 'sports',
      person: 'bob',
      action: 'likes',
      thing: 'soccer',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'bob',
      action: 'likes',
      thing: 'swimming',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'bob',
      action: 'likes',
      thing: 'baseball',
      expires_at: '2020-06-06'
    }
    ,{
      namespace: 'sports',
      person: 'jeff',
      action: 'likes',
      thing: 'swimming',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'jeff',
      action: 'likes',
      thing: 'basketball',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'alice',
      action: 'likes',
      thing: 'soccer',
      expires_at: '2020-06-06'
    }
    ,{
      namespace: 'sports',
      person: 'alice',
      action: 'likes',
      thing: 'voleyball',
      expires_at: '2020-06-06'
    }
    // {
    // namespace: 'sports',
    // person: 'alice',
    // action: 'likes',
    // things: 'basketball',
    // expires_at: '2020-06-06'
    // }
  ])
});
router.get('/recommend', function(req, res) {
  // fs.createReadStream("src/routes/recommend.html", "UTF-8").pipe(res);

  // res.status(200).json({
  //   msg: 'Hello World',
  //   healthy: true
  // });

  // router.use('/', express.static('public'));
  var body="";
  req.on("data", function(chunk) {
  body += chunk;
});
req.on("end", function() {

  // res.send("Hi im linss1");
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
      <meta charset="utf-8">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
      <link href="recommend.css" rel="stylesheet" type="text/css"/>
      <title>App. Store Home View (testing)</title>
    </head>
    <body>
        <h1>App Store Home Page (test)</h1>
        <p>Bootstrap connected</p>
        <p>${person}</p>
        <button class="btn btn-success">button</button>



    </body>
    </html>


    `);
  });

});

// .then( function() {
//   return ger.recommendations_for_person(sports, person, {actions: {likes: 1}})
// })
// .then( function(recommendations) {
//   console.log("\nRecommendations For %s", person)
//   console.log(JSON.stringify(recommendations,null,5))//array to stringify, null, space is 5
// })
// .then( function() {
//   return ger.recommendations_for_thing(sports, thing, {actions: {likes: 1}})
// })
// .then( function(recommendations) {
//   console.log("\nRecommendations Like %s", thing)
//   console.log(JSON.stringify(recommendations,null,5))
// })
return router;
};
