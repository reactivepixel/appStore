const express = require('express');
const body_parser = require('body-parser');
var app = express();

// Dot Env File Loader
if(!process.env.PORT) dotenv = require('dotenv').load();

// Config
var port = process.env.PORT || 3000;

// Enable body-parser
app.use(body_parser.json());

// Routes
app.use('/api/v1', require('./routes/api/user.js')(express));
app.use('/api/v1', require('./routes/api/app.js')(express));

var server = app.listen(port, function(){
  if(process.env.DEBUG) console.log('Server Active On', port);
});

module.exports = server;
