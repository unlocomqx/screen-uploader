const {
  app,
  BrowserWindow,
  Tray,
  screen,
  ipcMain,
  nativeImage,
  globalShortcut,
} = require("electron")
const registerShortcuts = require("./main/shortcuts")
const path = require("path")
const url = require("url")

const assetsDirectory = path.join(__dirname, "public/assets")

let win
let tray = null
let dev_mode = true

async function createWindow() {

  tray = new Tray(path.join(assetsDirectory, "icons/png/icon-16.png"))
  tray.on("click", toggleWindow)
  tray.setToolTip("Screen Uploader")

  const options = dev_mode ? {width: 850, height: 600} : {width: 300, height: 414}
  options.resizable = false
  options.webPreferences = {
    nodeIntegration: true,
    preload: __dirname + "/src/preload.js"
  }
  win = new BrowserWindow(options)

  registerShortcuts(win)

  win.setMenu(null)

  if (dev_mode) {
    win.loadURL("http://localhost:5000/")
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, "/public/index.html"),
      protocol: "file:",
      slashes: true
    }))
  }

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("scaleFactor", screen.getPrimaryDisplay().scaleFactor)
  })

  if (dev_mode) {
    win.webContents.openDevTools()
  }

  win.on("closed", () => {
    win = null
    tray.destroy()
  })
  win.on("minimize", () => win.hide())

  if (!dev_mode) {
    app.dock.hide()
  }
}

const toggleWindow = () => {
  if (win.isFocused()) {
    win.hide()
  } else {
    win.show()
  }
}

ipcMain.on("progress", (event, src) => {
  if (!src) {
    tray.setImage(nativeImage.createFromPath(path.join(assetsDirectory, "icons/png/icon-16.png")))
  } else {
    tray.setImage(nativeImage.createFromDataURL(src))
  }
})

ipcMain.on("hide", () => {
  win.hide()
})

ipcMain.on("registerShortcuts", () => {
  registerShortcuts(win)
})

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  app.quit()
})

app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
})

app.on("will-quit", () => {
  globalShortcut.unregisterAll()
})
