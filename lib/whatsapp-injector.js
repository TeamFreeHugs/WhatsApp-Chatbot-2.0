const request = require('request');

module.exports = () => {
    request('http://code.jquery.com/jquery-3.1.1.min.js', (err, resp, body) => {
        eval(body); // Such codes
    });
}
