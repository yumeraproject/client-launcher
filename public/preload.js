const { contextBridge, ipcRenderer } = require("electron");

const API = {
    closeApp: () => ipcRenderer.send("closeApp"),
    minimizeWindow: () => ipcRenderer.send("minimizeWindow"),
    maximizeWindow: () => ipcRenderer.send("maximizeWindow"),
    launch: () => ipcRenderer.send('launch')
}

contextBridge.exposeInMainWorld("api", API);