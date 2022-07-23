const { app, BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize();
const path = require('path');
const isDev = require('electron-is-dev');
const child = require('child_process');
const system = require('os');

const nativesPath = system.homedir() + path.sep + ".ethereal" + path.sep + "natives";
const librariesPath = system.homedir() + path.sep + ".ethereal" + path.sep + "libraries";
const jarPath = system.homedir() + path.sep + ".ethereal" + path.sep + "client.jar";
const gameDirectory = system.homedir() + path.sep + "AppData" + path.sep + "Roaming" + path.sep + ".minecraft";

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

ipcMain.handle('launchClient', () => {
    const client = child.spawn('java '
        + '-Xms1024M -Xmx4096M '
        + `-Djava.library.path="${nativesPath}" `
        + `-cp "${librariesPath + path.sep}*;${jarPath}" `
        + 'net.minecraft.client.main.Main '
        + '--width 854 --height 480 --username EtherealClient --version 1.8.9 '
        + `--gameDir "${gameDirectory}" `
        + `--assetsDir "${gameDirectory + path.sep}assets" --assetIndex 1.8.9 `
        + '--uuid N/A --accessToken aeef7bc935f9420eb6314dea7ad7e1e5 --userType mojang');
        client.on('close', () => console.log('closed'))

    return true;
});

ipcMain.handle('closeClient', () => {
    try {
        child.exec('taskkill /F /IM java.exe /T');
        return true;
    } catch (error) {
        return error;
    }
});