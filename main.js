const {app, BrowserWindow, Tray, screen} = require('electron');
const path = require('path');
const url = require('url');
const settings = require('electron-settings');

const assetsDirectory = path.join(__dirname, 'assets');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray = null;
let dev_mode = false;

async function createWindow() {

  tray = new Tray(path.join(assetsDirectory, 'icons/png/icon-16.png'));
  tray.on('click', toggleWindow);
  tray.setToolTip('Screen Uploader');

  // Create the browser window.
  const options = dev_mode ? {width: 800, height: 600} : {width: 300, height: 360};
  options.resizable = false;
  options.webPreferences = {
    nodeIntegration: true
  }
  win = new BrowserWindow(options);
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('scaleFactor', screen.getPrimaryDisplay().scaleFactor)
  })

  if (dev_mode) {
    // Open the DevTools.
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    tray.destroy();
  });
  win.on('minimize', () => win.hide());

  if (await settings.get('start_hidden')) {
    win.minimize();
  }
  app.dock.hide();
}

const toggleWindow = () => {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
