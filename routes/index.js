'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

var router = express.Router();

router.get('/', stormpath.loginRequired, function(req, res) {
  res.send('Hello ' + req.user.givenName + ', you are now logged in! Thanks for using your Yubikey!');
});

module.exports = router;
