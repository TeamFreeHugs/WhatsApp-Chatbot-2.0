const mix = require('merge-descriptors');

function ChatError(message) {
    this.name = 'ChatError';
    this.message = message || '';
}

mix(ChatError.prototype, Error.prototype);

module.exports = {ChatError};
