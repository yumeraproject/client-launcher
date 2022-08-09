const Store = require('electron-store');
const { DEFAULT_MINECRAFT_DIRECTORY } = require('./constants');

const store = new Store();

// Config: Allocated Memory
const setAllocatedMemory = exports.setAllocatedMemory = (memory) => {
    store.set('allocatedMemory', memory);
}

const getAllocatedMemory = exports.getAllocatedMemory = () => {
    return store.get('allocatedMemory', 2);
}

// Config: Launch Server
const setLaunchAddress = exports.setLaunchAddress = (status, address) => {
    store.set('launchAddress', { status: status, address: address });
}

const getLaunchAddress = exports.getLaunchAddress = () => {
    return store.get('launchAddress');
}

// Config: Minecraft Directory
const setLaunchDirectory = exports.setLaunchDirectory = (directory) => {
    store.set('launchDirectory', directory);
}

const getLaunchDirectory = exports.getLaunchDirectory = () => {
    return store.get('launchDirectory', DEFAULT_MINECRAFT_DIRECTORY);
}

// Config: Game Resolution
const setGameResolution = exports.setGameResolution = (resolution) => {
    store.set('gameResolution', resolution);
}

const getGameResolution = exports.getGameResolution = () => {
    return store.get('gameResolution', { width: 1280, height: 720 });
}