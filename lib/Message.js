class Message {
    constructor(content, sender, messageElement, parent) {
        this.content = content;
        this.sender = sender;
        this.messageElement = messageElement;
        this.parent = parent;
    }
}

module.exports = Message;
