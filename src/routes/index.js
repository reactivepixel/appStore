const history = require('../models/history');
const util = require('../../lib/util');
module.exports = (express) => {
  const router = express.Router();

  // Middleware
  router.use((req, res, next) => {
    const payload = req.body;

    // create full rawRoute of the url and store in db
    payload.rawRoute = req.originalUrl;
    util.debug('-----', payload);
    history.create(payload, (err) => {
      // Error Encountered
      util.debug('History Tracking Middleware Error', err);
      next();
    }, (data) => {
      // util.debug('History Tracking Middleware Success', data);
      next();
    });
  });

  // Standard Routes
  router.get('/', (req, res) => {
    res.status(200).json({
      msg: 'Hello World',
      healthy: true,
    });
  });

  router.get('/status', (req, res) => {
    res.status(200).json({
      healthy: true,
    });
  });


  // Routes
  router.use('/jsdoc', express.static(__dirname + './../../build/jsdocs'));
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));

  return router;
};
