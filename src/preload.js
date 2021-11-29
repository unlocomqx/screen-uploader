const electron = require("electron");
window.clipboard = require("electron").clipboard;
window.axios = require("axios").default;
window.clipboardWatcher = require("electron-clipboard-watcher");

electron.ipcRenderer.on("scaleFactor", (event, value) => {
  window.postMessage({type: "scaleFactor", value});
});
