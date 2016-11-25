const config = require('./config');

const dash_button = require('node-dash-button');

const dash = dash_button(config.dash.MAC_address);
const credentials = config.amazon.credentials;
const productId = config.amazon.productId;

console.log("Service running!");

dash.on('detected', () => {
  console.log('Button was pressed.');
});
