class Options {
	constructor() {
		this.addEventListeners();
		this.localeBinder = new LocaleBinder();
		this.initInputs();
	}

	addEventListeners() {
		document.addEventListener("DOMContentLoaded", 
			this.onDOMContentLoaded.bind(this)
		);

		// document.querySelector('input[name=theme-color]:checked');
	}

	onDOMContentLoaded(event) {
		log("loaded");
		this.localeBinder.bind();
	}

	async initInputs() {
		await UserPrefs.setCachedPrefs();
		this.initThemeRadioButton();
		this.initFlashAndVideosInputs();
		this.initDownloadsInputs();
		this.initYouTubeFormats();
		this.initYouTubeQualities();
		this.addThemeRadioButtonEvent();
		this.addFlashAndVideosEvents();
		this.addDownloadsEvents();
		this.addYouTubeFormatsEvents();
		this.addYouTubeQualitiesEvents();
	}

	initThemeRadioButton() {
		let theme = UserPrefs.CACHE.getPref(PREFS.KEYS.GENERAL.THEME);

		if (theme === PREFS.VALUES.GENERAL.THEME.DARK) {
			document.querySelector("#theme-color-dark").checked = true;
		} else {
			document.querySelector("#theme-color-light").checked = true;
		}
	}

	addThemeRadioButtonEvent() {
		let themeDarkInput = document.querySelector("#theme-color-dark");
		let themeLightInput = document.querySelector("#theme-color-light");

		themeDarkInput.addEventListener("click", event => {
			UserPrefs.setPref(
				PREFS.KEYS.GENERAL.THEME,
				PREFS.VALUES.GENERAL.THEME.DARK
			);
		});

		themeLightInput.addEventListener("click", event => {
			UserPrefs.setPref(
				PREFS.KEYS.GENERAL.THEME,
				PREFS.VALUES.GENERAL.THEME.LIGHT
			);
		});
	}

	initFlashAndVideosInputs() {
		let showFlashFiles = UserPrefs.CACHE.getPref(PREFS.KEYS
			.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_FLASH_FILES);

		let showVideoFiles = UserPrefs.CACHE.getPref(PREFS.KEYS
			.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_VIDEO_FILES);

		document.querySelector("#show-flash").checked = showFlashFiles;
		document.querySelector("#show-video").checked = showVideoFiles;
	}

	addFlashAndVideosEvents() {
		let showFlashFiles = document.querySelector("#show-flash");
		let showVideoFiles = document.querySelector("#show-video");

		showFlashFiles.addEventListener("click", event => {
			let { checked } = event.target;
			
			UserPrefs.setPref(PREFS.KEYS
				.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_FLASH_FILES,
				checked
			);
		});

		showVideoFiles.addEventListener("click", event => {
			let { checked } = event.target;
			
			UserPrefs.setPref(PREFS.KEYS
				.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_VIDEO_FILES,
				checked
			);
		});		
	}

	initDownloadsInputs() {
		let downloadImmediately = UserPrefs.CACHE.getPref(PREFS.KEYS
			.GENERAL.DOWNLOADS.DOWNLOAD_IMMEDIATELY);

		let suggestAlt = UserPrefs.CACHE.getPref(PREFS.KEYS
			.GENERAL.DOWNLOADS.SUGGEST_ALTERNATIVE_FILENAMES);

		let addQualitySuffix = UserPrefs.CACHE.getPref(PREFS.KEYS
			.GENERAL.DOWNLOADS.ADD_QUALITY_SUFFIX);		

		document.querySelector("#download-immediately").checked = downloadImmediately;
		document.querySelector("#suggest-alt").checked = suggestAlt;
		document.querySelector("#add-quality-suffix").checked = addQualitySuffix;
	}

	addDownloadsEvents() {
		let downloadImmediately = document.querySelector("#download-immediately");
		let suggestAlt = document.querySelector("#suggest-alt");
		let addQualitySuffix = document.querySelector("#add-quality-suffix");

		downloadImmediately.addEventListener("click", event => {
			let { checked } = event.target;
			
			UserPrefs.setPref(PREFS.KEYS
				.GENERAL.DOWNLOADS.DOWNLOAD_IMMEDIATELY,
				checked
			);
		});

		suggestAlt.addEventListener("click", event => {
			let { checked } = event.target;
			
			UserPrefs.setPref(PREFS.KEYS
				.GENERAL.DOWNLOADS.SUGGEST_ALTERNATIVE_FILENAMES,
				checked
			);
		});

		addQualitySuffix.addEventListener("click", event => {
			let { checked } = event.target;
			
			UserPrefs.setPref(PREFS.KEYS
				.GENERAL.DOWNLOADS.ADD_QUALITY_SUFFIX,
				checked
			);
		});
	}

	initYouTubeFormats() {
		let formatMP4 = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.FORMATS["mp4"]);
		let formatWEBM = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.FORMATS["webm"]);
		let formatFLV = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.FORMATS["flv"]);
		let format3GP = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.FORMATS["3gp"]);

		document.querySelector("#yt-format-mp4").checked = formatMP4;
		document.querySelector("#yt-format-webm").checked = formatWEBM;
		document.querySelector("#yt-format-flv").checked = formatFLV;
		document.querySelector("#yt-format-3gp").checked = format3GP;
	}

	addYouTubeFormatsEvents() {
		let formatMP4 = document.querySelector("#yt-format-mp4");
		let formatWEBM = document.querySelector("#yt-format-webm");
		let formatFLV = document.querySelector("#yt-format-flv");
		let format3GP = document.querySelector("#yt-format-3gp");

		formatMP4.addEventListener("click", event => {
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.FORMATS["mp4"], checked);
		});

		formatWEBM.addEventListener("click", event => {
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.FORMATS["webm"], checked);
		});

		formatFLV.addEventListener("click", event => {
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.FORMATS["flv"], checked);
		});

		format3GP.addEventListener("click", event => {
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.FORMATS["3gp"], checked);
		});
	}

	initYouTubeQualities() {
		let quality144 = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.QUALITIES["144p"]);
		let quality240 = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.QUALITIES["240p"]);
		let quality270 = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.QUALITIES["270p"]);
		let quality360 = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.QUALITIES["360p"]);
		let quality720 = UserPrefs.CACHE.getPref(PREFS.KEYS.YT.QUALITIES["720p"]);

		document.querySelector("#yt-quality-144p").checked = quality144;
		document.querySelector("#yt-quality-240p").checked = quality240;
		document.querySelector("#yt-quality-270p").checked = quality270;
		document.querySelector("#yt-quality-360p").checked = quality360;
		document.querySelector("#yt-quality-720p").checked = quality720;
	}

	addYouTubeQualitiesEvents() {
		let quality144 = document.querySelector("#yt-quality-144p");
		let quality240 = document.querySelector("#yt-quality-240p");
		let quality270 = document.querySelector("#yt-quality-270p");
		let quality360 = document.querySelector("#yt-quality-360p");
		let quality720 = document.querySelector("#yt-quality-720p");

		quality144.addEventListener("click", event => {
			log(event.target)
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.QUALITIES["144p"], checked);
		});

		quality240.addEventListener("click", event => {
			log(event.target)
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.QUALITIES["240p"], checked);
		});

		quality270.addEventListener("click", event => {
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.QUALITIES["270p"], checked);
		});	

		quality360.addEventListener("click", event => {
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.QUALITIES["360p"], checked);
		});	

		quality720.addEventListener("click", event => {
			let { checked } = event.target;
			UserPrefs.setPref(PREFS.KEYS.YT.QUALITIES["720p"], checked);
		});
	}

}

let options = new Options();