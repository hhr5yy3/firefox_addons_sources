"use strict";

const tmpGlobal_disableSiteNotifications = true;  // FIXME: Site notifications work, but they're crap; disabled for now

const notificationsThisSession = new Set();
var resetNotificationsThisSession = (() => notificationsThisSession.clear());  // NOTE: Needs to be defined via function/var for access via browser.extension.getBackgroundPage()

const pendingTabNotifications = new Map();
const pendingTabNotifications_timeout = 600000;  // Drop pending notifications for background tabs that haven't been focused or closed after 10 minutes

// NOTE: The stale IPDB warning age has been set to 3 months for many years now (too lazy to look up when it was first set)
const ipdb_stale_age = 90; // In days

const TOOLTIP_LABEL_SPACING = "   ";   // 3 spaces between labels and values
const TOOLTIP_TAG_SPACING   = "    ";  // 4 spaces between two tags

// Unicode icons for flag icon tooltips (NOTE: The Unicode warning icon is 26a0, but it doesn't show very well, currently)
const ICON_BAD  = "\u26d4";        // red no entry icon
const ICON_BOLT = "\u26a1";        // yellow lightning bolt icon
const ICON_LOCK = "\ud83d\udd12";  // yellow lock icon

const iconifiedTag = ((iconChar,tagText) => (iconChar + " " + LTR(tagText)));  // NOTE: Text direction always needs to be explicit in order to show properly in RTL

const getTooltipString = (name => getLoadedString("ttp." + name));

const labeledTooltipLine = ((label,value) => (getTooltipString(label) + TOOLTIP_LABEL_SPACING + value));

// For validation of hotkeys when attempting to set (a localized authoritative list would be preferable, or better yet, the API could actually be not stupid)
// NOTE: This is only cached for 60s, as it's only needed for validating hotkeys on input/load
defineLazyTmpGetter(this, "firefox_hotkeys", 60000, () => {
    let mainMod = "Ctrl", tabMod = "Alt";                   // Linux
    switch (SystemInfo.platform.os) {
        case "win":  tabMod = "Ctrl";               break;  // Windows
        case "mac":  mainMod = tabMod = "Command";  break;  // Macintosh
    }
    const prefix = (p => (k => p + "+" + k));
    return new Set([
        ...range(1,9).map(prefix(tabMod)),
        ...[...("QWRTIUOP[]ASDFGHJKLZXCVBNM0-+_=").split(""),
            ...("QWERTYIOPASGHJKZCVNM").split("").map(prefix("Shift"))
            ].map(prefix(mainMod))
    ]);
});

//BEGIN ICON HANDLING *********************************************************
//{{{

function setPageActionIcon(tabId, imgSrc, tooltipText, showInAddressBar=true) {  // imgSrc=null results in Mozilla's puzzle-piece icon; tooltipText=null results in "Flagfox"
    // BUG NOTE:
    // The WebExtension Page Action API is crap. (TODO: complain)
    //     - The icon only allows square images, and they're smaller compared to previous versions
    //     - The tooltip only allows a plain string, so doing columns is basically impossible (attempted using tab characters, which is just too inconsistent to work)
    //     - The label for the entry in the page actions menu ("..." menu) is always the tooltip, with badly handled newlines and spacing
    //     - Whilst the icon in the address bar can be hidden, an entry will always show in the page actions menu (which is only hidden for a few pages, e.g. about:blank)
    if (!imgSrc)
        showInAddressBar = false;
    if (!showInAddressBar)
        browser.pageAction.hide(tabId);
    browser.pageAction.setIcon({tabId, path: imgSrc});  // The API documentation says this returns a promise that resolves on completion; that is a lie
    browser.pageAction.setTitle({tabId, title: tooltipText});  // The tooltip text is called 'title' here; use of the term 'title' in this API is inconsistent as hell
    if (showInAddressBar)
        browser.pageAction.show(tabId);
}

function updateIcon(location)  // Unfortunately, the tooltip has to be set early, so I can't lazy load the strings on hover, anymore (TODO: ask Mozilla to fix this)
{
    //assert(isLocation(location), "updateIcon() requires a location object!", location);
    assert(location.tabId !== undefined, "updateIcon() called with a location that isn't for a tab!", location);
    return Promise.all([
        location.getMetadata("cnames"),
        lazyLoadPropertiesFile("tooltip")
    ])
    .then(([location_detail]) => {
        const { tabId, icon, host, protocol, ip, country, countryname, tld_country, tld_countryname, cctld, special, hsts, http } = location_detail.getEffectiveLocation();

        // NOTE: Mixing LTR/RTL never goes well. Some Unicode Bidi control characters are needed to render correctly, in some places.
        let tooltip = [];

        if (host && host != ip && host.includes("."))  // Only show host names that are domain names
            tooltip.push(labeledTooltipLine("domainname", host));
        if (ip)
            tooltip.push(labeledTooltipLine("ipaddress", LTR(ip)));

        // countryname/tld_countryname will be undefined if country/tld_country is not available
        if (countryname)
            tooltip.push(labeledTooltipLine("serverlocation", countryname));
        else if (country === null)  // country is null if looked up and not found; country is undefined if N/A
            tooltip.push(labeledTooltipLine("serverlocation", getTooltipString("unknownsite")));

        // Shown only if available and not matching server nationality or not on a ccTLD (e.g. location-specific IDN gTLD)
        if (tld_countryname && (country != tld_country || !cctld))
            tooltip.push(labeledTooltipLine("domainnationality", tld_countryname));

        let showInAddressBar = true;
        if (special) {
            let specialLine = getTooltipString(special[0]);
            if (special[1])
                specialLine += " " + LTR("(" + special[1] + ")");  // This parenthetical is always a URL component / protocol
            tooltip.push(specialLine);
            showInAddressBar = (special[2] !== "HIDE");  // e.g. about:blank has a blank address bar and thus no icon shown in it
        }

        if (protocol === "http" || protocol === "ftp") {
            tooltip.push(iconifiedTag(ICON_BAD, "INSECURE "+protocol.toUpperCase()));  // FIXME: L10N
        } else {
            let tagsLine = [];
            if (hsts)
                tagsLine.push(iconifiedTag(ICON_LOCK, "HSTS"));
            if (http)
                tagsLine.push(iconifiedTag(ICON_BOLT, "HTTP/"+http));  // Version number is shown, for HTTP/2+
            if (tagsLine.length)
                tooltip.push(tagsLine.join(TOOLTIP_TAG_SPACING));
        }

        // BUG HACK NOTE: Spaces are added on each side of tooltip lines so the page action '...' menu shows things better, as by-default it collapses newlines without spaces
        tooltip = tooltip.map(line => (" " + line + " "));

        setPageActionIcon(tabId, iconPath(icon), tooltip.join("\n"), showInAddressBar);

        maybeNotifyForLocation(location_detail);  // May or may not show now, depending on tab focus
    });
}

//}}}
//BEGIN HOTCLICK HANDLING *****************************************************
//{{{

// Double click = two clicks within 250ms; Triple click = three clicks within 500ms
const multiClickWindow = 250;
const pendingClick = {
    timer : null,
    tabId : null,
    clicks : 0
};

// BUG: This click event handler doesn't actually have a way to tell what button/mods are used (TODO: Yell at Mozilla so I can handle middleclicks and ctrl+click=middleclick again)
browser.pageAction.onClicked.addListener(function({url, id}) {  // Gets a tab object
    assert(validateTabId(id), "somehow got an invalid tab on page action click!?", arguments);

    function completeClickEvent() {
        const clickName = ["","","double","triple"][pendingClick.clicks] + "click";
        const actionID = actions.getMouseBoundActionID(clickName);
        if (actionID !== undefined)  // Hotclicks that don't exist are ignored (ID may be 0)
            newLocation(url, id).then(location => actions.doAction(actionID, location)).catch(Nothing);  // Action may be N/A at this location
        pendingClick.timer = null;
        pendingClick.tabId = null;
        pendingClick.clicks = 0;
    }

    // First, always abort the active timer, if any
    clearTimeout(pendingClick.timer);

    // If a click event is in progress for this tab, then increment its click count
    if (pendingClick.tabId === id) {
        pendingClick.clicks++;
        if (pendingClick.clicks === 3) {
            completeClickEvent();  // If this is click #3, that's the max, so complete the event now
            return;
        }
    } else {  // If this is for a new tab, then set/replace the tabId and set the click count to 1
        pendingClick.tabId = id;
        pendingClick.clicks = 1;
    }

    // We're on the first or second click, so kick off timeout to wait for any more within the timeframe
    pendingClick.timer = setTimeout(completeClickEvent, multiClickWindow);
});

//}}}
//BEGIN HOTKEY HANDLING *******************************************************
//{{{

// Used to load hotkeys in actions.refresh() (see data.js)
var Hotkeys =  // NOTE: Declared with var to expose via browser.extension.getBackgroundPage()
{
    max : 100,  // Dependent on number of pre-registered stubs in manifest.json (can only modify bindings, not create completely new ones)

    testID : "?",  // +1 extra scratch space binding for testing hotkey viability when setting

    resetTest() {
        return browser.commands.reset(this.testID);
    },

    resetAll() {  // CAUTION: There seems to be enough overhead to the command reset API call that resetting from loaded list is 5+ times faster than blind resetting all IDs
        return browser.commands
                      .getAll()
                      .then(cmds => Promise.all(cmds.filter(c => c.shortcut)
                                                    .map(c => browser.commands.reset(c.name))));
    },

    set(bindingID, hotkeyStr, name) {
        return browser.commands.update({
            name        : bindingID,
            shortcut    : hotkeyStr,
            description : "Flagfox hotkey for: " + name
        });
    },

    // NOTE: Previously registered hotkeys must also be included in the given argument, otherwise they will be dropped; all invalid hotkeys will be dropped
    registerAll(hotkeyMap) {  // Takes a map of hotkey->id, creates bindings as-needed, and returns a promise that resolves with a new map of binding->id
        assert(isNonEmptyMap(hotkeyMap), "A map of hotkey combo strings to action IDs must be provided!", hotkeyMap);
        let bindingMap = new Map();
        let nextAvailableBindingSlot = 0;  // Binding IDs 0-99
        return this.resetAll()
                   .then(() => {
                        let pendingUpdates = [];
                        for (let [hotkeyStr, actionID] of hotkeyMap) {
                            if (nextAvailableBindingSlot >= this.max) {
                                console.warn("Flagfox was given too many custom hotkeys to register ("+this.max+" max supported)");
                                break;
                            }
                            let name = actions.getById(actionID).name;
                            let bindingID = String(nextAvailableBindingSlot++);  // Use pending value, then increment after
                            pendingUpdates.push(this.validate(hotkeyStr, false)  // Do quick check before attempting to set (testAPI=false, here)
                                                    .then(({valid}) => (valid ? this.set(bindingID, hotkeyStr, name)
                                                                              : Promise.reject("hotkey failed validation")))
                                                    .then(() => void bindingMap.set(bindingID, actionID))  // Only set after the update is complete
                                                    .catch(e => console.error("Flagfox hotkey registration error:", name, hotkeyStr, e)));  // Others will still attempt updates
                        }
                        return Promise.all(pendingUpdates);
                   })
                   .then(() => Promise.resolve(bindingMap));
    },

    // Takes a hotkey string and returns a promise that resolves with an object with booleans indicating if the given combination it acceptable and if already set
    // BUG WARNING: The stupid API can still set shortcuts that it won't actually register (possibly some ones used elsewhere, but not all; TODO: complain)
    // A better way to test this would be to just set a command then trigger it and see if it fires; there's no way to manually trigger a command, though
    validate(hotkeyStr, testAPI=true) {  // Testing via the API is optional here, for use when in the process of setting, above
        assert(isString(hotkeyStr), "Hotkeys.validate() requires a string to validate!", hotkeyStr);
        return new Promise(resolve => {
            const parts = hotkeyStr.split("+").filter(p => p.length);
            if (parts.length < 2 || parts.length > 3 || !["Alt","Command","Ctrl","MacCtrl"].includes(parts[0]) || firefox_hotkeys.has(hotkeyStr))
                return void resolve({ valid: false });
            if (testAPI === false)
                return void resolve({ valid: true });
            const rv = { valid: false, exists: false };
            this.resetTest()
                .then(() => this.set(this.testID, hotkeyStr, "TEST"))
                .then(() => browser.commands.getAll())
                .then(cmds => {
                    const numberSet = cmds.filter(c => (c.shortcut == hotkeyStr)).length;
                    rv.valid = (numberSet > 0);
                    rv.exists = (numberSet > 1);
                    return this.resetTest();
                })
                .catch(Nothing)
                .finally(() => resolve(rv));
        });
    }
};

// Listen for loaded hotkeys
browser.commands.onCommand.addListener(function(bindingID) {  // This will only receive events for commands bound to a valid action ID
    actions.ensureLoaded()
           .then(getCurrentTab)
           .then(newLocationForTab)
           .then(location => actions.doAction(actions.getKeyboardBoundActionID(bindingID), location))
           .catch(e => debugWarn("Flagfox hotkey rejected:", e));  // Most common cause is actions not currently available for the current page
});

//}}}
//BEGIN MENU HANDLING *********************************************************
//{{{

let menuIsVisible = false;

// Two sets of contexts: a primary menu for the main flag icon menu (with a top-level limit) and a secondary menu for individual elements' context menus
const menu_contextSets = [
    ["page_action"],                                       // ID == 0
    ["page","tab","frame","link","image","audio","video"]  // ID == 1
];
const menu_contextSet_dummy = ["browser_action"];  // Context for "hidden" (there is no actual API to hide a menu, but its context can be changed to a hidden one)
const menu_contextSets_loaded = new Set();  // Set of currently loaded context set IDs

function getMenuContextsSetIdForShownContexts(shownContextsSet) {  // Shown set of contexts needed -> ID of set of contexts to generate
    for (let [menuContextsSetID, menuContextsSet] of menu_contextSets.entries())
        for (let name1 of menuContextsSet)
            for (let name2 of shownContextsSet)
                if (name1 === name2)
                    return menuContextsSetID;
    return null;
}

// BUG HACK NOTE: The menu show event doesn't fire for page action menus if no menus have been created, at all (oddly, other context menus work without this)
// Because this issue prevents on-demand generation there, events must be forced to fire with a placeholder menu item created on startup (and after resets)
function createPlaceholderMenu() {
    return createMenuItem({
        id: "Flagfox:MENU_EVENT_TRIGGER_PLACEHOLDER",
        contexts: menu_contextSet_dummy,
        title: "...",
        enabled: false
    })
    .then(() => debugLog_menus("Flagfox menus reset for auto-generation"))
    .catch(e => console.error("Flagfox menus reset error:", e));
}
createPlaceholderMenu();  // No dependencies, so do immediately on startup; icon menus are ready whenever this is done

function resetAllMenus() {
    if (menu_contextSets_loaded.size === 0)  // Avoid excess placeholder recreations on frequent options changes (this is called with each actions.refresh())
        return Promise.resolve();
    menu_contextSets_loaded.clear();
    return browser.menus.removeAll().then(createPlaceholderMenu);
}

function fetchMenuDataForCreation() {
    const menuData = {};
    return actions.ensureLoaded().then(() => {  // Make sure actions have loaded before doing anything here
        menuData.visibleActions = actions.getMenuVisibleActions();
        menuData.actionIDs = actions.getActionIdsMap();
        if (!prefs.get("showfavicons"))  // Prefs are loaded before actions (if disabled: menuData.faviconURIs === undefined)
            return Promise.resolve();
        return FaviconCache.fetchForActions(menuData.visibleActions)
                           .then(rv => void (menuData.faviconURIs = rv));  // Result is a mix of local and data URLs
    })
    .then(() => Promise.resolve(menuData));
}

// NOTE: Fetching all icons on menu open can cause a noticeable delay, and there's no good way to update an icon after menu generation
function maybePrefetchMenuFavicons() { // Checks cache and fetches any that are needed (returned via resolved promise, though not used)
    return prefs.get("showfavicons") ? FaviconCache.fetchForActions(actions.getMenuVisibleActions(), FaviconCache.timeout_prefetch) : Promise.resolve();
}

function maybeCreateMenu(shownContextsSet) {
    const menuContextsSetID = getMenuContextsSetIdForShownContexts(shownContextsSet);
    if (menuContextsSetID === null)  // No supported contexts; reject to avoid trying to pointlessly update menus afterwards
        return Promise.reject("no supported context found");
    if (menu_contextSets_loaded.has(menuContextsSetID))  // Already generated; nothing to do here (resolve as null to explicitly indicate no new IDs)
        return Promise.resolve(null);
    return Promise.all([
        fetchMenuDataForCreation(),        // Get list of visible actions and load their favicons
        lazyLoadPropertiesFile("actions")  // Load actions' localized names, if needed
    ])
    .then(([menuData]) => createMenu(menuContextsSetID, menuData))
    .then(newMenuItemIDs => {
        menu_contextSets_loaded.add(menuContextsSetID);
        return Promise.resolve(newMenuItemIDs);  // Don't need to refresh() menus here, as updateMenus() is always called next and will do that
    })
    .catch(e => console.error("Flagfox error during context menu creation:", e));
}

function createMenu(menuContextsSetID, menuData) {  // Takes ID of contexts list and menu data object to create this menu from
    assert(isIntegerInRange(menuContextsSetID, 0, menu_contextSets.length), "createMenu() requires a contexts set ID!", menuContextsSetID);
    assert(isObject(menuData) && isNonEmptyArray(menuData.visibleActions), "createMenu() menu data not populated!", menuData);

    const menuContextsSet = menu_contextSets[menuContextsSetID];
    debugLog_menus("Flagfox auto-generating menu:", menuContextsSet);

    const { visibleActions, actionIDs, faviconURIs } = menuData;

    // BUG: There's an arbitrary limit of 6 top-level entries for page & browser action menus (TODO: complain more)
    // NOTE: All menus added to existing context menus are set to a max of one top-level item to place all entries into a single submenu
    const maxItems = (menuContextsSet[0] === "page_action" ? browser.menus.ACTION_MENU_TOP_LEVEL_LIMIT : 1);

    // All menu items just sorta get lumped into a pile in the WebExt menus API; all need unique IDs
    const menuItemID = (itemID => ("Flagfox:"+menuContextsSetID+":"+itemID));

    const pendingCreations = [];
    const newMenuItemIDs = [];
    const baseMenuItemObj = { contexts: menuContextsSet, parentId: undefined };
    function assembleMenuItem(newMenuItemObj) {
        const p = createMenuItem(Object.assign(newMenuItemObj, baseMenuItemObj));
        newMenuItemIDs.push(newMenuItemObj.id);
        pendingCreations.push(p);
        return p;
    }

    for (let [i, action] of visibleActions.entries()) {
        if (i+1 === maxItems) {  // i+1 because i is 0-based and maxItems is 1-based (even if this is the last action, the submenu is needed for the options entry)
            let subMenuID = menuItemID("submenu");
            assembleMenuItem({
                id: subMenuID,
                title: i === 0 ? "Flagfox" : "More\u2026"  // FIXME: L10N
            });
            baseMenuItemObj.parentId = subMenuID;
        }
        assembleMenuItem({
            id: menuItemID(actionIDs.get(action)),
            title: actions.getLocalizedNameSync(action),  // NOTE: The WebExtension API is odd with naming things 'title'; this time, it's the text label, not tooltip
            icons: faviconURIs ? { "16": faviconURIs[i] } : undefined  // BUG NOTE: API can't update this after creation; must be set here (TODO: Firefox 64+ now supports this)
        });

    }
    if (baseMenuItemObj.parentId) {  // Only bother with a separator between the actions and options entry if in the submenu, to not waste that stupid 6 element limit
        assembleMenuItem({
            id: menuItemID("separator"),
            type: "separator"
        });
    }
    assembleMenuItem({
        id: menuItemID("options"),
        title: getLoadedString("act.options")
    });

    return Promise.all(pendingCreations)
                  .then(() => Promise.resolve(newMenuItemIDs));  // Resolve with array of all new menu item IDs (needed to update with enabled statuses immediately afterwards)
}

// browser.menus.create() is one of the few APIs to not use promises, instead using a callback and returning the ID; this function fixes this inconsistency
function createMenuItem(propObj) {
    return new Promise((resolve, reject) => {  // Technically, this should resolve with the return value from create() (the ID), but that's useless here
        try { browser.menus.create(propObj, resolve); }
        catch (e) { reject(e); }
    });
}

function getActionIDfromMenuItemID(menuItemID) {
    const id_str = menuItemID.suffixAfter(":");
    switch (id_str) {
        default:
            return parseInt(id_str,10);
        case "options":
            return "options";
        case "submenu": case "separator":
            return null;
    }
}

// Menus are updated on-demand as of Firefox 60, now that Mozilla finally got around to making their API less horrible by adding an onShown event
function updateMenus(menuItemIDs, location) {  // Menu item IDs are now provided via the show event info object (actions are necessarily loaded prior to their menus being loaded)
    if (blank_address_URLs.has(location.url))
        return temporarilyHideMenu(menuItemIDs, location);
    let pendingUpdates = [], actionID;
    for (let menuItemID of menuItemIDs) {
        actionID = getActionIDfromMenuItemID(menuItemID);
        if (isNumber(actionID))  // Update all menu items corresponding to actions (skip options, submenu, and separator)
            pendingUpdates.push( browser.menus.update(menuItemID, { enabled: actions.isActionAllowed(actionID, location) }) );
    }
    return Promise.all(pendingUpdates)  // Array of promises that resolve upon completion of updates
                  .then(() => browser.menus.refresh())  // Browser needs to be told to refresh the menu for updates to take effect immediately
                  .then(() => debugLog_menus("Flagfox context menus updated for location:", menuItemIDs, location))
                  .catch(e => console.error("Flagfox error during context menu update:", e));
}

// BUG NOTE: The current menus API does not provide any way to hide anything; only create/remove or enable/disable
// HACK NOTE: In order to actually do this, the contexts are temporarily switched to a different not-visible and unused context until after the menu is closed
// The temporary context MUST be some valid context, otherwise the API will throw errors (it doesn't actually care if there is no browser action, so using that makes sense)
// All menu item IDs are in the form of "Flagfox:<menuContextsSetID>:<itemID>", so the real contexts can easily be reassigned
const hideMenuItem = (menuItemID => browser.menus.update(menuItemID, { contexts: menu_contextSet_dummy }));
const showMenuItem = (menuItemID => browser.menus.update(menuItemID, { contexts: menu_contextSets[parseInt(menuItemID.split(":")[1],10)] }));
// NOTE: They've finally gotten around to fixing this in Firefox 63, but of course haven't backported it to the ESR, as per usual.
// They've not added any real way to feature-test for this, thus making it oddly difficult to actually use and still support the ESR.
// Thus, there's not much of a point in actually bending-over backwards to use the new API, here. TODO:FIXME: Use new API for next ESR, instead.

function temporarilyHideMenu(menuItemIDs, location) {  // Only care about location for debug logging
    const undo = (() => Promise.all(menuItemIDs.map(showMenuItem))  // No refresh() is needed for changes to not-currently-visible menu items
                               .then(() => debugLog_menus("Flagfox context menu temporary hiding has been reset"))
                               .catch(e => console.error("Flagfox error during context menu temporary hiding reset:", e)));
    return Promise.all(menuItemIDs.map(hideMenuItem))
                  .then(() => browser.menus.refresh())  // Browser needs to be told to refresh the menu for updates to take effect immediately
                  .then(() => debugLog_menus("Flagfox context menus temporarily hidden for location:", menuItemIDs, location))
                  .catch(e => console.error("Flagfox error during context menu hide:", e))
                  .finally(() => {
                      if (menuIsVisible) {  // If the menu is still visible, then clean up once it is closed
                          let onHide;
                          onHide = (() => undo().finally(() => browser.menus.onHidden.removeListener(onHide)));
                          browser.menus.onHidden.addListener(onHide);
                      } else {  // If the menu somehow got closed during the action of hiding, then undo everything immediately
                          undo();
                      };
                  });
}

// Search for URLs for images/videos/etc., hyperlinks, iframes, and main icon/tabs/pages, in that order (e.g. menu on image should use its URL, not the page's)
// BUG NOTE: Menu show events are missing these properties for some privileged pages, namely on "about:" URLs; fortunately, click events do properly have them
function getTopPriorityUrlFromMenuEvent(info) {
    for (const prop of ["srcUrl","linkUrl","frameUrl","pageUrl"])
        if (isNonEmptyString(info[prop]))
            return info[prop];
    return null;
}

// Returns an open-in-mode or undefined, if none (for use with main.js:openURL() optional parameter, and dependencies)
// NOTE: There's still no way to keep menus open on background opens, as was possible in old versions (TODO: complain)
function getOpenInModeForMenuEvent({modifiers, button}) {
    if (button === 1)    // NOTE: Firefox 64+ required to detect button used (and modifiers are always empty for all buttons other than 0)
        return "tabBG";  // Middle-click -> background tab
    if (!modifiers)
        return undefined;
    const shift = modifiers.includes("Shift");  // Shift+Click -> window instead of a tab
    const ctrl = modifiers.includes("Ctrl");    // Ctrl+Click  -> background instead of foreground
    return (shift || ctrl) ? ((shift?"win":"tab")+(ctrl?"BG":"FG")) : undefined;  // If no modifiers, return undefined to use default behavior (by user pref)
}

// BUG NOTE: Annoyingly, 'contexts' was only added for show events, not click; assumes false if not available (NOTE: contexts is for where shown, not contexts created for)
function menuShowEventIsForTopLevelPage(info) {
    return info.contexts ? info.contexts.some(c => ["page_action","page","tab"].includes(c)) : false;
}

function newLocationForMenuEvent(info, tab) {
    const targetUrl = getTopPriorityUrlFromMenuEvent(info);
    // HACK: There are two bugs coming from the WebExtension menus API here, but fortunately, they're in mutually exclusive scenarios:
    // Option one is to detect when the target and tab URLs are the same; Option two is to check the event's stated contexts
    // For click events, option one always works and option two always fails; For show events, option one sometimes fails and option two always works
    if ((targetUrl && tab && tab.url === targetUrl) || menuShowEventIsForTopLevelPage(info))
        return newLocationForTab(tab);  // Create for the tab taking into account its tab ID
    if (targetUrl)
        return newLocation(targetUrl);  // Create for the element inside this tab (the tab ID is for its container, not this location)
    // BUG NOTE: However, if this is a show event for what is not a top level page and getting a URL from the event info object fails, NO URL can be obtained
    // Even if the click event works correctly in this case, the show event already may have made the decision to consider actions not available and disable their menu items
    // The least confusing mitigation for this rare edge case is to resolve with a dummy location object assuming just that a URL ~will~ be available, probably local
    return Promise.resolve(new Location("?"));
}

// Handles all menu opens, for both tabs and elements in pages (BUG WARNING: This event will not fire if no menus have been created, even on showing empty default menu)
browser.menus.onShown.addListener(function(info, tab) {
    menuIsVisible = true;
    Promise.all([
        newLocationForMenuEvent(info, tab),
        maybeCreateMenu(info.contexts)
    ])
    .then(([location, newMenuItemIDs]) => {  // If these menus are newly created, then info.menuIds won't have anything useful in it to update, yet; newly created list is needed
        updateMenus((newMenuItemIDs ? newMenuItemIDs : info.menuIds), location);
        debugLog_events("Flagfox menu open processed for target:", info, tab, location);
    })
    .catch(e => debugLog_menus("Flagfox could not handle menu:", e, info.contexts));
});

// There is no API to tell when a menu is still open, so just keep track of it here (only one menu can be visible at any time)
browser.menus.onHidden.addListener(function() {
    menuIsVisible = false;
});

// Handles all menu item clicks, for both tabs and elements in pages
browser.menus.onClicked.addListener(function(info, tab) {
    newLocationForMenuEvent(info, tab).then(location => {
        actions.doAction(getActionIDfromMenuItemID(info.menuItemId), location, getOpenInModeForMenuEvent(info));
        debugLog_events("Flagfox menu item click processed for target:", info, tab, location);
    });
});

//}}}
//BEGIN NOTIFICATION HANDLING *************************************************
//{{{

function createNewNotificationObject(type, msgID, msgParams)  // Returns a promise that resolves to the new object, or a rejected promise if denied
{
    assert(isNonEmptyString(type,3) && isNonEmptyString(msgID,3) && isArray(msgParams), "invalid arguments passed to createNewNotificationObject()!");

    const msgPrefName = "warn." + type;
    switch (prefs.get(msgPrefName)) {
        case "disabled":  // Disabled by user
            return Promise.reject("disabled");  // Not an error, so just reject with a string rather than an Error object
        case "once":      // Show this type once per session, regardless of ID
            var disableAfterShowing = true;
            break;
        case "enabled":   // Show once for each unique ID per session (but, still only one per type at the same time)
            var disableAfterShowing = false;
            break;
    }

    // Max once per session for each unique message ID
    if (notificationsThisSession.has(msgID))
        return Promise.reject("duplicate");  // Not an error, so just reject with a string rather than an Error object
    notificationsThisSession.add(msgID);

    const msgStringName = "msg." + type;
    return getStringF(msgStringName,msgParams)  // Zero or more parameters to format the string with
           .then(msgStringValue => {
               // BUG: I've got no way to show the "Don't show this again" checkbox, anymore; a button would work, but Mozilla hasn't implemented it (TODO: complain)
               //const dontShowThisAgainLabel = getLoadedString("msg.shutup");  // Same file that was just loaded; can do a sync fetch
               return Promise.resolve({  // This gets passed to showNotification()
                   type : type,
                   //once : disableAfterShowing,
                   arg : {  // This is the part that gets passed to the notification API inside showNotification()
                       type    : "basic",
                       title   : "Flagfox",
                       message : msgStringValue,
                       iconUrl : iconPath(type == "stale" ? "special/error" : "special/global")
                   }
               });
           });
}

function showNotification({type, /*once,*/ arg})  // Takes a notification object created in createNewNotificationObject(); returns a promise
{
    assert(isNonEmptyString(type,4) && isObject(arg), "invalid arguments passed to showNotification()!", type, arg);
    return browser.notifications.create("Flagfox:"+type, arg);  // Only one of each Flagfox message type will be shown at the same time
}

function maybeShowNotification(notification, tabId)  // Show a notification only if a specified tab is focused (active tab & window)
{
    assert(isObject(notification), "maybeShowNotification() requires a notification object!");  // tabId is optional, however

    if (!validateTabId(tabId))  // If no valid tab, then show now
        return Promise.resolve(showNotification(notification));

    let pending = pendingTabNotifications.get(tabId);  // If valid tab, then check the queue and add a new pending list if one doesn't already exist
    if (!pending) {
        pending = new Map();
        pendingTabNotifications.set(tabId,pending);  // Stored as reference, so the addition below doesn't require adding it again
    }

    pending.set(notification.type, notification);  // Set this new notification to be pending (one per type per tab)

    return showPendingNotificationsForTabId(null)  // Show for current tab, which might not be the one this notification was queued for
    .then(shown => {
        if (shown)  // If something was shown for the current tab, then this is done
            return Promise.resolve();
        // If the tab is eventually shown or closed, then the item(s) will be cleared from the queue at that time; if not, cull them after a timeout
        pending.set("timeouttime", Date.now() + pendingTabNotifications_timeout);
        const notifyTimeout_wait = (timeout => sleep(timeout).then(notifyTimeout_check));
        const notifyTimeout_check = (() => {
            // If something else is added to the pending list during the interim, then this will clear on its NEW timeout, not this one.
            let timeouttime_latest = pending.get("timeouttime");  // Even if deleted from the queue, the surrounding closure will keep this reference to 'pending' alive until now.
            // NOTE: Due to the confusing design of JS, (1>=undefined)===false, but that can't actually happen here, as the value is isn't ever cleared, only deleted from the queue.
            if (Date.now() >= timeouttime_latest)
                return pendingTabNotifications.delete(tabId) ? Promise.reject(new Error("timeout"))  // Queue still had this tabId; reject promise as timed-out
                                                             : Promise.resolve();                    // Queue no longer had this tabId; resolve promise as completed
            // There's a new timeout to wait for (this is unlikely to loop forever (in 10 minute steps), as unique notifications are limited to once per session, if not user reset)
            return notifyTimeout_wait(timeouttime_latest - Date.now());
        });
        return notifyTimeout_wait(pendingTabNotifications_timeout);
    });
}

function showPendingNotificationsForTabId(tabId=null)  // Will use current tab if none provided; returns a promise that resolves to a bool indicating if anything was shown
{
    if (tabId === null)
        return getCurrentTab().then(tab => showPendingNotificationsForTabId(tab.id));  // Can't loop; getCurrentTab() will throw an exception if it doesn't find a tab with an ID

    let pending = pendingTabNotifications.get(tabId);
    if (!pending)
        return Promise.resolve(false);  // None pending; return false via promise

    let notifications = [];
    for (let notification of pending.values())
        notifications.push(showNotification(notification));
    pendingTabNotifications.delete(tabId);
    return Promise.all(notifications)
                  .then(() => Promise.resolve(true));  // Done; return true via promise
}

// Primary function to show a notification for Flagfox
// If a tab ID is provided, the notification will be shown when the user navigates there; if tabId=null, then the notification will show immediately
// NOTE: All unique messages are shown a max of once per session, unless reset by the user via the options page
function queueNewNotification(tabId, type, msgID=type, msgParams=[]) {
    return createNewNotificationObject(type, msgID, msgParams)
    .then(notification => maybeShowNotification(notification, tabId))
    .catch(reason => debugLog_events("dropped notification:", reason, tabId, type, msgID, msgParams));
}

function maybeNotifyForLocation({tabId, country, tld_country, countryname, tld_countryname, tld, proxied})  // Needed metadata should have been loaded in updateIcon()
{
    return wait(() => isInteger(IPDB.meta.age))  // Make sure IPDB metadata has loaded by now (value starts at Infinity)
          .then(() => {
              let notifications = [];
              // First, see if a notification is needed about the given location
              if (proxied)
                  notifications.push(queueNewNotification(tabId, "proxy"));
              else if (!tmpGlobal_disableSiteNotifications &&
                      country && tld_country &&
                      country !== tld_country &&
                      !meaningless_ccTLDs.has(tld))  // Checks the over-resold ccTLD blacklist
                  notifications.push(queueNewNotification(tabId,
                                                          "tld",                                      // Message type
                                                          "tld:" + country + "&" + tld_country,       // Unique message ID ("tld:C1&C2")
                                                          [countryname, "."+tld, tld_countryname]));  // Message parameters
              // Then, check if the IPDB version is getting old and results are beginning to get particularly stale
              if (IPDB.meta.age >= ipdb_stale_age)
                  notifications.push(queueNewNotification(null, "stale"));
              // This returns a fairly long promise chain (assuming any notification is applicable)
              return Promise.all(notifications);
          });
}

//}}}
