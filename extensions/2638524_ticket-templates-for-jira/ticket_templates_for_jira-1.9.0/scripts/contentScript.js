const ERROR_NO_EDIT_FIELD_VISIBLE = 'There is no textfield with custom selector visible.';
const TITLE_DROPDOWN_ICON = chrome.i18n.getMessage('html_title_of_created_dropdown');
let isJiraCloud = window.location.href.includes('atlassian.net');
let insertTemplate = true;

// type var because content.js may be injected multiple times,
// which would causing errors if type const
const NEW_LINE = '\n';
const DEFAULT_TEMPLATE_ID = 'default';
const TEXTFIELD_IDS = '#description, #comment';

const Utils = {
	checkEnvironment() {
		// deactive console.logs in production
		if (chrome.i18n.getMessage('DEV_MODE') == 'false') {
			console.log = () => {};
			console.debug = () => {};
			console.error = () => {};
			console.info = () => {};
			console.warn = () => {};
		} else {
			document.getElementsByTagName('TITLE')[0].innerText = 'DEV Mode';
		}
	},
};

const JiraInterface = {
	/**
	 * @returns value of description textarea either cloud or server
	 */
	getValueOfTemplateDescriptionField() {
		return isJiraCloud
			? document.getElementsByClassName('ak-editor-content-area')[0].children[1].innerHTML
			: document.getElementById('description').value;
	},
	setValueOfTemplateDescriptionField(value) {
		return isJiraCloud
			? (document.getElementsByClassName('ak-editor-content-area')[0].children[1].innerHTML = value)
			: (document.getElementById('description').value = value);
	},

	setCustomToolBar(chosenTemplate, selectedProject, selectedIssueType) {
		// do not create tool bar more than once
		if (document.querySelector('#customToolBar')) return;

		let headline = '';
		if (chosenTemplate != '') {
			headline = 'Update Template | Ticket Templates for JIRA';
			selectedIssueType = chosenTemplate.issueType;
			selectedProject = chosenTemplate.projects;
			templateName = chosenTemplate.templateName;
			uuid = chosenTemplate.uuid;
		} else {
			headline = 'Create Template | Ticket Templates for JIRA';
			templateName = `${selectedIssueType} (${selectedProject})`;
			uuid = String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
		}

		const $customToolBar = `<div id="customToolBar" style="display: flex;position:relative; gap: 1rem;height: 2rem;padding: 1rem;border: 1px solid lightgray;border-radius: 5px;margin-top: 1rem;">
			<span style="position: absolute;top: -0.7rem;background-color: white;padding: 0 0.4rem;">
				<img src="" style="vertical-align: middle;"/>
				${headline}
			</span>

			<div style="display: flex;flex-direction: column;width: min-content;">
				<input type="text" id="selectedIssueType" value="${selectedIssueType}">
				<label for="selectedIssueType"><small>Issue Type</small></label>
			</div>

			<div style="display: flex;flex-direction: column;width: min-content;">
				<input type="text" id="selectedProjects" value="${selectedProject}"/>
				<label for="selectedProjects"><small>Projects</small></label>
			</div>

			<div style="display: flex;flex-direction: column;width: min-content;">
				<input type="text" id="templateName" value="${templateName}"/>
				<label for="templateName"><small>Template Name</small></label>
			</div>
			<span id="saveTemplate" title="save" style="height: 36px; cursor: pointer;display: flex;align-items: center;">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
			</span>
			<span id="saving_success" style="display: none; align-items: center;position: absolute;bottom: -0.7rem;background-color: white;padding: 0 0.4rem;right: 0.7rem;">
				Template saved, reload required! <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#0BDA51"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
			</span>
			<span id="saving_failure" style="display: none; align-items: center;position: absolute;bottom: -0.7rem;background-color: white;padding: 0 0.4rem;right: 0.7rem;">
				Error occured! <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FF5733"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
			</span>
		</div>`;

		const $containerForCustomToolBar = isJiraCloud
			? document.querySelector('div.akEditor')
			: document.querySelector('div#qf-field-description .save-options');

		const showNotification = (id) => {
			document.getElementById(id).style.display = 'flex';
			setTimeout(function () {
				document.getElementById(id).style.display = 'none';
			}, 5000);
		};
		// insert save / update formular
		$containerForCustomToolBar.insertAdjacentHTML('afterend', $customToolBar);

		// set image src
		chrome.runtime.sendMessage('getIcon', function (response) {
			document.querySelector('#customToolBar img').src = response;
			//selectList.style = `background-image: url(${response}); background-repeat: no-repeat;background-position: center;background-color: inherit;width: 16px;appearance: none;cursor: pointer;`;
		});

		// trigger template update logic
		document.querySelector('#customToolBar #saveTemplate').addEventListener('click', (e) => {
			try {
				e.preventDefault();
				CurrentView.setTextMode(e.currentTarget);

				chrome.runtime.sendMessage({
					name: 'setNewTemplate',
					data: {
						newTemplate: this.getValueOfTemplateDescriptionField(),
						issueType: document.getElementById('selectedIssueType').value || '',
						projects: document.getElementById('selectedProjects').value || 'default',
						templateName: document.getElementById('templateName').value || '',
						uuid: uuid,
					},
				});
				showNotification('saving_success');
			} catch (error) {
				showNotification('saving_failure');
			}
		});
	},
};

const CurrentView = {
	insertDescription(selector, template, options) {
		if (insertTemplate) {
			if (isJiraCloud) return;

			const textBefore = selector.value;
			if (textBefore.length === 0 || !options.keeptext.enabled) {
				selector.value = template.contextMenu;
			} else {
				// preserve text in description
				selector.value = `${template.contextMenu}${NEW_LINE}${NEW_LINE}${options.keeptext.separator}${NEW_LINE}${NEW_LINE}${textBefore}`;
			}
			insertTemplate = false;
		}
	},
	insertDescriptionJiraCloud(selector, template, options) {
		let textBefore = selector.querySelector('p');
		textBefore = textBefore ? textBefore.innerText : false;

		// check if override or preserve
		if (selector.querySelector('span.placeholder-decoration') || !textBefore || !options.keeptext.enabled) {
			let text = `${template.contextMenu}${NEW_LINE}`;

			selector.focus();
			document.execCommand('delete', false);
			document.execCommand('insertText', false, text);
		} else {
			// preserve text in description
			let newText = `${template.contextMenu}${NEW_LINE}${NEW_LINE}${options.keeptext.separator}${NEW_LINE}${NEW_LINE}${textBefore}`;

			selector.focus();
			document.execCommand('delete', false);
			document.execCommand('insertText', false, newText);
		}
	},
	isPlainTemplate(text, templates) {
		let result = false;
		// eslint-disable-next-line no-restricted-syntax
		for (const key in templates) {
			if (Object.hasOwnProperty.call(templates, key)) {
				// if text is written for server version and injected in cloud it became wrapped in <p>
				text = text.replace(/[^a-zA-Z]/g, '');
				let knownTemplate = templates[key].ticketDesc.replace(/[^a-zA-Z]/g, '');
				if (text === knownTemplate || `p${knownTemplate}p` === text) {
					result = true;
				}
			}
		}
		return result;
	},
	enableButtonSaveComment() {
		try {
			let saveBtn = document.getElementById('issue-comment-add-submit') || document.getElementById('comment-edit-submit');
			saveBtn.removeAttribute('disabled');
		} catch (error) {
			console.error(error);
		}
	},
	// make sure text mode is active
	setTextMode(activeElement) {
		try {
			// find correct link in case of more than one data-mode links
			activeElement.closest('.field-group').querySelector('[data-mode=source] a, [data-mode=source] button').click();
		} catch (error) {
			// in cloud version is no edit button
			console.error(error);
			try {
				document.querySelector('[data-mode=source] a, [data-mode=source] button').click();
			} catch (error) {
				console.error(error);
			}
		}
	},
};

// deactive dev outputs if productive
Utils.checkEnvironment();

// insert template after click in context menu
chrome.runtime.onMessage.addListener(function onMsg(message, _sender, sendResponse) {
	chrome.runtime.sendMessage('getOptions', function getMsg(options) {
		// handle context menu click
		if (message.contextMenu && message.contextMenu !== 'donate_link') {
			if (!isJiraCloud) {
				const isTextField = this.document.activeElement.type === ('textarea' || 'input');
				if (!isTextField) {
					// make sure text mode is active
					CurrentView.setTextMode(this.document.activeElement);
				}
				setTimeout(
					() => {
						CurrentView.insertDescription(this.document.activeElement, message, options);
						CurrentView.enableButtonSaveComment();
					},
					isTextField ? 0 : 500
				);
			} else {
				CurrentView.insertDescriptionJiraCloud(this.document.activeElement, message, options);
			}

			sendResponse({ message: 'done' });
		} else if (message.contextMenu && message.contextMenu === 'donate_link') {
			chrome.runtime.sendMessage('getSupportersPage', function getSupportersPage() {});
		}
	});
});

// execute scripts only if domains whitelisted
chrome.runtime.sendMessage('getDomains', function getDomains(customDomains) {
	const domains = customDomains.replaceAll(',', '|');
	const pattern = new RegExp(domains);
	if (!pattern.test(window.location.href)) {
		console.log('Current location does not contain a valid domain!');
		console.log(`Given domains: ${domains}`);
	} else {
		chrome.runtime.sendMessage('getOptions', function getOptions(data1) {
			chrome.runtime.sendMessage('getTemplates', function getTemplates(data2) {
				// set dom observer
				const observer = new MutationObserver((mutations) => {
					mutations.forEach(observeDocumentBody);
				});
				observer.observe(document.body, {
					subtree: true,
					attributes: true,
					attributeFilter: ['resolved', 'contenteditable'],
				});

				const options = data1;
				const templates = data2;

				/**
				 * helper functions
				 */

				function applyTemplate() {
					const currentEditForm = this.closest('.field-group');
					CurrentView.setTextMode(currentEditForm);

					const textfield = currentEditForm.querySelector(TEXTFIELD_IDS);
					let template;
					let templateType;
					let uiType;

					if (this.getAttribute('insertdata')) {
						// user clicked on button
						uiType = 'button';
						template = this.getAttribute('insertdata');
						templateType = this.getAttribute('templateType').toLowerCase();
					} else {
						// user selected item on dropdown
						uiType = 'dropdown';
						template = this.options[this.selectedIndex].value;
						templateType = this.options[this.selectedIndex].templateType.toLowerCase();
					}

					// insert template if textarea is empty
					const textBefore = textfield.value;
					if (textBefore.length === 0 || !options.keeptext.enabled) {
						textfield.value = template;
					} else {
						// exchange template if textarea contains only plain template
						if (CurrentView.isPlainTemplate(textBefore, templates)) {
							textfield.value = template;
							// append template if textarea already contains text not plain template
						} else {
							textfield.value = `${template}${NEW_LINE}${NEW_LINE}${options.keeptext.separator}${NEW_LINE}${NEW_LINE}${textBefore}`;
						}
					}

					CurrentView.enableButtonSaveComment();
				}

				function createDropdown(templates, showInProject) {
					// create select
					const selectList = document.createElement('select');
					selectList.id = 'issueDropdownMenu';
					selectList.className =
						'aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-operation-dropdown wiki-edit-style-picker-trigger';
					selectList.title = TITLE_DROPDOWN_ICON;
					chrome.runtime.sendMessage('getIcon', function (response) {
						selectList.style = `background-image: url(${response}); background-repeat: no-repeat;background-position: center;background-color: inherit;width: 16px;appearance: none;cursor: pointer;`;
					});
					selectList.onchange = applyTemplate;

					// create options
					for (const key in templates) {
						if (templates[key].projects.toLowerCase().includes(DEFAULT_TEMPLATE_ID) || templates[key].projects.includes(showInProject)) {
							var option = document.createElement('option');
							option.value = templates[key].ticketDesc;
							option.templateType = templates[key].issueType;
							option.text = templates[key].templateName;
							selectList.appendChild(option);
						}
					}

					// create default option
					var option = document.createElement('option');
					option.className = 'issueDropdownMenuOptions';
					option.value = '';
					option.text = TITLE_DROPDOWN_ICON;
					option.selected = 'true';
					option.disabled = 'true';
					option.hidden = 'true';
					selectList.appendChild(option);

					return selectList;
				}

				function createButtons(templates, showInProject) {
					// create buttoncontainer
					const container = document.createElement('div');
					container.id = 'buttonContainer';
					container.className = 'aui-buttons';
					container.style = 'padding-left: 0px;margin-left: 0px;border-left: 0;white-space: break-spaces;display: inline-block;';

					// create buttons
					for (const key in templates) {
						if (templates[key].projects.toLowerCase().includes(DEFAULT_TEMPLATE_ID) || templates[key].projects.includes(showInProject)) {
							const button = document.createElement('a');
							button.className = 'aui-button aui-button-subtle';
							button.innerText = templates[key].templateName;
							button.setAttribute('templateType', templates[key].issueType);
							button.setAttribute('insertdata', templates[key].ticketDesc);
							button.onclick = applyTemplate;
							container.appendChild(button);
						}
					}

					return container;
				}

				// search for projectspecific template
				function getTemplate(templates, projects, issueType) {
					let specifcTemplate;
					let defaultTemplate;
					projects = projects.toUpperCase();
					issueType = issueType.toLowerCase();

					for (const key in templates) {
						if (Object.hasOwnProperty.call(templates, key)) {
							if (templates[key].issueType.toLowerCase() == issueType && templates[key].projects.includes(projects)) {
								// specific if issueType e.g. "Bug" and project e.g. "ABC"
								specifcTemplate = templates[key];
							} else if (
								templates[key].issueType.toLowerCase() == issueType &&
								templates[key].projects.toLowerCase().includes(DEFAULT_TEMPLATE_ID)
							) {
								// default if  issueType e.g. "Bug" and project "default"
								defaultTemplate = templates[key];
							}
						}
					}
					// return specific, default or no template
					return typeof specifcTemplate !== 'undefined' ? specifcTemplate : typeof defaultTemplate !== 'undefined' ? defaultTemplate : '';
				}

				/**
				 * executives
				 */
				function observeDocumentBody(mutation) {
					console.info(mutation.target.getAttribute('aria-label'));
					console.info(mutation.target);
					const isDescriptionField =
						['description'].includes(mutation.target.id) ||
						(mutation.target.getAttribute('aria-label') == 'Main content area' && mutation.target.getAttribute('contenteditable'));
					let prj = '';
					let selectedIssueType = '';
					let chosenTemplate = '';

					// get selected parameters

					// no project-field available, probably just clicked edit at current issue
					if (isDescriptionField) {
						setTimeout(() => {
							if (!isJiraCloud) {
								prj = document.getElementById('project-field') ? document.getElementById('project-field').value : '';
								selectedIssueType =
									document.getElementById('issuetype-field').value ||
									document.querySelector('[data-issue-type]').getAttribute('data-issue-type');
							} else {
								prj = document.getElementById('issue-create.ui.modal.create-form.project-picker.project-select').textContent || '';
								selectedIssueType =
									document.getElementById('issue-create.ui.modal.create-form.type-picker.issue-type-select').textContent || '';
							}

							selectedProject = prj.substring(prj.lastIndexOf('(') + 1, prj.length - 1);
							chosenTemplate = getTemplate(templates, selectedProject, selectedIssueType);

							JiraInterface.setCustomToolBar(chosenTemplate, selectedProject, selectedIssueType);
						}, 200);
					}

					// observe for autofill
					if (options.autofill.enabled) {
						if (isDescriptionField) {
							setTimeout(() => {
								// autofill template only if textarea is empty or just another template
								let textBefore = '';
								if (!isJiraCloud && chosenTemplate !== '') {
									textBefore = mutation.target.value;
									if (textBefore.length === 0) {
										mutation.target.value = chosenTemplate.ticketDesc;
										// exchange template if textarea contains only plain template
									} else if (CurrentView.isPlainTemplate(textBefore, templates)) {
										mutation.target.value = templateticketDesc;
										// no autofill if something else is given in description
									} else {
									}
								} else if (chosenTemplate !== '') {
									const justPlaceholder = mutation.target.querySelector('p > span[contenteditable="false"]');
									textBefore = JiraInterface.getValueOfTemplateDescriptionField();

									// check if override or preserve
									// length == 1 if '\n' in cloud version basically empty
									if (justPlaceholder || !options.keeptext.enabled) {
										JiraInterface.setValueOfTemplateDescriptionField(chosenTemplate.ticketDesc);
									} else if (CurrentView.isPlainTemplate(textBefore, templates)) {
										JiraInterface.setValueOfTemplateDescriptionField(chosenTemplate.ticketDesc);
									} else {
										// preserve text in description
										let newText = `${chosenTemplate.ticketDesc}${NEW_LINE}${NEW_LINE}${options.keeptext.separator}${NEW_LINE}${NEW_LINE}${textBefore}`;
										JiraInterface.setValueOfTemplateDescriptionField(newText);
									}
								} else {
									// template was set, change ticket type -> jira reminds the template
									// remove template if theres is no template for ticket type
									if (CurrentView.isPlainTemplate(JiraInterface.getValueOfTemplateDescriptionField(), templates))
										JiraInterface.setValueOfTemplateDescriptionField('');
								}

								// mutation.target.focus();
								mutation.target.scrollIntoView(false);
							}, 300);
						}
					}

					// observe for dropdown
					if (options.quickaccess.enabled) {
						if (
							['wiki-editor-initialised', 'textfield', 'wiki-edit-operation'].includes(mutation.target.className) ||
							['comment'].includes(mutation.target.id) ||
							isDescriptionField
						) {
							const toolbars = document.querySelectorAll('.wiki-edit-toolbar:not(#issueDropdownMenu)');
							if (toolbars) {
								let currentProject;
								try {
									currentProject = document.querySelector(`textarea#${mutation.target.id}`) || document.querySelector('textarea');
									currentProject = currentProject.getAttribute('data-projectkey');
								} catch (error) {
									console.warn(`Could not find currentProject in this view: ${window.location.href}`);
								}

								// render dropdown either target is description or comment
								chrome.runtime.sendMessage('getEntriesForDropdown', function (entries) {
									if (entries.length > 0) {
										customToolBar.appendChild(createDropdown(entries, currentProject));
										for (let index = 0; index < toolbars.length; index++) {
											if (toolbars[index].querySelector('#issueDropdownMenu') === null) {
												// append as second last
												toolbars[index]
													.querySelector('.wiki-edit-toolbar .aui-buttons:nth-last-child(2)')
													.appendChild(createDropdown(entries, currentProject));
											}
										}
									}
								});

								if (isDescriptionField) {
									// buttons for description wysiwyg editor
									chrome.runtime.sendMessage('getButtonsForDescription', function getBtnDesc(buttons) {
										if (buttons.length > 0) {
											for (let index = 0; index < toolbars.length; index += 1) {
												if (toolbars[index].querySelector('#buttonContainer') === null) {
													// append in the end
													toolbars[index]
														.querySelector('.wiki-edit-toolbar-last')
														.parentNode.appendChild(createButtons(buttons, currentProject));
												}
											}
										}
									});
								} else {
									// buttons for comment wysiwyg editor
									chrome.runtime.sendMessage('getButtonsForComment', function getBtnComment(buttons) {
										if (buttons.length > 0) {
											for (let index = 0; index < toolbars.length; index += 1) {
												if (toolbars[index].querySelector('#buttonContainer') === null) {
													// append in the end
													toolbars[index]
														.querySelector('.wiki-edit-toolbar-last')
														.parentNode.appendChild(createButtons(buttons, currentProject));
												}
											}
										}
									});
								}
							}
						}
					}
				}
			});
		});
	}
});
