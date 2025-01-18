import { UI } from './ui.js';
import { Repeater } from './repeater.js';
import { EncodingTools } from './encoding-tools.js';
import { Rules } from './rules.js';
import { RulesUI } from './rules-ui.js';

console.log('extension-page.js loaded');

function initializeTabs() {
    console.log('Initializing tabs');
    const tabs = document.querySelectorAll('.tab-nav button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Handle main tab navigation (Interceptor, Proxy, Repeater, Encoding)
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            const contentId = tab.id.replace('Tab', 'Content');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Handle sub-tab navigation within Encoding/Decoding Tools
    const encodingTabs = document.querySelectorAll('.tab-button');
    const encodingContents = document.querySelectorAll('.tool-card');
    
    encodingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            encodingTabs.forEach(t => t.classList.remove('active'));
            encodingContents.forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            const contentId = tab.dataset.target;
            document.querySelector(contentId).classList.add('active');
        });
    });
}

function initializeToggleButton() {
    const toggleButton = document.getElementById('toggleButton');
    if (toggleButton) {
        console.log('Toggle button found');
        toggleButton.addEventListener('click', () => {
            console.log('Toggle button clicked');
            UI.toggleIntercept();
        });
    } else {
        console.error('Toggle button not found');
    }
}

function makeResizable(resizer, firstPane, secondPane, isVertical = false) {
    let startPosition = 0;
    let firstPaneSize = 0;

    const mouseDownHandler = function(e) {
        startPosition = isVertical ? e.clientY : e.clientX;
        firstPaneSize = isVertical ? firstPane.getBoundingClientRect().height : firstPane.getBoundingClientRect().width;
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const delta = isVertical ? e.clientY - startPosition : e.clientX - startPosition;
        const newSize = ((firstPaneSize + delta) * 100) / (isVertical ? resizer.parentNode.getBoundingClientRect().height : resizer.parentNode.getBoundingClientRect().width);
        if (isVertical) {
            firstPane.style.height = `${newSize}%`;
            secondPane.style.height = `${100 - newSize}%`;
        } else {
            firstPane.style.width = `${newSize}%`;
            secondPane.style.width = `${100 - newSize}%`;
        }
    };

    const mouseUpHandler = function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
}

function initializeResizers() {
    const interceptorResizer = document.getElementById('interceptorResizer');
    const requestList = document.querySelector('.request-list');
    const detailsContainer = document.querySelector('.details-container');
    makeResizable(interceptorResizer, requestList, detailsContainer);

    const repeaterResizer = document.getElementById('repeaterResizer');
    const requestEditor = document.querySelector('.request-editor');
    const responseViewer = document.querySelector('.response-viewer');
    makeResizable(repeaterResizer, requestEditor, responseViewer);

    const detailsResizer = document.getElementById('detailsResizer');
    const detailsRequest = document.querySelector('.request-details');
    const detailsResponse = document.querySelector('.response-details');
    makeResizable(detailsResizer, detailsRequest, detailsResponse, true);
}

let initialized = false;

function initialize() {
    if (!initialized) {
        console.log('Initializing UI, Repeater, Rules and Extensions');
        UI.init();
        Repeater.init();
        Rules.init();
        RulesUI.init();
        initializeTabs();
        initializeToggleButton();
        initializeResizers();
        EncodingTools.init();
        
        // Set up interval to periodically update the request list
        setInterval(() => {
            UI.updateRequestList();
        }, 2000);

        initialized = true;
    }
}

document.addEventListener('DOMContentLoaded', initialize);

console.log('extension-page.js fully loaded');