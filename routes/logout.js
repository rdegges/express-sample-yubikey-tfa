'use strict';

var async = require('async');
var express = require('express');
var router = express.Router();

/**
 * This custom logout route wipes the Yubikey session ID for this user, which
 * ensures they are prompted to log-in fresh next time with their Yubikey
 * device.
 */
router.get('/logout', function(req, res, next) {
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

module.exports = router;
