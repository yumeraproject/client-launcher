const { app, BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize();
const path = require('path');
const isDev = require('electron-is-dev');
const child = require('child_process');
const system = require('os');

const jre = require('node-jre');
const jreUtil = require('./util/jreUtil');

const mainPath = system.homedir() + path.sep + ".ethereal" + path.sep;
const nativesPath = mainPath + "natives";
const librariesPath = mainPath + "libraries/*";
const jarPath = mainPath + "client.jar";
const offlinePath = mainPath + "offline";
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

ipcMain.handle('launchClient', async () => {
    // Ensure JRE is properly installed
    await jreUtil.checkJRE();

    const client = child.spawn(jre.driver(), [
        '-Xms1024M',
        '-Xmx4096M',
        `-Djava.library.path=${nativesPath}`,
        '-XX:+DisableAttachMechanism',
        `-cp`, jreUtil.joinClassPath([`${librariesPath}`, `${jarPath}`]),
        'net.minecraft.client.main.Main',
        '--width', '854',
        '--height', '480',
        '--version', 'Ethereal Client',
        '--accessToken', '0',
        '--userProperties', '{}',
        '--gameDir', `${gameDirectory}`,
        `--assetsDir`, `${gameDirectory + path.sep}assets`,
        '--assetIndex', '1.8.9'
    ]);

    client.stdout.on('data', (data) => console.log(`stdout: ${data}`));
    client.stderr.on('data', (data) => console.log(`stderr: ${data}`));

    client.on('close', () => window.webContents.send('clientQuit'));
    return true;
});

ipcMain.handle('closeClient', () => {
    try {
        child.exec('taskkill /F /IM javaw.exe /T');
        return true;
    } catch (error) {
        return error;
    }
});