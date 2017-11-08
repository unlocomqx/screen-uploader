const ScreenUploader = require('./ScreenUploader');

let screenUploader = new ScreenUploader();
window.onload = () => screenUploader.handleWindowLoad();
