const { contextBridge, ipcRenderer } = require("electron");

const API = {
    closeApp: () => ipcRenderer.send("closeApp"),
    minimizeWindow: () => ipcRenderer.send("minimizeWindow"),
    maximizeWindow: () => ipcRenderer.send("maximizeWindow"),
    launchClient: () => ipcRenderer.invoke('launchClient'),
    closeClient: () => ipcRenderer.invoke('closeClient'),
}

contextBridge.exposeInMainWorld("api", API);
contextBridge.exposeInMainWorld("ipc", { on: ipcRenderer.on.bind(ipcRenderer) });
