if (typeof browser == "undefined") {
    var browser = chrome;
}

// Setting change setting storage
(async () => {
    let store_settings = null;
    let use_anonymous_tokens = null;
    let permissions_granted = false;
    let inkognito_allowed = false;
    let checkbox_store_settings = document.querySelector("#store-settings-switch");
    let checkbox_anonymous_tokens = document.querySelector("#anonymous-tokens-switch");
    let inkognito_settings_container = document.querySelector("#inkognito");

    let urls = [];
    let origins = [];
    let hosts = [];
    browser.runtime.getManifest().host_permissions.forEach((value, index) => {
        urls.push(value);
        let url = new URL(value);
        hosts.push(url.host);
        origins.push(url.origin);
    });
    let permissions = browser.runtime.getManifest().permissions;

    await initializeSettingsState();

    /** Handle User initiated setting state change */
    checkbox_store_settings.addEventListener("click", e => {
        e.preventDefault();
        updateSettingState(checkbox_store_settings.checked, null);
    });
    checkbox_anonymous_tokens.addEventListener("click", e => {
        e.preventDefault();
        updateSettingState(null, checkbox_anonymous_tokens.checked);
    });

    /**
     * Handle incoming changes in setting state
     * Also used when the user changes setting state
     * Update in setting will only happen if the underlying
     * storage changed aswell
     **/
    browser.storage.onChanged.addListener(async (changes, areaName) => {
        let update = false;
        if (changes.hasOwnProperty("settings_store")) {
            let new_value = changes.settings_store.newValue;
            checkbox_store_settings.checked = new_value;
            store_settings = new_value;
            update = true;
        }
        if (changes.hasOwnProperty("use_anonymous_tokens")) {
            let new_value = changes.use_anonymous_tokens.newValue;
            checkbox_anonymous_tokens.checked = new_value;
            use_anonymous_tokens = new_value;
            update = true;
        }
        if (update) {
            showSettingsState();
        }
    });

    /**
     * Handle changes in extension permissions
     * Settings will be disabled if the extension does not
     * have the required permissions
     * => Update/Reinitialize current setting state when app permissions
     *      change
     */
    browser.permissions.onAdded.addListener(async (permissions) => {
        permissions_granted = await verifyPermissions();
        showSettingsState();
        return;
    });
    browser.permissions.onRemoved.addListener(async (permissions) => {
        permissions_granted = await verifyPermissions();
        showSettingsState();
        return;
    });

    /**
     * Validates if the Extension has required permissions. Optionally requests those permissions from the user
     * 
     * @param {boolean} request Should Permissions be requested from the user. Will only work on user initiated events
     * @returns 
     */
    async function verifyPermissions(request = false) {
        let permissionsToRequest = {
            origins: urls,
            permissions: permissions
        };
        if (request) {
            return browser.permissions.request(permissionsToRequest);
        } else {
            return browser.permissions.contains(permissionsToRequest);
        }
    }

    /**
     * Loads the current settings from browser storage and
     * verifies current permission state
     */
    async function initializeSettingsState() {
        // Update permissions state
        permissions_granted = await verifyPermissions();
        // Initialize stored settings
        let synced_settings = await browser.storage.sync.get({
            settings_store: true,
            use_anonymous_tokens: true,
        });

        store_settings = synced_settings.settings_store;
        use_anonymous_tokens = synced_settings.use_anonymous_tokens;
        inkognito_allowed = await browser.extension.isAllowedIncognitoAccess();

        showSettingsState();
    }

    /**
     * Updates the interface to reflect the current settings state
     * which is stored in local variables.
     */
    function showSettingsState() {
        checkbox_store_settings.checked = store_settings && permissions_granted;
        checkbox_anonymous_tokens.checked = use_anonymous_tokens && permissions_granted;
        if (inkognito_allowed) {
            inkognito_settings_container.style.display = "none";
        } else {
            inkognito_settings_container.style.display = null;
        }
    }

    /**
     * Triggers an update for the currently used settings
     * this function is triggered by a user action when he
     * changes settings through the interface.
     * 
     * @param {boolean} store_settings Store MetaGer Websearch settings within extension
     * @param {boolean} use_anonymous_tokens Use anonymous token authentication instead of key authentication
     * @returns 
     */
    async function updateSettingState(store_settings, use_anonymous_tokens) {
        let new_settings = {};
        if (store_settings != null) new_settings["settings_store"] = store_settings;
        if (use_anonymous_tokens != null) new_settings["use_anonymous_tokens"] = use_anonymous_tokens;
        inkognito_allowed = await browser.extension.isAllowedIncognitoAccess();

        if (store_settings == true || use_anonymous_tokens == true) {
            return verifyPermissions(true).then(granted => {
                permissions_granted = granted;
                if (permissions_granted) {
                    return browser.storage.sync.set(new_settings);
                }
            })
        } else {
            return browser.storage.sync.set(new_settings);
        }
    }
})();

