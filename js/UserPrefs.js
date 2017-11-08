const idbKeyval = require('idb-keyval');
const settings = require('electron-settings');

const UserPrefs = {

	async loadUploadAuto() {
		return settings.get('upload_auto');
	},

	async loadUploadUrl() {
		return settings.get('upload_url');
	}

};

module.exports = UserPrefs;