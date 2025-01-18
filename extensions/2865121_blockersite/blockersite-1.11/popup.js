"use strict";

const rulesContainer = document.getElementById('rules-container');
const addRuleButton = document.getElementById('add-rule');
const statusOutput = document.getElementById('status');

browser.storage.sync.get('rules', ({ rules }) => {
  if (rules) {
    rules.forEach(rule => {
      createRuleInputs(rule.blockURL, rule.redirectURL);
    });
  }
});

function createRuleInputs(blockURLValue = '', redirectURLValue = '') {

  const ruleDiv = document.createElement('div');
  ruleDiv.className = 'rule';

  const blockURL = document.createElement('input');
  blockURL.type = 'text';
  blockURL.placeholder = browser.i18n.getMessage('blockurl');
  blockURL.value = blockURLValue;

  const redirectURL = document.createElement('input');
  redirectURL.type = 'text';
  redirectURL.placeholder = browser.i18n.getMessage('redirecturl');
  redirectURL.value = redirectURLValue;

  const saveButton = document.createElement('button');
  saveButton.className = 'save-btn';
  saveButton.textContent = browser.i18n.getMessage('savebtn');

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = browser.i18n.getMessage('deletebtn');

  saveButton.addEventListener('click', () => {
    if (blockURL.value === '') return;

    browser.storage.sync.get('rules', ({ rules }) => {
      rules = rules || [];

      const ruleExists = rules.some(rule =>
        rule.blockURL === blockURL.value && rule.redirectURL === redirectURL.value
      );

      if (ruleExists) {
        const alertMessage = browser.i18n.getMessage('alertruleexist');
        alert(alertMessage);
      } else {
        rules.push({ blockURL: blockURL.value.trim(), redirectURL: redirectURL.value.trim() });
        browser.storage.sync.set({ rules }, () => {
          createRuleInputs();
          const outputText = browser.i18n.getMessage('savedrules', ' ' + rules.length + ' ');
          statusOutput.value = outputText;
        });
      }
    });
  });

  deleteButton.addEventListener('click', () => {
    browser.storage.sync.get('rules', ({ rules }) => {
      rules = rules || [];
      rules = rules.filter((rule) => rule.blockURL !== blockURL.value.trim() || rule.redirectURL !== redirectURL.value.trim());
      browser.storage.sync.set({ rules });
      
      const outputText = browser.i18n.getMessage('savedrules', ' ' + rules.length + ' ');
      statusOutput.value = outputText;
    });
    ruleDiv.remove();
  });

  ruleDiv.appendChild(blockURL);
  ruleDiv.appendChild(redirectURL);
  ruleDiv.appendChild(saveButton);
  ruleDiv.appendChild(deleteButton);

  rulesContainer.insertAdjacentElement('afterbegin', ruleDiv);
}

addRuleButton.addEventListener('click', () => {
  createRuleInputs();
});