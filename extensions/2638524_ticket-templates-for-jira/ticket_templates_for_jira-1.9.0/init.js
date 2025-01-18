const MSG_CONFIRM_ACTION_DELETE = chrome.i18n.getMessage('alert_message_confirm_action_delete');
const MSG_CONFIRM_ACTION_RESET = chrome.i18n.getMessage('alert_message_confirm_action_reset');
const MSG_CONFIRM_ACTION_IMPORT_OVERWRITE = chrome.i18n.getMessage('alert_message_confirm_action_import_overwrite');
const MSG_CONFIRM_ACTION_IMPORT_MERGE = chrome.i18n.getMessage('alert_message_confirm_action_import_merge');

// https://www.freeformatter.com/json-escape.html formatting json
// must escaped like \" for JSON.parse function, can not handle single quotes
const DEFAULT_TEMPLATES =
	'[\r\n{\r\n"ticketDesc":"*Story:*\\nAs a _type of user/persona,_ I want _to perform some task,_ so that I can _achieve some goal/benefit/value._\\n\\n*Details:*\\nEnter any details, clarifications, answers to questions, or points about implementation here.\\n\\n*Additional Information:*\\nEnter any background or references such as Stack Overflow, MSDN, blogs, etc. that may help with developing the feature.\\n\\n*Acceptance Criteria:*\\nEnter the conditions of satisfaction here. That is, the conditions that will satisfy the user/persona that the goal/benefit/value has been achieved.",\r\n "templateName":"Storyticket (default)",\r\n"issueType": "Story",\r\n"projects": "default",\r\n"quickAccessButton": true,\r\n"quickAccessCommentButton": true,\r\n"quickAccessDropdown": true,\r\n"quickAccessContextMenu": true\r\n}, \r\n{ "ticketDesc":\r\n"*Summary:*\\nEnter summary of the problem here.\\n\\n*Steps to Reproduce:*\\n# Enter detailed steps to reproduce here.\\n# More detail is better.\\n\\n*Expected Behaviour: (/)*\\nEnter what should happen here.\\n\\n*Additional Details:*\\nEnter any other details like used browser version, links to requirements, etc. Any criteria that might help with fixing the problem.\\n\\n*Screenshots:*\\nAttach screenshots if possible.",\r\n"templateName":"Bugticket (default)",\r\n"issueType": "Bug",\r\n"projects": "default",\r\n"quickAccessButton": true,\r\n"quickAccessCommentButton": true,\r\n"quickAccessDropdown": true,\r\n"quickAccessContextMenu": true\r\n}, \r\n{ \r\n"ticketDesc": "I need this phrase very often.",\r\n"templateName": "paste some phrase in textfield",\r\n"issueType": "Comment",\r\n"projects": "default",\r\n"quickAccessButton": true,\r\n"quickAccessCommentButton": true,\r\n"quickAccessDropdown": true,\r\n"quickAccessContextMenu": true\r\n}\r\n]';
const DEFAULT_OPTIONS =
	'{"quickaccess":{"enabled":true},"autofill":{"enabled":true},"contextmenu":{"enabled":true},"keeptext":{"enabled":true,"separator":"----------------------------"},"validDomains":"jira,trello,atlassian.net"}';
var d = new Date();
const DEFAULT_STATS = `{\"supportsYouSince\": \"${d}\", \"charactorsTyped\": 0, \"buttonsDropdownsUsed\": 0, \"templatesAutofilled\": 0}`;
const RENDER_TIME = 0;

Init = {
	loadApplication: function () {
		// handle extension updates
		if (localStorage.templates && localStorage.templates != '[]') {
			// start: migration 1.8
			if (!Utils.LocalStorage.load('templates', true)[0].uuid) {
				var temp = JSON.parse(localStorage.templates);
				for (var i = 0; i < temp.length; i++) {
					// set uuid
					temp[i].uuid = Utils.createUUID();
				}
				// save new template
				Utils.LocalStorage.save('templates', JSON.stringify(temp));
				console.log(localStorage.templates);
			}
			// end: migration 1.8

			Templates.recreateContextMenu();
			Templates.load();

			// handle extension installs
		} else {
			Utils.LocalStorage.save('templates', DEFAULT_TEMPLATES, true);
			Utils.LocalStorage.save('options', DEFAULT_OPTIONS, true);
			Utils.LocalStorage.save('statistics', DEFAULT_STATS, true);

			Templates.recreateContextMenu();
			Templates.load();
		}

		// setup sync storage
		console.log(localStorage.templates);
		Utils.LocalStorage.updateSyncronizedStorage();
	},
	onClickListener: {
		ButtonCreateNewTemplate: function () {
			document.getElementById('createButton').onclick = function () {
				new Template();
				UI.addAnimationOpenCloseArrowToSelects();
				UI.addAnimationExpandToTextAreas();
			};
		},
		ButtonOpenAllTemplateEntriesForEdit: function () {
			document.getElementById('openAllForEdit').onclick = function () {
				var editAll = document.querySelectorAll('tbody#ticketTemplates tr i.button-icon.edit:not(.hidden)');
				var closeAll = document.querySelectorAll('tbody#ticketTemplates tr i.button-icon.close:not(.hidden)');

				if (editAll.length > 0) {
					editAll.forEach((e) => {
						e.click();
					});
				} else {
					closeAll.forEach((e) => {
						e.click();
					});
				}
			};
		},
		ButtonOpenAdvancedOptions: function () {
			document.getElementById('menu').onclick = function () {
				// handle option button, exchange localization etc
				UI.showOrHideElement('#openMenu');
				UI.showOrHideElement('#closeMenu');

				// handle save button, exchange localization etc
				UI.showOrHideElement('#saveOptions');
				UI.showOrHideElement('#saveChanges');

				// hide create template button
				UI.showOrHideElement('#createButton');

				UI.addOrRemoveClassFromElement('.container > .button-container', 'flex-end');
				UI.expandAdvancedOptions();
			};
		},
		ButtonResetTemplates: function () {
			document.getElementById('reset').onclick = Templates.resetToDefault;
		},
		ButtonRateOnAppStore: function () {
			document.getElementById('appstore').onclick = function () {
				this.href = UI.getLinkToStoreBasedOnUsingBrowser();
			};
		},
		ButtonSaveAllChanges: function () {
			document.getElementById('saveAllChanges').onclick = function () {
				// spin for indicate of doing something
				Utils.showSpinner();
				this.hide();
				Templates.save();
				// advanced options update ticket types and separator
				Init.updateAdvancedOptions();
				Utils.LocalStorage.updateSyncronizedStorage();

				// enable button
				setTimeout(function () {
					window.location.reload();
				}, 250);
			};
		},
		ButtonImportExport: function () {
			document.getElementById('exportConfigJSON').onclick = Import.createAndDownloadJSON;

			// import listener
			document.getElementById('hiddenImportButton').hide();
			document.getElementById('importConfigJSON').onclick = function () {
				document.getElementById('hiddenImportButton').click();
			};
			document.getElementById('hiddenImportButton').onchange = Import.importUploadedJSON;
		},
		ButtonUrlSyncJSON: function () {
			document.getElementById('syncTemplateJSON').onclick = function () {
				let url = Utils.getElementValue('#importUrl');
				Import.loadFromURL(url);
			};
		},
		ButtonsFeatureToggle: function () {
			document.getElementById('featureToggleAutofill').onchange = (el) => {
				Init.updateAdvancedOptions();
			};
			document.getElementById('featureToggleQuickAccess').onchange = (el) => {
				Init.updateAdvancedOptions();
			};
			document.getElementById('featureToggleContextMenu').onchange = (el) => {
				Init.updateAdvancedOptions();
				el.target.checked && Templates.recreateContextMenu();
			};
			document.getElementById('featureToggleKeepText').onchange = (el) => {
				if (el.target.checked) {
					document.getElementById('separatorString').closest('tr').show();
				} else {
					document.getElementById('separatorString').closest('tr').hide();
				}
				Init.updateAdvancedOptions();
			};
		},
		CtrlSForSave: function () {
			document.addEventListener('keydown', function (event) {
				if (event.ctrlKey && String.fromCharCode(event.keyCode) === 'S') {
					event.preventDefault();
					event.stopPropagation();
					document.getElementById('saveAllChanges').click();
				}
			});
		},
	},
	renderAdvancedOptionsPage: function () {
		Utils.setElementChecked('#featureToggleAutofill', Utils.LocalStorage.load('options', true).autofill.enabled);
		Utils.setElementChecked('#featureToggleQuickAccess', Utils.LocalStorage.load('options', true).quickaccess.enabled);
		Utils.setElementChecked('#featureToggleContextMenu', Utils.LocalStorage.load('options', true).contextmenu.enabled);

		var keeptext = Utils.LocalStorage.load('options', true).keeptext.enabled;
		Utils.setElementChecked('#featureToggleKeepText', keeptext);
		Utils.setElementValue('#separatorString', Utils.LocalStorage.load('options', true).keeptext.separator);
		if (!keeptext) document.getElementById('separatorString').closest('tr').hide();

		Utils.setElementValue('#validDomains', Utils.LocalStorage.load('options', true).validDomains);

		// fetch stats
		var stats = Utils.LocalStorage.load('statistics', true);
		var d = new Date(stats.supportsYouSince);
		// chars per second
		var seconds = (stats.charactorsTyped / 300) * 60;

		document.getElementById('statsTemplatesTotal').innerText = Utils.LocalStorage.load('templates', true).length;
		document.getElementById('templatesAutofilled').innerText = stats.templatesAutofilled;
		document.getElementById('buttonsDropdownsUsed').innerText = stats.buttonsDropdownsUsed;

		document.getElementById('charactersTyped').innerText = Utils.formatNumberThousandSeparator(stats.charactorsTyped);
		document.getElementById('timeSaved').innerText = seconds != 0 ? Utils.formatSecondsToReadableString(seconds) : '0';
		document.getElementById('supportsYouSince').innerText = d.toLocaleDateString();
	},
	updateAdvancedOptions() {
		// load settings
		var opts = Utils.LocalStorage.load('options', true),
			newOpts = {};
		// get current setting
		opts.autofill.enabled = document.getElementById('featureToggleAutofill').checked;
		opts.quickaccess.enabled = document.getElementById('featureToggleQuickAccess').checked;
		opts.contextmenu.enabled = document.getElementById('featureToggleContextMenu').checked;
		opts.keeptext.enabled = document.getElementById('featureToggleKeepText').checked;
		opts.keeptext.separator = Utils.getElementValue('#separatorString');
		opts.validDomains = Utils.getElementValue('#validDomains');
		// save current settings
		localStorage.options = JSON.stringify(opts);
	},
};

document.addEventListener('DOMContentLoaded', function () {
	UI.renderLocalizedStrings();
	UI.addDynamicViewportWidth();
	Utils.checkEnvironment();
});

window.onload = function () {
	document.getElementsByClassName('main-container')[0].hide();

	Init.loadApplication();
	Init.renderAdvancedOptionsPage();

	Init.onClickListener.ButtonCreateNewTemplate();
	Init.onClickListener.ButtonOpenAdvancedOptions();
	Init.onClickListener.ButtonsFeatureToggle();
	Init.onClickListener.ButtonResetTemplates();
	Init.onClickListener.ButtonRateOnAppStore();
	Init.onClickListener.ButtonSaveAllChanges();
	Init.onClickListener.ButtonImportExport();
	Init.onClickListener.ButtonUrlSyncJSON();
	Init.onClickListener.ButtonOpenAllTemplateEntriesForEdit();
	Init.onClickListener.CtrlSForSave();

	UI.addAnimationExpandToTextAreas();
	UI.addAnimationOpenCloseArrowToSelects();

	Utils.makeElementsCollapsable();

	document.getElementsByClassName('main-container')[0].show();
};
