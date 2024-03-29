const electron = require("electron")
window.clipboard = require("electron").clipboard
window.axios = require("axios").default
window.clipboardWatcher = require("electron-clipboard-watcher")

electron.ipcRenderer.on("scaleFactor", (event, value) => {
  window.postMessage({type: "scaleFactor", value})
})

electron.ipcRenderer.on("globalShortcut", (event, value) => {
  window.postMessage({type: "globalShortcut", value})
})

window.addEventListener("message", (event) => {
  if (event.data.type === "progress") {
    electron.ipcRenderer.send("progress", event.data.src)
    return
  }
  if (typeof event.data === "string") {
    electron.ipcRenderer.send(event.data)
  }
})
