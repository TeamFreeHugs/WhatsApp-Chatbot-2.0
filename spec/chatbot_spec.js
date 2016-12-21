// This uses a custom message send/receive system

const WhatsAppAPI = require('../lib/WhatsAppAPI');

class FakeSender {
    sendMessage(message) {
        reallySent(message);
    }
}

class FakeReceiver {
    get isReady() {
        return true;
    }

    startWatching() {
        
    }
}

function createAPI() {
    return new WhatsAppAPI(new FakeSender, new FakeReceiver);
}

describe('WhatsApp API', () => {
    it('can receive messages', () => {
        const api = createAPI();
    });
});
