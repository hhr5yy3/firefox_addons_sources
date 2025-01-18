import { Core } from './interceptor.js';

export const Repeater = {
    tabs: [],
    activeTabId: null,
    domCache: {}, // Cache for DOM elements

    init() {
        console.log('Initializing Repeater');
        this.newRepeaterTabButton = document.getElementById('newRepeaterTabButton');
        this.repeaterTabList = document.getElementById('repeaterTabList');
        this.repeaterPanels = document.getElementById('repeaterPanels');

        this.setupEventListeners();
        this.createNewTab(); // Create an initial tab
    },

    setupEventListeners() {
        this.newRepeaterTabButton.addEventListener('click', () => this.createNewTab());

        // Event delegation for tab clicks and close button clicks
        this.repeaterTabList.addEventListener('click', (event) => {
            const tabElement = event.target.closest('.repeater-tab');
            if (tabElement) {
                const tabId = tabElement.dataset.tabId;

                if (event.target.classList.contains('close-tab-button')) {
                    event.stopPropagation();
                    this.closeTab(tabId);
                } else {
                    this.switchToTab(tabId);
                }
            }
        });

        // Event delegation for repeater panels
        this.repeaterPanels.addEventListener('click', (event) => {
            if (event.target.id === 'sendRequest') {
                this.sendRequest();
            } else if (event.target.id === 'clearRequest') {
                this.clearRequest();
            } else if (event.target.id === 'loadInBrowserButton') {
                this.loadPageInBrowser();
            }
        });
    },

    createNewTab() {
        const tabId = `repeater-tab-${Date.now()}`;
        const tabTitle = `${this.tabs.length + 1}`;

        const newTab = {
            id: tabId,
            title: tabTitle,
            request: {
                method: 'GET',
                url: '',
                headers: '',
                body: ''
            },
            response: {
                status: '',
                headers: '',
                body: ''
            }
        };

        this.tabs.push(newTab);
        this.renderTabs();
        this.switchToTab(tabId);
    },

    renderTabs() {
        // Use a document fragment for efficient DOM updates
        const fragment = document.createDocumentFragment();

        this.tabs.forEach(tab => {
            const tabElement = document.createElement('div');
            tabElement.className = `repeater-tab ${tab.id === this.activeTabId ? 'active' : ''}`;
            tabElement.dataset.tabId = tab.id;

            const span = document.createElement('span');
            span.textContent = tab.title;

            const closeButton = document.createElement('button');
            closeButton.className = 'close-tab-button';
            closeButton.textContent = '×';

            tabElement.appendChild(span);
            tabElement.appendChild(closeButton);
            fragment.appendChild(tabElement);
        });

        // Clear existing tabs and append new ones
        this.repeaterTabList.innerHTML = '';
        this.repeaterTabList.appendChild(fragment);
    },

    switchToTab(tabId) {
        if (this.activeTabId !== tabId) {
            this.saveActiveTabState();
            this.activeTabId = tabId;
            this.renderActiveTab();
        }
    },

    saveActiveTabState() {
        if (!this.activeTabId) return;

        const activeTab = this.getTabById(this.activeTabId);
        if (activeTab && this.domCache.requestMethod) {
            activeTab.request = {
                method: this.domCache.requestMethod.value,
                url: this.domCache.requestUrl.value,
                headers: this.domCache.requestHeaders.value,
                body: this.domCache.requestBody.value
            };
            activeTab.response = {
                status: this.domCache.responseStatus.textContent,
                headers: this.domCache.responseHeaders.textContent,
                body: this.domCache.responseBody.textContent
            };
        }
    },

    renderActiveTab() {
        const activeTab = this.getTabById(this.activeTabId);
        if (!activeTab) return;

        if (!this.isPanelsRendered) {
            this.renderPanels();
            this.isPanelsRendered = true;
        }

        // Populate fields with saved data
        this.domCache.requestMethod.value = activeTab.request.method;
        this.domCache.requestUrl.value = activeTab.request.url;
        this.domCache.requestHeaders.value = activeTab.request.headers;
        this.domCache.requestBody.value = activeTab.request.body;

        this.domCache.responseStatus.textContent = activeTab.response.status;
        this.domCache.responseHeaders.textContent = activeTab.response.headers;
        this.domCache.responseBody.textContent = activeTab.response.body;

        // Re-apply syntax highlighting
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(this.domCache.responseHeaders);
            hljs.highlightElement(this.domCache.responseBody);
        }

        this.highlightActiveTab();
    },

    renderPanels() {
        // Build the panels only once
        this.repeaterPanels.innerHTML = `
            <div class="request-editor">
                <h3>Request Editor</h3>
                <div class="editor-controls">
                    <select id="requestMethod">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                        <option value="HEAD">HEAD</option>
                        <option value="OPTIONS">OPTIONS</option>
                    </select>
                    <input type="text" id="requestUrl" placeholder="Enter URL">
                    <button id="sendRequest">Send</button>
                    <button id="clearRequest">Clear</button>
                </div>
                <div class="editor-section">
                    <h4>Headers</h4>
                    <textarea id="requestHeaders"></textarea>
                </div>
                <div class="editor-section">
                    <h4>Body</h4>
                    <textarea id="requestBody"></textarea>
                </div>
            </div>
            <div id="repeaterResizer" class="resizer"></div>
            <div class="response-viewer">
                <h3>Response</h3>
                <div id="responseStatus"></div>
                <div class="editor-section">
                    <h4>Headers <button id="loadInBrowserButton" class="button-style">Load Page</button></h4>
                    <pre><code id="responseHeaders"></code></pre>
                </div>
                <div class="editor-section">
                    <h4>Body</h4>
                    <pre><code id="responseBody"></code></pre>
                </div>
            </div>
        `;

        // Cache DOM elements
        this.domCache.requestMethod = document.getElementById('requestMethod');
        this.domCache.requestUrl = document.getElementById('requestUrl');
        this.domCache.requestHeaders = document.getElementById('requestHeaders');
        this.domCache.requestBody = document.getElementById('requestBody');
        this.domCache.responseStatus = document.getElementById('responseStatus');
        this.domCache.responseHeaders = document.getElementById('responseHeaders');
        this.domCache.responseBody = document.getElementById('responseBody');
    },

    highlightActiveTab() {
        const tabs = this.repeaterTabList.querySelectorAll('.repeater-tab');
        tabs.forEach(tab => {
            if (tab.dataset.tabId === this.activeTabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    },

    closeTab(tabId) {
        const index = this.tabs.findIndex(tab => tab.id === tabId);
        if (index > -1) {
            this.tabs.splice(index, 1);
            if (this.activeTabId === tabId) {
                this.activeTabId = this.tabs.length > 0 ? this.tabs[this.tabs.length - 1].id : null;
            }
            this.renderTabs();
            if (this.activeTabId) {
                this.renderActiveTab();
            } else {
                this.repeaterPanels.innerHTML = '';
                this.isPanelsRendered = false;
                this.domCache = {};
            }
        }
    },

    async sendRequest() {
        const activeTab = this.getTabById(this.activeTabId);
        if (!activeTab) return;

        const request = {
            method: this.domCache.requestMethod.value,
            url: this.domCache.requestUrl.value,
            headers: this.parseHeaders(this.domCache.requestHeaders.value),
            body: this.domCache.requestBody.value
        };

        console.log('Sending request:', request);

        try {
            const response = await Core.sendMessage({
                action: "sendRepeaterRequest",
                request: request
            });
            this.handleResponse(response);
        } catch (error) {
            console.error('Error sending request:', error);
            this.updateResponseUI({
                status: 'Error',
                statusText: error.message,
                headers: {},
                body: 'Failed to send request'
            });
        }

        // Save the request data
        activeTab.request = request;
    },

    handleResponse(response) {
        console.log('Received response:', response);
        if (response.error) {
            this.updateResponseUI({
                status: 'Error',
                statusText: response.error,
                headers: {},
                body: 'Failed to send request'
            });
        } else {
            this.updateResponseUI(response);
        }
    },

    updateResponseUI(response) {
        const responseStatus = this.domCache.responseStatus;
        const responseHeaders = this.domCache.responseHeaders;
        const responseBody = this.domCache.responseBody;

        let statusText = `${response.status} ${response.statusText}`;
        if (response.redirected) {
            statusText += ' (Redirected)';
        }
        responseStatus.textContent = statusText;

        if (response.redirected) {
            const redirectInfo = document.createElement('div');
            redirectInfo.className = 'redirect-info';

            redirectInfo.innerHTML = `
                <p style="color: orange;">Note: This request was redirected.</p>
                <ul>
                    <li>Original URL: ${response.originalUrl}</li>
                    <li>Final URL: ${response.url}</li>
                    <li>Final Redirect Status: ${response.redirectStatus}</li>
                    <li>Total Request Time: ${response.totalTime}ms</li>
                    <li>Protocol Changed: ${response.protocolChanged ? 'Yes' : 'No'}</li>
                    <li>Domain Changed: ${response.domainChanged ? 'Yes' : 'No'}</li>
                    <li>Content-Type Changed: ${response.contentTypeChanged ? 'Yes' : 'No'}</li>
                </ul>
            `;
            responseStatus.appendChild(redirectInfo);
        }

        responseHeaders.textContent = this.formatHeaders(response.headers || {});

        if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
            try {
                const json = JSON.parse(response.body);
                responseBody.textContent = JSON.stringify(json, null, 2);
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                responseBody.textContent = response.body;
            }
        } else {
            responseBody.textContent = response.body || '';
        }

        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(responseHeaders);
            hljs.highlightElement(responseBody);
        }

        // Save the response data
        const activeTab = this.getTabById(this.activeTabId);
        if (activeTab) {
            activeTab.response = {
                status: statusText,
                headers: responseHeaders.textContent,
                body: responseBody.textContent
            };
        }
    },

    clearRequest() {
        const activeTab = this.getTabById(this.activeTabId);
        if (!activeTab) return;

        this.domCache.requestUrl.value = '';
        this.domCache.requestHeaders.value = '';
        this.domCache.requestBody.value = '';
        this.domCache.responseStatus.textContent = '';
        this.domCache.responseHeaders.textContent = '';
        this.domCache.responseBody.textContent = '';

        // Clear saved request and response data
        activeTab.request = {
            method: 'GET',
            url: '',
            headers: '',
            body: ''
        };
        activeTab.response = {
            status: '',
            headers: '',
            body: ''
        };
    },

    parseHeaders(headerString) {
        return headerString.split('\n')
            .filter(line => line.trim() !== '')
            .reduce((headers, line) => {
                const separatorIndex = line.indexOf(':');
                if (separatorIndex > -1) {
                    const name = line.slice(0, separatorIndex).trim();
                    const value = line.slice(separatorIndex + 1).trim();
                    headers[name] = value;
                }
                return headers;
            }, {});
    },

    formatHeaders(headers) {
        if (!headers || Object.keys(headers).length === 0) {
            return 'No headers';
        }
        return Object.entries(headers)
            .map(([name, value]) => `${name}: ${value}`)
            .join('\n');
    },

    loadRequest(request) {
        this.createNewTab();
        const activeTab = this.getTabById(this.activeTabId);
        if (!activeTab) return;

        activeTab.request = {
            method: request.method,
            url: request.url,
            headers: request.requestHeaders ? request.requestHeaders.map(h => `${h.name}: ${h.value}`).join('\n') : '',
            body: request.requestBody ? this.formatRequestBody(request.requestBody) : ''
        };

        this.renderActiveTab();
    },

    formatRequestBody(requestBody) {
        if (requestBody.formData) {
            const formData = new URLSearchParams();
            for (const [key, values] of Object.entries(requestBody.formData)) {
                values.forEach(value => formData.append(key, value));
            }
            return formData.toString();
        } else if (requestBody.raw) {
            return requestBody.raw.map(chunk => {
                const decoder = new TextDecoder('utf-8');
                return decoder.decode(new Uint8Array(chunk.bytes));
            }).join('');
        }
        return '';
    },

    loadPageInBrowser() {
        const activeTab = this.getTabById(this.activeTabId);
        if (!activeTab) return;

        const request = {
            method: this.domCache.requestMethod.value,
            url: this.domCache.requestUrl.value,
            headers: this.parseHeaders(this.domCache.requestHeaders.value),
            body: this.domCache.requestBody.value
        };

        if (request.method === 'POST') {
            // Create a temporary form to submit the POST request
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = request.url;
            form.target = '_blank'; // Open in a new tab

            // Parse the body and append as form fields
            const bodyParams = new URLSearchParams(request.body);
            for (const [key, value] of bodyParams.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            }

            // Append the form to the document and submit it
            document.body.appendChild(form);
            form.submit();

            // Remove the form after submission
            document.body.removeChild(form);
        } else {
            // Open the URL directly for GET requests
            window.open(request.url, '_blank');
        }
    },

    getTabById(tabId) {
        return this.tabs.find(tab => tab.id === tabId);
    }
};
