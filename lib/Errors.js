function ChatError(message) {
    this.name = 'ChatError';
    this.message = message || '';
}

Object.assign(ChatError, Error.prototype);

module.exports = {ChatError};
