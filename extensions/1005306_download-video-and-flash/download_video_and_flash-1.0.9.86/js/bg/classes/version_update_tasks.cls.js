const VERSIONS_APPLY_TASKS = [
	"1.0.5", "1.0.6", "1.0.9.0", "1.0.9.4", "1.0.9.84"
];

class VersionUpdateTasks {
	constructor() {
		this.tasks = [];

		this.init();

		let taskResetYouTubeDec = () => {
			log("removing youtube dec");
			browser.storage.local.remove(YouTubeDec.DEC_STORAGE_KEY);
			browser.storage.local.remove(YouTubeDec.DEC_URL_STORAGE_KEY);
		};

		this.addTask(taskResetYouTubeDec);
	}

	async init() {
		let currentVersion = browser.runtime.getManifest().version;

		if (await this.isVersionUpdate(currentVersion)) {
			UserPrefs.setPref(PREFS.KEYS.OTHER.VERSION, currentVersion);
			log("version update!");

			if (this.isVersionApplyForTask(currentVersion)) {
				log("apply task!");
				this.runTasks();
			}
		}
	}

	async isVersionUpdate(currentVersion) {
		let lastVersion = await UserPrefs
			.getPref(PREFS.KEYS.OTHER.VERSION);
		log(currentVersion);

		return lastVersion !== currentVersion;
	}

	isVersionApplyForTask(currentVersion) {
		return VERSIONS_APPLY_TASKS.includes(currentVersion);
	}

	runTasks() {
		for (let task of this.tasks) {
			if (typeof task !==  "function") {
				warn("VersionUpdateTasks.runTasks: 'task' is not a function");
				continue;
			}

			task();
		}
	}

	addTask(fn) { this.tasks.push(fn); }
}