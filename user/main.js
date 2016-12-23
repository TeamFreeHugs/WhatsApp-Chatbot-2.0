function setupBot() {
    global.api = WhatsAppAPI.newInstance();
    if (!api.isReady) {
        console.log('API not yet ready. Check you are in a chat and try again.');
        return;
    }
    api.on('message', event => {
        var message = event.message;
        var {content, sender} = message;
        console.log(`Recieved message "${content}" from ${sender}`);
        if (content.startsWith('@echo '))
            api.sendMessage(content.substring('@echo '.length));
    });
    api.startGettingMessages();
}

global.setupBot = setupBot;
