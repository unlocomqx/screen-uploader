const SettingsManager = require("./SettingsManager");
const idbKeyval = require("idb-keyval");
const clipboardWatcher = require("electron-clipboard-watcher");
const electron = require("electron");
const clipboard = electron.clipboard;
const player = require("play-sound")(opts = {});

class ScreenUploader {

  constructor() {
    this.initClipboardWatcher();
    this.registerEvents();
  }

  async handleWindowLoad() {
    this.settingManager = new SettingsManager();
    await this.settingManager.init();
  }

  registerEvents() {
    document.querySelector("#upload_button").addEventListener("click", () => this.uploadClipboardImage());
  }

  setScaleFactor(value) {
    this.scaleFactor = value;
  }

  initClipboardWatcher() {
    this.watcher = clipboardWatcher({
      // (optional) delay in ms between polls
      watchDelay: 1000,

      // handler for when image data is copied into the clipboard
      onImageChange: (nativeImage) => {

        if (this.settingManager.getUserPref("downscale") && !this.downscaled) {
          nativeImage = this.downscale(nativeImage);
          this.downscaled = true;
          clipboard.writeImage(nativeImage);
          return;
        }

        this.downscaled = false;

        if (this.settingManager.getUserPref("upload_auto")) {
          this.uploadScreenshot(nativeImage);
        }
      }
    });
  }

  uploadClipboardImage() {
    let image = clipboard.readImage();
    if (!image.isEmpty()) {
      this.uploadScreenshot(image);
    } else {
      document.querySelector("#screenshot_url").value = "not a valid image";
    }
  }

  uploadScreenshot(image) {
    const form = new FormData();
    form.append("file", image.toDataURL());
    fetch(
      this.settingManager.getUserPref("upload_url"),
      {
        method: "POST",
        body: form
      }
    )
    .then(res => res.text())
    .then((url) => {
      document.querySelector("#screenshot_url").value = url;
      if (this.settingManager.getUserPref("copy_auto")) {
        clipboard.writeText(url);
      }
      this.playSound();
    });
  }

  downscale(image) {
    if (this.scaleFactor === 1) {
      return image;
    }
    let size = image.getSize();

    return image.resize({
      width: size.width / this.scaleFactor,
      height: size.height / this.scaleFactor,
    });
  }

  playSound() {
    const audio = new Audio("assets/ding.mp3");
    audio.play();
  }
}

module.exports = ScreenUploader;