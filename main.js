const {app, BrowserWindow, Tray, screen, ipcMain, nativeImage} = require("electron");
const path = require("path");
const url = require("url");

const assetsDirectory = path.join(__dirname, "public/assets");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray = null;
let dev_mode = true;

async function createWindow() {

  tray = new Tray(path.join(assetsDirectory, "icons/png/icon-16.png"));
  tray.on("click", toggleWindow);
  tray.setToolTip("Screen Uploader");

  // Create the browser window.
  const options = dev_mode ? {width: 850, height: 600} : {width: 300, height: 414};
  options.resizable = false;
  options.webPreferences = {
    nodeIntegration: true,
    preload: __dirname + "/src/preload.js"
  };
  win = new BrowserWindow(options);
  win.setMenu(null);

  if (dev_mode) {
    win.loadURL("http://localhost:5000/");
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, "/public/index.html"),
      protocol: "file:",
      slashes: true
    }));
  }

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("scaleFactor", screen.getPrimaryDisplay().scaleFactor);
  });

  if (dev_mode) {
    // Open the DevTools.
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    tray.destroy();
  });
  win.on("minimize", () => win.hide());

  if (!dev_mode) {
    app.dock.hide();
  }
}

const toggleWindow = () => {
  if (win.isFocused()) {
    win.hide();
  } else {
    win.show();
  }
};

ipcMain.on("progress", (event, src) => {
  if (!src) {
    tray.setImage(nativeImage.createFromPath(path.join(assetsDirectory, "icons/png/icon-16.png")));
  } else {
    tray.setImage(nativeImage.createFromDataURL(src));
  }
});

ipcMain.on('hide', () => {
  win.hide()
  // or depending you could do: win.hide()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    app.quit();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
