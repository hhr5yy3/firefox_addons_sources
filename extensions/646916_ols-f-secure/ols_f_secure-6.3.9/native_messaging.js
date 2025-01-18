/*
 * Copyright (c) F-Secure Corporation. All rights reserved.
 * See license terms for the related product.
 */

class NativeMessagingHost {

    #port;
    #failedConnectionCount = 0;
    #lastConnectionTime = 0;
    #reconnectLimitMilliseconds = 10000;
    #reconnectUpperLimit = 10;
    #platform;
    #pendingResponses = [];
    #messagesPendingInit = [];
    #initialized = false;
    #hostName;
    id = 0;
    serverId = "";

    constructor() {
        if (Browser.isSafari) {
            // Safari does not support "chrome.runtime.sendNativeMessage" API which we use to determine which native host is available from the product side. This call never returns.
            // Moreover, Apple does not allow specifying the application ID of native messaging host. Extension is not in control of that decision.
            // Therefore, we use the default application ID for the native messaging host to satisfy worker initialization logic.
            this.#hostName = FS_NATIVE_MESSAGING_APP;
            this.connect();
            return;
        } 
        this.checkHostExists(NativeMessagingHostName).then((hostExists) => {
            if (!hostExists) {
                this.#hostName = FS_NATIVE_MESSAGING_APP;
                logi(`Setting native messaging host name to "${FS_NATIVE_MESSAGING_APP}"`);
            }
            else {
                this.#hostName = NativeMessagingHostName;
                logi(`Setting native messaging host name to "${NativeMessagingHostName}"`);
            }
            this.connect();
        });
    }

    get hostName() {
        return this.#hostName;
    }

    checkHostExists(name) {
        return new Promise((resolve) => {
            chrome.runtime.sendNativeMessage(name, {}, (response) => {
                logi(`Check that native messaging host ${name} exists: ${response ? "yes" : "no"}`);
                if (chrome.runtime.lastError) {
                    resolve(false);
                }
                if(response) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }

    setServerRestartedCallback(callback) {
        this.serverRestartedCallback = callback;
    }

    setSettingsChangedCallback(callback) {
        this.settingsChangedCallback = callback;
    }

    setBankingModeChangedCallback(callback) {
        this.bankingModeChangedCallback = callback;
    }

    setOnPortDisconnectCallback(callback) {
        this.onPortDisconnectCallback = callback;
    }

    setConnectedCallback(callback) {
        this.onConnectedCallback = callback;
    }

    onInitialized() {
        logd(`Background script is initialized. Sending ${this.#messagesPendingInit.length} pending messages.`);
        this.#initialized = true;
        this.#messagesPendingInit.forEach(message => {
            this.#port.postMessage(message);
        });
        this.#messagesPendingInit = [];
    }

    #shouldConnectToHost() {
        const now = new Date().getTime();
        if (this.#lastConnectionTime !== 0 && 
            (now - this.#lastConnectionTime) < this.#reconnectLimitMilliseconds && 
            this.#failedConnectionCount > this.#reconnectUpperLimit) {
            console.debug(`More than ${this.#reconnectUpperLimit} connection attemps in ${this.#reconnectLimitMilliseconds/1000} seconds, ignoring.`);
            return false;
        }

        console.debug(`Will connect to native messaging host. Failed count: ${this.#failedConnectionCount}`);
        return true;
    }

    #resetFailedConnectState() {
        this.#failedConnectionCount = 0;
    }

    #getPlatform() {
        return new Promise(resolve => {
            if (this.#platform) {
                resolve(this.#platform);
                return;
            }
            chrome.runtime.getPlatformInfo(platform => {
                this.#platform = platform;
                resolve(platform);
            });
        });
    }

    async #onMessage(response) {
        const platform = await this.#getPlatform();
        if (platform.os === 'mac') {
            this.onConnectedCallback();
        } else if (response.server) {
            this.onConnectedCallback();
        }
    }

    connect() {
        if (!this.#shouldConnectToHost()) {
            return;
        }
        this.#lastConnectionTime = new Date().getTime();
        const onMessage = response => {
            this.#onMessage(response);
            this.#resetFailedConnectState(); // reset fail state when successfully receiving response from the host
            if (response.id == "settings" || "settings" in response) { // special settings message, not received as a response to sent message
                logd("Received settings:", response.settings);
                if (this.settingsChangedCallback) {
                    this.settingsChangedCallback(response.settings);
                }
            }
            if (response.id == "bankingSession") {
                logd("Banking mode is changed to:", response.bankingSession);
                if (this.bankingModeChangedCallback) {
                    this.bankingModeChangedCallback(response.bankingSession);
                }
            }
            else {
                if (typeof response.server != "undefined") {
                    if (response.server != this.serverId) {
                        this.serverId = response.server;
                        logd("Server ID changed to", this.serverId);
                        if (this.serverRestartedCallback) {
                            this.serverRestartedCallback();
                        }
                    }
                }
                
                const found = this.#pendingResponses.findIndex(item => item.id === response.id);
                if (found !== -1) {
                    logd(`Received message, id: ${response.id}`, response);
                    this.#pendingResponses[found].callback(response);
                    this.#pendingResponses.splice(found, 1); // Remove pending response
                }
            }
        };

        if (this.#hostName) {
            this.#port = chrome.runtime.connectNative(this.#hostName);
            this.#port.onMessage.addListener(onMessage);
            this.#port.onDisconnect.addListener(() => {
                if (self.onPortDisconnectCallback) {
                    self.onPortDisconnectCallback();
                }
                this.#port = null;
                this.#failedConnectionCount++;
                this.#clearMessageQueue();
            });
        }
        else {
            console.warn('Native messaging host name is not set. Cannot connect to the native messaging host');
        }
    }

    postMessage(message) {
        return new Promise((resolve) => {
            const callback = response => {
                resolve(response);
            };

            if (!this.#port) {
                this.connect();
            }

            const id = ++this.id;
            if (this.#port) {
                message.id = id;
                this.#pendingResponses.push({ id, callback });
                this.#postMessageIfAllowed(message);
                // do not log logging calls
                if (message.type != "log") {
                    logd(`Sending "${message.type}" message, id: ${message.id}`, message);
                }  
            } else {
                console.error('Port missing. Not sending message to the native messaging host');
                this.#generateEmptyResponse(id, callback);
            }
        });
    }

    #postMessageIfAllowed(message) {
        // we start listening for navigation events immediately when the background script is loaded to avoid losing any events
        // this check is needed to prevent sending messages to the host before extension initialization is complete
        // events listed below can cause the extension to show a block page which needs customization details which are not available until initialization is complete
        // events are stored in the pendingMessages array until the extension signals that initialization is complete
        const typesPendingInitialization = [
            MessageName.ScanRequest,
            MessageName.ORSPInfo,
            MessageName.RatingRequest
        ];
        if (!this.#initialized && typesPendingInitialization.includes(message.type)) {
            console.debug(`Message type ${message.type} is pending initialization`);
            this.#messagesPendingInit.push(message);
        }
        else {
            this.#port.postMessage(message);
        }
    }
    
    isServerIdValid() {
        return this.serverId != "";
    }

    #clearMessageQueue() {
        this.#pendingResponses.forEach(pendingResponse => {
            this.#generateEmptyResponse(pendingResponse.id, pendingResponse.callback);
        });
    }

    #generateEmptyResponse(id, callback) {
        const emptyResponse = {
            id: id
        };
        callback(emptyResponse);
    }
}

const NativeHost = new NativeMessagingHost();