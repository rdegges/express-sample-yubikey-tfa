'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var stormpath = require('express-stormpath');

var yubikey = require('../lib/yubikey');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/connect', stormpath.loginRequired, function(req, res) {
  res.render('tfa-register');
});

router.post('/connect', stormpath.loginRequired, function(req, res) {
  var config = req.app.get('stormpathConfig');
  var otp = req.body.otp;

  if (!otp) {
    return res.render('tfa-register');
  }

  yubikey.verify(otp, function(err) {
    if (err) {
      return res.render('tfa-register', { error: err });
    }

    var data = req.user.customData;
    var userId = otp.substring(0, 12);

    data.yubikeyUserId = userId;
    data.save(function(err) {
      if (err) {
        return res.render('tfa-register', { error: err });
      }

      res.redirect(config.web.register.nextUri);
    });
  });
});

module.exports = router;
