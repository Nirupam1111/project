'use strict'

const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
var mainWindow = null;
var ipc = require('electron').ipcMain;
var { dialog } = require('electron');
var os = require('os');

// ipc.on('close-main-window', function () {
//     app.quit();
// })

// ipc.on('select-folder', function (event) {
//     console.log("main-abc");
//     dialog.showOpenDialog({
//         properties: ['openDirectory']
//     }).then(result => {
//         // result.canceled will be true if the dialog was cancelled
//         if (!result.canceled && result.filePaths.length > 0) {
//             const folderPath = result.filePaths[0]
//             console.log('Selected folder:', folderPath)
//             // Do something with the folder path
//         } else {
//             console.log('Folder selection cancelled')
//         }
//     }).catch(err => {
//         console.error(err)
//     })
// })

// app.on('ready', function () {
//     mainWindow = new BrowserWindow({
//         resizable: true,
//         height: 600,
//         width: 1000,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//             enableRemoteModule: true,
//         }
//     })
//     // mainWindow.loadFile('file://' + __dirname + '/modules.html');
//     mainWindow.loadFile('modules.html');

//     mainWindow.on('closed', function () {
//         mainWindow = null;
//     })
// })

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 800,
        webPreferences: {
                        nodeIntegration: true,
                        contextIsolation: false,
                        enableRemoteModule: true,
                    } });
    mainWindow.loadFile('dist/index.html');
}

app.whenReady().then(() => {
    createWindow()
})