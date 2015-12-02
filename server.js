'use strict';

var async = require('async');
var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

// Application Settings
app.set('view engine', 'jade');

// Middleware
app.use(require('./middleware/stormpath')(app));
app.use(require('./middleware/tfa'));

// This custom logout route wipes the Yubikey session ID for this user, which
// ensures they are prompted to log-in fresh next time with their Yubikey
// device.
app.get('/logout', function(req, res, next) {
  var config = req.app.get('stormpathConfig');
  var accepts = req.accepts(['html', 'json']);
  var middleware = require('express-stormpath/lib/middleware');

  async.series([
    function(callback) {
      if (!req.user) {
        return callback();
      }

      req.user.getCustomData(function(err, data) {
        if (err) {
          return callback(err);
        }

        req.user.customData.remove('yubikeySessionId');
        req.user.customData.save(callback);
      });
    },
    function(callback) {
      middleware.revokeTokens(req, res);
      middleware.deleteCookies(req, res);
      callback();
    }
  ], function(err) {
    if (err) {
      return next(err);
    }

    if (accepts === 'json') {
      return res.status(200).end();
    }

    res.redirect(config.web.logout.nextUri);
  });
});

// Routes
app.use('/', require('./routes/index'));
app.use('/tfa', require('./routes/tfa'));

// Server
app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 3000);
});
