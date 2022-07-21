const { app, BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize();

const path = require('path');
const isDev = require('electron-is-dev');

const execSync = require('child_process').execSync;

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 700,
        minHeight: 500,
        autoHideMenuBar: true,
        frame: false,
        icon: './favicon.ico',
        webPreferences: {
            preload: path.join(__dirname, `../${isDev ? 'public' : 'build'}/preload.js`),
            nodeIntegration: true,
        },
    })

    window.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.whenReady().then(() => {
    createWindow();

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

ipcMain.on('minimizeWindow', () => {
    window.minimize();
});

ipcMain.on('maximizeWindow', () => {
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
});

ipcMain.on('launch', () => {
    const output = execSync('java ');
    console.log(output);
});
