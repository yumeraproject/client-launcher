const Store = require('electron-store');

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