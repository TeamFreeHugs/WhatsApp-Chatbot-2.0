try {
    const EventEmitter = require('events').EventEmitter;
    const WhatsAppPageSender = require('./page/sender/WhatsAppPageSender');
    const WhatsAppPageReciever = require('./page/reciever/WhatsAppPageReciever');
    const WhatsAppMessageReciever = require('./reciever/WhatsAppMessageReciever');
    const WhatsAppMessageSender = require('./sender/WhatsAppMessageSender');
    const WhatsAppAPIPage = require('./page/WhatsAppAPIPage');

    class WhatsAppAPI {

        constructor(sender, reciever) {
            if (!sender) throw new TypeError('Must specify a sender');
            if (!reciever) throw new TypeError('Must specify a reciever');
            if (!(sender instanceof WhatsAppMessageSender)) throw new TypeError('Sender is not a sender');
            if (!(reciever instanceof WhatsAppMessageReciever)) throw new TypeError('Reciever is not a Reciever');
            this.sender = sender;
            this.reciever = reciever;
            return this;
        }

        static newInstance() {
            var page = new WhatsAppAPIPage();
            return new WhatsAppAPI(new WhatsAppPageSender(page), new WhatsAppPageReciever(page));
        }

        sendMessage(message, parent) {
            this.sender.sendMessage(message, parent);
        }

        sendImage(imageURL, parent) {
            this.sender.sendImage(imageURL, parent);
        }

        on(event, handler) {
            this.reciever.on(event, handler);
        }

        removeListener(handler) {
            this.reciever.removeListener(handler);
        }

        startGettingMessages() {
            this.reciever.startGettingMessages();
        }

        get isReady() {
            return this.reciever.isReady();
        }

    }

    module.exports = WhatsAppAPI;

} catch (e) {
    console.log(e);
}
