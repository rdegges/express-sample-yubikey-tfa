'use strict';

var stormpath = require('express-stormpath');

var yubikey = require('../lib/yubikey');

module.exports = function(app) {
  return stormpath.init(app, {
    expand: {
      customData: true
    },
    web: {
      register: {
        autoLogin: true
      }
    },
    website: true,
    postRegistrationHandler: function(account, req, res, next) {
      account.getCustomData(function(err, data) {
        if (err) {
          return next(err);
        }

        data.yubikeyUserId = null;
        data.save(function(err) {
          if (err) {
            return next(err);
          }

          // Redirect to the Yubikey device registration page.
          res.redirect('/tfa/register');
        });
      });
    }
  });
}
