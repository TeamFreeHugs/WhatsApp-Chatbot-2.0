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

function createImageDropEvent(imageURL, callback) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob(function (blob) {
            var event = new DragEvent('drop');
            var uri = new URL(imageURL);
            var fileType;
            if (uri.pathname.lastIndexOf('.') === -1) {
                fileType = 'png';
            } else {
                fileType = uri.pathname.substring(uri.pathname.lastIndexOf('.'));
            }
            var file = new File([blob], 'upload.' + fileType, {type: 'image/' + fileType});
            Object.defineProperty(event, "dataTransfer", {
                configurable: true,
                writable: true,
                value : {
                    files: [
                        file
                    ]
                }
            });
            callback(event);
        });
    };
    image.src = imageURL;
}

module.exports = {fireEvent, isDevelopment, isProduction, createImageDropEvent}
