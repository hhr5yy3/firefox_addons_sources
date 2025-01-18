const PREFS = (function() {
	const PREFS = {};

	const KEYS = {
		GENERAL: {
			THEME: "general.theme",	// string
	        FLASH_AND_VIDEO_FILES: {
	            SHOW_FLASH_FILES: "general.flashAndVideoFiles.showFlashFiles",  // bool
	            SHOW_VIDEO_FILES: "general.flashAndVideoFiles.showVideoFiles"   // bool
	        },
            DOWNLOADS: {
                DOWNLOAD_IMMEDIATELY			: "general.downloads.downloadImmediately",          // bool
                SUGGEST_ALTERNATIVE_FILENAMES	: "general.downloads.suggestAlternativeFilenames",	// bool
                ADD_QUALITY_SUFFIX 				: "general.downloads.addQualitySuffix"				// bool
            }
		},

        YT: {
            FORMATS: {
                "mp4"     	: "yt.formats.mp4",    // bool
                "webm"    	: "yt.formats.webm",   // bool
                "flv"     	: "yt.formats.flv",    // bool
                "3gp" 		: "yt.formats.3gp",    // bool
                "3dwebm" 	: "yt.formats.3dwebm", // bool
                "3dmp4"  	: "yt.formats.3dmp4"   // bool
            },
            
            QUALITIES: {
                "144p"       : "yt.qualities.144p",		// bool
                "240p"       : "yt.qualities.240p",		// bool
                "270p"       : "yt.qualities.270p",		// bool
                "360p"       : "yt.qualities.360p",		// bool
                "480p"       : "yt.qualities.480p",		// bool
                "720p"       : "yt.qualities.720p",		// bool
                // "1080p" : "yt.qualities.1080p",		// bool
            }
		},
	    OTHER: {
	        VERSION: "other.version",						// string
	        FIRSTRUN: "other.firstRun",						// bool
	        DEFAULT_VALUES_SET: "other.defaultValuesSet"	// bool
	    },
	    XUL_PREFS: "xulPrefs"
	};

	const VALUES = {
		GENERAL: {
			THEME: {
				LIGHT: "light",
				DARK: "dark"
			}
		}
	};

	const DEFAULT_VALUES = {};
	DEFAULT_VALUES[KEYS.GENERAL.THEME] = VALUES.GENERAL.THEME.LIGHT;

	DEFAULT_VALUES[KEYS.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_FLASH_FILES] 	= true;
	DEFAULT_VALUES[KEYS.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_VIDEO_FILES] 	= true;

	DEFAULT_VALUES[KEYS.GENERAL.DOWNLOADS.DOWNLOAD_IMMEDIATELY] 			= false;
	DEFAULT_VALUES[KEYS.GENERAL.DOWNLOADS.SUGGEST_ALTERNATIVE_FILENAMES] 	= true;
	DEFAULT_VALUES[KEYS.GENERAL.DOWNLOADS.ADD_QUALITY_SUFFIX] 				= true;

	DEFAULT_VALUES[KEYS.YT.FORMATS["mp4"]] = true;
	DEFAULT_VALUES[KEYS.YT.FORMATS["webm"]] = true;
	DEFAULT_VALUES[KEYS.YT.FORMATS["flv"]] = true;
	DEFAULT_VALUES[KEYS.YT.FORMATS["3gp"]] = true;
	DEFAULT_VALUES[KEYS.YT.FORMATS["3dwebm"]] = true;
	DEFAULT_VALUES[KEYS.YT.FORMATS["3dmp4"]] = true;

	DEFAULT_VALUES[KEYS.YT.QUALITIES["144p"]] = true;
	DEFAULT_VALUES[KEYS.YT.QUALITIES["240p"]] = true;
	DEFAULT_VALUES[KEYS.YT.QUALITIES["270p"]] = true;
	DEFAULT_VALUES[KEYS.YT.QUALITIES["360p"]] = true;
	DEFAULT_VALUES[KEYS.YT.QUALITIES["480p"]] = true;
	DEFAULT_VALUES[KEYS.YT.QUALITIES["720p"]] = true;

	DEFAULT_VALUES[KEYS.OTHER.VERSION] = browser.runtime.getManifest().version;
	DEFAULT_VALUES[KEYS.OTHER.FIRSTRUN] = true;
	DEFAULT_VALUES[KEYS.OTHER.DEFAULT_VALUES_SET] = true;

	PREFS.KEYS = KEYS;
	PREFS.VALUES = VALUES;
	PREFS.DEFAULT_VALUES = DEFAULT_VALUES;

	return PREFS;
})();