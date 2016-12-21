// const handlers = require('./CommandHandlers');
// const MongoClient = require('mongodb').MongoClient;
//
// function setupBot() {
//     global.api = WhatsAppAPI();
//     function newMessage(messageText) {
//         if (messageText.toLowerCase().startsWith('@eyeball')) {
//             var [,command, ...args] = messageText.split(' ');
//             if (!handlers[command]) {
//                 api.sendMessage('Unknown command ' + (command || ''));
//             } else {
//                 handlers[command](args);
//             }
//         }
//     }
//     api.attachHandler({newMessage});
//     api.startWatching();
// }
//
// global.ok = function() {
//     var client = new MongoClient();
//     client.connect('mongodb://localhost:27017/BusBot', (err, db) => {
//         global.buses = db.collection('buses');
//         setupBot();
//     });
// }

global.ok = function() {
    var api = WhatsAppAPI.newInstance();
    api.on('message', event => {
        console.log('Received!');
        console.log(event.message.content);
    });
    api.startWatching();
}
