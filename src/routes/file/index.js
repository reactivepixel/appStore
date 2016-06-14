module.exports = (express) => {
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  const router = express.Router();

  router.post('/upload', upload.single('bulk'), (req, res, next) => {

  });

  router.get('/form', (req, res) => {
    res.send('<form method="post" enctype="multipart/form-data" action="/file/upload">' +
      '<input type="file" name="bulk">' +
      '<input type="submit">' +
      '</form>');
  });

  return router;
}
