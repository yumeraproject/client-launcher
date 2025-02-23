const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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
const { getAllocatedMemory, setAllocatedMemory, getLaunchAddress, setLaunchAddress, getLaunchDirectory, setLaunchDirectory, setGameResolution, getGameResolution } = require('./config/config');

// Constants
const mainPath = system.homedir() + path.sep + ".ethereal" + path.sep;
const nativesPath = mainPath + "natives";
const librariesPath = mainPath + "libraries/*";
const jarPath = mainPath + "client.jar";

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

// Configurations
ipcMain.handle('getAllocatedMemory', () => {
    return getAllocatedMemory();
});

ipcMain.on('setAllocatedMemory', (event, val) => {
    setAllocatedMemory(val);
    log.info('CONFIG: Setting allocated memory to ' + val + ` (${getAllocatedMemory() * 1000}M)`)
});

ipcMain.handle('getMaxAllocatedMemory', () => {
    return (system.totalmem() / 1024 / 1024 / 1000).toFixed(1);
});

ipcMain.on('setLaunchServer', (event, status, address) => {
    setLaunchAddress(status, address);
    log.info('CONFIG: Setting launch address to ' + status + ' with ' + address)
});

ipcMain.handle('getLaunchServer', () => {
    return getLaunchAddress();
});

ipcMain.handle('setLaunchDirectory', () => {
    const directory = dialog.showOpenDialogSync({
        title: 'Select Minecraft directory',
        defaultPath: `${getLaunchDirectory()}`,
        properties: ['openDirectory', 'createDirectory', 'showHiddenFiles']
    });

    if (directory) {
        setLaunchDirectory(directory);
        log.info('CONFIG: Setting launch directory to ' + directory);

        return directory;
    } else {
        return getLaunchDirectory();
    }
});

ipcMain.handle('getLaunchDirectory', () => {
    return getLaunchDirectory();
});

ipcMain.on('setGameResolution', (event, resolution) => {
    setGameResolution(resolution);
    log.info(`CONFIG: Setting game resolution to ${resolution.width}X${resolution.height}`);
});

ipcMain.handle('getGameResolution', () => {
    return getGameResolution();
});

ipcMain.handle('fetchVersions', () => {
    return {
        electron: process.versions.electron,
        node: process.versions.node,
        launcher: app.getVersion(),
    }
});

ipcMain.handle('launchClient', async () => {
    const launchAddress = getLaunchAddress();

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
        const args = [
            `-Xms${(getAllocatedMemory() * 1000)}M`,
            `-Xmx${(getAllocatedMemory() * 1000)}M`,
            `-Djava.library.path=${nativesPath}`,
            '-XX:+DisableAttachMechanism',
            `-cp`, jreUtil.joinClassPath([`${librariesPath}`, `${jarPath}`]),
            'net.minecraft.client.main.Main',
            '--width', `${getGameResolution().width}`,
            '--height', `${getGameResolution().height}`,
            '--version', 'Ethereal Client',
            '--accessToken', '0',
            '--userProperties', '{}',
            '--gameDir', `${getLaunchDirectory()}`,
            `--assetsDir`, `${getLaunchDirectory() + path.sep}assets`,
            '--assetIndex', '1.8.9',
        ];

        if (launchAddress.status) {
            args.push('--server');
            args.push(launchAddress.address);
        }

        const client = child.spawn(jre.driver(), args);

        client.on('error', (error) => {
            log.warn(error);
            return error;
        })

        client.stdout.on('data', (data) => console.log(`${data}`));
        client.stderr.on('data', (data) => log.warn(`${data}`));
    
        window.webContents.send('progress', {
            percentage: 100,
            step: 'Game Started'
        });
        log.info('Client Successfully Started.' + launchAddress.status && `Joining ${launchAddress.address}...`);

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