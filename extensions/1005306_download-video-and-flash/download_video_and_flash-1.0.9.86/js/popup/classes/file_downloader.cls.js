var FileDownloader = (function() {
	let INVALID_CHARS = ["\/", "\\", "\"", ":", "*", "?", "<", ">", "|"];
	let INVALID_CHARS_REPLACE_WITH = "_";

	class FileDownloader {
		constructor() {}

	    replaceInvalidChars(filename, replaceWith, invalidChars) {
	        invalidChars = invalidChars || INVALID_CHARS;
	        replaceWith = replaceWith || INVALID_CHARS_REPLACE_WITH;
	        for (let i = 0; i < filename.length; i++) {
	            for (let j = 0; j < invalidChars.length; j++) {
	                if (filename[i] == invalidChars[j]) {
	                    filename = filename.replace(invalidChars[j], replaceWith);
	                }
	            }
	        }
	        return filename;
	    }

	    convertToASCIIOnlyCharacters(filename) {
	    	return filename.replace(/[^\x00-\x7F]/g, "");
	    }

	    replaceNewLinesWithSpaces(filename) {
	    	return filename.replace(/(\r\n|\n|\r)/gm," ");
	    }

	    getFilename(fileData) {
	        let filename = fileData.DownloadWindowFilename;

	        if (fileData.IsUseLabelAsFilename) { 
	        	filename = fileData.PopupLabel; 
	        }
	        filename = decodeURIComponent(filename);            // decodes characters
	        filename = this.replaceInvalidChars(filename);      // replaces invalid characters
	        filename = this.replaceNewLinesWithSpaces(filename);

	        return filename;
	    }

	    isPrivateBrowsing() {
	    	return browser.extension.inIncognitoContext;
	    }

	    async downloadFile(fileData) {
	    	try {
		    	let url = fileData.Url;
		    	let filename = this.getFilename(fileData);
		    	log(filename);
		    	let privateBrowsing = this.isPrivateBrowsing();
		    	let showSaveAs = !await UserPrefs.getPref(PREFS.KEYS.GENERAL.DOWNLOADS.DOWNLOAD_IMMEDIATELY);
		    	let isQuantumVersion = await Utils.isBrowserVersion57();

				var options = {
					url,
					filename,
					saveAs: showSaveAs
				};

				if (isQuantumVersion) {
					options.incognito = !!privateBrowsing;
				}

				browser.downloads.download(options);
	    	} catch(ex) {
	    		log(ex);
				if (error.toString().toLowerCase().includes("illegal characters")) {
					options.filename = this.convertToASCIIOnlyCharacters(options.filename);
					browser.downloads.download(options).catch(log);
				} else {
					// fail safe
					delete options.incognito;
					browser.downloads.download(options).catch(log);						
				}    		
	    	}
	    }
	}

	return FileDownloader;
})();