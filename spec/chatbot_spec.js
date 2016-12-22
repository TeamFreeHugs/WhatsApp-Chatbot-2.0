// This uses a custom message send/receive system

const WhatsAppAPI = require('../lib/WhatsAppAPI');
const WhatsAppMessageReciever = require('../lib/reciever/WhatsAppMessageReciever');
const WhatsAppMessageSender = require('../lib/sender/WhatsAppMessageSender');
const NewMessageEvent = require('../lib/events/NewMessageEvent');
const Message = require('../lib/Message');

class FakeSender extends WhatsAppMessageSender {
    constructor() {
        super();
    }

    sendMessage(message) {
        this.reallySent = true;
    }
}

class FakeReceiver extends WhatsAppMessageReciever {

    constructor() {
        super();
    }

    get isReady() {
        return true;
    }

    startGettingMessages() {
        this.emit('message', new NewMessageEvent(new Message('Hello world!', 'Eyeball', null, null)));
    }

}

function createAPI() {
    return new WhatsAppAPI(new FakeSender(), new FakeReceiver());
}

describe('WhatsApp API', () => {
    it('can receive messages', () => {
        const api = createAPI();
        var event;
        api.on('message', e => event = e);
        api.startGettingMessages();
        expect(event.message.content).toEqual('Hello world!');
    });
});
