function fireEvent(eventType, element) {
    var event = new Event(eventType, {bubbles: true});
    element.dispatchEvent(event);
}

function isDevelopment() {
    return process.env.NODE_ENV === 'DEVELOPMENT' || process.env.NODE_ENV === undefined;
}

function isProduction() {
    return !isDevelopment();
}


module.exports = {fireEvent, isDevelopment, isProduction}
