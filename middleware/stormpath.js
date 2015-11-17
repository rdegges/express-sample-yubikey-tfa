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
      // Redirect to the Yubikey device registration page.
      res.redirect('/connect');
    }
  });
}
