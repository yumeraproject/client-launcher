const { contextBridge, ipcRenderer } = require("electron");

const API = {
    closeApp: () => ipcRenderer.send("closeApp"),
    minimizeWindow: () => ipcRenderer.send("minimizeWindow"),
    launchClient: () => ipcRenderer.invoke('launchClient'),
    closeClient: () => ipcRenderer.invoke('closeClient'),
    openLink: (link) => ipcRenderer.send('openLink', link),
    fetchVersions: () => ipcRenderer.invoke('fetchVersions'),

    // Configurations
    getAllocatedMemory: () => ipcRenderer.invoke('getAllocatedMemory'),
    setAllocatedMemory: (val) => ipcRenderer.send('setAllocatedMemory', val),
    getMaxAllocatedMemory: () => ipcRenderer.invoke('getMaxAllocatedMemory'),
    setLaunchServer: (status, address) => ipcRenderer.send('setLaunchServer', status, address),
    getLaunchServer: () => ipcRenderer.invoke('getLaunchServer'),
    setLaunchDirectory: (dir) => ipcRenderer.invoke('setLaunchDirectory'),
    getLaunchDirectory: () => ipcRenderer.invoke('getLaunchDirectory') 

}

contextBridge.exposeInMainWorld("api", API);
contextBridge.exposeInMainWorld("ipc", { on: ipcRenderer.on.bind(ipcRenderer) });
