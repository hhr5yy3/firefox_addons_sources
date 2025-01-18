import { Core } from './interceptor.js';
import { Repeater } from './repeater.js';

export const UI = {
    interceptedRequests: [],
    currentPage: 1,
    itemsPerPage: 200,
    totalRequests: 0,
    selectedRequestId: null,
    initialized: false,
    domCache: {}, // Cache for DOM elements

    //----- Initialization Functions -----
    init() {
        if (this.initialized) return;
        this.initialized = true;

        console.log("Initializing UI");
        this.cacheDomElements();
        this.setRequestListHeight();
        window.addEventListener('resize', () => this.setRequestListHeight());

        this.setupEventListeners();
        this.updateInterceptStatus();
        this.updateRequestList();
    },

    cacheDomElements() {
        this.domCache.toggleButton = document.getElementById('toggleButton');
        this.domCache.clearButton = document.getElementById('clearButton');
        this.domCache.requestList = document.getElementById('requestList');
        this.domCache.detailsContainer = document.getElementById('detailsContainer');
        this.domCache.responseContainer = document.getElementById('responseContainer');
        this.domCache.filterInput = document.getElementById('filterInput');
        this.domCache.inverseFilterInput = document.getElementById('inverseFilterInput');
        this.domCache.sortSelect = document.getElementById('sortSelect');
        this.domCache.prevPageButton = document.getElementById('prevPage');
        this.domCache.nextPageButton = document.getElementById('nextPage');
        this.domCache.pageInfo = document.getElementById('pageInfo');
        this.domCache.sendToRepeaterButton = document.getElementById('sendToRepeaterButton');
        this.domCache.repeaterTab = document.getElementById('repeaterTab');
        this.domCache.repeaterContent = document.getElementById('repeaterContent');
        this.domCache.interceptorTab = document.getElementById('interceptorTab');
        this.domCache.interceptorContent = document.getElementById('interceptorContent');
    },

    //----- UI Adjustment Functions -----
    setRequestListHeight() {
        const windowHeight = window.innerHeight;
        const requestListTop = this.domCache.requestList.getBoundingClientRect().top;
        const bottomPadding = 20;
        const maxHeight = windowHeight - requestListTop - bottomPadding;
        this.domCache.requestList.style.maxHeight = `${maxHeight}px`;
        this.domCache.requestList.style.overflowY = 'auto';
        console.log(`Set request list max height to ${maxHeight}px`);
    },

    //----- Event Handling Functions -----
    setupEventListeners() {
        this.domCache.clearButton.addEventListener('click', () => this.clearRequests());
        this.domCache.filterInput.addEventListener('input', () => {
            this.currentPage = 1;
            this.updateRequestList();
        });
        this.domCache.inverseFilterInput.addEventListener('input', () => {
            this.currentPage = 1;
            this.updateRequestList();
        });
        this.domCache.sortSelect.addEventListener('change', () => {
            this.currentPage = 1;
            this.updateRequestList();
        });
        this.domCache.prevPageButton.addEventListener('click', () => this.changePage(-1));
        this.domCache.nextPageButton.addEventListener('click', () => this.changePage(1));
        this.domCache.sendToRepeaterButton.addEventListener('click', () => {
            const selectedRequest = this.interceptedRequests.find(r => r.requestId === this.selectedRequestId);
            if (selectedRequest) {
                this.sendToRepeater(selectedRequest);
            }
        });

        document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));

        // Event delegation for request list
        this.domCache.requestList.addEventListener('click', (event) => {
            const requestElement = event.target.closest('.request-item');
            if (requestElement) {
                const requestId = requestElement.dataset.requestId;
                this.selectRequest(requestId);
            }
        });
    },

    handleKeyNavigation(e) {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
            return;
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const direction = e.key === 'ArrowUp' ? -1 : 1;
            this.moveSelection(direction);
        }
    },

    moveSelection(direction) {
        const currentIndex = this.interceptedRequests.findIndex(r => r.requestId === this.selectedRequestId);
        if (currentIndex === -1) return;

        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < this.interceptedRequests.length) {
            // Within current page
            this.selectRequest(this.interceptedRequests[newIndex].requestId);
        } else if (newIndex < 0 && direction === -1 && this.currentPage > 1) {
            // At the first item, moving up, load previous page
            this.currentPage--;
            this.updateRequestList(() => {
                // After loading, select the last item
                const lastRequest = this.interceptedRequests[this.interceptedRequests.length - 1];
                if (lastRequest) {
                    this.selectRequest(lastRequest.requestId);
                }
            });
        } else if (newIndex >= this.interceptedRequests.length && direction === 1) {
            // At the last item, moving down, load next page if available
            const totalPages = Math.ceil(this.totalRequests / this.itemsPerPage) || 1;
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateRequestList(() => {
                    // After loading, select the first item
                    const firstRequest = this.interceptedRequests[0];
                    if (firstRequest) {
                        this.selectRequest(firstRequest.requestId);
                    }
                });
            }
        }
    },

    scrollToSelectedItem() {
        const selectedElement = this.domCache.requestList.querySelector('.request-item.selected');
        if (selectedElement) {
            selectedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        } else {
            console.log('No selected element found');
        }
    },

    //----- Request Handling Functions -----
    selectRequest(requestId) {
        if (this.selectedRequestId !== requestId) {
            this.selectedRequestId = requestId;
            this.highlightSelectedRequest();
            this.loadRequestDetails(requestId);
            this.scrollToSelectedItem();
        }
    },

    highlightSelectedRequest() {
        const requestItems = this.domCache.requestList.querySelectorAll('.request-item');
        requestItems.forEach(item => {
            if (item.dataset.requestId === this.selectedRequestId) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    },

    loadRequestDetails(requestId) {
        const request = this.interceptedRequests.find(r => r.requestId === requestId);
        if (request) {
            this.showRequestDetails(request);
        }
    },

    updateInterceptStatus() {
        Core.sendMessage({ action: "getInterceptStatus" }).then((response) => {
            this.domCache.toggleButton.textContent = response.isInterceptEnabled ? "Disable Interception" : "Enable Interception";
            this.domCache.toggleButton.style.backgroundColor = response.isInterceptEnabled ? "#f44336" : "#4CAF50";
        }).catch(err => {
            console.error('Error getting intercept status:', err);
        });
    },

    toggleIntercept() {
        Core.sendMessage({ action: "toggleIntercept" }).then(() => {
            this.updateInterceptStatus();
            this.updateRequestList();
        }).catch(err => {
            console.error('Error toggling intercept:', err);
        });
    },

    clearRequests() {
        Core.sendMessage({ action: "clearRequests" }).then(() => {
            this.interceptedRequests = [];
            this.currentPage = 1;
            this.selectedRequestId = null;
            this.totalRequests = 0;
            this.domCache.requestList.innerHTML = '';
            this.domCache.detailsContainer.value = '';
            this.domCache.responseContainer.value = '';
            this.domCache.pageInfo.textContent = '';
        }).catch(err => {
            console.error('Error clearing requests:', err);
        });
    },

    updateRequestList(callback) {
        const filterText = this.domCache.filterInput.value.toLowerCase();
        const inverseFilterText = this.domCache.inverseFilterInput.value.toLowerCase();

        Core.sendMessage({
            action: "getRequests",
            page: this.currentPage,
            itemsPerPage: this.itemsPerPage,
            filter: filterText,
            inverseFilter: inverseFilterText,
            sort: this.domCache.sortSelect.value
        }).then((response) => {
            console.log("Received requests:", response);
            this.interceptedRequests = response.requests;
            this.totalRequests = response.totalRequests;
            this.renderRequestList();

            // If a request is selected, reload its details
            if (this.selectedRequestId) {
                const selectedRequest = this.interceptedRequests.find(r => r.requestId === this.selectedRequestId);
                if (selectedRequest) {
                    this.loadRequestDetails(this.selectedRequestId);
                } else {
                    this.selectedRequestId = null;
                    this.domCache.detailsContainer.value = '';
                    this.domCache.responseContainer.value = '';
                }
            }

            // Execute callback if provided
            if (typeof callback === 'function') {
                callback();
            }
        }).catch(err => {
            console.error('Error getting requests:', err);
        });
    },

    renderRequestList() {
        // Use a document fragment for efficient DOM updates
        const fragment = document.createDocumentFragment();

        this.interceptedRequests.forEach((request) => {
            const requestElement = document.createElement('div');
            requestElement.className = 'request-item';
            requestElement.dataset.requestId = request.requestId;
            if (request.requestId === this.selectedRequestId) {
                requestElement.classList.add('selected');
            }

            const orderSpan = document.createElement('span');
            orderSpan.className = 'request-order';
            orderSpan.textContent = `${request.interceptOrder}.`;

            const methodSpan = document.createElement('span');
            methodSpan.className = `request-method ${request.method.toLowerCase()}`;
            methodSpan.textContent = request.method;

            const urlSpan = document.createElement('span');
            urlSpan.className = 'request-url';
            urlSpan.textContent = request.url;

            requestElement.appendChild(orderSpan);
            requestElement.appendChild(methodSpan);
            requestElement.appendChild(urlSpan);

            fragment.appendChild(requestElement);
        });

        // Clear existing list and append new items
        this.domCache.requestList.innerHTML = '';
        this.domCache.requestList.appendChild(fragment);

        const totalPages = Math.ceil(this.totalRequests / this.itemsPerPage) || 1;
        this.domCache.pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        this.domCache.prevPageButton.disabled = this.currentPage === 1;
        this.domCache.nextPageButton.disabled = this.currentPage === totalPages;

        console.log('Total items rendered:', this.domCache.requestList.children.length);
    },

    showRequestDetails(request) {
        console.log("Showing details for request:", request);

        const requestDetails = this.formatRequest(request);
        this.domCache.detailsContainer.value = requestDetails;

        const responseDetails = this.formatResponse(request);
        this.domCache.responseContainer.value = responseDetails;

        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(this.domCache.detailsContainer);
            hljs.highlightElement(this.domCache.responseContainer);
        } else {
            console.warn('Highlight.js not found');
        }
    },

    sendToRepeater(request) {
        console.log('Sending request to Repeater:', request);
        Repeater.loadRequest(request);

        // Switch to the Repeater tab
        this.domCache.repeaterTab.classList.add('active');
        this.domCache.repeaterContent.classList.add('active');
        this.domCache.interceptorTab.classList.remove('active');
        this.domCache.interceptorContent.classList.remove('active');
    },

    formatRequest(request) {
        const httpVersion = this.detectHttpVersion(request);
        let formatted = `${request.method} ${request.url} ${httpVersion}\n`;
        if (request.requestHeaders) {
            request.requestHeaders.forEach(header => {
                formatted += `${header.name}: ${header.value}\n`;
            });
        }

        formatted += '\n';

        if (request.requestBody) {
            if (request.requestBody.formData) {
                const formData = new URLSearchParams();
                for (const [key, values] of Object.entries(request.requestBody.formData)) {
                    values.forEach(value => formData.append(key, value));
                }
                formatted += formData.toString();
            } else if (request.requestBody.raw) {
                request.requestBody.raw.forEach(element => {
                    const decoder = new TextDecoder('utf-8');
                    const body = decoder.decode(new Uint8Array(element.bytes));
                    formatted += body;
                });
            }
        }

        return formatted;
    },

    formatResponse(request) {
        if (!request.responseHeaders) {
            return 'No response data available.';
        }

        let statusLine = `${request.statusLine || ''}`.trim();

        let formatted = statusLine + '\n';

        request.responseHeaders.forEach(header => {
            formatted += `${header.name}: ${header.value}\n`;
        });

        formatted += '\n';

        if (request.response && request.response.body) {
            formatted += request.response.body;
        }

        return formatted;
    },

    detectHttpVersion(request) {
        if (request.protocolVersion) {
            return request.protocolVersion;
        }

        if (request.responseHeaders) {
            const isHttp2 = request.responseHeaders.some(h => h.name.toLowerCase() === ':status');
            if (isHttp2) {
                return 'HTTP/2.0';
            }

            const isHttp3 = request.responseHeaders.some(h =>
                h.name.toLowerCase() === 'alt-svc' &&
                h.value.includes('h3')
            );
            if (isHttp3) {
                return 'HTTP/3.0';
            }
        }

        // Default to HTTP/1.1 if no specific indicators are found
        return 'HTTP/1.1';
    },

    //----- Pagination Functions -----
    changePage(direction) {
        const totalPages = Math.ceil(this.totalRequests / this.itemsPerPage) || 1;
        const newPage = this.currentPage + direction;
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.updateRequestList();
        }
    },

    //----- Utility Functions -----
    escapeHtml(unsafe) {
        // Since we are assigning to the value of textarea, escaping is not strictly necessary
        return unsafe;
    }
};
