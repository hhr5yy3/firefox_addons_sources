class SyncedStorage {
    /**
     * Get browser context.
     * Gets chrome context as default but if browser
     * variable (only firefox) is available it will be used instead.
     */
    getContext = () => {
        try {
            if (process.env.VITEST) {
                return {
                    storage: {
                        local: {
                            get: (k, c) => c(k),
                            set: () => null,
                        },
                    },
                };
            }
        }
        catch (error) {
            // Do nothing.
        }
        return chrome;
    };
    /**
     * Sync remote and local storage.
     * Only sync if remote last sync timestamp is newer than local last sync timestamp.
     * If so the remote configuration will be stored in the local storage.
     * @param event
     */
    async sync(event) {
        chrome.storage.local.get(['synced-storage'], (items) => {
            const syncedStorage = this.getJsonObject(items['synced-storage']);
            const payload = event?.payload;
            const remoteLastSyncTimestamp = payload?.lastSyncTimestamp || 0;
            const localLastSyncTimestamp = syncedStorage?.lastSyncTimestamp || 0;
            if (remoteLastSyncTimestamp >= localLastSyncTimestamp) {
                const newSyncedStorage = { ...syncedStorage, ...payload };
                this.getContext().storage.local.set({ 'synced-storage': newSyncedStorage });
            }
        });
    }
    /**
     * Store configuration on local storage and remote storage within auteon portal.
     * This method will store the configuration on the local storage first.
     * Then it will emit an event to store the configuration on the portal.
     * After the configuration is stored on the portal, the local storage will be updated.
     * This method is used to ensure that the configuration is stored on the portal.
     * @param syncedStorage
     */
    async storeConfiguration(syncedStorage) {
        // Store on local storage first.
        syncedStorage.lastSyncTimestamp = Date.now();
        await this.getContext().storage.local.set({ 'synced-storage': syncedStorage });
        // Emit event to store configuration on the portal and update local storage.
        await eventBus.emitAuteonPortalEvent({ name: 'store-configuration', payload: syncedStorage, silent: true }, async (event) => {
            const configuration = this.getJsonObject(event.response);
            await this.getContext().storage.local.set({ 'synced-storage': configuration });
        });
    }
    /**
     * Get json object from value.
     * If value is not an object, return empty object.
     * This method is used to ensure that the value is an object.
     * @param value
     * @private
     */
    getJsonObject(value) {
        try {
            const json = JSON.parse(JSON.stringify(value));
            return typeof json === 'object' ? json : {};
        }
        catch (error) {
            return {};
        }
    }
    /**
     * Get value from synced storage.
     * @param key
     */
    async get(key) {
        return new Promise((resolve) => {
            this.getContext().storage.local.get(['synced-storage'], (items) => {
                const syncedStorage = this.getJsonObject(items['synced-storage']);
                resolve(syncedStorage?.[key]);
            });
        });
    }
    /**
     * Get value from synced storage.
     * @param key
     * @param value
     */
    async contains(key, value) {
        return new Promise(async (resolve) => {
            const syncedStorageValue = await this.get(key);
            const containsValues = Array.isArray(syncedStorageValue) ? syncedStorageValue.includes(value) : false;
            resolve(containsValues);
        });
    }
    /**
     * Set new value to synced storage property.
     * @param key
     * @param value
     */
    async set(key, value) {
        return new Promise((resolve) => {
            this.getContext().storage.local.get(['synced-storage'], (items) => {
                const syncedStorage = this.getJsonObject(items['synced-storage']);
                const newSyncedStorage = { ...syncedStorage, [key]: value };
                this.storeConfiguration(newSyncedStorage);
                resolve(newSyncedStorage?.[key]);
            });
        });
    }
    /**
     * Remove value from synced storage property.
     * @param key
     */
    async remove(key) {
        return new Promise((resolve) => {
            this.getContext().storage.local.get(['synced-storage'], (items) => {
                const syncedStorage = this.getJsonObject(items['synced-storage']);
                delete syncedStorage[key];
                this.storeConfiguration(syncedStorage);
                resolve(true);
            });
        });
    }
    /**
     * Add new value to existing synced storage property.
     * @param key
     * @param value
     */
    async add(key, value) {
        return new Promise((resolve) => {
            this.getContext().storage.local.get(['synced-storage'], (items) => {
                const syncedStorage = this.getJsonObject(items['synced-storage']);
                const newValue = Array.isArray(syncedStorage[key]) ? [...syncedStorage[key], value] : [value];
                const newSyncedStorage = { ...syncedStorage, [key]: newValue.filter((v, i, a) => a.indexOf(v) === i) };
                this.storeConfiguration(newSyncedStorage);
                resolve(newSyncedStorage?.[key]);
            });
        });
    }
    /**
     * Drop a value from existing synced storage property.
     * @param key
     * @param value
     */
    async drop(key, value) {
        return new Promise((resolve) => {
            this.getContext().storage.local.get(['synced-storage'], (items) => {
                const syncedStorage = this.getJsonObject(items['synced-storage']);
                const newValue = Array.isArray(syncedStorage[key]) ? [...syncedStorage[key]] : [];
                const newSyncedStorage = { ...syncedStorage, [key]: newValue.filter((v) => v !== value) };
                this.storeConfiguration(newSyncedStorage);
                resolve(newSyncedStorage?.[key]);
            });
        });
    }
}
const syncedStorage = new SyncedStorage();

class EventBus {
    focusNextUnauthorizedTab = false;
    pendingEvents = {};
    callbacks = new Map();
    constructor() {
        this.listenForCallback();
    }
    /**
     * Get browser context.
     * Gets chrome context as default but if browser
     * variable (only firefox) is available it will be used instead.
     */
    getContext = () => {
        try {
            // @ts-ignore
            if (process.env.VITEST)
                return { runtime: { onMessage: { addListener: () => null } } };
        }
        catch (error) {
            // Do nothing.
        }
        // Use chrome context as default.
        let context = chrome;
        try {
            // @ts-ignore
            // Try to get browser context.
            if (browser)
                context = browser;
        }
        catch (error) {
            // Do nothing.
        }
        return context;
    };
    /**
     * Listen for callback events.
     * Will listen for auteon plugin events and call the
     * corresponding callback function if available.
     */
    listenForCallback = () => {
        this.getContext().runtime.onMessage.addListener((event) => {
            if (['response', 'plugin-response'].includes(event.type) && event.identifier && this.callbacks.has(event.identifier)) {
                // Call the callback function on origin tab.
                this.callbacks.get(event.identifier)?.(event);
                // Only delete the callback if the event was not unauthorized.
                if (event.status !== 'unauthorized') {
                    this.callbacks.delete(event.identifier);
                }
            }
        });
    };
    /**
     * Generate an identifier for the callback function.
     * Will store the callback function in a map with the identifier as key.
     * It's required for easy handling response events while using
     * the `emitAuteonPortalEvent` method.
     * @param callback
     */
    generateIdentifier = (callback) => {
        const identifier = Math.random().toString(36).substring(2);
        this.callbacks.set(identifier, callback);
        return identifier;
    };
    /**
     * Handle service worker events.
     * If the event is type of request it will forward the event to the auteon portal tab.
     * If the event is type of response it will forward the event to the origin tab.
     * @param event
     * @param sender
     */
    handleServiceWorkerEvents = async (event, sender) => {
        console.log(`service worker ${event.type.toUpperCase()}: ${event.identifier} - ${event.name}`);
        if (event.type === 'request') {
            // Handle service worker request event.
            return this.handleServiceWorkerRequestEvent(event, sender);
        }
        else if (event.type === 'response' && event.status === 'unauthorized') {
            // Handle service worker response event.
            return this.handleServiceWorkerUnauthorizedEvent(event, sender);
        }
        else if (event.type === 'response' && event.name === 'initialized') {
            // Handle service worker response event.
            return this.handleServiceWorkerInitializedEvent(sender);
        }
        else if (event.type === 'response' && event.name === 'configuration') {
            // Handle service worker response event.
            return this.handleServiceWorkerConfigurationEvent(event);
        }
        else if (event.type === 'response') {
            // Handle service worker response event.
            return this.handleServiceWorkerResponseEvent(event, sender, true);
        }
    };
    /**
     * Handle service worker request event.
     * Will search for an open auteon portal tab and send the event to it.
     * If no tab is found, a new tab will be opened.
     * @param event
     * @param sender
     */
    handleServiceWorkerRequestEvent = async (event, sender) => {
        // Get all open tabs.
        const context = this.getContext();
        const tabs = await context.tabs.query({});
        const frontendUrl = String("https://portal.auteon.com");
        const onlyNewTab = await syncedStorage.get('performSearchMode') === 'new-tab';
        const useExistingTab = !onlyNewTab || !!event?.silent;
        // Allow to focus the next unauthorized tab.
        this.focusNextUnauthorizedTab = true;
        // Only use existing tab if user has not forced to new-tab setting
        // or current event is silent event.
        if (useExistingTab) {
            // Try to find an open auteon portal tab.
            for (const tab of tabs) {
                if (tab?.id && tab?.url && tab.url.startsWith(frontendUrl)) {
                    // Store the pending event for matching tab with the origin tab id.
                    this.pendingEvents[tab.id] = { ...event, tabId: sender?.tab?.id };
                    try {
                        // Focus the tab and the window if the event should be focused.
                        if (event?.focus) {
                            await context.tabs.update(tab.id, { active: true });
                            await context.windows.update(tab.windowId, { focused: true });
                        }
                        // Send the event to the auteon portal tab.
                        return await context.tabs.sendMessage(tab.id, {
                            ...event, tabId: sender?.tab?.id,
                        }, { frameId: 0 });
                    }
                    catch (error) {
                        // Reload the tab if the event could not be sent.
                        return await this.getContext().tabs.reload(tab.id);
                    }
                }
            }
        }
        // Only open a new tab if the event is not silent.
        if (!event?.silent) {
            // Open a new auteon portal tab.
            this.getContext().tabs.create({ url: frontendUrl, active: !!event?.focus }, async (tab) => {
                // Store the pending event for new tab with the origin tab id.
                if (tab?.id)
                    this.pendingEvents[tab.id] = { ...event, tabId: sender?.tab?.id };
            });
        }
    };
    /**
     * Handle service worker unauthorized event.
     * Will tell the origin tab that auteon portal needs to be logged in.
     * The tab with the auteon login page will be focused.
     * @param event
     * @param sender
     */
    handleServiceWorkerUnauthorizedEvent = async (event, sender) => {
        // Get the pending event for current related tab.
        const pendingEvent = sender?.tab?.id
            ? this.pendingEvents?.[sender.tab.id]
            : null;
        // Focus the tab with the auteon login page.
        if (sender?.tab?.id && this.focusNextUnauthorizedTab && !pendingEvent?.silent) {
            await this.getContext().tabs.update(sender?.tab?.id, { active: true });
            this.focusNextUnauthorizedTab = false;
        }
        // Forward the event to the origin tab.
        await this.handleServiceWorkerResponseEvent(event, sender, false);
        // Tell the origin tab that auteon portal needs to be logged in.
        if (pendingEvent?.tabId) {
            await this.getContext().tabs.sendMessage(pendingEvent.tabId, { ...pendingEvent, type: 'response', status: 'unauthorized' }, { frameId: 0 });
        }
    };
    /**
     * Handle service worker initialized event.
     * Is called when auteon portal is ready to receive events.
     * If so it will forward the pending event to the auteon portal again.
     * @param sender
     */
    handleServiceWorkerInitializedEvent = async (sender) => {
        // Get the pending event for current related tab.
        const pendingEvent = sender?.tab?.id
            ? this.pendingEvents?.[sender.tab.id]
            : null;
        // Forward the pending event to the auteon portal.
        if (sender?.tab?.id && pendingEvent) {
            await this.getContext().tabs.sendMessage(sender.tab.id, pendingEvent, { frameId: 0 }).finally(() => {
                if (sender?.tab?.id) {
                    delete this.pendingEvents[sender.tab.id];
                }
            });
        }
    };
    /**
     * Silently request plugin configuration.
     * Will request the plugin configuration without
     * opening a new tab if no tab is found after plugin is initialized.
     * This method is called by the service worker.
     */
    silentlyRequestPluginConfiguration = () => {
        eventBus.handleServiceWorkerRequestEvent({
            type: 'request',
            name: 'load-configuration',
            identifier: 'global',
            status: 'pending',
            focus: false,
            silent: true,
        }, {}).catch(() => {
            console.log('service worker: silent request plugin configuration failed');
        });
    };
    /**
     * Handle service worker configuration event.
     * Will store the configuration in the synced storage.
     * This method is called by the service worker.
     * It will store the configuration in the synced storage.
     * @param event
     */
    handleServiceWorkerConfigurationEvent = async (event) => {
        await syncedStorage.sync(event);
    };
    /**
     * Handle service worker response event.
     * Will forward the event to the origin tab which
     * emitted the origin request event.
     * @param event
     * @param sender
     * @param clearPendingEvent
     */
    handleServiceWorkerResponseEvent = async (event, sender, clearPendingEvent) => {
        if (clearPendingEvent && sender?.tab?.id) {
            delete this.pendingEvents[sender.tab.id];
        }
        // If origin tab is not the sender tab, change the event type to `plugin-response`.
        // This is required to avoid an infinite loop of events between service worker and tab.
        if (event?.tabId === sender?.tab?.id) {
            event.type = 'plugin-response';
        }
        // Check if event has response url.
        // If so send event to open url in the auteon tab.
        if (event?.response?.url && sender?.tab?.id) {
            const auteonPluginEvent = { name: 'open-url', identifier: 'global', type: 'request', status: 'pending', payload: event.response.url };
            await this.getContext().tabs.sendMessage(sender.tab.id, auteonPluginEvent, { frameId: 0 });
        }
        if (event?.tabId) {
            await this.getContext().tabs.sendMessage(event.tabId, event, { frameId: 0 });
        }
    };
    /**
     * Handle request event.
     * This event is triggered by the service worker
     * and will forward the event to the auteon portal.
     * @param event
     */
    handleAuteonPortalRequestEvent = (event) => {
        const eventDetail = { detail: JSON.stringify(event) };
        const customEvent = new CustomEvent('plugin:request', eventDetail);
        if (event.type === 'request')
            document.body?.dispatchEvent(customEvent);
    };
    /**
     * Handle response event.
     * This event is triggered by the auteon portal
     * and will forward the event to the service worker.
     * @param event
     */
    handleAuteonPortalResponseEvent = async (event) => {
        try {
            const customEvent = event;
            const auteonPluginEvent = { ...JSON.parse(customEvent.detail), type: 'response' };
            await this.getContext().runtime.sendMessage(auteonPluginEvent);
        }
        catch (error) {
            console.log('service worker response invalid', event);
        }
    };
    /**
     * Emit an event to the auteon portal.
     * Will search for an open auteon portal tab and send the event to it.
     * If no tab is found, a new tab will be opened.
     * @param event
     * @param callback
     */
    emitAuteonPortalEvent = async (event, callback) => {
        const fallbackEvent = () => true;
        const identifier = this.generateIdentifier(callback || fallbackEvent);
        const auteonPluginEvent = { ...event, identifier, type: 'request', status: 'pending' };
        await this.getContext().runtime.sendMessage(auteonPluginEvent);
    };
    /**
     * Clear all callbacks.
     * Will clear all stored callback functions. This is required
     * while tooltip is closed and no response is expected anymore.
     */
    clearCallbacks = () => {
        this.callbacks.clear();
    };
}
const eventBus = new EventBus();

export { eventBus as e, syncedStorage as s };
