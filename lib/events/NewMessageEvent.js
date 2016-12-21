const WhatsAppEvent = require('./WhatsAppEvent');

class NewMessageEvent {
    constructor(message) {
        Object.assign(this, WhatsAppEvent.prototype);
        this.message = message;
    }
}

module.exports = NewMessageEvent;
