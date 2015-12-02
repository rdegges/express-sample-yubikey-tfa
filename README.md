# express-sample-yubikey-tfa

This example Express.js web application demonstrates how you can get two-factor
authentication working using [Stormpath](https://stormpath.com/) and a
[Yubikey](https://www.yubico.com/) device.


## Installation

To get started, you'll want to install all of the required Node modules:


```console
$ npm install
```


## Usage

Next, you'll need to set a few environment variables:

```console
$ export YUBIKEY_CLIENT_ID=xxx
$ export YUBIKEY_CLIENT_SECRET=xxx
$ export STORMPATH_CLIENT_APIKEY_ID=xxx
$ export STORMPATH_CLIENT_APIKEY_SECRET=xxx
$ export STORMPATH_APPLICATION_HREF=https://api.stormpath.com/v1/applications/xxx
```

You can get your own Yubikey API credentials by visiting the [this
page](https://upgrade.yubico.com/getapikey/).

You can get your own Stormpath API credentials by signing up for Stormpath and
creating an API key:
[https://api.stormpath.com/register](https://api.stormpath.com/register).


## Testing

To test out this example Application, you'll want to start the web server by
running:

```console
$ node server.js
```

And then visit [http://localhost:3000](http://localhost:3000) in your browser.
This will take you to a login page where you can either attempt to log in, or
create a new account.

When creating an account, you'll be prompted to register your Yubikey device.
When logging in, you'll be prompted to authenticate with your Yubikey device.

Easy!

Here's how it looks:

![Yubikey Demo](https://raw.githubusercontent.com/rdegges/express-sample-yubikey-tfa/master/assets/yubikey-stormpath.gif)
