module.exports = function(express) {
  var history = require('../models/history');
  var db = require('../models/db');
  var stripe = require("stripe")("sk_test_LUmKi0AVTawC8QDabKUXYjQZ");
  var router = express.Router();


  // file is included here:


  // NOTES
  // made a variable point to history.js in model folder.
  // middleware function is placed after the route.get
  // ^^ because middleware won’t execute for GET requests
  // will fire on every route that comes thru express
  //created a homepage view to test bootstrap and routing connection


  // Standard Routes
  router.get('/', function(req, res) {
    res.status(200).json({
      msg: 'Hello World',
      healthy: true
    });
  });

  router.get('/status', function(req, res) {

    res.status(200).json({
      healthy: true
    });
  });


  router.use('/public', express.static(__dirname + './../client/html'));

  // Routes
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
  // router.use(function (req, res, next) {
  //   var payload = req.body;
  //   //rawRoute is db name
  //   // create full rawRoute of the url and store in db
  //   payload.rawRoute = path.join(req.protocol + '://' + req.get('host') + req.originalUrl);
  //   history.create(payload,function(err){
  //     // Error Encountered
  //     res.status(500).json(err);
  //   },function(data) {
  //     res.status(200).json(data);
  //     next(); // end the request
  //   });
  // });

  router.get('/testfire', function (req,res){

    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://dashboard.stripe.com/account/apikeys

    var token = 'placeholder';
    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeToken = stripe.tokens.create({
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2017,
        cvc: '123'
      }
    }, function(err, token) {
      // res.json({sucess:'token', token:stripeToken, err:err})
      token = token.id;

      var charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "usd",
        source: token,
        description: "Example charge"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          // The card has been declined
          res.json({success:false, err: err, charge: charge});
        }else{
          res.json({success:true});
        }
      });
    });



    // res.json({name:'Yooo'});
  });


  return router;
};
