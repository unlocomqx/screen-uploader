const {globalShortcut} = require("electron")

module.exports = function registerShortcuts(win) {
  globalShortcut.unregisterAll()
  win.webContents
  .executeJavaScript(`localStorage.getItem("prefs");`, true)
  .then(storedPrefs => {
    try {
      const prefs = JSON.parse(storedPrefs)

      const {
        upload_auto_shortcut,
        upload_current_shortcut,
      } = prefs

      if (upload_auto_shortcut) {
        const reg = registerShortcut(upload_auto_shortcut, () => {
          win.webContents.send("globalShortcut", "toggle_upload_auto")
        })
        if (!reg) {
          console.log(upload_auto_shortcut, "not registerted")
        }
      }

      if (upload_current_shortcut) {
        const reg = registerShortcut(upload_current_shortcut, () => {
          win.webContents.send("globalShortcut", "upload_current_shortcut")
        })
        if (!reg) {
          console.log(upload_current_shortcut, "not registerted")
        }
      }
    } catch (e) {

    }
  })
}

function registerShortcut(shortcut, callback) {
  return globalShortcut.register(shortcut, callback)
}
