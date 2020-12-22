const settings = require('electron-settings');

class SettingsManager {

	init() {
		this.registerEvents();
		this.prefs = this.loadUserPrefs();
		this.displayUserPrefs();
	}

	registerEvents() {
		document.querySelector('#save_button').addEventListener('click', () => this.saveUploadUrl());
		document.querySelector('#start_hidden').addEventListener('change', () => this.saveStartHidden());
		document.querySelector('#upload_auto').addEventListener('change', () => this.saveUploadAuto());
		document.querySelector('#downscale').addEventListener('change', () => this.saveDownscale());
		document.querySelector('#copy_auto').addEventListener('change', () => this.saveCopyAuto());
	}

	saveUploadUrl() {
		const upload_url = this.getElement('upload_url').value;
		this.setUserPref('upload_url', upload_url);
	}

	saveStartHidden() {
		this.setUserPref('start_hidden', this.getElement('start_hidden').checked);
	}

	saveUploadAuto() {
		this.setUserPref('upload_auto', this.getElement('upload_auto').checked);
	}

	saveDownscale() {
		this.setUserPref('downscale', this.getElement('downscale').checked);
	}

	saveCopyAuto() {
		this.setUserPref('copy_auto', this.getElement('copy_auto').checked);
	}

	loadUserPrefs() {
		return {
			copy_auto: settings.get('copy_auto'),
			start_hidden: settings.get('start_hidden'),
			upload_auto: settings.get('upload_auto'),
			downscale: settings.get('downscale'),
			upload_url: settings.get('upload_url')
		}
	}

	displayUserPrefs() {
    if (this.prefs.upload_url) {
      this.getElement('upload_url').value = this.prefs.upload_url;
    }
		this.getElement('start_hidden').checked = !!this.prefs.start_hidden;
		this.getElement('upload_auto').checked = !!this.prefs.upload_auto;
		this.getElement('downscale').checked = !!this.prefs.downscale;
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