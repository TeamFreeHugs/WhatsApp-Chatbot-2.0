const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

const util = require('./util/util');

let mainWindow;

function injectInjector(mainWindow) {
    var requirePath = path.join(__dirname, 'lib/whatsapp-injector');
    mainWindow.webContents.executeJavaScript(`require('${requirePath}')();`);
}

function registerWindowHandlers(mainWindow) {
    mainWindow.webContents.on('did-finish-load', () => {
        injectInjector(mainWindow);
        if (util.isDevelopment()) {
            mainWindow.webContents.openDevTools();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null
    });
}

function registerAppHandlers() {
    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });

}

function createWindow () {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({width, height});

    mainWindow.loadURL('https://web.whatsapp.com');
    registerWindowHandlers(mainWindow);
}

registerAppHandlers();
