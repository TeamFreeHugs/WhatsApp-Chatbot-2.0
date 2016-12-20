function WhatsAppGroup(groupName) {
    this.groupName = groupName;
}

WhatsAppGroup.prototype.getGroupName = function getGroupName() {
    return this.groupName;
}

module.exports = WhatsAppGroup;
