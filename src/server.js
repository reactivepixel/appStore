const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const util = require('apex-util');

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', require('./routes')(express));


/**
 * The Server Module that launches the API. Usable by other services like in unit testing.
 * @module Start/Server
 */
exports.server = app.listen(port, () => {
  util.debug('Server Active On', port);
});
