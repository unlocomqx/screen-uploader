const SettingsManager = require('./SettingsManager');
const idbKeyval = require('idb-keyval');
const clipboardWatcher = require('electron-clipboard-watcher');

class ScreenUploader {

  constructor() {
    this.initClipboardWatcher();
  }

  handleWindowLoad() {
    this.settingManager = new SettingsManager();
    this.settingManager.init();
  }

  initClipboardWatcher() {
    console.log('init');
    this.watcher = clipboardWatcher({
      // (optional) delay in ms between polls
      watchDelay: 1000,

      // handler for when image data is copied into the clipboard
      onImageChange: (nativeImage) => {
        console.log('ok');
      },
      onTextChange: text => {
        console.log('text');
      }
    });
    setTimeout(() => {
      this.watcher.stop();
    }, 1500);
  }
}

module.exports = ScreenUploader;