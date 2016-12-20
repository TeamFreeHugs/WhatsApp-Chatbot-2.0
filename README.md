# WhatsApp-Chatbot-2.0
This time it runs off electron so it's much cleaner to run


This is a WhatsApp API.
Previously, it was difficult to setup and was very messy. That was due to the Content Security Policy kicking in.

This time, we go to the browser level, where such things don't apply to us.

We use [Electron](https://github.com/electron/electron) here.

Note that this library is callback based. So prepare for callback hell.

#Installing:

Run this:

    git clone https://github.com/TeamFreeHugs/WhatsApp-Chatbot-2.0.git
    cd WhatsApp-Chatbot-2.0
    npm i -d
    npm start

Since this is based off WhatsApp Web, you need to use your phone to connect. Read more [here](https://www.whatsapp.com/faq/en/web/28080003);

If you did not set `NODE_ENV`, you should find that the Chrome DevTools console pops up. Wait for the page to load, then play with the exposed WhatsAppAPI object.
