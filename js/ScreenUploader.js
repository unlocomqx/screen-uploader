const SettingsManager = require('./SettingsManager');
const idbKeyval = require('idb-keyval');
const clipboardWatcher = require('electron-clipboard-watcher');
const electron = require('electron');
const clipboard = electron.clipboard;
const player = require('play-sound')(opts = {})

class ScreenUploader {

  constructor() {
    this.initClipboardWatcher();
  }

  handleWindowLoad() {
    this.settingManager = new SettingsManager();
    this.settingManager.init();
  }

  initClipboardWatcher() {
    this.watcher = clipboardWatcher({
      // (optional) delay in ms between polls
      watchDelay: 1000,

      // handler for when image data is copied into the clipboard
      onImageChange: (nativeImage) => {
        this.uploadScreenshot(nativeImage);
      }
    });
  }

  uploadScreenshot(image) {
    const form = new FormData();
    form.append('file', image.toDataURL());
    fetch(
      this.settingManager.getUserPref('upload_url'),
      {
        method: 'POST',
        body: form
      }
    )
      .then(res => res.text())
      .then((text) => {
      clipboard.writeText(text);
      this.playSound();
    });
  }

  playSound() {
    const audio = new Audio('assets/ding.mp3');
    audio.play();
  }
}

module.exports = ScreenUploader;