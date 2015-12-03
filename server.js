'use strict';

var express = require('express');

var app = express();

// Application Settings
app.set('view engine', 'jade');

// Middleware
app.use(require('./middleware/stormpath')(app));
app.use(require('./middleware/tfa'));

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/logout'));
app.use('/tfa', require('./routes/tfa'));

// Server
app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 3000);
});
