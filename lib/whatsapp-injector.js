const request = require('request');

const WhatsAppAPI = require('./WhatsAppAPI');

function onJQueryLoad() {
    global.WhatsAppAPI = WhatsAppAPI;
}

module.exports = () => {
    request('http://code.jquery.com/jquery-3.1.1.min.js', (err, resp, body) => {
        eval(body); // Such codes
        onJQueryLoad();
    });
}
