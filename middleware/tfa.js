'use strict';

/**
 * This middleware will redirect the user to the Yubikey registration page if
 * they haven't already registered a Yubikey device with their account.
 *
 * It will also redirect the user to the Yubikey login page if they do not have
 * the appropriate field stored in customData.
 */
module.exports = function(req, res, next) {
  if (req.path === '/tfa/register' || req.path === '/tfa/login') {
    return next();
  }

  if (req.user && req.path !== '/tfa/register' && !req.user.customData.yubikeyUserId) {
    return res.redirect('/tfa/register');
  }

  if (req.user && req.path !== '/tfa/login' && !req.user.customData.yubikeySessionId) {
    return res.redirect('/tfa/login');
  }

  next();
};
