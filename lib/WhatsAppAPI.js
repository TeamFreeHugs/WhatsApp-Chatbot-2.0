const WhatsAppChatGroup = require('./WhatsAppChatGroup');
const WhatsAppUtils = require('./WhatsAppUtils');

function ChatError(message) {
    this.name = 'ChatError';
    this.message = message || '';
}

ChatError.prototype = Error.prototype;

function getGroupElements() {
    return $('.infinite-list-viewport').children();
}

function getChatGroups(callback) {
    var groups = [];
    getGroupElements().each((i, groupElement) => {
        groupElement = $(groupElement);
        var groupName = groupElement.find('div.chat-title > span').text();
        var group = new WhatsAppChatGroup(groupName);
        groups.push(group);
    });
    callback(groups);
}

function findGroupsByName(name, callback) {
    WhatsAppUtils.fireEvent('focus', $('.input.input-search')[0]);
    $('.input.input-search').val(Math.random().toString()); //Clear box...
    $('.icon.icon-x-alt').click();
    setTimeout(() => {
        WhatsAppUtils.fireEvent('focus', $('.input.input-search')[0]);
        $('.input.input-search').val(name);
        WhatsAppUtils.fireEvent('input', $('.input.input-search')[0]);
        var count = 0;
        var observer = new MutationObserver(mutations => {
            if (++count === 2) {
                var groups = [];
                $('.infinite-list-item.infinite-list-item-transition').filter((i, e) => {
                    return !$(e).hasClass('first');
                }).each((i, groupElement) => {
                    var groupName = $(groupElement).find('div.chat-title > span').text();
                    var group = new WhatsAppChatGroup(groupName);
                    groups.push(group);
                });
                callback(groups);
                observer.disconnect();
                return;
            }
        });
        observer.observe($('.infinite-list-viewport')[0], {childList: true});
    }, 1000);
}


module.exports = {
    getChatGroups: getChatGroups,
    findGroupsByName: findGroupsByName
}
