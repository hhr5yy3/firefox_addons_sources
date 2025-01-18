const MODE = ['OVERWRITE', 'MERGE'];

function _validationHandler(data) {
	var validationResult = Import.validateJSON(data);
	if (validationResult === true) {
		// get user confirmation before doing import job
		switch (Import.getImportMode()) {
			case 'OVERWRITE':
				confirm(MSG_CONFIRM_ACTION_IMPORT_OVERWRITE) && Import.overwriteData(data);
				break;

			default:
				confirm(MSG_CONFIRM_ACTION_IMPORT_MERGE) && Import.mergeData(data);
				break;
		}

		// intends something is going on
		// reload page to initialize everything (also set onclick events to new templates etc)
		Utils.showSpinner();
		window.location.reload();
	} else {
		console.error(validationResult);
	}
}

Import = {
	createAndDownloadJSON: function () {
		try {
			var data = new TextEncoder('utf-8').encode(
				JSON.stringify(
					{
						options: Utils.LocalStorage.load('options', true),
						templates: Utils.LocalStorage.load('templates', true),
					},
					null,
					4
				)
			);

			var blob = new Blob([data], {
				type: 'application/octet-stream',
			});

			url = URL.createObjectURL(blob);
			var link = document.createElement('a');
			link.setAttribute('href', url);
			link.setAttribute('download', 'export.json');

			var event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			link.dispatchEvent(event);

			function encode(s) {
				var out = [];
				for (var i = 0; i < s.length; i++) {
					out[i] = s.charCodeAt(i);
				}
				return new Uint8Array(out);
			}
		} catch (error) {
			let errOut = {
				message: error,
				options: localStorage.options,
				templates: localStorage.templates,
			};

			console.error(error);
		}
	},

	importUploadedJSON: function (event) {
		// load json content
		var files = event.target.files,
			reader = new FileReader();
		reader.onload = _importHandler;
		reader.readAsText(files[0]);

		function _importHandler() {
			// parse data
			var importedData = JSON.parse(this.result);
			// validate data and do the action if valid
			_validationHandler(importedData);

			//make sure to clear input value after every import
			document.getElementById('hiddenImportButton').value = '';
		}
	},
	loadFromURL: function (url) {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					alert(chrome.i18n.getMessage('alert_message_action_fetch_file_from_url_failed') + ' Response Status: ' + response.status);
				}
				console.log(response);
				return response.json();
			})
			.then((response) => {
				_validationHandler(response);
			})
			.catch((error) => {
				alert(chrome.i18n.getMessage('alert_message_action_fetch_file_from_url_failed'));
				console.error(error);
			});
	},
	validateJSON: function (json) {
		console.log('Validation startet, see JSON below:');
		console.log(json);

		// all keys types. customLocators, templates
		if (!json.templates) return 'Import file corrupted! Field templates is empty or not available.';

		if (!Array.isArray(json.templates)) return 'Import file corrupted! Field templates is not an object.';

		if (json.templates.length == 0) return 'Import file corrupted! At least one template is needed.';

		var isOldVersion = false;
		for (var i = 0; i < json.templates.length; i++) {
			// fails if field is empty or missing
			if (!json.templates[i].ticketDesc) return "Import file corrupted! At least one template has no 'Ticket Description' set.";
			if (!json.templates[i].templateName && !json.templates[i].contextMenuName)
				return "Import file corrupted! At least one template has no 'templateName' set.";
			isOldVersion = json.templates[i].contextMenuName;
		}

		if (!json.options && !isOldVersion) return 'Import file corrupted! Field templates is empty or not available.';

		// validation successful
		return true;
	},
	// returns OVERWRITE or MERGE
	getImportMode() {
		var radios = document.getElementsByName('importMode'),
			mode;
		for (var j = 0, length = radios.length; j < length; j++) {
			if (radios[j].checked) {
				console.log(`Selected importmode from option radios: ${radios[j].value}`);
				return radios[j].value;
			}
		}
	},
	overwriteData(data) {
		try {
			// do import if valid json
			Utils.LocalStorage.save('templates', JSON.stringify(data.templates));
			Utils.LocalStorage.save('options', JSON.stringify(data.options));
			alert(chrome.i18n.getMessage('alert_message_confirm_action_import_overwrite_success'));
		} catch (error) {
			alert(chrome.i18n.getMessage('alert_message_action_import_failed') + 'Error Message: ' + error);
		}
	},
	mergeData(data) {
		try {
			/**
			 * Step 1: localize and merge new values to the current variables
			 */

			// add templates from data to current templates
			var templatesOld = Utils.LocalStorage.load('templates', true);
			var templatesNew = data.templates;

			// remove templates from $templatesNew which already exists
			for (var i = 0; i < templatesOld.length; ++i) {
				for (var j = 0; j < templatesNew.length; ++j) {
					// if entry in new array already exists in old array, remove it from new array
					if (JSON.stringify(templatesOld[i]) === JSON.stringify(templatesNew[j])) {
						templatesNew.splice(j, 1); // removes matching value from array
					}
				}
			}
			// merge both arrays
			var templatesMerged = templatesOld.concat(templatesNew);

			/**
			 * Step 2: replace the merged data with current data
			 */

			// store merged templates

			// check for < 1.6 version and make it compatible
			for (var i = 0; i < templatesMerged.length; i++) {
				// rename context menu entry to templateName
				if (templatesMerged[i].contextMenuName) {
					templatesMerged[i].templateName = templatesMerged[i].contextMenuName;
					templatesMerged[i].quickAccessDropdown = true;
					templatesMerged[i].quickAccessButton = true;
					templatesMerged[i].quickAccessCommentButton = true;
					templatesMerged[i].quickAccessContextMenu = true;
					// delete project, tickettype entry
					delete templatesMerged[i].contextMenuName;
				}
			}

			Utils.LocalStorage.save('templates', JSON.stringify(templatesMerged));
			Utils.LocalStorage.save('options', JSON.stringify(data.options));

			/**
			 * Step 3: collect statistics and print success message
			 */

			alert(chrome.i18n.getMessage('alert_message_confirm_action_import_merge_success'));
		} catch (error) {
			console.trace();
			console.error(error);

			alert(chrome.i18n.getMessage('alert_message_action_import_failed') + 'Error Message: ' + error);
		}
	},
};
