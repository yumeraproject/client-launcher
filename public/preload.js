const { contextBridge, ipcRenderer } = require("electron");

const API = {
    closeApp: () => ipcRenderer.send("closeApp"),
    minimizeWindow: () => ipcRenderer.send("minimizeWindow"),
    maximizeWindow: () => ipcRenderer.send("maximizeWindow"),
    launch: () => ipcRenderer.send('launch')
}

ipcRenderer.on('launched', () => {
    console.log('ratio');
})

contextBridge.exposeInMainWorld("api", API);
contextBridge.exposeInMainWorld("ipc", { on: ipcRenderer.on.bind(ipcRenderer) });