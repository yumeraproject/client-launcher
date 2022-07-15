const { contextBridge, ipcRenderer } = require("electron");

const API = {
    closeApp: () => ipcRenderer.send("closeApp"),
    hideApp: () => ipcRenderer.send("hideApp"),
}

contextBridge.exposeInMainWorld("api", API);