const request = require('request');
const path = require('path');
const fs = require('fs');

const WhatsAppAPI = require('./WhatsAppAPI');

function waitForPageLoad() {
    var intervalTimer = setInterval(() => {
        if ($('#side > header > div.pane-list-user > div').length === 1) {
            clearInterval(intervalTimer);
            var filePath = path.join(process.cwd(), 'user/main.js');
            fs.stat(filePath, (err, stat) => {
                if (err == null) {
                    require(filePath);
                }
            });
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
