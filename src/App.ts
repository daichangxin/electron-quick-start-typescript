const { app, BrowserWindow } = require('electron');
// import { app, BrowserWindow } from 'electron';
import { Test } from './Test';

let mainWin: any;
function createWindow() {
    mainWin = new BrowserWindow({
        width: 800,
        height: 600,
    });
    mainWin.loadFile('../index.html');
    mainWin.webContents.openDevTools();
    mainWin.on('close', () => {
        mainWin = null;
        const t = new Test();
        t.sayHi('Main');
    });
}

app.on('ready', createWindow);
app.on('activate', () => {
    if (!mainWin) {
        createWindow();
    }
});