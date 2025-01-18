const PROJECT_MAPPING_FALLBACK = 'default';
const TEMPLATE_NAME_FALLBACK = chrome.i18n.getMessage('configure_input_template_name_default_value');
const TICKET_DESCRIPION_FALLBACK = chrome.i18n.getMessage('configure_input_template_description_default_value');

function Template(data) {
	var options = Utils.LocalStorage.load('options', true);
	var iterator = Template.next_id++;
	var templates = document.getElementById('ticketTemplates');
	this.node = document.getElementById('ticketTemplate').cloneNode(true);
	this.node.id = 'template' + iterator;
	let uuid = data?.uuid ? data.uuid : Utils.createUUID();
	this.node.setAttribute('uuid', uuid);
	this.node.template = this;
	templates.appendChild(this.node);
	this.node.hidden = false;

	// get data
	if (data) {
		this.getElement('ticketDesc').value = data.ticketDesc;
		this.getElement('templateName').value = data.templateName;
	}

	// save function
	this.getElement('ticketDesc').onkeyup = Templates.save;
	this.getElement('ticketDesc').onchange = Templates.save;
	this.getElement('templateName').onkeyup = Templates.save;
	this.getElement('templateName').onchange = Templates.save;

	var template = this;

	// move function
	this.getElement('template-move-up').onclick = function () {
		var nId = template.node.id.replace('config', '');
		var templates = Utils.LocalStorage.load('templates', true);
		templates.move(nId, parseInt(nId) - 1);
		Utils.LocalStorage.save('templates', JSON.stringify(templates));
		window.location.reload();
	};
	this.getElement('template-move-down').onclick = function () {
		// get position of template
		var nId = template.node.id.replace('config', '');
		var templates = Utils.LocalStorage.load('templates', true);
		templates.move(nId, parseInt(nId) + 1);
		Utils.LocalStorage.save('templates', JSON.stringify(templates));
		window.location.reload();
	};
	// open config function
	this.getElement('edit').onclick = function () {
		template.node.removeAttribute('hidden');
		this.parentElement.getElementsByClassName('close')[0].show();
		this.hide();
	};
	// close config function
	this.getElement('close').onclick = function () {
		template.node.setAttribute('hidden', 'hidden');
		this.parentElement.getElementsByClassName('edit')[0].show();
		this.hide();
	};

	// delete function
	this.getElement('delete').onclick = function () {
		// get position of template
		var nId = template.node.id.replace('config', '');
		var templates = Utils.LocalStorage.load('templates', true);

		if (confirm(MSG_CONFIRM_ACTION_DELETE)) {
			// remove entry at position from templates array
			templates.splice(nId, 1);
			Utils.LocalStorage.save('templates', JSON.stringify(templates));
			window.location.reload(); // to make sure init get triggered
		}
	};

	// add config row
	this.node = document.getElementById('configOptions').cloneNode(true);
	this.node.id = 'config' + iterator;
	this.node.template = this;
	templates.appendChild(this.node);
	this.node.hidden = true;

	// get data
	if (data) {
		this.getElement('issueType').value = data.issueType || '';
		this.getElement('projects').value = data.projects || PROJECT_MAPPING_FALLBACK;
		this.getElement('quickAccessDropdown').checked = data.quickAccessDropdown;
		this.getElement('quickAccessButton').checked = data.quickAccessButton;
		this.getElement('quickAccessCommentButton').checked = data.quickAccessCommentButton;
		this.getElement('quickAccessContextMenu').checked = data.quickAccessContextMenu;
	}

	// set unique ids
	this.getElement('quickAccessDropdown').id = 'quickAccessDropdown' + iterator;
	this.getElement('quickAccessDropdown').nextElementSibling.setAttribute('for', 'quickAccessDropdown' + iterator);
	this.getElement('quickAccessButton').id = 'quickAccessButton' + iterator;
	this.getElement('quickAccessButton').nextElementSibling.setAttribute('for', 'quickAccessButton' + iterator);
	this.getElement('quickAccessCommentButton').id = 'quickAccessCommentButton' + iterator;
	this.getElement('quickAccessCommentButton').nextElementSibling.setAttribute('for', 'quickAccessCommentButton' + iterator);
	this.getElement('quickAccessContextMenu').id = 'quickAccessContextMenu' + iterator;
	this.getElement('quickAccessContextMenu').nextElementSibling.setAttribute('for', 'quickAccessContextMenu' + iterator);

	document.querySelectorAll('#' + this.node.id + ' input').forEach((el) => {
		el.onchange = function () {
			el.parentElement.parentElement.parentElement.querySelector('.save').show();
		};
		el.onkeyup = function () {
			el.parentElement.parentElement.parentElement.querySelector('.save').show();
		};
	});

	// hide if deactivated
	var a = options.quickaccess.enabled,
		b = options.contextmenu.enabled;
	if (!a) {
		this.getElement('quickAccessDropdown').parentElement.hide();
		this.getElement('quickAccessButton').parentElement.hide();
		this.getElement('quickAccessCommentButton').parentElement.hide();
	}
	!b && this.getElement('quickAccessContextMenu').parentElement.hide();
	!a && !b && this.getElement('quickAccessHeadline').hide();

	// save config function
	this.getElement('save').onclick = function () {
		Templates.save();
		window.location.reload(); // to make sure init get triggered, and menu is collapsed
	};

	// save after dom creations
	Templates.save();
}

Template.prototype.getElement = function (className) {
	// returns element containing $className  in active row
	return document.querySelector('#' + this.node.id + ' .' + className);
};

Template.next_id = 0;

Templates = {
	save: function () {
		var tArray = [];
		var templates = document.querySelectorAll('tr[id*=template]');
		for (let i = 0; i < templates.length; i++) {
			let tObj = {};
			// template content
			tObj.uuid = document.querySelector('tr#template' + i).getAttribute('uuid');
			tObj.ticketDesc = Templates.validate('ticketDesc', document.querySelector('tr#template' + i).querySelector('.ticketDesc').value);
			tObj.templateName = Templates.validate('templateName', document.querySelector('tr#template' + i).querySelector('.templateName').value);

			// template config
			tObj.issueType = document.querySelector('tr#config' + i).querySelector('.issueType').value;
			tObj.projects = document.querySelector('tr#config' + i).querySelector('.projects').value;
			tObj.quickAccessDropdown = document.querySelector('tr#config' + i).querySelector('.quickAccessDropdown').checked;
			tObj.quickAccessButton = document.querySelector('tr#config' + i).querySelector('.quickAccessButton').checked;
			tObj.quickAccessCommentButton = document.querySelector('tr#config' + i).querySelector('.quickAccessCommentButton').checked;
			tObj.quickAccessContextMenu = document.querySelector('tr#config' + i).querySelector('.quickAccessContextMenu').checked;
			tArray.push(tObj);
		}
		// save in storage
		localStorage.templates = JSON.stringify(tArray);
		Utils.LocalStorage.updateSyncronizedStorage();
	},
	load: function () {
		var templates = Utils.LocalStorage.load('templates', true);
		try {
			templates.forEach(function (template) {
				new Template(template);
			});
		} catch (e) {
			let errId = Math.random();
			console.error(errId + ' An error occured while parsing data: ');
			console.error(errId + ' ' + e);
			console.error(errId + ' ' + templates);
			console.error(errId + ' ' + template);
		}
	},
	// null check and replace with placeholder
	validate: function (fieldToValidate, value) {
		try {
			switch (fieldToValidate) {
				case 'ticketDesc':
					return value != '' ? value : TICKET_DESCRIPION_FALLBACK;
				case 'templateName':
					return value != '' ? value : PROJECT_MAPPING_FALLBACK;
				default:
					console.error(`No validation happened. Field "${fieldToValidate}" does not match any known ones.`);
					return value;
			}
		} catch (e) {
			let errId = Math.random();
			console.error(`${errId} Validation of field "${fieldToValidate}" failed.`);
			console.error(`${errId} ${e}`);
		}
	},
	// set templates to initial state
	resetToDefault: function () {
		if (confirm(MSG_CONFIRM_ACTION_RESET)) {
			localStorage.clear();
			location.reload();
		}
	},
	// rebuilds context and browser menu
	recreateContextMenu: function () {
		chrome.contextMenus.removeAll(function () {
			// check featuretoggle
			if (!Utils.LocalStorage.load('options', true).contextmenu.enabled) return;

			// get entries
			var templates = JSON.parse(localStorage.templates);
			result = [];
			templates.forEach((item) => {
				if (item.quickAccessContextMenu) {
					result.push(item);
				}
			});
			// check entries not empty
			if (result.length < 1) return;

			result.push({
				ticketDesc: 'donate_link',
				templateName: chrome.i18n.getMessage('general_context_menu_supporter'),
			});
			// create rightclick menu
			for (var i = 0; i < result.length; i++) {
				var str = result[i].templateName;
				// only try to recreate if templateName is selected
				if (str) {
					chrome.contextMenus.create({
						id: 'contextMenu' + i,
						title: result[i].templateName,
						contexts: ['editable', 'frame'], //context editable means rightclicked in textarea or input or iframe
						visible: true,
					});
				}
			}
		});
		Utils.showSpinner();
	},
};
