'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

// Middleware
app.use(require('./middleware/stormpath')(app));

// Routes
app.use(require('./routes/index'));

// Server
app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 3000);
});
