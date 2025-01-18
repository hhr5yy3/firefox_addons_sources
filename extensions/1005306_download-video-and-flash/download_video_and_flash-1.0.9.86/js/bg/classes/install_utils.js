class FirstRun extends Observer {
	constructor() {
		super();
	}

	async isFirstRun() {
		let firstRun = await UserPrefs.getPref(PREFS.KEYS.OTHER.FIRSTRUN);

		if (firstRun) {
			this.notify(EVENTS.BACKGROUND.FIRST_RUN);
			log(UserPrefs.getPref(PREFS.KEYS.OTHER.FIRSTRUN));
			UserPrefs.setPref(PREFS.KEYS.OTHER.FIRSTRUN, false);
		}
	}
}