const { app, BrowserWindow, ipcMain } = require('electron')
require('@electron/remote/main').initialize()

const path = require('path')
const isDev = require('electron-is-dev')

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 700,
        minHeight: 500,
        webPreferences: {
            preload: path.join(__dirname, '../public/preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        },
        frame: false
    })

    window.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(window);
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

ipcMain.on('closeApp', () => {
    app.quit();
});

ipcMain.on('hideApp', () => {
    window.minimize();
});