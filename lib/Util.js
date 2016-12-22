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
}createImageDropEvent('https://dyn.web.whatsapp.com/pp?t=s&u=6585804144%40c.us&i=1481945470&ref=0%40AwR6d7%2FejvhFqEIc7AA6SazMpl%2BTylRkNbclRGd0xAk108P%2FEDwTdzj5&tok=0%40NMS%2BRtFHPVWSClQB%2Fkmd%2FHprE8pKN0xsD2Pv98XmEMB6ApHQvbMKaGnUXskuvinmx11AcIWKlNVTGQ%3D%3D', e=>window.e=e);


module.exports = {fireEvent, isDevelopment, isProduction, createImageDropEvent}
