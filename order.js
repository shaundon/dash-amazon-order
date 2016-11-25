const casper = require('casper').create();

const config = require('./config');
const email = config.amazon.credentials.email;
const password = config.amazon.credentials.password;
const productId = config.amazon.productId;

// Required for cookies to work.
// http://stackoverflow.com/a/15438666/1011161
phantom.enableCookies = true;
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');

const AMAZON_URL = 'https://amazon.co.uk/';
const LOGIN_FORM_SELECTOR = 'form[name="signIn"]';
const ENABLE_ONE_CLICK_BUTTON = 'a.oneClickSignInLink';
const BUY_WITH_ONE_CLICK_BUTTON = 'input#oneClickBuyButton';
const THANK_YOU_MESSAGE = 'div#thank-you-center';

// Go to orders page first to get a sign in prompt.
casper.start(AMAZON_URL + 'orders', function() {
  this.waitForSelector(LOGIN_FORM_SELECTOR);
});

// Fill in the form.
casper.then(function() {
  this.echo('Amazon login page loaded. Signing in as ' + email);
  this.fill(LOGIN_FORM_SELECTOR, {
    email: email,
    password: password
  }, true);
});

// Wait for the form to be gone.
casper.waitWhileSelector(LOGIN_FORM_SELECTOR, function() {
  this.echo('Signed in!');
});

// Go to the product page.
casper.thenOpen(AMAZON_URL + 'dp/' + productId, function() {
  this.echo('Navigated to product page (' + AMAZON_URL + 'dp/' + productId + ')');
  this.capture('screenshot.png', {
    top: 0,
    left: 0,
    width: 1200,
    height: 800
  });
});

casper.then(function() {
  this.echo('Enabling one click for this browser.');
  this.click(ENABLE_ONE_CLICK_BUTTON);
});

casper.then(function() {
  this.capture('screenshot1.png', {
    top: 0,
    left: 0,
    width: 1200,
    height: 800
  });
})

casper.waitForSelector(BUY_WITH_ONE_CLICK_BUTTON, function() {
  this.click(BUY_WITH_ONE_CLICK_BUTTON);
});

casper.waitForSelector(THANK_YOU_MESSAGE, function() {
  this.capture('screenshot1.png', {
    top: 0,
    left: 0,
    width: 1200,
    height: 800
  });
  this.echo('Ordered successfully!');
});

// casper.onError(function() {
//   this.echo('Something went wrong.');
// });

casper.run();
