const EventEmitter = require('events').EventEmitter;

class WhatsAppAPIReciever {
    constructor() {
        Object.assign(this, EventEmitter.prototype);
        return this;
    }

    startGettingMessages() {    }

    isReady() {    }

}

module.exports = WhatsAppAPIReciever;
