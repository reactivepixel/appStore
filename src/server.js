/**
 * @var {module} express
 * This is the express module being put into a variable, express.
*/
var express = require('express'); // Sets variable express to express module
/**
 * @var {module} body_parser
 * This is the body-parser module being put into a variable, body_parser.
*/
var body_parser = require('body-parser'); // Sets variable body_parser to body-parser module

/**
 * @var {module} app
 * This is the express functionality being put into a variable, app.
*/
var app = express(); // Sets variable app to express function

// Dot Env File Loader
if (!util.exists(process.env.PORT)) dotenv = require('dotenv').load(); // If



/**
 * @var {number} port
 * Config - Sets variable port to .env file PORT variable OR 3000 if the file doesn't exist.
*/
var port = process.env.PORT || 3000;

// Enable body-parser
/**
 * @function use
 * @param body_parser.json()
 * Tells app to use the selected File.
*/
app.use(body_parser.json());

/**
 * @function require
 * @param ./routes(express)
 * Tells app to require the routes.
*/
app.use('/', require('./routes')(express));

// Start up the Server
/**
 * @var {module} server
 * @function listen
 * @param port
 * This sets the server variable to the listening action on @var {number} port
 * @param function
 * This is what you would like the function to do while the listen function is running.
*/
var server = app.listen(port, function() {
  if (process.env.DEBUG) console.log('Server Active On', port);
});


module.exports = server;
