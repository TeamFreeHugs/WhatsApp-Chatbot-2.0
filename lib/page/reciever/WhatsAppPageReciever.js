const Errors = require('../../Errors');
const Utils = require('../../Util');
const EventEmitter = require('events').EventEmitter;
const Events = require('../../events/WhatsAppEvent');
const Message = require('../../Message');

class WhatsAppAPIReciever {

    constructor(page) {
        this.page = page;
        Object.assign(this, EventEmitter.prototype);

        var handleMutation = (mutations) => {
            if (mutations[0].addedNodes) { // Added node
                var addedNode = $(mutations[0].addedNodes);
                if ($(addedNode.children().get(0)).hasClass('message-system')) // Markers or added / remove person
                    return;
                if ($(addedNode.children().get(1)).hasClass('message-chat')) {
                    var childNode = $(addedNode.children().get(1));
                     if (childNode.hasClass('message-out')) return; // Outgoing
                    var messageContent = childNode.find('.message-text > span.emojitext.selectable-text').text();
                    var senderElement = childNode.find('h3.message-author > span.text-clickable > span.emojitext');
                    var senderName;
                    if (senderElement.length > 0) {
                        senderName = senderElement.text();
                    } else {
                        senderName = this.page.chatTitle.text();
                    }

                    var parentElement = childNode.find('div.quoted-msg');
                    var parentMessage = null;
                    if (parentElement.length > 0) {
                        var parentContent = parentElement.find('div.quoted-msg-info');
                        var parentSender = parentContent.find('h3.message-author > span').text();
                        var parentMessageContent = parentContent.find('div.message-text > span').text();
                        parentElement = new Message(parentContent, parentSender, null, null);
                    }
                    var message = new Message(messageContent, senderName, childNode, parentMessage);
                    var messageEvent = new Events.NewMessageEvent(message, senderName, childNode);
                    this.emit('message', messageEvent);
                } else {
                    console.log('?');
                }
            }
        }

        this.observer = new MutationObserver(handleMutation);
    }


    startWatching() {
        this.observer.observe(this.page.messagesDiv[0], {
            childList: true
        });
    }

    isReady() {
        return this.page.messageContentBox.length > 0;
    }

}

module.exports = WhatsAppAPIReciever;
