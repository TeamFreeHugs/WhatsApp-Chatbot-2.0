function fireEvent(eventType, element) {
    var event = new Event(eventType, {bubbles: true});
    element.dispatchEvent(event);
}

module.exports = {fireEvent}
