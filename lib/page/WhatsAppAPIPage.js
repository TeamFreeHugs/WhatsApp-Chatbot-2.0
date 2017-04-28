const Errors = require('../Errors');
const Utils = require('../Util');

class WhatsAppAPIPage {
    constructor() {
        return this;
    }

    get messageContentBox() {
        return $('div.input');
    }
    get messagesDiv() {
        return $('.message-list');
    }
    get chatTitle() {
        return $('h2.chat-title > span:nth-child(1)');
    }
    get sendButton() {
        return $('#main > footer > div.block-compose > button');
    }
    get app() {
        return $('div.app.two');
    }

}

module.exports = WhatsAppAPIPage;
