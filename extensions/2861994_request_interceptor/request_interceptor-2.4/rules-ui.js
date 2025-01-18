import { Rules } from './rules.js';


	
export const RulesUI = {
    domCache: {},

    async init() {
        this.cacheDomElements();
        this.setupEventListeners();
        
        // Wait for rules to be loaded before rendering
        await Rules.loadRules();  // Make sure to await the loading
        this.renderRules();       // Render after rules are loaded
    },

    cacheDomElements() {
        this.domCache.rulesList = document.getElementById('rulesList');
        this.domCache.addRuleButton = document.getElementById('addRuleButton');
        this.domCache.ruleForm = document.getElementById('ruleForm');
        this.domCache.actionOptions = document.getElementById('actionOptions');
        this.domCache.actionSelect = document.getElementById('action');
    },

    setupEventListeners() {
        this.domCache.addRuleButton.addEventListener('click', () => this.showRuleForm());
        this.domCache.ruleForm.addEventListener('submit', (e) => this.handleRuleSubmit(e));
        this.domCache.actionSelect.addEventListener('change', () => this.updateActionOptions());
        
        this.domCache.ruleForm.querySelector('.cancel').addEventListener('click', () => {
            this.domCache.ruleForm.style.display = 'none';
        });
    },

    renderRules() {
        this.domCache.rulesList.innerHTML = '';
        Rules.rules.forEach(rule => {
            const ruleElement = this.createRuleElement(rule);
            this.domCache.rulesList.appendChild(ruleElement);
        });
    },

    createRuleElement(rule) {
        const container = document.createElement('div');
        container.className = `rule-item ${rule.enabled ? 'rule-enabled' : 'rule-disabled'}`;
        container.innerHTML = `
            <div class="rule-header">
                <div class="rule-status">
                    <input type="checkbox" id="rule-${rule.id}" ${rule.enabled ? 'checked' : ''}>
                    <label for="rule-${rule.id}" class="status-label">
                        ${rule.enabled ? 'Enabled' : 'Disabled'}
                    </label>
                </div>
                <span class="rule-pattern">${rule.urlPattern}</span>
                <span class="rule-action">${this.formatActionName(rule.action)}</span>
                <div class="rule-controls">
                    <button class="edit-rule">Edit</button>
                    <button class="delete-rule">Delete</button>
                </div>
            </div>
            <div class="rule-details">
                <p>Method: ${rule.method || '*'}</p>
                ${this.getRuleActionDetails(rule)}
            </div>
        `;

        // Update the enable/disable label when checkbox changes
        const checkbox = container.querySelector('input[type="checkbox"]');
        const label = container.querySelector('.status-label');
        checkbox.addEventListener('change', () => {
            Rules.toggleRule(rule.id);
            label.textContent = checkbox.checked ? 'Enabled' : 'Disabled';
            container.className = `rule-item ${checkbox.checked ? 'rule-enabled' : 'rule-disabled'}`;
        });

        container.querySelector('.edit-rule').addEventListener('click', () => {
            this.showRuleForm(rule);
        });

        container.querySelector('.delete-rule').addEventListener('click', () => {
            Rules.deleteRule(rule.id);
            this.renderRules();
        });

        return container;
    },

    formatActionName(action) {
        switch (action) {
            case 'modifyGetParams':
                return 'Modify GET Parameters';
            default:
                return action.charAt(0).toUpperCase() + action.slice(1);
        }
    },

    getRuleActionDetails(rule) {
        switch (rule.action) {
            case 'redirect':
                return `<p>Redirect to: ${rule.redirectUrl}</p>`;
            case 'modify':
                return rule.modifyHeaders?.length > 0 ? 
                    `<p>Header modifications: ${rule.modifyHeaders.length}</p>` : 
                    '<p>No modifications specified</p>';
            case 'modifyGetParams':
                return rule.getParams?.length > 0 ?
                    `<p>GET parameter modifications: ${rule.getParams.length}</p>` :
                    '<p>No modifications specified</p>';
            case 'block':
                return '<p>Block request</p>';
            default:
                return '';
        }
    },

    showRuleForm(rule = null) {
        const form = this.domCache.ruleForm;
        form.reset();

        if (rule) {
            form.querySelector('#urlPattern').value = rule.urlPattern;
            form.querySelector('#method').value = rule.method || '*';
            form.querySelector('#action').value = rule.action;
            form.dataset.ruleId = rule.id;
            this.updateActionOptions(rule);
        } else {
            delete form.dataset.ruleId;
            this.updateActionOptions();
        }

        form.style.display = 'block';
    },

    updateActionOptions(rule = null) {
        const action = this.domCache.actionSelect.value;
        const container = this.domCache.actionOptions;
        
        let html = '';
        switch (action) {
            case 'redirect':
                html = `
                    <div class="form-group">
                        <label for="redirectUrl">Redirect URL:</label>
                        <input type="url" id="redirectUrl" required
                               placeholder="https://example.com/new-path"
                               value="${rule?.redirectUrl || ''}">
                    </div>
                `;
                break;
                
            case 'modify':
                html = `
                    <div class="form-group modification-section">
                        <div class="section-header">
                            <label>Header Modifications</label>
                            <button type="button" class="add-modification" data-type="header">Add Header Modification</button>
                        </div>
                        <div id="headerModifications" class="modifications-list">
                            ${this.renderModificationList(rule?.modifyHeaders, 'header')}
                        </div>
                    </div>
                `;
                break;

            case 'modifyGetParams':
                html = `
                    <div class="form-group modification-section">
                        <div class="section-header">
                            <label>GET Parameter Modifications</label>
                            <button type="button" class="add-modification" data-type="param">Add Parameter</button>
                        </div>
                        <div id="paramModifications" class="modifications-list">
                            ${this.renderModificationList(rule?.getParams, 'param')}
                        </div>
                    </div>
                `;
                break;
        }
        
        container.innerHTML = html;

        if (action === 'modify' || action === 'modifyGetParams') {
            this.setupModificationListeners();
        }
    },

    renderModificationList(modifications, type) {
        if (!modifications || modifications.length === 0) {
            return '';
        }
        return modifications.map(mod => this.renderModificationRow(mod, type)).join('');
    },

    renderModificationRow(modification = null, type) {
        const placeholder = type === 'header' ? 'Header' : 'Parameter';
        return `
            <div class="modification-row" data-type="${type}">
                <select class="operation">
                    <option value="add" ${modification?.operation === 'add' ? 'selected' : ''}>Add</option>
                    <option value="modify" ${modification?.operation === 'modify' ? 'selected' : ''}>Modify</option>
                    <option value="remove" ${modification?.operation === 'remove' ? 'selected' : ''}>Remove</option>
                </select>
                <input type="text" class="name" placeholder="${placeholder} name"
                       value="${modification?.name || ''}" required>
                <input type="text" class="value" placeholder="${placeholder} value"
                       value="${modification?.value || ''}"
                       ${modification?.operation === 'remove' ? 'disabled' : ''}>
                <button type="button" class="remove-row">×</button>
            </div>
        `;
    },

    setupModificationListeners() {
        const container = this.domCache.actionOptions;

        // Add modification buttons
        container.querySelectorAll('.add-modification').forEach(button => {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                const listId = type === 'header' ? 'headerModifications' : 'paramModifications';
                const list = container.querySelector(`#${listId}`);
                const row = this.renderModificationRow(null, type);
                const div = document.createElement('div');
                div.innerHTML = row;
                list.appendChild(div.firstElementChild);
                this.setupRowListeners(list.lastElementChild);
            });
        });

        // Setup listeners for existing rows
        container.querySelectorAll('.modification-row').forEach(row => {
            this.setupRowListeners(row);
        });
    },

    setupRowListeners(row) {
        // Remove button
        row.querySelector('.remove-row').addEventListener('click', () => row.remove());

        // Operation change
        const operation = row.querySelector('.operation');
        const valueInput = row.querySelector('.value');
        operation.addEventListener('change', () => {
            valueInput.disabled = operation.value === 'remove';
            if (operation.value === 'remove') {
                valueInput.value = '';
            }
        });
    },

    getModificationsFromContainer(containerId) {
        const modifications = [];
        const container = document.getElementById(containerId);
        if (!container) return modifications;

        container.querySelectorAll('.modification-row').forEach(row => {
            const operation = row.querySelector('.operation').value;
            const name = row.querySelector('.name').value.trim();
            const value = row.querySelector('.value').value;

            if (name) {
                modifications.push({ operation, name, value });
            }
        });

        return modifications;
    },

    handleRuleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        
        const ruleData = {
            urlPattern: form.querySelector('#urlPattern').value,
            method: form.querySelector('#method').value,
            action: form.querySelector('#action').value,
        };

        switch (ruleData.action) {
            case 'redirect':
                ruleData.redirectUrl = form.querySelector('#redirectUrl').value;
                break;
            case 'modify':
                ruleData.modifyHeaders = this.getModificationsFromContainer('headerModifications');
                break;
            case 'modifyGetParams':
                ruleData.getParams = this.getModificationsFromContainer('paramModifications');
                break;
        }

        if (form.dataset.ruleId) {
            Rules.updateRule(form.dataset.ruleId, ruleData);
        } else {
            Rules.addRule(ruleData);
        }

        form.style.display = 'none';
        this.renderRules();
    }
};