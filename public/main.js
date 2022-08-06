const { app, BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize();
const path = require('path');
const isDev = require('electron-is-dev');
const child = require('child_process');
const system = require('os');
const shell = require('electron').shell;
const log = require('electron-log');
const moment = require('moment');

const jre = require('./util/jre/jre');
const jreUtil = require('./util/jre/jreUtil');
const { HWID } = require('./config/constants');

// Constants
const mainPath = system.homedir() + path.sep + ".ethereal" + path.sep;
const nativesPath = mainPath + "natives";
const librariesPath = mainPath + "libraries/*";
const jarPath = mainPath + "client.jar";
const gameDirectory = system.homedir() + path.sep + "AppData" + path.sep + "Roaming" + path.sep + ".minecraft";

// Set Log directory
log.transports.file.resolvePath = () => path.join(mainPath, `logs/launcher-${moment().format("YYYY-MM-DD")}.log`);
log.info(`Launcher Started - ${moment().format("YYYY-MM-DD, h:mm:ss a")}`);

const logDirectory = log.transports.file.getFile().path;

let window;
const createWindow = () => {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        maxWidth: 1280,
        maxHeight: 720,
        resizable: false,
        fullscreenable: false,
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

ipcMain.handle('fetchVersions', () => {
    return {
        electron: process.versions.electron,
        node: process.versions.node,
        launcher: '1.0.0',
    }
});

ipcMain.handle('launchClient', async () => {
    log.info('Launching Game Client..');

    window.webContents.send('progress', {
        percentage: 10,
        step: 'Validating JRE'
    });
    log.info('(Step 1/1) Validating JRE');

    // Ensure JRE is properly installed
    await jreUtil.checkJRE();

    window.webContents.send('progress', {
        percentage: 90,
        step: 'Starting Game'
    });
    log.info('Attempting to Start Game Client...');

    try {
        throw 'err'
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
        client.stderr.on('data', (data) => log.warn(data));
    
        window.webContents.send('progress', {
            percentage: 100,
            step: 'Game Started'
        });
        log.info('Client Successfully Started.');

        client.on('close', () => {
            window.webContents.send('clientQuit');
            log.info('Client has been quit.');
        });
        return true;   
    } catch (error) {
        log.warn(`Failed to launch client: ${error}`);
        return error;
    }
});

ipcMain.handle('closeClient', () => {
    try {
        child.exec('taskkill /F /IM javaw.exe /T');
        return true;
    } catch (error) {
        log.warn(`Failed to close client: ${error}`);
        return error;
    }
});

ipcMain.on('openLink', (event, link) => {
    shell.openExternal(link);
});