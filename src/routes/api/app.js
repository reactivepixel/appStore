module.exports = (express) => {
  const router = express.Router();
  const app = require('../../models/app');
  const util = require('apex-util');


/**
 * @function get
 * @param filePath
 * ATTN: A route or filepath with unqiue data.
 * @param function(req,res)
 * This is a function that takes in req and res as parameters
 * @desc ATTN: What does this do?
*/
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

  /**
   * @function get
   * @param filePath
   * ATTN: A route or filepath.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
  // Read All
  router.get('/apps', (req, res) => {
    app.findAll((err) => {
      // Error Encountered
      res.status(500).json(err);
    }, (data) => {
      res.status(200).json(data);
    });
  });

  /**
   * @function put
   * @param filePath
   * ATTN: A route or filepath.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
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

  /**
   * @function put
   * @param filePath
   * ATTN: A route or filepath with unqiue data.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
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

  /**
   * @function delete
   * @param filePath
   * ATTN: A route or filepath with unqiue data.
   * @param function(req,res)
   * This is a function that takes in req and res as parameters
   * @desc ATTN: What does this do?
  */
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
