const NewMessageEvent = require('./NewMessageEvent');

class WhatsAppEvent {
    constructor() {

    }
    static get NewMessageEvent() {
        return NewMessageEvent;
    }
}

module.exports = WhatsAppEvent;
