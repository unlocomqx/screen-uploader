const settings = require('electron-settings');

class SettingsManager {

	init() {
		this.registerEvents();
		this.prefs = this.loadUserPrefs();
		this.displayUserPrefs();
	}

	registerEvents() {
		document.querySelector('#save_button').addEventListener('click', () => this.saveUploadUrl());
		document.querySelector('#upload_auto').addEventListener('change', () => this.saveUploadAuto());
	}

	saveUploadUrl() {
		const upload_url = this.getElement('upload_url').value;
		this.setUserPref('upload_url', upload_url);
	}

	saveUploadAuto() {
		this.setUserPref('auto_upload', this.getElement('upload_auto').checked);
	}

	loadUserPrefs() {
		return {
			auto_upload: settings.get('auto_upload'),
			upload_url: settings.get('upload_url')
		}
	}

	displayUserPrefs() {
    if (this.prefs.upload_url) {
      this.getElement('upload_url').value = this.prefs.upload_url;
    }
		this.getElement('upload_auto').checked = !!this.prefs.auto_upload;
	}

  getUserPref(name) {
    return this.prefs[ name ];
  }

	setUserPref(name, value) {
		settings.set(name, value);
		this.prefs.name = value;
	}

	getElement(id) {
		return document.querySelector('#'+id);
	}
}

module.exports = SettingsManager;