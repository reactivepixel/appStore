const history = require('../models/history');
const util = require('apex-util');
module.exports = (express) => {
  const router = express.Router();

  // Middleware
  router.use((req, res, next) => {
    const payload = req.body;

    // create full rawRoute of the url and store in db
    payload.rawRoute = req.originalUrl;
    history.create(util.scrubData(payload), (err) => {
      // Error Encountered
      util.debug('History Tracking Middleware Error', err);
      next();
    }, (data) => {
      util.debug('History Tracking Middleware Success', data);
      next();
    });
  });

  // Standard Routes
  router.get('/', (req, res) => {
    res.status(200).json({
      msg: 'Hello World',
    });
  });

  router.get('/status', (req, res) => {
    history.findAll((err) => {
      util.debug('Database Failed to retrieve Histroy Data', err);
      res.status(500).json({
        healthy: false,
      });
    }, (historyData) => {
      util.debug('History Dump', historyData);
      res.status(200).json({
        healthy: true,
      });
    });
  });


  // Routes
  router.use('/public', express.static(__dirname + './../../public'));
  router.use('/jsdoc', express.static(__dirname + './../../build/jsdocs'));
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));

  return router;
};
