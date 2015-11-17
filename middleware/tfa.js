'use strict';

/**
 * This middleware will redirect the user to the Yubikey registration page if
 * they haven't already registered a Yubikey device with their account.
 */
module.exports = function(req, res, next) {
  if (req.user && req.path !== '/connect' && !req.user.customData.yubikeyUserId) {
    return res.redirect('/connect');
  }

  next();
};
