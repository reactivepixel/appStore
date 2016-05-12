const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const util = require('../lib/util');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', require('./routes')(express));


/**
 * The Server Module that launches the API. Usable by other services like in unit testing.
 * @module Start/Server
 */
exports.server = app.listen(port, () => {
  util.debug('Server Active On', port);
});
