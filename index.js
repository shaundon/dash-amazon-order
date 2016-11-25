var config = require('./config');
var dash_button = require('node-dash-button');

var dash = dash_button(config.dash.MAC_address);

console.log("Service running!");

dash.on('detected', () => {
  console.log('Button was pressed.');
});
