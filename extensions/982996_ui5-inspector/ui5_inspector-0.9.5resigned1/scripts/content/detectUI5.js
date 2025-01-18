/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';

    // Inject a script file in the current page
    var script = document.createElement('script');
    script.src = chrome.extension.getURL('/scripts/injected/detectUI5.js');
    document.head.appendChild(script);

    /**
     * Delete the injected file, when it is loaded.
     */
    script.onload = function () {
        script.parentNode.removeChild(script);
    };

    // Create a port with background page for continuous message communication
    var port = chrome.extension.connect({name: 'do-ui5-detection'});

    // Listen for messages from the background page
    port.onMessage.addListener(function (message) {
        if (message.action === 'do-ui5-detection') {
            document.dispatchEvent(new Event('do-ui5-detection-injected'));
        }
    });

    /**
     *  Listens for messages from the injected script.
     */
    document.addEventListener('detect-ui5-content', function sendEvent(detectEvent) {
        // Send the received event detail object to background page
        port.postMessage(detectEvent.detail);
    }, false);
}());

},{}]},{},[1]);
