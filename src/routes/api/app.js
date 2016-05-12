module.exports = (express) => {
  const router = express.Router();
  const app = require('../../models/app');
  const util = require('../../../lib/util');

  // Read One
  router.get('/app/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;
    app.find(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/apps', (req, res) => {
    app.findAll((err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/app', (req, res) => {
    const payload = util.scrubData(req.body);
    app.create(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/app/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;
    app.update(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/app/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;
    app.destroy(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json({
        success: data,
      });
    });
  });
  return router;
};
