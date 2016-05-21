module.exports = (express) => {
  const router = express.Router();
  const appAsset = require('../../models/app_asset.js');
  const util = require('apex-util');

  // Read One
  router.get('/asset/:asset_id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.asset_id;
    appAsset.find(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/assets', (req, res) => {
    appAsset.findAll((err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/app/:app_id/asset', (req, res) => {
    const payload = util.scrubData(req.body);
    util.debug('Routeing', payload);
    payload.id = req.params.asset_id;
    appAsset.create(payload, (createErr) => {
      util.debug('Error Deleting App Asset Route', createErr);
      // Error Encountered, try removing id and try again.
      // TODO: Impliment this on other Creates, improve logic and error handling
      delete payload.id;
      appAsset.create(payload, (innerCreateAttemptErr) => {
        res.status(500).json(innerCreateAttemptErr);
      }, (data) => {
        res.status(200).json(data);
      });
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/app/:app_id/asset/:asset_id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.app_id = req.params.app_id;
    payload.id = req.params.asset_id;

    util.debug('App Asset Update Route Request Body', payload);
    appAsset.update(payload, (err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/app/:id/asset/:asset_id', (req, res) => {
    const payload = util.scrubData(req.body);
    payload.id = req.params.asset_id;

    appAsset.destroy(payload, (err) => {
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
