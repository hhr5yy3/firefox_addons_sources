let permissions_granted = null;
let key = null;
let charge = 0;
let anonymous_token = 0;
let anonymous_decitoken = 0;
let urls = [];
let origins = [];
let hosts = [];

let permissions = browser.runtime.getManifest().permissions;

if (typeof browser == "undefined") {
    var browser = chrome;
}
(() => {
    browser.runtime.getManifest().host_permissions.forEach((value, index) => {
        urls.push(value);
        let url = new URL(value);
        hosts.push(url.host);
        origins.push(url.origin);
    });
    initialize();
})();

/**
 * Watch for changes in key status or token charge
 * and update the interface accordingly
 */
browser.storage.onChanged.addListener(async (changes, areaName) => {
    let update = false;
    if (changes.hasOwnProperty("key")) {
        let new_value = changes.key.newValue;
        key = new_value;
        await fetch_key_charge().then(key_charge => {
            charge = key_charge;
        }).catch(error => { }); // The request might fail when permissions are missing
        update = true;
    }
    if (changes.hasOwnProperty("anonymous_tokens")) {
        let new_value = changes.anonymous_tokens.newValue;
        anonymous_token = new_value.tokens.length;
        update = true;
    }
    if (changes.hasOwnProperty("anonymous_decitokens")) {
        let new_value = changes.anonymous_decitokens.newValue;
        anonymous_decitoken = new_value.tokens.length;
        update = true;
    }
    if (changes.hasOwnProperty("anonymous_tokens_key_charge")) {
        let new_value = changes.anonymous_tokens_key_charge.newValue;
        charge = new_value;
        update = true;
    }
    if (update) {
        updateStatus();
    }
});

/**
* Handle changes in extension permissions
*/
browser.permissions.onAdded.addListener(async (permissions) => {
    return initialize();
});
browser.permissions.onRemoved.addListener(async (permissions) => {
    return initialize();
});

/**
 * Fetches the current charge for the configured key
 * 
 * @returns {Promise<number>}
 */
async function fetch_key_charge() {
    return browser.runtime.sendMessage({ type: "key", action: "getcharge" }).then(response => {
        if (response && response.status == "ok") {
            return response.data.charge;
        } else {
            return 0;
        }
    });
}

/**
 * If the Webextension has necessary host permissions
 *  1. Query Info about key charge and anonymous token and store those locally
 *  2. Update the Interface accordingly
 * 
 * => If permissions are missing the interface for those informations will be hidden
 * @returns 
 */
async function initialize() {
    let permissionsToRequest = {
        origins: urls,
        permissions: permissions
    };
    // Initialize state
    return browser.permissions.contains(permissionsToRequest)
        .then(async granted => {
            permissions_granted = granted;
            return browser.storage.sync.get({ key: null })
        })
        .then(async storage => {
            if (!storage) return;
            return get_token_status().then(async () => {
                if (storage.key) {
                    // Update key charge
                    key = storage.key;
                    return fetch_key_charge().then(async key_charge => {
                        charge = key_charge;
                        return browser.storage.local.set({ anonymous_tokens_key_charge: charge });
                    }).catch(async error => {
                        // We probably do not have permission to access
                        // this origin.
                        key = null;
                    });
                }
            });
        }).then(() => updateStatus());
}


/**
 * Retrieves and update the token status
 * Fetches anonymous token count and eventually keycharge
 * 
 * @returns 
 */
async function get_token_status() {
    return browser.storage.local.get({ anonymous_tokens: { tokens: [] }, anonymous_decitokens: { tokens: [] }, anonymous_tokens_key_charge: 0 }).then(storage => {
        anonymous_token = storage.anonymous_tokens.tokens.length;
        anonymous_decitoken = storage.anonymous_decitokens.tokens.length;
        charge = storage.anonymous_tokens_key_charge;
    });
}

/**
 * Update the interface according to the locally stored informations
 * this includes key charge and the number of anonymous tokens
 * 
 * @returns 
 */
function updateStatus() {
    let key_status_container = document.querySelector("#token-amount");

    if (permissions_granted) {
        document.querySelector("#anonymous-tokens .description .status").classList.remove("hidden");
        document.querySelector("#anonymous-tokens .description .actions").classList.remove("hidden");
    } else if (anonymous_token == 0) {
        document.querySelector("#anonymous-tokens .description .status").classList.add("hidden");
        document.querySelector("#anonymous-tokens .description .actions").classList.add("hidden");
        return;
    }

    let anonymous_token_container = document.querySelector("#anonymous-token-amount");

    let manage_key = document.getElementById("manage-key");
    let setup_key = document.getElementById("setup-key");

    if (key != null || anonymous_token > 0 || anonymous_decitoken > 0) {
        key_status_container.textContent = charge
        anonymous_token_container.textContent = anonymous_token + parseFloat((anonymous_decitoken / 10.0).toFixed(1));
        document.querySelector("#anonymous-tokens .status").classList.remove("hidden");
        setup_key.classList.add("hidden");
        manage_key.classList.remove("hidden");
    } else {
        document.querySelector("#anonymous-tokens .status").classList.add("hidden");
        setup_key.classList.remove("hidden");
        manage_key.classList.add("hidden");
    }
}