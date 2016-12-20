const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL('https://web.whatsapp.com');

    mainWindow.webContents.on('did-finish-load', function() {
        setTimeout(() => {
            mainWindow.webContents.openDevTools();
            var requirePath = path.join(__dirname, 'lib/whatsapp-injector');
            mainWindow.webContents.executeJavaScript(`require('${requirePath}')();`);
        }, 1000);
    });

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
