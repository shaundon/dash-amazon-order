# Dash Amazon Order

Use your Dash button to buy stuff on Amazon. Forked from [Dash Rickroll](https://github.com/girliemac/dash-rickroll).

## To Do

Doesn't actually order anything yet. At the moment it just prints to console when
the button is pressed.

## Prerequisites

* Be in the UK (because this uses UK Amazon).
* NodeJS (6+) and NPM.
* An Amazon dash button (duh).
* If using Linux `sudo apt-get install libpcap-dev` first. (macOS already has this).
* You need [PhantomJS](http://phantomjs.org/download.html) installed. On macOS, you can use `brew install phantomjs`.

## Usage

1. Clone this repo.
1. Make a copy of `config.example.js`. Name it `config.js`.
1. `npm install`.
1. Go through the setup process on your Dash button, but quit the Amazon app on your phone when you get to the 'Choose Product' screen.
1. `npm run find-buttons`. This uses [node-dash-button](https://www.npmjs.com/package/node-dash-button) to search for buttons.
1. Put the MAC address of your button into `config.js`
1. `npm start` to get the service running. Now press your button!
