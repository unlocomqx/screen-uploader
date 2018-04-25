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
		document.querySelector('#copy_auto').addEventListener('change', () => this.saveCopyAuto());
	}

	saveUploadUrl() {
		const upload_url = this.getElement('upload_url').value;
		this.setUserPref('upload_url', upload_url);
	}

	saveUploadAuto() {
		this.setUserPref('upload_auto', this.getElement('upload_auto').checked);
	}

	saveCopyAuto() {
		this.setUserPref('copy_auto', this.getElement('copy_auto').checked);
	}

	loadUserPrefs() {
		return {
			copy_auto: settings.get('copy_auto'),
			upload_auto: settings.get('upload_auto'),
			upload_url: settings.get('upload_url')
		}
	}

	displayUserPrefs() {
    if (this.prefs.upload_url) {
      this.getElement('upload_url').value = this.prefs.upload_url;
    }
		this.getElement('upload_auto').checked = !!this.prefs.upload_auto;
		this.getElement('copy_auto').checked = !!this.prefs.copy_auto;
	}

  getUserPref(name) {
    return this.prefs[ name ];
  }

	setUserPref(name, value) {
		settings.set(name, value);
		this.prefs[name] = value;
	}

	getElement(id) {
		return document.querySelector('#'+id);
	}
}

module.exports = SettingsManager;