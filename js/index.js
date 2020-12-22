const ScreenUploader = require('./ScreenUploader');
const electron = require("electron");

let screenUploader = new ScreenUploader();
screenUploader.scaleFactor = 1;

electron.ipcRenderer.on('scaleFactor', (event, value) => {
  screenUploader.setScaleFactor(value);
})

window.onload = () => screenUploader.handleWindowLoad();
