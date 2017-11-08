const SettingsManager = require('./SettingsManager');
const idbKeyval = require('idb-keyval');

class ScreenUploader {

	constructor() {

	}

	handleWindowLoad() {
		this.settingManager = new SettingsManager();
		this.settingManager.init();
	}
}

module.exports = ScreenUploader;