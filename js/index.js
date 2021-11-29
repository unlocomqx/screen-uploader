const electron = require("electron");
const {scaleFactor} = require("../src/stores/scale-factor");

electron.ipcRenderer.on("scaleFactor", (event, value) => {
  console.log(value);
  scaleFactor.set(value);
});
