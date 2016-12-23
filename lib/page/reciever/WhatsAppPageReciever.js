const Errors = require('../../Errors');
const Utils = require('../../Util');
const EventEmitter = require('events').EventEmitter;
const Events = require('../../events/WhatsAppEvent');
const Message = require('../../Message');
const WhatsAppMessageReciever = require('../../reciever/WhatsAppMessageReciever');


class WhatsAppPageReciever extends WhatsAppMessageReciever {

    constructor(page) {
        super();
        this.page = page;
    }

    createObservers() {
        var parseNewChatMessage = (childNode) => {
            if (childNode.hasClass('message-out') && Utils.isProduction()) return; // Outgoing
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
            return message;
        }

        var handleMutation = (mutations) => {
            if (mutations[0].addedNodes) { // Added node
                var addedNode = $(mutations[0].addedNodes);
                if ($(addedNode.children().get(0)).hasClass('message-system')) // Markers or added / remove person
                return;
                if ($(addedNode.children().get(1)).hasClass('message-chat')) {
                    var childNode = $(addedNode.children().get(1));
                    var message = parseNewChatMessage(childNode);
                    var messageEvent = new Events.NewMessageEvent(message);
                    this.emit('message', messageEvent);
                } else {
                    console.log('?');
                }
            }
        }

        var handleChangeGroup = (mutations) => {
            if (mutations[0].addedNodes && mutations[0].removedNodes) {
                if (mutations[0].addedNodes[0].id === 'main') {
                    this.refresh();
                }
            }
        }

        this.observer = new MutationObserver(handleMutation);
        this.chatGroupsWatcher = new MutationObserver(handleChangeGroup);
    }


    startGettingMessages() {
        this.createObservers();
        this.startWatching();
    }

    stopGettingMessages() {
        this.observer.disconnect();
        this.chatGroupsWatcher.disconnect();
    }

    refresh() {
        this.stopGettingMessages();
        this.observer = null;
        this.chatGroupsWatcher = null;
        this.createObservers();
        this.startWatching();
    }

    startWatching() {
        this.observer.observe(this.page.messagesDiv[0], {
            childList: true
        });
        this.chatGroupsWatcher.observe(this.page.app[0], {
            childList: true
        });
    }

    isReady() {
        return this.page.messageContentBox.length > 0;
    }

}

module.exports = WhatsAppPageReciever;
