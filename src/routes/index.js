module.exports = function(express) {
  var history = require('../models/history');
  var db = require('../models/db');
  var router = express.Router();

  // NOTES
  // made a variable point to history.js in model folder.
  // middleware function is placed after the route.get
  // ^^ because middleware won’t execute for GET requests
  // will fire on every route that comes thru express
  //created a homepage view to test bootstrap and routing connection

  router.get('/status', function(req, res) {

    res.status(200).json({
      healthy: true
    });
  });

  router.get('/', function(req,res){
    res.sendFile(__dirname + './../client/html/index.html');
  });

  router.get('/charge', function(req,res){
    res.sendFile(__dirname + './../../client/html/charge.html');
  });

  

  // Routes
  router.use('/home', express.static(__dirname + './../client/html/index.html'));
  router.use('/jsdoc', express.static(__dirname + './../../build/jsdocs')); // JSdoc route
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));
  router.use('/api/', require('./api/voting')(express));
  // router.use('/api/', require('./api/recommend')(express));

  // MIDDLE-WARE
  // used the existing module on index.js to add track user browsering in the url.
  // this middleware function has no mount path.
  // this code is executed for every request to the router.
  // rawRoute of url is stored in database.
  router.use(function (req, res, next) {
    var payload = req.body;
    //rawRoute is db name
    // create full rawRoute of the url and store in db
    payload.rawRoute = path.join(req.protocol + '://' + req.get('host') + req.originalUrl);
    history.create(payload,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
      next(); // end the request
    });
  });
  router.post('/charge', function(req,res,next){
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_LUmKi0AVTawC8QDabKUXYjQZ");

    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeToken = request.body.stripeToken;

    var charge = stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      source: stripeToken,
      description: "Example charge"
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {

      };
    });
  });
  return router;
};
