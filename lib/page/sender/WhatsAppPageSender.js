const Errors = require('../../Errors');
const Utils = require('../../Util');
const WhatsAppMessageSender = require('../../sender/WhatsAppMessageSender');

class WhatsAppPageSender extends WhatsAppMessageSender {
    constructor(page) {
        super();
        this.page = page;
    }

    setAsReply() {

    }

    sendMessage(message, parent) {
        if (!message) {
            throw new Errors.ChatError('Invalid message!');
        }
        this.page.messageContentBox.text(message);
        if (parent) {
            setAsReply(parent);
        }
        Utils.fireEvent('input', this.page.messageContentBox[0]);
        this.page.sendButton.click();
        return this;
    }

    setImage() {

    }

}


module.exports = WhatsAppPageSender;
