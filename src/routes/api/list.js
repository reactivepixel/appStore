module.exports = (express) => {
  const router = express.Router();
  const list = require('../../models/list');
  const util = require('apex-util');

  // Read One
  router.get('/list/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;

    list.find(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/lists', (req, res) => {
    list.findAll((err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/list', (req, res) => {
    const payload = util.scrubData(req.body);

    list.create(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/list/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;

    list.update(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/list/:id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.id;

    list.destroy(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json({ success: data });
    });
  });

  return router;
};
