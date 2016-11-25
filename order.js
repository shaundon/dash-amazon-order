const casper = require('casper').create();

const config = require('./config');
const email = config.amazon.credentials.email;
const password = config.amazon.credentials.password;
const productId = config.amazon.productId;

// Required for cookies to work.
// http://stackoverflow.com/a/15438666/1011161
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');

const AMAZON_URL = 'https://amazon.co.uk/';
const LOGIN_FORM_SELECTOR = 'form[name="signIn"]';
const ONE_CLICK_ENABLE_BUTTON = 'a.oneClickSignInLink';
const ONE_CLICK_PURCHASE_BUTTON = 'input#oneClickBuyButton';
const SUCCESS_SELECTOR = 'div#thank-you-header';

// Go to product page.
casper.start(AMAZON_URL + 'dp/' + productId, function() {
  this.echo('Loaded the product page.');
});

casper.waitForSelector(ONE_CLICK_ENABLE_BUTTON);

// Click the 'buy with one click' button.
casper.then(function() {
  this.echo('Clicking buy button');
  this.click(ONE_CLICK_ENABLE_BUTTON);
});

// Login form appears.
casper.waitForSelector(LOGIN_FORM_SELECTOR, function() {
  this.echo('Amazon login page loaded. Signing in as ' + email);
  this.fill(LOGIN_FORM_SELECTOR, {
    email: email,
    password: password
  }, true);
});
//
// // Wait for the form to be gone.
// casper.waitWhileSelector(LOGIN_FORM_SELECTOR, function(){
//   this.echo('Signed in!');
// });
//
// // Buy it!
// casper.click(ONE_CLICK_PURCHASE_BUTTON);
//
// casper.waitForSelector(SUCCESS_SELECTOR, function() {
//   casper.echo('Purchased!');
//   this.capture('screenshot.png');
// });

casper.run();
