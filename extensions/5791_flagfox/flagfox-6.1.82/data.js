"use strict";

const prefs_store = browser.storage.local;

const prefs_userData = new Map();
const prefs_defaultData = new Map([
    ["useractions","[]"],  // Fetched separately on load (async)
    ["showfavicons",true],
    ["openactionsin","tabF"],
    ["warn.proxy","enabled"],
    ["warn.stale","enabled"],
    ["warn.tld","once"]
]);

let actions_list = [];  // Loaded actions list (array of {name, template} with optional properties {iconclick, hotkey, show, custom})

let actions_hotKeys = new Map();    // command ID -> action ID
let actions_hotClicks = new Map();  // click type -> action ID

let actions_refresh_in_progress = null;  // holds an unresolved promise object if an actions.refresh() is in progress; null otherwise

let actions_hotkey_migrated = false;

const favicons_defaults_nonstandard = new Map();  // From defaultactions.json

//BEGIN STORAGE HANDLING ******************************************************
//{{{

function loadAllData() {
    const onError = ((m,e) => console.error("Flagfox load error " + m + ":", e));
    // First, load the user data from WebExt storage and load the default actions JSON file (in parallel)
    return Promise.all([
        fetch("/defaultactions.json")  // First in array for ease of destructuring the resolved value
             .then(response => response.json())
             .catch(e => onError("loading defaultactions.json", e)),
        prefs.load()
             .catch(e => onError("loading prefs from storage", e))
    ])
    .then(([actions_list_default]) => actions.load("useractions", actions_list_default))
    .catch(e => onError("loading actions from pref", e))
    .then(migrateOldFlagfoxPrefs)
    .catch(e => onError("migrating old prefs", e));
}

var prefs =  // NOTE: Declared with var to expose via browser.extension.getBackgroundPage()
{
    load() {  // Returns a promise that resolves upon completion
        return prefs_store.get(null)  // Gets everything to be cached, rather than one piece at a time in async hell
              .then(data => {
                  for (let name in data)
                      prefs.set(name, data[name], false);  // save=false, as we want to avoid saving what we're just now loading
              });
    },

    save() {
        let dataToStore = {};
        for (let name of prefs_userData.keys())  // WebExtension storage prefs that have been reset to default are simply dropped
            dataToStore[name] = prefs_userData.get(name);
        prefs_store.clear();
        prefs_store.set(dataToStore);
    },

    reset(arg) {  // Takes a pref name string or array of strings, resets all of them, and saves once on the last entry
        maybeArray(arg).forEach((name, i, a) => prefs.set(name, undefined, i === a.length-1));
    },

    resetAll() {  // Resets all Flagfox settings to defaults (CAUTION: Nukes everything)
        prefs_userData.clear();
        return prefs_store.clear().then(loadAllData);  // Reload all data to make changes take effect (returns a promise)
    },

    get(name) {
        //assert(isNonEmptyString(name), "prefs.get() requires a pref name string!", name);
        const currentValue = prefs_userData.get(name);
        return currentValue !== undefined ? currentValue : prefs_defaultData.get(name) ;
    },

    set(name, value, save=true) {
        assert(isNonEmptyString(name), "prefs.set() requires a pref name string!", name, value);
        if (value === prefs_defaultData.get(name) || (!value && value !== false))  // value=null/undefined clears
            prefs_userData.delete(name);  // Clear the current value (if one exists) and make get() use the default value (if one exists)
        else
            prefs_userData.set(name, value);
        if (save)
            prefs.save();
    },

    getDefault(name) {
        //assert(isNonEmptyString(name), "prefs.getDefault() requires a pref name string!", name);
        return prefs_defaultData.get(name);
    },

    setDefault(name, value) {  // Only persists until end of session (primarily for loading default actions from a separate file)
        assert(isNonEmptyString(name), "prefs.setDefault() requires a pref name string!", name, value);
        prefs_defaultData.set(name, value);
    },

    hasUserValue(name) {
        //assert(isNonEmptyString(name), "prefs.hasUserValue() requires a pref name string!", name);
        return prefs_userData.has(name);
    },

    all() {  // Returns an object representing all prefs, defaults and/or user-set (with user overriding default), with JSON prefs parsed for easier debugging
        return [...(new Map([...prefs_defaultData, ...prefs_userData]))]
                    .sort()
                    .reduce(((output, [name, value]) => {
                        try { output[name] = JSON.parse(value); }
                        catch { output[name] = value; }
                        return output;
                    }), {});
    }
};

function migrateOldFlagfoxPrefs()  // Called after prefs and actions load on startup; migrates prefs brought over from Flagfox 5.2.x to 6.0.x to 6.1.x
{
    // The open in pref was simplified slightly and renamed for Flagfox 6
    if (prefs.hasUserValue("openlinksin")) {
        const openlinksin_migration = { "tabFG":"tabF", "tabBG":"tabB", "currentTab":"tabC", "winFG":"winF", "winBG":"winB" };
        const oldPrefValue = prefs.get("openlinksin");
        prefs.set("openactionsin", openlinksin_migration[oldPrefValue]);
        console.log("Flagfox 5 action open pref migrated");
    }

    // The flag width customization pref was removed for Flagfox 6, as the API no longer supports it (and it was hidden and rarely used, anyway)
    if (prefs.hasUserValue("maxflagwidth")) {
        prefs.reset("maxflagwidth");
        console.log("Flagfox 5 flag width customization pref dropped due to lack of support under Firefox 57+");
    }

    // This ensures single/double/tripple click have something set for them, setting to default, if not
    // NOTE: This section is only applicable if user cusomized actions exist and one of them had the old-style hotkey format (converted on unpack)
    if (actions_hotkey_migrated && prefs.hasUserValue("useractions")) {
        console.log("Old Flagfox hotkey save format converted to Flagfox 6.1+ hotkey save format for Firefox 60+ support");

        const DefaultAction = (n => actions.getDefaultActionIdByName(n));
        const MouseBinding  = (i => actions.getMouseBoundActionID(i));

        // Normal setters are used to make sure duplicates are not accidentally set
        actions.setBindings(DefaultAction("Geotool"), { hotkey: "Alt+Shift+G" });
        console.log("Old Geotool hotkey migrated to Alt+Shift+G due to limited hotkey support under Firefox 57+");

        // Make sure there's something set for all hotclicks, user or default
        if (!MouseBinding("click"))
            actions.setBindings(DefaultAction("Geotool"), { hotclick: "click" });
        if (!MouseBinding("doubleclick"))
            actions.setBindings(DefaultAction("Check Server Status"), { hotclick: "doubleclick" });
        if (!MouseBinding("tripleclick"))
            actions.setBindings(DefaultAction("Google Cache"), { hotclick: "tripleclick" });
        console.log("New default doubleclick and tripleclick actions have been set (if no custom setting was already available)");

        actions.save();
        actions.refresh();
    }
}

//}}}
//BEGIN ACTIONS HANDLING ******************************************************
//{{{

var actions =  // NOTE: Declared with var to expose via browser.extension.getBackgroundPage()
{
    prefname : null,

    load(prefname, actions_list_default) {
        this.prefname = prefname;
        // Extract all properties set it defaultactions,json that get cached elsewhere (at the moment, just non-standard favicon locations)
        extractDefaultActionsMetadata(actions_list_default);
        // Cache the packed default actions so that the prefs system can compare it to saved user prefs and not save any actual data if they match
        prefs.setDefault(this.prefname, packActionsJSON(actions_list_default));
        // Unpack actions from pref, if available; if not, then the defaults get used
        actions_list = (prefs.hasUserValue(this.prefname) ? unpackActionsJSON(actions_list_default, prefs.get(this.prefname), true) : actions_list_default);
        // Lastly, load the menus and hotkeys/clicks to make things take effect
        this.ensureNonEmptyMenus();
        this.refresh();
    },

    save() {
        // Scan for and drop any invalid actions before saving
        this.validateAllActions();
        // Saved packed and stringified current actions list (saves nothing if this matches the defaults)
        prefs.set(this.prefname, packActionsJSON(actions_list));
    },

    refresh() {  // Makes changes to actions list take effect; must actions.save() to make changes persist after addon/application close
        // Multiple refreshes can happen in quick succession for a few different reasons, but there's no good way to abort a promise
        // An in-progress refresh's promise is held onto outside of this function to allow new calls to be done in series instead of parallel, avoiding conflicts/errors
        if (actions_refresh_in_progress !== null) {
            debugLog("actions.refresh() called before previous refresh completed; chaining...");
            return actions_refresh_in_progress.then(() => this.refresh());
        }
        const done = (() => void (actions_refresh_in_progress = null));
        // Reset menus so that everything will regen based on new actions state, when needed (async; will run alongside the below)
        const p1 = resetAllMenus();
        // Clear and (re-)enumerate all keyboard and icon click shortcuts
        actions_hotKeys.clear();
        actions_hotClicks.clear();
        for (let [ index, action ] of actions_list.entries()) {
            if (action.iconclick)                                // Hotclicks are handled through a simple listening for the click event
                actions_hotClicks.set(action.iconclick, index);  // Map of click combos to action IDs; used directly by listener
            if (action.hotkey)                                   // Hotkeys must be handled through the WebExt Commands API
                actions_hotKeys.set(action.hotkey, index);       // Map of key combos to action IDs; these must be registered first, below
        }
        // Registering the map of hotkey to action IDs returns a new map of binding command IDs to action IDs, which is then used for lookups on hotkey event
        const p2 = Hotkeys.registerAll(actions_hotKeys)
                          .then(newlyBoundHotkeys => { actions_hotKeys = newlyBoundHotkeys; });
        // Both menu creation and hotkey registration are async; the refresh is only fully completed once both promises resolve
        return actions_refresh_in_progress = Promise.all([p1,p2]).finally(done);
    },

    setBindings(id, bindingsObj) {  // NOTE: Must actions.refresh() to activate; Must actions.save() to make permenant
        let action = actions_list[id];
        this.assertValidAction(action);

        if ("hotclick" in bindingsObj) {         // If a new binding was specified, then set it
            const hotclick = bindingsObj.hotclick;
            for (let a of actions_list)
                if (a.iconclick == hotclick)     // Unset pre-existing first, if needed
                    a.iconclick = undefined;
            action.iconclick = maybe(hotclick);  // Set new (undefined clears)
        }

        if ("hotkey" in bindingsObj) {      // If a new binding was specified, then set it
            const hotkey = bindingsObj.hotkey;
            for (let a of actions_list)
                if (a.hotkey == hotkey)     // Unset pre-existing first, if needed
                    a.hotkey = undefined;
            action.hotkey = maybe(hotkey);  // Set new (undefined clears)
        }
    },

    getMouseBoundActionID(clickType) {
        return actions_hotClicks.get(clickType);
    },

    getKeyboardBoundActionID(bindingID) {
        return actions_hotKeys.get(bindingID);
    },

    getLocalizedName(action) {
        return action.custom ? Promise.resolve(action.name)
                             : lazyLoadPropertiesFile("actions")
                               .then(() => Promise.resolve(getLoadedString(getDefaultActionNameStringId(action.name))));
    },

    getLocalizedNameSync(action) {  // Getting sync before loading the needed file returns undefined
        return action.custom ? action.name
                             : getLoadedString(getDefaultActionNameStringId(action.name));
    },

    validateID(id) { return isIntegerInRange(id, 0, actions_list.length-1); },
    validateAction(action) { return isObject(action) && isNonEmptyString(action.name) && isNonEmptyString(action.template); },

    validateAllActions() {
        for (let i=actions_list.length-1; i>=0; i--) {  // Iterate backwards to allow for deletion without affecting the next indicies
            if (!this.validateAction(actions_list[i])) {
                debugError("invalid action in list!", actions_list[i]);
                actions_list.splice(i,1);  // Drop it from the list
            }
        }
    },

    assertValidAction(action) {
        assert(this.validateAction(action), "invalid action!", action);
    },

    ensureLoaded() {  // Returns a promise that completes as soon as actions have loaded (immediately, or within timeout)
        return wait(() => isNonEmptyArray(actions_list));
    },

    ensureNonEmptyMenus() {  // NOTE: Only checked on startup
        if (!actions_list.some(a => a.show)) {
            this.getDefaultActionByName("Geotool").show = true;
            this.save();
            console.warn("Flagfox detected no actions set to show in the menu on startup; enabling one default to avoid empty menus.");
        }
    },

    getDefaultActionIdByName(name) {
        for (let [id,action] of actions_list.entries())
            if (!action.custom && action.name === name)
                return id;
        return -1;
    },

    getDefaultActionByName(name) {
        return actions_list[this.getDefaultActionIdByName(name)];
    },

    getAllDefaultActions() {
        return actions_list.filter(a => !a.custom);
    },

    getById(id) { return actions_list[id]; },  // Get an action by its current ID (position in main array); IDs will change if an action is reordered

    create()           { return actions_list.push({custom:true})-1; },       // Create a new custom action at the end of the array and return its ID
    remove(id)         { return actions_list.splice(id,1)[0]; },             // Remove an action from the array and return the removed action
    insert(id, action) { actions_list.splice(id,0,action); },                // Insert an action into the array at a specific ID
    append(newactions) { actions_list = actions_list.concat(newactions); },  // Append an array of new actions onto the end of the existing array

    get length() { return actions_list.length; },

    getMenuVisibleActions() {
        return actions_list.filter(a => a.show);  // Return array of actions with show=true; the corresponding action IDs are obtainable via this.getActionIdsMap()
    },

    getActionIdsMap() {
        return new WeakMap(actions_list.map((v,i) => [v,i]));  // actions_list.entries() is backwards from what's needed here
    },

    isActionAllowed(id, location)  // Check if the given action allowed for the given location, in the current state
    {
        if (id === "options")
            return true;

        if (!this.validateID(id))
            return false;

        assert(isLocation(location), "actions.isActionAllowed() requires a location object!");

        const requires = queryTemplateRequirements(actions_list[id].template);

        // If the location isn't in a tab, then we can't run a content script in it (copystring will use this or whatever is current, if this has none)
        if (location.tabId === undefined && requires.content)
            return false;
        // Remote actions aren't going to work in offline-mode
        if (inOfflineMode() && requires.remote)
            return false;
        // If the current location is local but the action is remote, then prohibit sending non-portable info
        if (location.local && requires.remote && requires.nolocal)
            return false;
        // Check if it needs any property that we don't have for this location
        if (!location.host && requires.host)
            return false;
        if (!location.ip && requires.ip && !requires.host)  // Allow optional IP when also using host (i.e. Geotool behind a proxy)
            return false;
        if (!location.country && requires.country)
            return false;
        // Some pages have been banned for content scripts by Mozilla; disable non-functioning actions for them (copystring might be able to find another, but it can't be relied on)
        if (locationIsContentProtected(location) && requires.nolock)
            return false;

        return true;
    },

    doAction(id, location, openInOverride=undefined)  // Returns a promise (will resolve to a response from a content script, if applicable to the action)
    {
        if (id === "options")
            return browser.runtime.openOptionsPage();  // NOTE: Always opens in new foreground tab (no API to change this, but it's the desired behavior, anyway)

        if (!this.isActionAllowed(id, location))
            return Promise.reject(new Error("N/A"));

        // Do the things needed to do the action, in the needed order; each step returns a promise that resolves when completed, or an implicit resolved promise if not applicable
        let parsed;
        return parseTemplate(actions_list[id].template, location)
                            .then(rv => {
                                debugLog_events("action template parsed:", rv, location);
                                parsed = rv;
                                // Check if this is a Geotool action and set the abuse resistance cookie to identify this Flagfox version if it is
                                if (parsed.type === "url" && parseURL(parsed.value).host === GeotoolDomainName)
                                    return setGeotoolCookie();
                            })
                            .then(() => {
                                // Next, open the URL (if the parsed template needs it)
                                if (parsed.remote)
                                    return openURL(parsed.value, openInOverride);
                            })
                            .then(maybeTab => {
                                // Lastly, run the content script (if the parsed template needs it)
                                if (parsed.content)
                                    return runContentScript(parsed, (maybeTab ? maybeTab.id : location.tabId));  // May or may not have a tab ID (either new or for location)
                            })
                            .catch(e => console.error("Flagfox error attempting to do action:", e, actions_list[id], location));
    }
};

//}}}
//BEGIN CONTENT PROTECTED DOMAIN HANDLING *************************************
//{{{

// HACK WARNING: Mozilla put a hex on these domains; this stupid voodoo prevents content scripts from being injectable there, regardless of permissions
const ContentProtectedDomains = ["addons.mozilla.org", "testpilot.firefox.com"];

// This checks for hosts on the above list, including their subdomains, as well as locations on protocols entirely banned for content scripts
function locationIsContentProtected({host, protocol}) {  // Takes a Location object or the output of parseURL()
    return !host || !protocol ||
           protocol === "data" || protocol === "about" || protocol === "moz-extension" ||
           ContentProtectedDomains.some(d => host.endsWith(d));
}

//}}}
//BEGIN ACTION TEMPLATE PARSING ***********************************************
//{{{

const placeholders_basic = (/\{[^{}\s]+\}/g);
const placeholders_encoded = (/%7B[^%\s]+%7D/gi);
const placeholders_static = (/\{(base)?locale(-(os|app|ui))?\}/gi);  // 'locale-page' requires looking in content

function getStaticParameterValue(token) {  // Takes a token in the form of '{name}' and gets its value, if not dependent on any Location object
    return Location.prototype.getParameterValue.call({}, token.slice(1,-1).toLowerCase());
}

function cleanTemplateAsURL(template, replacementString="") {
    // If no protocol is specified, assume HTTPS (primarily for when this is called to get a URL to find a favicon)
    if (!template.includes(":") && template.includes("."))
        template = "https://" + template;
    // First, parse and replace local locale parameters, as they're static global values and might be a critical part of the URL (e.g. subdomain)
    return template.replace(placeholders_static, getStaticParameterValue)
                   .replace(placeholders_basic, replacementString);  // Then, replace all other parameters with empty strings (or alternative string, if provided)
}

function getHostForActionTemplate(template) {
    return parseURL(stripPreProtocols(cleanTemplateAsURL(template))).host;  // No need to create a full Location object, most of the time
}

function newLocationForActionTemplate(template) {
    return new Location(cleanTemplateAsURL(template));  // NOTE: Not looked up
}

// Pre-compile all RegExp needed for template requirement detection here, rather than on every use
const templateRequirement = (pattern => RegExp("{("+pattern+")}","i"));  // All placeholder names are case-insensitive
const templateRequirements = {
    // The URL will always be available, but might not be portable
    url     : templateRequirement("fullurl"),
    // The following 3 check for parameters that correspond to location properties that may or may not be available
    host    : templateRequirement("(base)?domainname(-.*)?|tld"),
    ip      : templateRequirement("ipaddress"),
    country : templateRequirement("country(code|name)"),
    // The following 3 correspond to metadata types that can be requested for a location via Location.getMetadata(); all also are required if JS is required
    page    : templateRequirement("(base)?locale-page|meta-.*"),
    title   : templateRequirement("title"),
    cnames  : templateRequirement("countryname(-tld)?")
};

function TemplateRequirementsQuery(template) {
    assert(isNonEmptyString(template), "TemplateRequirementsQuery() requires a template string!", template);
    this.template = template;
    this.cached = new Map();
    switch (template.prefixBefore(":")) {
        // JS actions get access to everything, so they require all metadata to be loaded (TODO: maybe check if it actually uses the getinfo function?)
        case "javascript":    this.js = true;      break;
        // Form field and copy string actions also need content scripts (clipboard access needs a content script due to a particularly dumb API)
        case "formfield":     this.form = true;    break;
        case "copystring":    this.copy = true;    break;
    }
}

TemplateRequirementsQuery.prototype = {
    // Performs a RegExp check and caches the result
    needs(requirementRegExp) {
        let value = this.cached.get(requirementRegExp);
        if (value === undefined) {
            value = requirementRegExp.test(this.template);
            this.cached.set(requirementRegExp, value);
        }
        return value;
    },
    // Checks if this template is for a remote URL (checking for templates on private IPs would require a promise, which isn't worth it or really needed here)
    get remote() {
        if (this._remote !== undefined)  // Cache result of this check on this._remote, as it requires cleaning the template URL and creating a whole new Location object
            return this._remote;
        return this._remote = !newLocationForActionTemplate(this.template).local;  // NOTE: Can't know about local IP ranges without a lookup, however
    },
    // The four main placeholder checks
    get url()     { return this.needs(templateRequirements.url);     },
    get host()    { return this.needs(templateRequirements.host);    },
    get ip()      { return this.needs(templateRequirements.ip);      },
    get country() { return this.needs(templateRequirements.country); },
    // The three checks needing content ('_' prefixed versions just do the check; unprefixed methods also check for JS)
    get _page()   { return this.needs(templateRequirements.page);   },
    get _title()  { return this.needs(templateRequirements.title);  },
    get _cnames() { return this.needs(templateRequirements.cnames); },
    get page()    { return this.js || this._page;   },
    get title()   { return this.js || this._title;  },
    get cnames()  { return this.js || this._cnames; },
    // Checks if this template needs a valid content tab, potentially to run a content script in (not counting for clipboard API, which can use any)
    get content() { return this.js || this._page || this._title || this._cnames; },
    // Checks if this template needs anything that won't work if the page has content access restrictions (see prior section)
    get nolock()  { return this.js || this._page || this.form || this.copy; },
    // Checks if this template needs anything that wouldn't be portable for a local location (at best, it'll lose meaning; at worse, it's a privacy leak)
    get nolocal() { return this.url || this.host || this.ip || this.country; }
};

// Returns an object with self-caching getters (this centralizes requirement checking and makes handling them cleaner)
function queryTemplateRequirements(template) {
    return new TemplateRequirementsQuery(template);
}

// NOTE: Placeholders in templates are case-insensitive and may be used multiple times
function parseTemplate(template, location)  // Returns a promise that resolves to an object with value(s) and metadata
{
    assert(isNonEmptyString(template), "parseTemplate() requires a template string!", template, location);
    assert(isLocation(location), "parseTemplate() requires a location object!", template, location);

    let rv, encoder_default;
    const protocol = template.prefixBefore(":");
    switch (protocol) {
        // Simple lookup via URL action
        default:
            rv = {
                type : "url",
                remote : true,
                content : false
            };
            encoder_default = encodeURIComponent;
            break;
        // Paste into form field action pseudo-protocol; Syntax is "formfield:<URL>|<formID>|<formValue>|<buttonID>" (button ID is optional)
        case "formfield":
            template = template.slice(10);  // Parse everything after "formfield:"
            return Promise.all(template.split("|").map(component => parseTemplate(component, location)))  // Call this function recursively for each component
                          .then(parsed => {
                                parsed = parsed.map(p => p.value);
                                return Promise.resolve({
                                    type : protocol,
                                    remote : true,
                                    content : true,
                                    value : parsed[0],
                                    // In addition to the URL in the value property, formfield action parses also resolve with parameters for the content script to use
                                    params : {
                                        formID    : parsed[1],
                                        formValue : parsed[2],
                                        buttonID  : parsed[3]
                                    }
                                });
                          });  // Done
        // JavaScript protocol; evaluates as JS in the content script instead of evaluating as a URL
        case "javascript":
            template = template.slice(11);  // Parse everything after "javascript:"
            rv = {
                type : protocol,
                remote : false,
                content : true,
                location : "needed"  // JS actions also get a copy of the location being acted on to access via script (set after metadata fetch)
            };
            encoder_default = escapeJSstring;
            break;
        // Copy to clipboard action uses a pseudo-protocol
        case "copystring":
            template = template.slice(11);  // Parse everything after "copystring:"
            rv = {
                type : protocol,
                remote : false,
                // NOTE: Due to WebExtension psychosis, there is no real clipboard API; we're supposed to use the web clipboard API (that apparently exists).
                // However, for reasons unknown to anyone but whomever at Mozilla desgined this, this is not allowed in background scripts, as-is.
                // So, doing something simple like this requires a content script, which is really strange. (Google's API doesn't even require this; TODO: complain)
                content : true
            };
            encoder_default = Identity;  // None
            break;
        // Not a URL; parse plain string (some components of a formfield template are parsed this way when recursively calling this function)
        case "":
            rv = {
                type : "none",
                remote : false,
                content : false
            };
            encoder_default = Identity;  // None
            break;
    }

    // Takes a token string in the form of "{parameter_name}" and returns its parameter name (the string inside the braces) based on the encoding of the token string
    const getTokenParameter = (token => {
        switch (token[0]) {
            case "{":  return token.slice(1,-1).toLowerCase();  // Cut off { & }
            case "%":  return token.slice(3,-3).toLowerCase();  // Cut off %7B & %7D
            default:   throw new Error("invalid token!");
        }
    });

    // Takes a token string in the form of "{parameter_name}" and its position in the template string and returns its applicable encoder function, for this template
    const getTokenEncoder = ((token,pos) => {
        // Some templates will need the URL parameter value to be encoded and others will need it to NOT be encoded; do so based on how it's included in the template URL
        if (rv.type == "url" && token.toLowerCase().includes("url")) {
            const precedingChar = template[pos-1];
            return (precedingChar == "=" || precedingChar == ":") ? encodeURIComponent : Identity;
        }
        return encoder_default;
    });

    const requires = queryTemplateRequirements(template);
    const neededMetadataTypes = ["title","page","cnames"].filter(type => requires[type]);

    return location.getMetadata(neededMetadataTypes)
                   .then(location_detail => {
                       // Replacer function passed to String.replace() below
                       const getReplacement = ((token,pos) => {
                           try {
                               return location_detail.getParameterValue(getTokenParameter(token), getTokenEncoder(token,pos));  // Throws if invalid
                           } catch {
                               return token;  // If the token was not a valid parameter, then just leave it in the template as-is
                           }
                       });
                       // NOTE: For URLs, both the full template and parameters need encoding but I can't do encodeURI() with the parameters
                       // as that ignores certain characters that might cause problems with searches. The parameters need encodeURIComponent().
                       // To prevent double encoding I do encodeURI() first and simply search using encoded placeholders.
                       rv.value = (rv.type == "url" ? encodeURI(template).replace(placeholders_encoded, getReplacement)
                                                    : template.replace(placeholders_basic, getReplacement));
                       if (rv.location == "needed")
                           rv.location = location_detail.getEffectiveLocation();  // Attach effective location object, if needed for this action type
                       return Promise.resolve(rv);  // Done
                   });
}

//}}}
//BEGIN ACTIONS PACK/UNPACK ***************************************************
//{{{

// Returns packed JSON text from given actions list object (array-based JSON => JSAN, to sound fancy)
function packActionsJSON(actionsListArray)
{
    assert(isNonEmptyArray(actionsListArray), "packActionsJSON() requires an array to pack!", actionsListArray);

    // NOTE: Objects with properties are useful to work with, but in order to reduce pref space usage they're stored packed without property names.
    // Store arrays with minimum number of entries needed for the given properties, listed in decending order of expected commonness.
    //     full format: [name(str), show(int), hotclick(str), hotkey(str), template(str) ] ('0' if empty; just a string for name, if no properties)
    //     examples: ["sam", ["bob",1], ["mary",0,"click"], ["alex",1,0,"ctrl alt a"], ["apple",1,0,0,"customtemplate"]]
    function packAction(obj) {
        assert(isObject(obj), "packAction() requires an action object to pack!");
        const { name, template, custom, show, iconclick, hotkey } = obj;
        if (!custom && !show && !iconclick && !hotkey)
            return name;  // Just store name without object if there's nothing else for this default entry but the template

        let packedAction = [name];  // Array instead of Object so property names aren't stored in pref text; final length of array determined by last item needed
        if (show)
            packedAction[1] = 1;  // Just pack as '1' instead of 'true'
        if (iconclick)
            packedAction[2] = iconclick;
        if (hotkey)
            packedAction[3] = hotkey;
        if (custom && template)
            packedAction[4] = template;  // If not custom, then template will be pulled from defaults list on unpack

        for (let i=0; i<packedAction.length; i++)  // Iterate over all indicies including those not set (i.e. need to use '<length' instead of 'for..of')
            if (packedAction[i] === undefined)
                packedAction[i] = 0;

        return packedAction;
    }

    const packedActionsJSONtext = JSON.stringify(actionsListArray.map(packAction));
    assert(isNonEmptyString(packedActionsJSONtext), "failed to save actions list to JSON!", actionsListArray);
    return packedActionsJSONtext;
}

// Given default actions JSON and packed user actions JSON, returns unpacked actions list object (also can apply any updates as needed)
function unpackActionsJSON(defaultActionsList, userJSONtext, applyUpdatesAndSave)
{
    // Default actions list needs to be provided (e.g. from JSON file, on startup)
    assert(isNonEmptyArray(defaultActionsList), "unpackActionsJSON() requires unpacked default actions array!", defaultActionsList);
    assert(isNonEmptyString(userJSONtext), "unpackActionsJSON() requires packed actions string to unpack!", userJSONtext);
    assert(isBoolean(applyUpdatesAndSave), "unpackActionsJSON() called without specifying updating handling method!", applyUpdatesAndSave);

    let updatesDone = new Set();  // Set instead of Array for easy dropping of exact duplicates
    let actionsToPromote = [];

    // Load packed actions list (JSON text from pref)
    let loadedActions = JSON.parse(userJSONtext);
    assert(isNonEmptyArray(loadedActions), "failed to parse user actions list!", userJSONtext);

    // Build map of default actions, by name (will remove from map as each is addressed)
    let defaultActionsBuffer = new Map(defaultActionsList.map(a => [a.name, a]));
    assert(defaultActionsBuffer.size === defaultActionsList.length, "duplicate default action name!", defaultActionsList, defaultActionsBuffer);

    function unpackAction(entry) {
        entry = maybeArray(entry);  // Can be a string or an array
        const name = entry[0];  // Only thing guaranteed to be available here
        const isCustom = Boolean(entry[4]);  // If a template is stored then this is a custom action (if not, then it's a default)

        function maybeHotkeyString(hotkeyStr) {
            if (!isNonEmptyString(hotkeyStr))
                return undefined;
            if (detectOldHotkeyFormat(hotkeyStr)) {
                hotkeyStr = convertOldHotkeyFormatToNew(hotkeyStr);
                actions_hotkey_migrated = true;
                updatesDone.add("action hotkeys imported from Flagfox 5.x");
            }
            // NOTE: Prior versions of Flagfox obviously can't understand the new hotkey format
            // While they won't wipe the unknown shortcut, it will end up being saved with an errant space tacked onto the begining; strip it here, if present
            if (hotkeyStr[0] === " ") {
                hotkeyStr = hotkeyStr.trim();  // CAUTION: There were apparently more method renames with trimLeft/Right/Start/End; just trim both to avoid compatibility issues
                updatesDone.add("warning: errant spacing corrected in hotkey definitions (caused by loading Flagfox 6.1+ prefs into Flagfox 5.x)");
            }
            return hotkeyStr;
        }

        if (!isCustom) {  // If default, get its template from the full version in the buffer
            const defaultAction = defaultActionsBuffer.get(name);
            if (defaultAction) {
                entry[4] = defaultAction.template;  // Set template from loaded full list (will always be current template version for default actions)
                defaultActionsBuffer.delete(name);
            } else {
                if (applyUpdatesAndSave) {
                    const replacement = replacedDefaultActions[name];  // See if a replacement is declared
                    if (replacement)
                        actionsToPromote.push([name,replacement]);
                }
                updatesDone.add("action is no longer a default: \"" + name + "\"");
                return null;  // Not a default action anymore; will be filtered out and deleted below (if this is an import, we don't have a template, so can't use this)
            }
        }

        // Create action object from data in packed array (leave properties as undefined if no data is set)
        const action = {
            custom : maybe(isCustom),
            name : name,
            show : maybe(Boolean(entry[1])),
            iconclick : maybe(entry[2]),
            hotkey : maybeHotkeyString(entry[3]),
            template : entry[4]
        };
        return actions.validateAction(action) ? action : null;  // Return unpacked action or drop if invalid (e.g. importing prefs list with old default)
    }

    // Unpack all actions and any drop removed entries
    loadedActions = loadedActions.map(unpackAction).filter(e => (e !== null));

    if (applyUpdatesAndSave) {
        // Add new default actions (remaining entries in the buffer)
        for (let i=0; defaultActionsBuffer.size>0 && i<defaultActionsList.length; i++) {
            let defaultAction = defaultActionsList[i];
            if (defaultActionsBuffer.has(defaultAction.name)) {
                // NOTE: Doesn't account for existing shortcuts, here
                loadedActions.splice(i,0,defaultAction);
                defaultActionsBuffer.delete(defaultAction.name);
                updatesDone.add("new default action added: \"" + defaultAction.name + "\"");
            }
        }
        // If any default actions were replaced with new ones, promote its replacement to be shown in the menu in its stead
        for (let [oldName,newName] of actionsToPromote) {
            let replacementAction = actions.getDefaultActionByName(newName);
            if (replacementAction) {
                replacementAction.show = true;
                updatesDone.add("default action \""+newName+"\" replaces old action \""+oldName+"\" in default menu");
            }
        }
    }

    if (updatesDone.size) {  // Templates aren't stored in packed JSON for default actions, so updates are automatically applied
        console.log("Flagfox default action list updates applied for version " + FlagfoxInfo.version.full + ":\n" + Array.from(updatesDone).join(";\n"));
        if (applyUpdatesAndSave) {
            actions.ensureLoaded()  // NOTE: The actual save won't be done until after this function returns and 'actions_list' is set
                   .then(() => {
                       actions.save();
                       FaviconCache.cull();
                   });
        }
    }

    return loadedActions;  // Return unpacked list
}

function extractDefaultActionsMetadata(defaultActionsList)
{
    for (let action of defaultActionsList) {
        if (action.favicon) {
            favicons_defaults_nonstandard.set(getHostForActionTemplate(action.template), action.favicon);
            delete action.favicon;
        }
    }
}

// List of default actions in the shown menu that were replaced for one reason or another (listed as 'removed:replacement')
const replacedDefaultActions = {
    // NOTE: These 3 are only kept around for manual import from Flagfox 4/5: {{{
    "tr.im URL" : "Tiny URL",        // Shut down (though, it did come back later at some point)
    "bit.ly URL" : "Tiny URL",       // Removed URL API (a form field action has since been added under "Bit.ly", case-sensitive)
    "SiteAdvisor" : "Google Cache",  // Removed SiteAdvisor from defaults and promoted Google Cache to default menu (already existed; just promoted to default menu)
    // }}}
    "Is It Up?" : "Check Server Status"  // Removed previous "Check Server Status" provider and replaced it with "Is It Up?" provider (keeping former's L10N & bindings)

};

function detectOldHotkeyFormat(hotkeyStr) {
    return !hotkeyStr.dropSuffix("+").includes("+");  // Old format had spaces; new has pluses (but ignore last char, which could be plus if used as hotkey)
}

// Takes a Flagfox 5.x packed hotkey string in the form of:  "alt shift g"
// And then converts it to Mozilla's commands API format of: "Alt+Shift+G"
// Other variations in the format are converted as-needed
function convertOldHotkeyFormatToNew(oldHotkeyStr)  // Takes a string and returns a string
{
    oldHotkeyStr = oldHotkeyStr.trim().toLowerCase();
    const S = oldHotkeyStr.includes("shift");
    const parts = oldHotkeyStr.split(" ").filter(p => (p != "shift"));
    const K = String(parts.pop()).toUpperCase().replace("SPACE", "Space").replace(".", "Period").replace(",", "Comma");
    const M = String(parts.shift()).replace("ctrl", "Ctrl").replace("alt", "Alt").replace("meta", "Command");
    return M + (S ? "+Shift+" : "+") + K;  // Mozilla's format limits to one modifier in addition to possibly shift
}

//}}}
