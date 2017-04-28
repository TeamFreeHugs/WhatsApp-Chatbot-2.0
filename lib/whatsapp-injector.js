const request = require('request');
const path = require('path');
const fs = require('fs');

const WhatsAppAPI = require('./WhatsAppAPI');

function waitForPageLoad() {
    var intervalTimer = setInterval(() => {
        if ($('#side > header > div.pane-list-user > div').length === 1) {
            clearInterval(intervalTimer);
			try {
				require('../user/main');
			} catch (e) {
				console.warn('Could not load user module');
			}
        }
    }, 1000);
}

function onJQueryLoad() {
    global.WhatsAppAPI = WhatsAppAPI;
    waitForPageLoad();
}

module.exports = () => {
    request('http://code.jquery.com/jquery-3.1.1.min.js', (err, resp, body) => {
        eval(body); // Such codes
        onJQueryLoad();
    });
}
