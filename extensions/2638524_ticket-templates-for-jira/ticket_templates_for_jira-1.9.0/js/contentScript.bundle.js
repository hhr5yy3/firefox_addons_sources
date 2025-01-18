/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/scripts/contentScript.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/scripts/contentScript.js":
/*!*****************************************!*\
  !*** ./source/scripts/contentScript.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ERROR_NO_EDIT_FIELD_VISIBLE = 'There is no textfield with custom selector visible.';
var TITLE_DROPDOWN_ICON = chrome.i18n.getMessage('html_title_of_created_dropdown');
var isJiraCloud = window.location.href.includes('atlassian.net');
var insertTemplate = true; // type var because content.js may be injected multiple times,
// which would causing errors if type const

var NEW_LINE = '\n';
var DEFAULT_TEMPLATE_ID = 'default';
var TEXTFIELD_IDS = '#description, #comment';
var Utils = {
  checkEnvironment: function checkEnvironment() {
    // deactive console.logs in production
    if (chrome.i18n.getMessage('DEV_MODE') == 'false') {
      console.log = function () {};

      console.debug = function () {};

      console.error = function () {};

      console.info = function () {};

      console.warn = function () {};
    } else {
      document.getElementsByTagName('TITLE')[0].innerText = 'DEV Mode';
    }
  }
};
var JiraInterface = {
  /**
   * @returns value of description textarea either cloud or server
   */
  getValueOfTemplateDescriptionField: function getValueOfTemplateDescriptionField() {
    return isJiraCloud ? document.getElementsByClassName('ak-editor-content-area')[0].children[1].innerHTML : document.getElementById('description').value;
  },
  setValueOfTemplateDescriptionField: function setValueOfTemplateDescriptionField(value) {
    return isJiraCloud ? document.getElementsByClassName('ak-editor-content-area')[0].children[1].innerHTML = value : document.getElementById('description').value = value;
  },
  setCustomToolBar: function setCustomToolBar(chosenTemplate, selectedProject, selectedIssueType) {
    var _this = this;

    // do not create tool bar more than once
    if (document.querySelector('#customToolBar')) return;
    var headline = '';

    if (chosenTemplate != '') {
      headline = 'Update Template | Ticket Templates for JIRA';
      selectedIssueType = chosenTemplate.issueType;
      selectedProject = chosenTemplate.projects;
      templateName = chosenTemplate.templateName;
      uuid = chosenTemplate.uuid;
    } else {
      headline = 'Create Template | Ticket Templates for JIRA';
      templateName = "".concat(selectedIssueType, " (").concat(selectedProject, ")");
      uuid = String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
    }

    var $customToolBar = "<div id=\"customToolBar\" style=\"display: flex;position:relative; gap: 1rem;height: 2rem;padding: 1rem;border: 1px solid lightgray;border-radius: 5px;margin-top: 1rem;\">\n\t\t\t<span style=\"position: absolute;top: -0.7rem;background-color: white;padding: 0 0.4rem;\">\n\t\t\t\t<img src=\"\" style=\"vertical-align: middle;\"/>\n\t\t\t\t".concat(headline, "\n\t\t\t</span>\n\n\t\t\t<div style=\"display: flex;flex-direction: column;width: min-content;\">\n\t\t\t\t<input type=\"text\" id=\"selectedIssueType\" value=\"").concat(selectedIssueType, "\">\n\t\t\t\t<label for=\"selectedIssueType\"><small>Issue Type</small></label>\n\t\t\t</div>\n\n\t\t\t<div style=\"display: flex;flex-direction: column;width: min-content;\">\n\t\t\t\t<input type=\"text\" id=\"selectedProjects\" value=\"").concat(selectedProject, "\"/>\n\t\t\t\t<label for=\"selectedProjects\"><small>Projects</small></label>\n\t\t\t</div>\n\n\t\t\t<div style=\"display: flex;flex-direction: column;width: min-content;\">\n\t\t\t\t<input type=\"text\" id=\"templateName\" value=\"").concat(templateName, "\"/>\n\t\t\t\t<label for=\"templateName\"><small>Template Name</small></label>\n\t\t\t</div>\n\t\t\t<span id=\"saveTemplate\" title=\"save\" style=\"height: 36px; cursor: pointer;display: flex;align-items: center;\">\n\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z\"/></svg>\n\t\t\t</span>\n\t\t\t<span id=\"saving_success\" style=\"display: none; align-items: center;position: absolute;bottom: -0.7rem;background-color: white;padding: 0 0.4rem;right: 0.7rem;\">\n\t\t\t\tTemplate saved, reload required! <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#0BDA51\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/></svg>\n\t\t\t</span>\n\t\t\t<span id=\"saving_failure\" style=\"display: none; align-items: center;position: absolute;bottom: -0.7rem;background-color: white;padding: 0 0.4rem;right: 0.7rem;\">\n\t\t\t\tError occured! <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#FF5733\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z\"/></svg>\n\t\t\t</span>\n\t\t</div>");
    var $containerForCustomToolBar = isJiraCloud ? document.querySelector('div.akEditor') : document.querySelector('div#qf-field-description .save-options');

    var showNotification = function showNotification(id) {
      document.getElementById(id).style.display = 'flex';
      setTimeout(function () {
        document.getElementById(id).style.display = 'none';
      }, 5000);
    }; // insert save / update formular


    $containerForCustomToolBar.insertAdjacentHTML('afterend', $customToolBar); // set image src

    chrome.runtime.sendMessage('getIcon', function (response) {
      document.querySelector('#customToolBar img').src = response; //selectList.style = `background-image: url(${response}); background-repeat: no-repeat;background-position: center;background-color: inherit;width: 16px;appearance: none;cursor: pointer;`;
    }); // trigger template update logic

    document.querySelector('#customToolBar #saveTemplate').addEventListener('click', function (e) {
      try {
        e.preventDefault();
        CurrentView.setTextMode(e.currentTarget);
        chrome.runtime.sendMessage({
          name: 'setNewTemplate',
          data: {
            newTemplate: _this.getValueOfTemplateDescriptionField(),
            issueType: document.getElementById('selectedIssueType').value || '',
            projects: document.getElementById('selectedProjects').value || 'default',
            templateName: document.getElementById('templateName').value || '',
            uuid: uuid
          }
        });
        showNotification('saving_success');
      } catch (error) {
        showNotification('saving_failure');
      }
    });
  }
};
var CurrentView = {
  insertDescription: function insertDescription(selector, template, options) {
    if (insertTemplate) {
      if (isJiraCloud) return;
      var textBefore = selector.value;

      if (textBefore.length === 0 || !options.keeptext.enabled) {
        selector.value = template.contextMenu;
      } else {
        // preserve text in description
        selector.value = "".concat(template.contextMenu).concat(NEW_LINE).concat(NEW_LINE).concat(options.keeptext.separator).concat(NEW_LINE).concat(NEW_LINE).concat(textBefore);
      }

      insertTemplate = false;
    }
  },
  insertDescriptionJiraCloud: function insertDescriptionJiraCloud(selector, template, options) {
    var textBefore = selector.querySelector('p');
    textBefore = textBefore ? textBefore.innerText : false; // check if override or preserve

    if (selector.querySelector('span.placeholder-decoration') || !textBefore || !options.keeptext.enabled) {
      var text = "".concat(template.contextMenu).concat(NEW_LINE);
      selector.focus();
      document.execCommand('delete', false);
      document.execCommand('insertText', false, text);
    } else {
      // preserve text in description
      var newText = "".concat(template.contextMenu).concat(NEW_LINE).concat(NEW_LINE).concat(options.keeptext.separator).concat(NEW_LINE).concat(NEW_LINE).concat(textBefore);
      selector.focus();
      document.execCommand('delete', false);
      document.execCommand('insertText', false, newText);
    }
  },
  isPlainTemplate: function isPlainTemplate(text, templates) {
    var result = false; // eslint-disable-next-line no-restricted-syntax

    for (var key in templates) {
      if (Object.hasOwnProperty.call(templates, key)) {
        // if text is written for server version and injected in cloud it became wrapped in <p>
        text = text.replace(/[^a-zA-Z]/g, '');
        var knownTemplate = templates[key].ticketDesc.replace(/[^a-zA-Z]/g, '');

        if (text === knownTemplate || "p".concat(knownTemplate, "p") === text) {
          result = true;
        }
      }
    }

    return result;
  },
  enableButtonSaveComment: function enableButtonSaveComment() {
    try {
      var saveBtn = document.getElementById('issue-comment-add-submit') || document.getElementById('comment-edit-submit');
      saveBtn.removeAttribute('disabled');
    } catch (error) {
      console.error(error);
    }
  },
  // make sure text mode is active
  setTextMode: function setTextMode(activeElement) {
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
  }
}; // deactive dev outputs if productive

Utils.checkEnvironment(); // insert template after click in context menu

chrome.runtime.onMessage.addListener(function onMsg(message, _sender, sendResponse) {
  chrome.runtime.sendMessage('getOptions', function getMsg(options) {
    var _this2 = this;

    // handle context menu click
    if (message.contextMenu && message.contextMenu !== 'donate_link') {
      if (!isJiraCloud) {
        var isTextField = this.document.activeElement.type === ('textarea' || false);

        if (!isTextField) {
          // make sure text mode is active
          CurrentView.setTextMode(this.document.activeElement);
        }

        setTimeout(function () {
          CurrentView.insertDescription(_this2.document.activeElement, message, options);
          CurrentView.enableButtonSaveComment();
        }, isTextField ? 0 : 500);
      } else {
        CurrentView.insertDescriptionJiraCloud(this.document.activeElement, message, options);
      }

      sendResponse({
        message: 'done'
      });
    } else if (message.contextMenu && message.contextMenu === 'donate_link') {
      chrome.runtime.sendMessage('getSupportersPage', function getSupportersPage() {});
    }
  });
}); // execute scripts only if domains whitelisted

chrome.runtime.sendMessage('getDomains', function getDomains(customDomains) {
  var domains = customDomains.replaceAll(',', '|');
  var pattern = new RegExp(domains);

  if (!pattern.test(window.location.href)) {
    console.log('Current location does not contain a valid domain!');
    console.log("Given domains: ".concat(domains));
  } else {
    chrome.runtime.sendMessage('getOptions', function getOptions(data1) {
      chrome.runtime.sendMessage('getTemplates', function getTemplates(data2) {
        // set dom observer
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(observeDocumentBody);
        });
        observer.observe(document.body, {
          subtree: true,
          attributes: true,
          attributeFilter: ['resolved', 'contenteditable']
        });
        var options = data1;
        var templates = data2;
        /**
         * helper functions
         */

        function applyTemplate() {
          var currentEditForm = this.closest('.field-group');
          CurrentView.setTextMode(currentEditForm);
          var textfield = currentEditForm.querySelector(TEXTFIELD_IDS);
          var template;
          var templateType;
          var uiType;

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
          } // insert template if textarea is empty


          var textBefore = textfield.value;

          if (textBefore.length === 0 || !options.keeptext.enabled) {
            textfield.value = template;
          } else {
            // exchange template if textarea contains only plain template
            if (CurrentView.isPlainTemplate(textBefore, templates)) {
              textfield.value = template; // append template if textarea already contains text not plain template
            } else {
              textfield.value = "".concat(template).concat(NEW_LINE).concat(NEW_LINE).concat(options.keeptext.separator).concat(NEW_LINE).concat(NEW_LINE).concat(textBefore);
            }
          }

          CurrentView.enableButtonSaveComment();
        }

        function createDropdown(templates, showInProject) {
          // create select
          var selectList = document.createElement('select');
          selectList.id = 'issueDropdownMenu';
          selectList.className = 'aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-operation-dropdown wiki-edit-style-picker-trigger';
          selectList.title = TITLE_DROPDOWN_ICON;
          chrome.runtime.sendMessage('getIcon', function (response) {
            selectList.style = "background-image: url(".concat(response, "); background-repeat: no-repeat;background-position: center;background-color: inherit;width: 16px;appearance: none;cursor: pointer;");
          });
          selectList.onchange = applyTemplate; // create options

          for (var key in templates) {
            if (templates[key].projects.toLowerCase().includes(DEFAULT_TEMPLATE_ID) || templates[key].projects.includes(showInProject)) {
              var option = document.createElement('option');
              option.value = templates[key].ticketDesc;
              option.templateType = templates[key].issueType;
              option.text = templates[key].templateName;
              selectList.appendChild(option);
            }
          } // create default option


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
          var container = document.createElement('div');
          container.id = 'buttonContainer';
          container.className = 'aui-buttons';
          container.style = 'padding-left: 0px;margin-left: 0px;border-left: 0;white-space: break-spaces;display: inline-block;'; // create buttons

          for (var key in templates) {
            if (templates[key].projects.toLowerCase().includes(DEFAULT_TEMPLATE_ID) || templates[key].projects.includes(showInProject)) {
              var button = document.createElement('a');
              button.className = 'aui-button aui-button-subtle';
              button.innerText = templates[key].templateName;
              button.setAttribute('templateType', templates[key].issueType);
              button.setAttribute('insertdata', templates[key].ticketDesc);
              button.onclick = applyTemplate;
              container.appendChild(button);
            }
          }

          return container;
        } // search for projectspecific template


        function getTemplate(templates, projects, issueType) {
          var specifcTemplate;
          var defaultTemplate;
          projects = projects.toUpperCase();
          issueType = issueType.toLowerCase();

          for (var key in templates) {
            if (Object.hasOwnProperty.call(templates, key)) {
              if (templates[key].issueType.toLowerCase() == issueType && templates[key].projects.includes(projects)) {
                // specific if issueType e.g. "Bug" and project e.g. "ABC"
                specifcTemplate = templates[key];
              } else if (templates[key].issueType.toLowerCase() == issueType && templates[key].projects.toLowerCase().includes(DEFAULT_TEMPLATE_ID)) {
                // default if  issueType e.g. "Bug" and project "default"
                defaultTemplate = templates[key];
              }
            }
          } // return specific, default or no template


          return typeof specifcTemplate !== 'undefined' ? specifcTemplate : typeof defaultTemplate !== 'undefined' ? defaultTemplate : '';
        }
        /**
         * executives
         */


        function observeDocumentBody(mutation) {
          console.info(mutation.target.getAttribute('aria-label'));
          console.info(mutation.target);
          var isDescriptionField = ['description'].includes(mutation.target.id) || mutation.target.getAttribute('aria-label') == 'Main content area' && mutation.target.getAttribute('contenteditable');
          var prj = '';
          var selectedIssueType = '';
          var chosenTemplate = ''; // get selected parameters
          // no project-field available, probably just clicked edit at current issue

          if (isDescriptionField) {
            setTimeout(function () {
              if (!isJiraCloud) {
                prj = document.getElementById('project-field') ? document.getElementById('project-field').value : '';
                selectedIssueType = document.getElementById('issuetype-field').value || document.querySelector('[data-issue-type]').getAttribute('data-issue-type');
              } else {
                prj = document.getElementById('issue-create.ui.modal.create-form.project-picker.project-select').textContent || '';
                selectedIssueType = document.getElementById('issue-create.ui.modal.create-form.type-picker.issue-type-select').textContent || '';
              }

              selectedProject = prj.substring(prj.lastIndexOf('(') + 1, prj.length - 1);
              chosenTemplate = getTemplate(templates, selectedProject, selectedIssueType);
              JiraInterface.setCustomToolBar(chosenTemplate, selectedProject, selectedIssueType);
            }, 200);
          } // observe for autofill


          if (options.autofill.enabled) {
            if (isDescriptionField) {
              setTimeout(function () {
                // autofill template only if textarea is empty or just another template
                var textBefore = '';

                if (!isJiraCloud && chosenTemplate !== '') {
                  textBefore = mutation.target.value;

                  if (textBefore.length === 0) {
                    mutation.target.value = chosenTemplate.ticketDesc; // exchange template if textarea contains only plain template
                  } else if (CurrentView.isPlainTemplate(textBefore, templates)) {
                    mutation.target.value = templateticketDesc; // no autofill if something else is given in description
                  } else {}
                } else if (chosenTemplate !== '') {
                  var justPlaceholder = mutation.target.querySelector('p > span[contenteditable="false"]');
                  textBefore = JiraInterface.getValueOfTemplateDescriptionField(); // check if override or preserve
                  // length == 1 if '\n' in cloud version basically empty

                  if (justPlaceholder || !options.keeptext.enabled) {
                    JiraInterface.setValueOfTemplateDescriptionField(chosenTemplate.ticketDesc);
                  } else if (CurrentView.isPlainTemplate(textBefore, templates)) {
                    JiraInterface.setValueOfTemplateDescriptionField(chosenTemplate.ticketDesc);
                  } else {
                    // preserve text in description
                    var newText = "".concat(chosenTemplate.ticketDesc).concat(NEW_LINE).concat(NEW_LINE).concat(options.keeptext.separator).concat(NEW_LINE).concat(NEW_LINE).concat(textBefore);
                    JiraInterface.setValueOfTemplateDescriptionField(newText);
                  }
                } else {
                  // template was set, change ticket type -> jira reminds the template
                  // remove template if theres is no template for ticket type
                  if (CurrentView.isPlainTemplate(JiraInterface.getValueOfTemplateDescriptionField(), templates)) JiraInterface.setValueOfTemplateDescriptionField('');
                } // mutation.target.focus();


                mutation.target.scrollIntoView(false);
              }, 300);
            }
          } // observe for dropdown


          if (options.quickaccess.enabled) {
            if (['wiki-editor-initialised', 'textfield', 'wiki-edit-operation'].includes(mutation.target.className) || ['comment'].includes(mutation.target.id) || isDescriptionField) {
              var toolbars = document.querySelectorAll('.wiki-edit-toolbar:not(#issueDropdownMenu)');

              if (toolbars) {
                var currentProject;

                try {
                  currentProject = document.querySelector("textarea#".concat(mutation.target.id)) || document.querySelector('textarea');
                  currentProject = currentProject.getAttribute('data-projectkey');
                } catch (error) {
                  console.warn("Could not find currentProject in this view: ".concat(window.location.href));
                } // render dropdown either target is description or comment


                chrome.runtime.sendMessage('getEntriesForDropdown', function (entries) {
                  if (entries.length > 0) {
                    customToolBar.appendChild(createDropdown(entries, currentProject));

                    for (var index = 0; index < toolbars.length; index++) {
                      if (toolbars[index].querySelector('#issueDropdownMenu') === null) {
                        // append as second last
                        toolbars[index].querySelector('.wiki-edit-toolbar .aui-buttons:nth-last-child(2)').appendChild(createDropdown(entries, currentProject));
                      }
                    }
                  }
                });

                if (isDescriptionField) {
                  // buttons for description wysiwyg editor
                  chrome.runtime.sendMessage('getButtonsForDescription', function getBtnDesc(buttons) {
                    if (buttons.length > 0) {
                      for (var index = 0; index < toolbars.length; index += 1) {
                        if (toolbars[index].querySelector('#buttonContainer') === null) {
                          // append in the end
                          toolbars[index].querySelector('.wiki-edit-toolbar-last').parentNode.appendChild(createButtons(buttons, currentProject));
                        }
                      }
                    }
                  });
                } else {
                  // buttons for comment wysiwyg editor
                  chrome.runtime.sendMessage('getButtonsForComment', function getBtnComment(buttons) {
                    if (buttons.length > 0) {
                      for (var index = 0; index < toolbars.length; index += 1) {
                        if (toolbars[index].querySelector('#buttonContainer') === null) {
                          // append in the end
                          toolbars[index].querySelector('.wiki-edit-toolbar-last').parentNode.appendChild(createButtons(buttons, currentProject));
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NjcmlwdHMvY29udGVudFNjcmlwdC5qcyJdLCJuYW1lcyI6WyJFUlJPUl9OT19FRElUX0ZJRUxEX1ZJU0lCTEUiLCJUSVRMRV9EUk9QRE9XTl9JQ09OIiwiY2hyb21lIiwiaTE4biIsImdldE1lc3NhZ2UiLCJpc0ppcmFDbG91ZCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluY2x1ZGVzIiwiaW5zZXJ0VGVtcGxhdGUiLCJORVdfTElORSIsIkRFRkFVTFRfVEVNUExBVEVfSUQiLCJURVhURklFTERfSURTIiwiVXRpbHMiLCJjaGVja0Vudmlyb25tZW50IiwiY29uc29sZSIsImxvZyIsImRlYnVnIiwiZXJyb3IiLCJpbmZvIiwid2FybiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lclRleHQiLCJKaXJhSW50ZXJmYWNlIiwiZ2V0VmFsdWVPZlRlbXBsYXRlRGVzY3JpcHRpb25GaWVsZCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjaGlsZHJlbiIsImlubmVySFRNTCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJzZXRWYWx1ZU9mVGVtcGxhdGVEZXNjcmlwdGlvbkZpZWxkIiwic2V0Q3VzdG9tVG9vbEJhciIsImNob3NlblRlbXBsYXRlIiwic2VsZWN0ZWRQcm9qZWN0Iiwic2VsZWN0ZWRJc3N1ZVR5cGUiLCJxdWVyeVNlbGVjdG9yIiwiaGVhZGxpbmUiLCJpc3N1ZVR5cGUiLCJwcm9qZWN0cyIsInRlbXBsYXRlTmFtZSIsInV1aWQiLCJTdHJpbmciLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJNYXRoIiwicmFuZG9tIiwicmVwbGFjZSIsIiRjdXN0b21Ub29sQmFyIiwiJGNvbnRhaW5lckZvckN1c3RvbVRvb2xCYXIiLCJzaG93Tm90aWZpY2F0aW9uIiwiaWQiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicnVudGltZSIsInNlbmRNZXNzYWdlIiwicmVzcG9uc2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiQ3VycmVudFZpZXciLCJzZXRUZXh0TW9kZSIsImN1cnJlbnRUYXJnZXQiLCJuYW1lIiwiZGF0YSIsIm5ld1RlbXBsYXRlIiwiaW5zZXJ0RGVzY3JpcHRpb24iLCJzZWxlY3RvciIsInRlbXBsYXRlIiwib3B0aW9ucyIsInRleHRCZWZvcmUiLCJsZW5ndGgiLCJrZWVwdGV4dCIsImVuYWJsZWQiLCJjb250ZXh0TWVudSIsInNlcGFyYXRvciIsImluc2VydERlc2NyaXB0aW9uSmlyYUNsb3VkIiwidGV4dCIsImZvY3VzIiwiZXhlY0NvbW1hbmQiLCJuZXdUZXh0IiwiaXNQbGFpblRlbXBsYXRlIiwidGVtcGxhdGVzIiwicmVzdWx0Iiwia2V5IiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwia25vd25UZW1wbGF0ZSIsInRpY2tldERlc2MiLCJlbmFibGVCdXR0b25TYXZlQ29tbWVudCIsInNhdmVCdG4iLCJyZW1vdmVBdHRyaWJ1dGUiLCJhY3RpdmVFbGVtZW50IiwiY2xvc2VzdCIsImNsaWNrIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJvbk1zZyIsIm1lc3NhZ2UiLCJfc2VuZGVyIiwic2VuZFJlc3BvbnNlIiwiZ2V0TXNnIiwiaXNUZXh0RmllbGQiLCJ0eXBlIiwiZ2V0U3VwcG9ydGVyc1BhZ2UiLCJnZXREb21haW5zIiwiY3VzdG9tRG9tYWlucyIsImRvbWFpbnMiLCJyZXBsYWNlQWxsIiwicGF0dGVybiIsIlJlZ0V4cCIsInRlc3QiLCJnZXRPcHRpb25zIiwiZGF0YTEiLCJnZXRUZW1wbGF0ZXMiLCJkYXRhMiIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsImZvckVhY2giLCJvYnNlcnZlRG9jdW1lbnRCb2R5Iiwib2JzZXJ2ZSIsImJvZHkiLCJzdWJ0cmVlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUZpbHRlciIsImFwcGx5VGVtcGxhdGUiLCJjdXJyZW50RWRpdEZvcm0iLCJ0ZXh0ZmllbGQiLCJ0ZW1wbGF0ZVR5cGUiLCJ1aVR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJ0b0xvd2VyQ2FzZSIsInNlbGVjdGVkSW5kZXgiLCJjcmVhdGVEcm9wZG93biIsInNob3dJblByb2plY3QiLCJzZWxlY3RMaXN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInRpdGxlIiwib25jaGFuZ2UiLCJvcHRpb24iLCJhcHBlbmRDaGlsZCIsInNlbGVjdGVkIiwiZGlzYWJsZWQiLCJoaWRkZW4iLCJjcmVhdGVCdXR0b25zIiwiY29udGFpbmVyIiwiYnV0dG9uIiwic2V0QXR0cmlidXRlIiwib25jbGljayIsImdldFRlbXBsYXRlIiwic3BlY2lmY1RlbXBsYXRlIiwiZGVmYXVsdFRlbXBsYXRlIiwidG9VcHBlckNhc2UiLCJtdXRhdGlvbiIsInRhcmdldCIsImlzRGVzY3JpcHRpb25GaWVsZCIsInByaiIsInRleHRDb250ZW50Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJhdXRvZmlsbCIsInRlbXBsYXRldGlja2V0RGVzYyIsImp1c3RQbGFjZWhvbGRlciIsInNjcm9sbEludG9WaWV3IiwicXVpY2thY2Nlc3MiLCJ0b29sYmFycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjdXJyZW50UHJvamVjdCIsImVudHJpZXMiLCJjdXN0b21Ub29sQmFyIiwiaW5kZXgiLCJnZXRCdG5EZXNjIiwiYnV0dG9ucyIsInBhcmVudE5vZGUiLCJnZXRCdG5Db21tZW50Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdD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SyxLQUFELENBQVIsQ0FDRTdJLGFBREYsQ0FDZ0IseUJBRGhCLEVBRUVnSixVQUZGLENBRWFqQyxXQUZiLENBRXlCSSxhQUFhLENBQUM0QixPQUFELEVBQVVMLGNBQVYsQ0FGdEM7QUFHQTtBQUNEO0FBQ0Q7QUFDRCxtQkFYRDtBQVlBLGlCQWRELE1BY087QUFDTjtBQUNBN0ssd0JBQU0sQ0FBQ3dELE9BQVAsQ0FBZUMsV0FBZixDQUEyQixzQkFBM0IsRUFBbUQsU0FBUzJILGFBQVQsQ0FBdUJGLE9BQXZCLEVBQWdDO0FBQ2xGLHdCQUFJQSxPQUFPLENBQUN4RyxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3ZCLDJCQUFLLElBQUlzRyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR0wsUUFBUSxDQUFDakcsTUFBckMsRUFBNkNzRyxLQUFLLElBQUksQ0FBdEQsRUFBeUQ7QUFDeEQsNEJBQUlMLFFBQVEsQ0FBQ0ssS0FBRCxDQUFSLENBQWdCN0ksYUFBaEIsQ0FBOEIsa0JBQTlCLE1BQXNELElBQTFELEVBQWdFO0FBQy9EO0FBQ0F3SSxrQ0FBUSxDQUFDSyxLQUFELENBQVIsQ0FDRTdJLGFBREYsQ0FDZ0IseUJBRGhCLEVBRUVnSixVQUZGLENBRWFqQyxXQUZiLENBRXlCSSxhQUFhLENBQUM0QixPQUFELEVBQVVMLGNBQVYsQ0FGdEM7QUFHQTtBQUNEO0FBQ0Q7QUFDRCxtQkFYRDtBQVlBO0FBQ0Q7QUFDRDtBQUNEO0FBQ0Q7QUFDRCxPQTdSRDtBQThSQSxLQS9SRDtBQWdTQTtBQUNELENBeFNELEUiLCJmaWxlIjoianMvY29udGVudFNjcmlwdC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NvdXJjZS9zY3JpcHRzL2NvbnRlbnRTY3JpcHQuanNcIik7XG4iLCJjb25zdCBFUlJPUl9OT19FRElUX0ZJRUxEX1ZJU0lCTEUgPSAnVGhlcmUgaXMgbm8gdGV4dGZpZWxkIHdpdGggY3VzdG9tIHNlbGVjdG9yIHZpc2libGUuJztcclxuY29uc3QgVElUTEVfRFJPUERPV05fSUNPTiA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoJ2h0bWxfdGl0bGVfb2ZfY3JlYXRlZF9kcm9wZG93bicpO1xyXG5sZXQgaXNKaXJhQ2xvdWQgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcygnYXRsYXNzaWFuLm5ldCcpO1xyXG5sZXQgaW5zZXJ0VGVtcGxhdGUgPSB0cnVlO1xyXG5cclxuLy8gdHlwZSB2YXIgYmVjYXVzZSBjb250ZW50LmpzIG1heSBiZSBpbmplY3RlZCBtdWx0aXBsZSB0aW1lcyxcclxuLy8gd2hpY2ggd291bGQgY2F1c2luZyBlcnJvcnMgaWYgdHlwZSBjb25zdFxyXG5jb25zdCBORVdfTElORSA9ICdcXG4nO1xyXG5jb25zdCBERUZBVUxUX1RFTVBMQVRFX0lEID0gJ2RlZmF1bHQnO1xyXG5jb25zdCBURVhURklFTERfSURTID0gJyNkZXNjcmlwdGlvbiwgI2NvbW1lbnQnO1xyXG5cclxuY29uc3QgVXRpbHMgPSB7XHJcblx0Y2hlY2tFbnZpcm9ubWVudCgpIHtcclxuXHRcdC8vIGRlYWN0aXZlIGNvbnNvbGUubG9ncyBpbiBwcm9kdWN0aW9uXHJcblx0XHRpZiAoY2hyb21lLmkxOG4uZ2V0TWVzc2FnZSgnREVWX01PREUnKSA9PSAnZmFsc2UnKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nID0gKCkgPT4ge307XHJcblx0XHRcdGNvbnNvbGUuZGVidWcgPSAoKSA9PiB7fTtcclxuXHRcdFx0Y29uc29sZS5lcnJvciA9ICgpID0+IHt9O1xyXG5cdFx0XHRjb25zb2xlLmluZm8gPSAoKSA9PiB7fTtcclxuXHRcdFx0Y29uc29sZS53YXJuID0gKCkgPT4ge307XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVElUTEUnKVswXS5pbm5lclRleHQgPSAnREVWIE1vZGUnO1xyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcblxyXG5jb25zdCBKaXJhSW50ZXJmYWNlID0ge1xyXG5cdC8qKlxyXG5cdCAqIEByZXR1cm5zIHZhbHVlIG9mIGRlc2NyaXB0aW9uIHRleHRhcmVhIGVpdGhlciBjbG91ZCBvciBzZXJ2ZXJcclxuXHQgKi9cclxuXHRnZXRWYWx1ZU9mVGVtcGxhdGVEZXNjcmlwdGlvbkZpZWxkKCkge1xyXG5cdFx0cmV0dXJuIGlzSmlyYUNsb3VkXHJcblx0XHRcdD8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWstZWRpdG9yLWNvbnRlbnQtYXJlYScpWzBdLmNoaWxkcmVuWzFdLmlubmVySFRNTFxyXG5cdFx0XHQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG5cdH0sXHJcblx0c2V0VmFsdWVPZlRlbXBsYXRlRGVzY3JpcHRpb25GaWVsZCh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIGlzSmlyYUNsb3VkXHJcblx0XHRcdD8gKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FrLWVkaXRvci1jb250ZW50LWFyZWEnKVswXS5jaGlsZHJlblsxXS5pbm5lckhUTUwgPSB2YWx1ZSlcclxuXHRcdFx0OiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSB2YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0c2V0Q3VzdG9tVG9vbEJhcihjaG9zZW5UZW1wbGF0ZSwgc2VsZWN0ZWRQcm9qZWN0LCBzZWxlY3RlZElzc3VlVHlwZSkge1xyXG5cdFx0Ly8gZG8gbm90IGNyZWF0ZSB0b29sIGJhciBtb3JlIHRoYW4gb25jZVxyXG5cdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b21Ub29sQmFyJykpIHJldHVybjtcclxuXHJcblx0XHRsZXQgaGVhZGxpbmUgPSAnJztcclxuXHRcdGlmIChjaG9zZW5UZW1wbGF0ZSAhPSAnJykge1xyXG5cdFx0XHRoZWFkbGluZSA9ICdVcGRhdGUgVGVtcGxhdGUgfCBUaWNrZXQgVGVtcGxhdGVzIGZvciBKSVJBJztcclxuXHRcdFx0c2VsZWN0ZWRJc3N1ZVR5cGUgPSBjaG9zZW5UZW1wbGF0ZS5pc3N1ZVR5cGU7XHJcblx0XHRcdHNlbGVjdGVkUHJvamVjdCA9IGNob3NlblRlbXBsYXRlLnByb2plY3RzO1xyXG5cdFx0XHR0ZW1wbGF0ZU5hbWUgPSBjaG9zZW5UZW1wbGF0ZS50ZW1wbGF0ZU5hbWU7XHJcblx0XHRcdHV1aWQgPSBjaG9zZW5UZW1wbGF0ZS51dWlkO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZGxpbmUgPSAnQ3JlYXRlIFRlbXBsYXRlIHwgVGlja2V0IFRlbXBsYXRlcyBmb3IgSklSQSc7XHJcblx0XHRcdHRlbXBsYXRlTmFtZSA9IGAke3NlbGVjdGVkSXNzdWVUeXBlfSAoJHtzZWxlY3RlZFByb2plY3R9KWA7XHJcblx0XHRcdHV1aWQgPSBTdHJpbmcoRGF0ZS5ub3coKS50b1N0cmluZygzMikgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KSkucmVwbGFjZSgvXFwuL2csICcnKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCAkY3VzdG9tVG9vbEJhciA9IGA8ZGl2IGlkPVwiY3VzdG9tVG9vbEJhclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDtwb3NpdGlvbjpyZWxhdGl2ZTsgZ2FwOiAxcmVtO2hlaWdodDogMnJlbTtwYWRkaW5nOiAxcmVtO2JvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtib3JkZXItcmFkaXVzOiA1cHg7bWFyZ2luLXRvcDogMXJlbTtcIj5cclxuXHRcdFx0PHNwYW4gc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7dG9wOiAtMC43cmVtO2JhY2tncm91bmQtY29sb3I6IHdoaXRlO3BhZGRpbmc6IDAgMC40cmVtO1wiPlxyXG5cdFx0XHRcdDxpbWcgc3JjPVwiXCIgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1wiLz5cclxuXHRcdFx0XHQke2hlYWRsaW5lfVxyXG5cdFx0XHQ8L3NwYW4+XHJcblxyXG5cdFx0XHQ8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDtmbGV4LWRpcmVjdGlvbjogY29sdW1uO3dpZHRoOiBtaW4tY29udGVudDtcIj5cclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNlbGVjdGVkSXNzdWVUeXBlXCIgdmFsdWU9XCIke3NlbGVjdGVkSXNzdWVUeXBlfVwiPlxyXG5cdFx0XHRcdDxsYWJlbCBmb3I9XCJzZWxlY3RlZElzc3VlVHlwZVwiPjxzbWFsbD5Jc3N1ZSBUeXBlPC9zbWFsbD48L2xhYmVsPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O2ZsZXgtZGlyZWN0aW9uOiBjb2x1bW47d2lkdGg6IG1pbi1jb250ZW50O1wiPlxyXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2VsZWN0ZWRQcm9qZWN0c1wiIHZhbHVlPVwiJHtzZWxlY3RlZFByb2plY3R9XCIvPlxyXG5cdFx0XHRcdDxsYWJlbCBmb3I9XCJzZWxlY3RlZFByb2plY3RzXCI+PHNtYWxsPlByb2plY3RzPC9zbWFsbD48L2xhYmVsPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O2ZsZXgtZGlyZWN0aW9uOiBjb2x1bW47d2lkdGg6IG1pbi1jb250ZW50O1wiPlxyXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGVtcGxhdGVOYW1lXCIgdmFsdWU9XCIke3RlbXBsYXRlTmFtZX1cIi8+XHJcblx0XHRcdFx0PGxhYmVsIGZvcj1cInRlbXBsYXRlTmFtZVwiPjxzbWFsbD5UZW1wbGF0ZSBOYW1lPC9zbWFsbD48L2xhYmVsPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PHNwYW4gaWQ9XCJzYXZlVGVtcGxhdGVcIiB0aXRsZT1cInNhdmVcIiBzdHlsZT1cImhlaWdodDogMzZweDsgY3Vyc29yOiBwb2ludGVyO2Rpc3BsYXk6IGZsZXg7YWxpZ24taXRlbXM6IGNlbnRlcjtcIj5cclxuXHRcdFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRweFwiIGZpbGw9XCIjMDAwMDAwXCI+PHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTE3IDNINWMtMS4xMSAwLTIgLjktMiAydjE0YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjdsLTQtNHptLTUgMTZjLTEuNjYgMC0zLTEuMzQtMy0zczEuMzQtMyAzLTMgMyAxLjM0IDMgMy0xLjM0IDMtMyAzem0zLTEwSDVWNWgxMHY0elwiLz48L3N2Zz5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8c3BhbiBpZD1cInNhdmluZ19zdWNjZXNzXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lOyBhbGlnbi1pdGVtczogY2VudGVyO3Bvc2l0aW9uOiBhYnNvbHV0ZTtib3R0b206IC0wLjdyZW07YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7cGFkZGluZzogMCAwLjRyZW07cmlnaHQ6IDAuN3JlbTtcIj5cclxuXHRcdFx0XHRUZW1wbGF0ZSBzYXZlZCwgcmVsb2FkIHJlcXVpcmVkISA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRweFwiIGZpbGw9XCIjMEJEQTUxXCI+PHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0yIDE1bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDcuNTktNy41OUwxOSA4bC05IDl6XCIvPjwvc3ZnPlxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHRcdDxzcGFuIGlkPVwic2F2aW5nX2ZhaWx1cmVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7IGFsaWduLWl0ZW1zOiBjZW50ZXI7cG9zaXRpb246IGFic29sdXRlO2JvdHRvbTogLTAuN3JlbTtiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtwYWRkaW5nOiAwIDAuNHJlbTtyaWdodDogMC43cmVtO1wiPlxyXG5cdFx0XHRcdEVycm9yIG9jY3VyZWQhIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNHB4XCIgZmlsbD1cIiNGRjU3MzNcIj48cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxwYXRoIGQ9XCJNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptNSAxMy41OUwxNS41OSAxNyAxMiAxMy40MSA4LjQxIDE3IDcgMTUuNTkgMTAuNTkgMTIgNyA4LjQxIDguNDEgNyAxMiAxMC41OSAxNS41OSA3IDE3IDguNDEgMTMuNDEgMTIgMTcgMTUuNTl6XCIvPjwvc3ZnPlxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQ8L2Rpdj5gO1xyXG5cclxuXHRcdGNvbnN0ICRjb250YWluZXJGb3JDdXN0b21Ub29sQmFyID0gaXNKaXJhQ2xvdWRcclxuXHRcdFx0PyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuYWtFZGl0b3InKVxyXG5cdFx0XHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNxZi1maWVsZC1kZXNjcmlwdGlvbiAuc2F2ZS1vcHRpb25zJyk7XHJcblxyXG5cdFx0Y29uc3Qgc2hvd05vdGlmaWNhdGlvbiA9IChpZCkgPT4ge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdH0sIDUwMDApO1xyXG5cdFx0fTtcclxuXHRcdC8vIGluc2VydCBzYXZlIC8gdXBkYXRlIGZvcm11bGFyXHJcblx0XHQkY29udGFpbmVyRm9yQ3VzdG9tVG9vbEJhci5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgJGN1c3RvbVRvb2xCYXIpO1xyXG5cclxuXHRcdC8vIHNldCBpbWFnZSBzcmNcclxuXHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdnZXRJY29uJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b21Ub29sQmFyIGltZycpLnNyYyA9IHJlc3BvbnNlO1xyXG5cdFx0XHQvL3NlbGVjdExpc3Quc3R5bGUgPSBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7cmVzcG9uc2V9KTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDt3aWR0aDogMTZweDthcHBlYXJhbmNlOiBub25lO2N1cnNvcjogcG9pbnRlcjtgO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gdHJpZ2dlciB0ZW1wbGF0ZSB1cGRhdGUgbG9naWNcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b21Ub29sQmFyICNzYXZlVGVtcGxhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdEN1cnJlbnRWaWV3LnNldFRleHRNb2RlKGUuY3VycmVudFRhcmdldCk7XHJcblxyXG5cdFx0XHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuXHRcdFx0XHRcdG5hbWU6ICdzZXROZXdUZW1wbGF0ZScsXHJcblx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdG5ld1RlbXBsYXRlOiB0aGlzLmdldFZhbHVlT2ZUZW1wbGF0ZURlc2NyaXB0aW9uRmllbGQoKSxcclxuXHRcdFx0XHRcdFx0aXNzdWVUeXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZWRJc3N1ZVR5cGUnKS52YWx1ZSB8fCAnJyxcclxuXHRcdFx0XHRcdFx0cHJvamVjdHM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZFByb2plY3RzJykudmFsdWUgfHwgJ2RlZmF1bHQnLFxyXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZU5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wbGF0ZU5hbWUnKS52YWx1ZSB8fCAnJyxcclxuXHRcdFx0XHRcdFx0dXVpZDogdXVpZCxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc2F2aW5nX3N1Y2Nlc3MnKTtcclxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzYXZpbmdfZmFpbHVyZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuY29uc3QgQ3VycmVudFZpZXcgPSB7XHJcblx0aW5zZXJ0RGVzY3JpcHRpb24oc2VsZWN0b3IsIHRlbXBsYXRlLCBvcHRpb25zKSB7XHJcblx0XHRpZiAoaW5zZXJ0VGVtcGxhdGUpIHtcclxuXHRcdFx0aWYgKGlzSmlyYUNsb3VkKSByZXR1cm47XHJcblxyXG5cdFx0XHRjb25zdCB0ZXh0QmVmb3JlID0gc2VsZWN0b3IudmFsdWU7XHJcblx0XHRcdGlmICh0ZXh0QmVmb3JlLmxlbmd0aCA9PT0gMCB8fCAhb3B0aW9ucy5rZWVwdGV4dC5lbmFibGVkKSB7XHJcblx0XHRcdFx0c2VsZWN0b3IudmFsdWUgPSB0ZW1wbGF0ZS5jb250ZXh0TWVudTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBwcmVzZXJ2ZSB0ZXh0IGluIGRlc2NyaXB0aW9uXHJcblx0XHRcdFx0c2VsZWN0b3IudmFsdWUgPSBgJHt0ZW1wbGF0ZS5jb250ZXh0TWVudX0ke05FV19MSU5FfSR7TkVXX0xJTkV9JHtvcHRpb25zLmtlZXB0ZXh0LnNlcGFyYXRvcn0ke05FV19MSU5FfSR7TkVXX0xJTkV9JHt0ZXh0QmVmb3JlfWA7XHJcblx0XHRcdH1cclxuXHRcdFx0aW5zZXJ0VGVtcGxhdGUgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGluc2VydERlc2NyaXB0aW9uSmlyYUNsb3VkKHNlbGVjdG9yLCB0ZW1wbGF0ZSwgb3B0aW9ucykge1xyXG5cdFx0bGV0IHRleHRCZWZvcmUgPSBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCdwJyk7XHJcblx0XHR0ZXh0QmVmb3JlID0gdGV4dEJlZm9yZSA/IHRleHRCZWZvcmUuaW5uZXJUZXh0IDogZmFsc2U7XHJcblxyXG5cdFx0Ly8gY2hlY2sgaWYgb3ZlcnJpZGUgb3IgcHJlc2VydmVcclxuXHRcdGlmIChzZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCdzcGFuLnBsYWNlaG9sZGVyLWRlY29yYXRpb24nKSB8fCAhdGV4dEJlZm9yZSB8fCAhb3B0aW9ucy5rZWVwdGV4dC5lbmFibGVkKSB7XHJcblx0XHRcdGxldCB0ZXh0ID0gYCR7dGVtcGxhdGUuY29udGV4dE1lbnV9JHtORVdfTElORX1gO1xyXG5cclxuXHRcdFx0c2VsZWN0b3IuZm9jdXMoKTtcclxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2RlbGV0ZScsIGZhbHNlKTtcclxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgdGV4dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBwcmVzZXJ2ZSB0ZXh0IGluIGRlc2NyaXB0aW9uXHJcblx0XHRcdGxldCBuZXdUZXh0ID0gYCR7dGVtcGxhdGUuY29udGV4dE1lbnV9JHtORVdfTElORX0ke05FV19MSU5FfSR7b3B0aW9ucy5rZWVwdGV4dC5zZXBhcmF0b3J9JHtORVdfTElORX0ke05FV19MSU5FfSR7dGV4dEJlZm9yZX1gO1xyXG5cclxuXHRcdFx0c2VsZWN0b3IuZm9jdXMoKTtcclxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2RlbGV0ZScsIGZhbHNlKTtcclxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgbmV3VGV4dCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRpc1BsYWluVGVtcGxhdGUodGV4dCwgdGVtcGxhdGVzKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gZmFsc2U7XHJcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIHRlbXBsYXRlcykge1xyXG5cdFx0XHRpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGVtcGxhdGVzLCBrZXkpKSB7XHJcblx0XHRcdFx0Ly8gaWYgdGV4dCBpcyB3cml0dGVuIGZvciBzZXJ2ZXIgdmVyc2lvbiBhbmQgaW5qZWN0ZWQgaW4gY2xvdWQgaXQgYmVjYW1lIHdyYXBwZWQgaW4gPHA+XHJcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW15hLXpBLVpdL2csICcnKTtcclxuXHRcdFx0XHRsZXQga25vd25UZW1wbGF0ZSA9IHRlbXBsYXRlc1trZXldLnRpY2tldERlc2MucmVwbGFjZSgvW15hLXpBLVpdL2csICcnKTtcclxuXHRcdFx0XHRpZiAodGV4dCA9PT0ga25vd25UZW1wbGF0ZSB8fCBgcCR7a25vd25UZW1wbGF0ZX1wYCA9PT0gdGV4dCkge1xyXG5cdFx0XHRcdFx0cmVzdWx0ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fSxcclxuXHRlbmFibGVCdXR0b25TYXZlQ29tbWVudCgpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBzYXZlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lzc3VlLWNvbW1lbnQtYWRkLXN1Ym1pdCcpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWVkaXQtc3VibWl0Jyk7XHJcblx0XHRcdHNhdmVCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHR9XHJcblx0fSxcclxuXHQvLyBtYWtlIHN1cmUgdGV4dCBtb2RlIGlzIGFjdGl2ZVxyXG5cdHNldFRleHRNb2RlKGFjdGl2ZUVsZW1lbnQpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIGZpbmQgY29ycmVjdCBsaW5rIGluIGNhc2Ugb2YgbW9yZSB0aGFuIG9uZSBkYXRhLW1vZGUgbGlua3NcclxuXHRcdFx0YWN0aXZlRWxlbWVudC5jbG9zZXN0KCcuZmllbGQtZ3JvdXAnKS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tb2RlPXNvdXJjZV0gYSwgW2RhdGEtbW9kZT1zb3VyY2VdIGJ1dHRvbicpLmNsaWNrKCk7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHQvLyBpbiBjbG91ZCB2ZXJzaW9uIGlzIG5vIGVkaXQgYnV0dG9uXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1vZGU9c291cmNlXSBhLCBbZGF0YS1tb2RlPXNvdXJjZV0gYnV0dG9uJykuY2xpY2soKTtcclxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcblxyXG4vLyBkZWFjdGl2ZSBkZXYgb3V0cHV0cyBpZiBwcm9kdWN0aXZlXHJcblV0aWxzLmNoZWNrRW52aXJvbm1lbnQoKTtcclxuXHJcbi8vIGluc2VydCB0ZW1wbGF0ZSBhZnRlciBjbGljayBpbiBjb250ZXh0IG1lbnVcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIG9uTXNnKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG5cdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdnZXRPcHRpb25zJywgZnVuY3Rpb24gZ2V0TXNnKG9wdGlvbnMpIHtcclxuXHRcdC8vIGhhbmRsZSBjb250ZXh0IG1lbnUgY2xpY2tcclxuXHRcdGlmIChtZXNzYWdlLmNvbnRleHRNZW51ICYmIG1lc3NhZ2UuY29udGV4dE1lbnUgIT09ICdkb25hdGVfbGluaycpIHtcclxuXHRcdFx0aWYgKCFpc0ppcmFDbG91ZCkge1xyXG5cdFx0XHRcdGNvbnN0IGlzVGV4dEZpZWxkID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50LnR5cGUgPT09ICgndGV4dGFyZWEnIHx8ICdpbnB1dCcpO1xyXG5cdFx0XHRcdGlmICghaXNUZXh0RmllbGQpIHtcclxuXHRcdFx0XHRcdC8vIG1ha2Ugc3VyZSB0ZXh0IG1vZGUgaXMgYWN0aXZlXHJcblx0XHRcdFx0XHRDdXJyZW50Vmlldy5zZXRUZXh0TW9kZSh0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzZXRUaW1lb3V0KFxyXG5cdFx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRDdXJyZW50Vmlldy5pbnNlcnREZXNjcmlwdGlvbih0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQsIG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHRDdXJyZW50Vmlldy5lbmFibGVCdXR0b25TYXZlQ29tbWVudCgpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGlzVGV4dEZpZWxkID8gMCA6IDUwMFxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Q3VycmVudFZpZXcuaW5zZXJ0RGVzY3JpcHRpb25KaXJhQ2xvdWQodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50LCBtZXNzYWdlLCBvcHRpb25zKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VuZFJlc3BvbnNlKHsgbWVzc2FnZTogJ2RvbmUnIH0pO1xyXG5cdFx0fSBlbHNlIGlmIChtZXNzYWdlLmNvbnRleHRNZW51ICYmIG1lc3NhZ2UuY29udGV4dE1lbnUgPT09ICdkb25hdGVfbGluaycpIHtcclxuXHRcdFx0Y2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ2dldFN1cHBvcnRlcnNQYWdlJywgZnVuY3Rpb24gZ2V0U3VwcG9ydGVyc1BhZ2UoKSB7fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLy8gZXhlY3V0ZSBzY3JpcHRzIG9ubHkgaWYgZG9tYWlucyB3aGl0ZWxpc3RlZFxyXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgnZ2V0RG9tYWlucycsIGZ1bmN0aW9uIGdldERvbWFpbnMoY3VzdG9tRG9tYWlucykge1xyXG5cdGNvbnN0IGRvbWFpbnMgPSBjdXN0b21Eb21haW5zLnJlcGxhY2VBbGwoJywnLCAnfCcpO1xyXG5cdGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKGRvbWFpbnMpO1xyXG5cdGlmICghcGF0dGVybi50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSkge1xyXG5cdFx0Y29uc29sZS5sb2coJ0N1cnJlbnQgbG9jYXRpb24gZG9lcyBub3QgY29udGFpbiBhIHZhbGlkIGRvbWFpbiEnKTtcclxuXHRcdGNvbnNvbGUubG9nKGBHaXZlbiBkb21haW5zOiAke2RvbWFpbnN9YCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdnZXRPcHRpb25zJywgZnVuY3Rpb24gZ2V0T3B0aW9ucyhkYXRhMSkge1xyXG5cdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgnZ2V0VGVtcGxhdGVzJywgZnVuY3Rpb24gZ2V0VGVtcGxhdGVzKGRhdGEyKSB7XHJcblx0XHRcdFx0Ly8gc2V0IGRvbSBvYnNlcnZlclxyXG5cdFx0XHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG5cdFx0XHRcdFx0bXV0YXRpb25zLmZvckVhY2gob2JzZXJ2ZURvY3VtZW50Qm9keSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XHJcblx0XHRcdFx0XHRzdWJ0cmVlOiB0cnVlLFxyXG5cdFx0XHRcdFx0YXR0cmlidXRlczogdHJ1ZSxcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZUZpbHRlcjogWydyZXNvbHZlZCcsICdjb250ZW50ZWRpdGFibGUnXSxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGRhdGExO1xyXG5cdFx0XHRcdGNvbnN0IHRlbXBsYXRlcyA9IGRhdGEyO1xyXG5cclxuXHRcdFx0XHQvKipcclxuXHRcdFx0XHQgKiBoZWxwZXIgZnVuY3Rpb25zXHJcblx0XHRcdFx0ICovXHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uIGFwcGx5VGVtcGxhdGUoKSB7XHJcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50RWRpdEZvcm0gPSB0aGlzLmNsb3Nlc3QoJy5maWVsZC1ncm91cCcpO1xyXG5cdFx0XHRcdFx0Q3VycmVudFZpZXcuc2V0VGV4dE1vZGUoY3VycmVudEVkaXRGb3JtKTtcclxuXHJcblx0XHRcdFx0XHRjb25zdCB0ZXh0ZmllbGQgPSBjdXJyZW50RWRpdEZvcm0ucXVlcnlTZWxlY3RvcihURVhURklFTERfSURTKTtcclxuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZTtcclxuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZVR5cGU7XHJcblx0XHRcdFx0XHRsZXQgdWlUeXBlO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnaW5zZXJ0ZGF0YScpKSB7XHJcblx0XHRcdFx0XHRcdC8vIHVzZXIgY2xpY2tlZCBvbiBidXR0b25cclxuXHRcdFx0XHRcdFx0dWlUeXBlID0gJ2J1dHRvbic7XHJcblx0XHRcdFx0XHRcdHRlbXBsYXRlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2luc2VydGRhdGEnKTtcclxuXHRcdFx0XHRcdFx0dGVtcGxhdGVUeXBlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RlbXBsYXRlVHlwZScpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyB1c2VyIHNlbGVjdGVkIGl0ZW0gb24gZHJvcGRvd25cclxuXHRcdFx0XHRcdFx0dWlUeXBlID0gJ2Ryb3Bkb3duJztcclxuXHRcdFx0XHRcdFx0dGVtcGxhdGUgPSB0aGlzLm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHRcdFx0XHRcdFx0dGVtcGxhdGVUeXBlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udGVtcGxhdGVUeXBlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gaW5zZXJ0IHRlbXBsYXRlIGlmIHRleHRhcmVhIGlzIGVtcHR5XHJcblx0XHRcdFx0XHRjb25zdCB0ZXh0QmVmb3JlID0gdGV4dGZpZWxkLnZhbHVlO1xyXG5cdFx0XHRcdFx0aWYgKHRleHRCZWZvcmUubGVuZ3RoID09PSAwIHx8ICFvcHRpb25zLmtlZXB0ZXh0LmVuYWJsZWQpIHtcclxuXHRcdFx0XHRcdFx0dGV4dGZpZWxkLnZhbHVlID0gdGVtcGxhdGU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyBleGNoYW5nZSB0ZW1wbGF0ZSBpZiB0ZXh0YXJlYSBjb250YWlucyBvbmx5IHBsYWluIHRlbXBsYXRlXHJcblx0XHRcdFx0XHRcdGlmIChDdXJyZW50Vmlldy5pc1BsYWluVGVtcGxhdGUodGV4dEJlZm9yZSwgdGVtcGxhdGVzKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRleHRmaWVsZC52YWx1ZSA9IHRlbXBsYXRlO1xyXG5cdFx0XHRcdFx0XHRcdC8vIGFwcGVuZCB0ZW1wbGF0ZSBpZiB0ZXh0YXJlYSBhbHJlYWR5IGNvbnRhaW5zIHRleHQgbm90IHBsYWluIHRlbXBsYXRlXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGV4dGZpZWxkLnZhbHVlID0gYCR7dGVtcGxhdGV9JHtORVdfTElORX0ke05FV19MSU5FfSR7b3B0aW9ucy5rZWVwdGV4dC5zZXBhcmF0b3J9JHtORVdfTElORX0ke05FV19MSU5FfSR7dGV4dEJlZm9yZX1gO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Q3VycmVudFZpZXcuZW5hYmxlQnV0dG9uU2F2ZUNvbW1lbnQoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uIGNyZWF0ZURyb3Bkb3duKHRlbXBsYXRlcywgc2hvd0luUHJvamVjdCkge1xyXG5cdFx0XHRcdFx0Ly8gY3JlYXRlIHNlbGVjdFxyXG5cdFx0XHRcdFx0Y29uc3Qgc2VsZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG5cdFx0XHRcdFx0c2VsZWN0TGlzdC5pZCA9ICdpc3N1ZURyb3Bkb3duTWVudSc7XHJcblx0XHRcdFx0XHRzZWxlY3RMaXN0LmNsYXNzTmFtZSA9XHJcblx0XHRcdFx0XHRcdCdhdWktYnV0dG9uIGF1aS1idXR0b24tc3VidGxlIGF1aS1kcm9wZG93bjItdHJpZ2dlciB3aWtpLWVkaXQtb3BlcmF0aW9uLWRyb3Bkb3duIHdpa2ktZWRpdC1zdHlsZS1waWNrZXItdHJpZ2dlcic7XHJcblx0XHRcdFx0XHRzZWxlY3RMaXN0LnRpdGxlID0gVElUTEVfRFJPUERPV05fSUNPTjtcclxuXHRcdFx0XHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdnZXRJY29uJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdExpc3Quc3R5bGUgPSBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7cmVzcG9uc2V9KTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDt3aWR0aDogMTZweDthcHBlYXJhbmNlOiBub25lO2N1cnNvcjogcG9pbnRlcjtgO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzZWxlY3RMaXN0Lm9uY2hhbmdlID0gYXBwbHlUZW1wbGF0ZTtcclxuXHJcblx0XHRcdFx0XHQvLyBjcmVhdGUgb3B0aW9uc1xyXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGVtcGxhdGVzKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0ZW1wbGF0ZXNba2V5XS5wcm9qZWN0cy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKERFRkFVTFRfVEVNUExBVEVfSUQpIHx8IHRlbXBsYXRlc1trZXldLnByb2plY3RzLmluY2x1ZGVzKHNob3dJblByb2plY3QpKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRcdG9wdGlvbi52YWx1ZSA9IHRlbXBsYXRlc1trZXldLnRpY2tldERlc2M7XHJcblx0XHRcdFx0XHRcdFx0b3B0aW9uLnRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlc1trZXldLmlzc3VlVHlwZTtcclxuXHRcdFx0XHRcdFx0XHRvcHRpb24udGV4dCA9IHRlbXBsYXRlc1trZXldLnRlbXBsYXRlTmFtZTtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RMaXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBjcmVhdGUgZGVmYXVsdCBvcHRpb25cclxuXHRcdFx0XHRcdHZhciBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuXHRcdFx0XHRcdG9wdGlvbi5jbGFzc05hbWUgPSAnaXNzdWVEcm9wZG93bk1lbnVPcHRpb25zJztcclxuXHRcdFx0XHRcdG9wdGlvbi52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0b3B0aW9uLnRleHQgPSBUSVRMRV9EUk9QRE9XTl9JQ09OO1xyXG5cdFx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gJ3RydWUnO1xyXG5cdFx0XHRcdFx0b3B0aW9uLmRpc2FibGVkID0gJ3RydWUnO1xyXG5cdFx0XHRcdFx0b3B0aW9uLmhpZGRlbiA9ICd0cnVlJztcclxuXHRcdFx0XHRcdHNlbGVjdExpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gc2VsZWN0TGlzdDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbnModGVtcGxhdGVzLCBzaG93SW5Qcm9qZWN0KSB7XHJcblx0XHRcdFx0XHQvLyBjcmVhdGUgYnV0dG9uY29udGFpbmVyXHJcblx0XHRcdFx0XHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRcdGNvbnRhaW5lci5pZCA9ICdidXR0b25Db250YWluZXInO1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyLmNsYXNzTmFtZSA9ICdhdWktYnV0dG9ucyc7XHJcblx0XHRcdFx0XHRjb250YWluZXIuc3R5bGUgPSAncGFkZGluZy1sZWZ0OiAwcHg7bWFyZ2luLWxlZnQ6IDBweDtib3JkZXItbGVmdDogMDt3aGl0ZS1zcGFjZTogYnJlYWstc3BhY2VzO2Rpc3BsYXk6IGlubGluZS1ibG9jazsnO1xyXG5cclxuXHRcdFx0XHRcdC8vIGNyZWF0ZSBidXR0b25zXHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiB0ZW1wbGF0ZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRlbXBsYXRlc1trZXldLnByb2plY3RzLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoREVGQVVMVF9URU1QTEFURV9JRCkgfHwgdGVtcGxhdGVzW2tleV0ucHJvamVjdHMuaW5jbHVkZXMoc2hvd0luUHJvamVjdCkpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uLmNsYXNzTmFtZSA9ICdhdWktYnV0dG9uIGF1aS1idXR0b24tc3VidGxlJztcclxuXHRcdFx0XHRcdFx0XHRidXR0b24uaW5uZXJUZXh0ID0gdGVtcGxhdGVzW2tleV0udGVtcGxhdGVOYW1lO1xyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RlbXBsYXRlVHlwZScsIHRlbXBsYXRlc1trZXldLmlzc3VlVHlwZSk7XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgnaW5zZXJ0ZGF0YScsIHRlbXBsYXRlc1trZXldLnRpY2tldERlc2MpO1xyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5vbmNsaWNrID0gYXBwbHlUZW1wbGF0ZTtcclxuXHRcdFx0XHRcdFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBjb250YWluZXI7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBzZWFyY2ggZm9yIHByb2plY3RzcGVjaWZpYyB0ZW1wbGF0ZVxyXG5cdFx0XHRcdGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlcywgcHJvamVjdHMsIGlzc3VlVHlwZSkge1xyXG5cdFx0XHRcdFx0bGV0IHNwZWNpZmNUZW1wbGF0ZTtcclxuXHRcdFx0XHRcdGxldCBkZWZhdWx0VGVtcGxhdGU7XHJcblx0XHRcdFx0XHRwcm9qZWN0cyA9IHByb2plY3RzLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRpc3N1ZVR5cGUgPSBpc3N1ZVR5cGUudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiB0ZW1wbGF0ZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRlbXBsYXRlcywga2V5KSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0ZW1wbGF0ZXNba2V5XS5pc3N1ZVR5cGUudG9Mb3dlckNhc2UoKSA9PSBpc3N1ZVR5cGUgJiYgdGVtcGxhdGVzW2tleV0ucHJvamVjdHMuaW5jbHVkZXMocHJvamVjdHMpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBzcGVjaWZpYyBpZiBpc3N1ZVR5cGUgZS5nLiBcIkJ1Z1wiIGFuZCBwcm9qZWN0IGUuZy4gXCJBQkNcIlxyXG5cdFx0XHRcdFx0XHRcdFx0c3BlY2lmY1RlbXBsYXRlID0gdGVtcGxhdGVzW2tleV07XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdHRlbXBsYXRlc1trZXldLmlzc3VlVHlwZS50b0xvd2VyQ2FzZSgpID09IGlzc3VlVHlwZSAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0dGVtcGxhdGVzW2tleV0ucHJvamVjdHMudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhERUZBVUxUX1RFTVBMQVRFX0lEKVxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZGVmYXVsdCBpZiAgaXNzdWVUeXBlIGUuZy4gXCJCdWdcIiBhbmQgcHJvamVjdCBcImRlZmF1bHRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFRlbXBsYXRlID0gdGVtcGxhdGVzW2tleV07XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyByZXR1cm4gc3BlY2lmaWMsIGRlZmF1bHQgb3Igbm8gdGVtcGxhdGVcclxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2Ygc3BlY2lmY1RlbXBsYXRlICE9PSAndW5kZWZpbmVkJyA/IHNwZWNpZmNUZW1wbGF0ZSA6IHR5cGVvZiBkZWZhdWx0VGVtcGxhdGUgIT09ICd1bmRlZmluZWQnID8gZGVmYXVsdFRlbXBsYXRlIDogJyc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvKipcclxuXHRcdFx0XHQgKiBleGVjdXRpdmVzXHJcblx0XHRcdFx0ICovXHJcblx0XHRcdFx0ZnVuY3Rpb24gb2JzZXJ2ZURvY3VtZW50Qm9keShtdXRhdGlvbikge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvKG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmluZm8obXV0YXRpb24udGFyZ2V0KTtcclxuXHRcdFx0XHRcdGNvbnN0IGlzRGVzY3JpcHRpb25GaWVsZCA9XHJcblx0XHRcdFx0XHRcdFsnZGVzY3JpcHRpb24nXS5pbmNsdWRlcyhtdXRhdGlvbi50YXJnZXQuaWQpIHx8XHJcblx0XHRcdFx0XHRcdChtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgPT0gJ01haW4gY29udGVudCBhcmVhJyAmJiBtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSk7XHJcblx0XHRcdFx0XHRsZXQgcHJqID0gJyc7XHJcblx0XHRcdFx0XHRsZXQgc2VsZWN0ZWRJc3N1ZVR5cGUgPSAnJztcclxuXHRcdFx0XHRcdGxldCBjaG9zZW5UZW1wbGF0ZSA9ICcnO1xyXG5cclxuXHRcdFx0XHRcdC8vIGdldCBzZWxlY3RlZCBwYXJhbWV0ZXJzXHJcblxyXG5cdFx0XHRcdFx0Ly8gbm8gcHJvamVjdC1maWVsZCBhdmFpbGFibGUsIHByb2JhYmx5IGp1c3QgY2xpY2tlZCBlZGl0IGF0IGN1cnJlbnQgaXNzdWVcclxuXHRcdFx0XHRcdGlmIChpc0Rlc2NyaXB0aW9uRmllbGQpIHtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFpc0ppcmFDbG91ZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZmllbGQnKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZpZWxkJykudmFsdWUgOiAnJztcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkSXNzdWVUeXBlID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lzc3VldHlwZS1maWVsZCcpLnZhbHVlIHx8XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlzc3VlLXR5cGVdJykuZ2V0QXR0cmlidXRlKCdkYXRhLWlzc3VlLXR5cGUnKTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lzc3VlLWNyZWF0ZS51aS5tb2RhbC5jcmVhdGUtZm9ybS5wcm9qZWN0LXBpY2tlci5wcm9qZWN0LXNlbGVjdCcpLnRleHRDb250ZW50IHx8ICcnO1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRJc3N1ZVR5cGUgPVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXNzdWUtY3JlYXRlLnVpLm1vZGFsLmNyZWF0ZS1mb3JtLnR5cGUtcGlja2VyLmlzc3VlLXR5cGUtc2VsZWN0JykudGV4dENvbnRlbnQgfHwgJyc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZFByb2plY3QgPSBwcmouc3Vic3RyaW5nKHByai5sYXN0SW5kZXhPZignKCcpICsgMSwgcHJqLmxlbmd0aCAtIDEpO1xyXG5cdFx0XHRcdFx0XHRcdGNob3NlblRlbXBsYXRlID0gZ2V0VGVtcGxhdGUodGVtcGxhdGVzLCBzZWxlY3RlZFByb2plY3QsIHNlbGVjdGVkSXNzdWVUeXBlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0SmlyYUludGVyZmFjZS5zZXRDdXN0b21Ub29sQmFyKGNob3NlblRlbXBsYXRlLCBzZWxlY3RlZFByb2plY3QsIHNlbGVjdGVkSXNzdWVUeXBlKTtcclxuXHRcdFx0XHRcdFx0fSwgMjAwKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBvYnNlcnZlIGZvciBhdXRvZmlsbFxyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMuYXV0b2ZpbGwuZW5hYmxlZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoaXNEZXNjcmlwdGlvbkZpZWxkKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBhdXRvZmlsbCB0ZW1wbGF0ZSBvbmx5IGlmIHRleHRhcmVhIGlzIGVtcHR5IG9yIGp1c3QgYW5vdGhlciB0ZW1wbGF0ZVxyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHRleHRCZWZvcmUgPSAnJztcclxuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNKaXJhQ2xvdWQgJiYgY2hvc2VuVGVtcGxhdGUgIT09ICcnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRleHRCZWZvcmUgPSBtdXRhdGlvbi50YXJnZXQudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0ZXh0QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG11dGF0aW9uLnRhcmdldC52YWx1ZSA9IGNob3NlblRlbXBsYXRlLnRpY2tldERlc2M7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gZXhjaGFuZ2UgdGVtcGxhdGUgaWYgdGV4dGFyZWEgY29udGFpbnMgb25seSBwbGFpbiB0ZW1wbGF0ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKEN1cnJlbnRWaWV3LmlzUGxhaW5UZW1wbGF0ZSh0ZXh0QmVmb3JlLCB0ZW1wbGF0ZXMpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bXV0YXRpb24udGFyZ2V0LnZhbHVlID0gdGVtcGxhdGV0aWNrZXREZXNjO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIG5vIGF1dG9maWxsIGlmIHNvbWV0aGluZyBlbHNlIGlzIGdpdmVuIGluIGRlc2NyaXB0aW9uXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoY2hvc2VuVGVtcGxhdGUgIT09ICcnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGp1c3RQbGFjZWhvbGRlciA9IG11dGF0aW9uLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdwID4gc3Bhbltjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiXScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0ZXh0QmVmb3JlID0gSmlyYUludGVyZmFjZS5nZXRWYWx1ZU9mVGVtcGxhdGVEZXNjcmlwdGlvbkZpZWxkKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBjaGVjayBpZiBvdmVycmlkZSBvciBwcmVzZXJ2ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBsZW5ndGggPT0gMSBpZiAnXFxuJyBpbiBjbG91ZCB2ZXJzaW9uIGJhc2ljYWxseSBlbXB0eVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoanVzdFBsYWNlaG9sZGVyIHx8ICFvcHRpb25zLmtlZXB0ZXh0LmVuYWJsZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRKaXJhSW50ZXJmYWNlLnNldFZhbHVlT2ZUZW1wbGF0ZURlc2NyaXB0aW9uRmllbGQoY2hvc2VuVGVtcGxhdGUudGlja2V0RGVzYyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoQ3VycmVudFZpZXcuaXNQbGFpblRlbXBsYXRlKHRleHRCZWZvcmUsIHRlbXBsYXRlcykpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRKaXJhSW50ZXJmYWNlLnNldFZhbHVlT2ZUZW1wbGF0ZURlc2NyaXB0aW9uRmllbGQoY2hvc2VuVGVtcGxhdGUudGlja2V0RGVzYyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gcHJlc2VydmUgdGV4dCBpbiBkZXNjcmlwdGlvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBuZXdUZXh0ID0gYCR7Y2hvc2VuVGVtcGxhdGUudGlja2V0RGVzY30ke05FV19MSU5FfSR7TkVXX0xJTkV9JHtvcHRpb25zLmtlZXB0ZXh0LnNlcGFyYXRvcn0ke05FV19MSU5FfSR7TkVXX0xJTkV9JHt0ZXh0QmVmb3JlfWA7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0SmlyYUludGVyZmFjZS5zZXRWYWx1ZU9mVGVtcGxhdGVEZXNjcmlwdGlvbkZpZWxkKG5ld1RleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyB0ZW1wbGF0ZSB3YXMgc2V0LCBjaGFuZ2UgdGlja2V0IHR5cGUgLT4gamlyYSByZW1pbmRzIHRoZSB0ZW1wbGF0ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyByZW1vdmUgdGVtcGxhdGUgaWYgdGhlcmVzIGlzIG5vIHRlbXBsYXRlIGZvciB0aWNrZXQgdHlwZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoQ3VycmVudFZpZXcuaXNQbGFpblRlbXBsYXRlKEppcmFJbnRlcmZhY2UuZ2V0VmFsdWVPZlRlbXBsYXRlRGVzY3JpcHRpb25GaWVsZCgpLCB0ZW1wbGF0ZXMpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdEppcmFJbnRlcmZhY2Uuc2V0VmFsdWVPZlRlbXBsYXRlRGVzY3JpcHRpb25GaWVsZCgnJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gbXV0YXRpb24udGFyZ2V0LmZvY3VzKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRtdXRhdGlvbi50YXJnZXQuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRcdH0sIDMwMCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBvYnNlcnZlIGZvciBkcm9wZG93blxyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMucXVpY2thY2Nlc3MuZW5hYmxlZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdFx0Wyd3aWtpLWVkaXRvci1pbml0aWFsaXNlZCcsICd0ZXh0ZmllbGQnLCAnd2lraS1lZGl0LW9wZXJhdGlvbiddLmluY2x1ZGVzKG11dGF0aW9uLnRhcmdldC5jbGFzc05hbWUpIHx8XHJcblx0XHRcdFx0XHRcdFx0Wydjb21tZW50J10uaW5jbHVkZXMobXV0YXRpb24udGFyZ2V0LmlkKSB8fFxyXG5cdFx0XHRcdFx0XHRcdGlzRGVzY3JpcHRpb25GaWVsZFxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0b29sYmFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53aWtpLWVkaXQtdG9vbGJhcjpub3QoI2lzc3VlRHJvcGRvd25NZW51KScpO1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0b29sYmFycykge1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGN1cnJlbnRQcm9qZWN0O1xyXG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3VycmVudFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGB0ZXh0YXJlYSMke211dGF0aW9uLnRhcmdldC5pZH1gKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50UHJvamVjdCA9IGN1cnJlbnRQcm9qZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0a2V5Jyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGN1cnJlbnRQcm9qZWN0IGluIHRoaXMgdmlldzogJHt3aW5kb3cubG9jYXRpb24uaHJlZn1gKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyByZW5kZXIgZHJvcGRvd24gZWl0aGVyIHRhcmdldCBpcyBkZXNjcmlwdGlvbiBvciBjb21tZW50XHJcblx0XHRcdFx0XHRcdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgnZ2V0RW50cmllc0ZvckRyb3Bkb3duJywgZnVuY3Rpb24gKGVudHJpZXMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVudHJpZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGN1c3RvbVRvb2xCYXIuYXBwZW5kQ2hpbGQoY3JlYXRlRHJvcGRvd24oZW50cmllcywgY3VycmVudFByb2plY3QpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdG9vbGJhcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodG9vbGJhcnNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJyNpc3N1ZURyb3Bkb3duTWVudScpID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGFwcGVuZCBhcyBzZWNvbmQgbGFzdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b29sYmFyc1tpbmRleF1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucXVlcnlTZWxlY3RvcignLndpa2ktZWRpdC10b29sYmFyIC5hdWktYnV0dG9uczpudGgtbGFzdC1jaGlsZCgyKScpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmFwcGVuZENoaWxkKGNyZWF0ZURyb3Bkb3duKGVudHJpZXMsIGN1cnJlbnRQcm9qZWN0KSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNEZXNjcmlwdGlvbkZpZWxkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGJ1dHRvbnMgZm9yIGRlc2NyaXB0aW9uIHd5c2l3eWcgZWRpdG9yXHJcblx0XHRcdFx0XHRcdFx0XHRcdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdnZXRCdXR0b25zRm9yRGVzY3JpcHRpb24nLCBmdW5jdGlvbiBnZXRCdG5EZXNjKGJ1dHRvbnMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdG9vbGJhcnMubGVuZ3RoOyBpbmRleCArPSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0b29sYmFyc1tpbmRleF0ucXVlcnlTZWxlY3RvcignI2J1dHRvbkNvbnRhaW5lcicpID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYXBwZW5kIGluIHRoZSBlbmRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b29sYmFyc1tpbmRleF1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5xdWVyeVNlbGVjdG9yKCcud2lraS1lZGl0LXRvb2xiYXItbGFzdCcpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b25zKGJ1dHRvbnMsIGN1cnJlbnRQcm9qZWN0KSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gYnV0dG9ucyBmb3IgY29tbWVudCB3eXNpd3lnIGVkaXRvclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgnZ2V0QnV0dG9uc0ZvckNvbW1lbnQnLCBmdW5jdGlvbiBnZXRCdG5Db21tZW50KGJ1dHRvbnMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdG9vbGJhcnMubGVuZ3RoOyBpbmRleCArPSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0b29sYmFyc1tpbmRleF0ucXVlcnlTZWxlY3RvcignI2J1dHRvbkNvbnRhaW5lcicpID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYXBwZW5kIGluIHRoZSBlbmRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b29sYmFyc1tpbmRleF1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5xdWVyeVNlbGVjdG9yKCcud2lraS1lZGl0LXRvb2xiYXItbGFzdCcpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjcmVhdGVCdXR0b25zKGJ1dHRvbnMsIGN1cnJlbnRQcm9qZWN0KSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9