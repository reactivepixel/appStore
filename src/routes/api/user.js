module.exports = (express) => {
  const router = express.Router();
  const user = require('../../models/user.js');
  const util = require('apex-util');

  // Read One
  router.get('/user/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;

    user.find(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/users', (req, res) => {
    user.findAll((err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/user', (req, res) => {
    const payload = util.scrubData(req.body);

    user.create(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/user/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;

    user.update(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/user/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;

    user.destroy(payload, (err) => {
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
