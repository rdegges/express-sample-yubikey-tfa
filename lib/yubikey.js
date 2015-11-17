'use strict';

var Yubikey = require('yubikey');

module.exports = new Yubikey(process.env.YUBIKEY_CLIENT_ID, process.env.YUBIKEY_CLIENT_SECRET);
