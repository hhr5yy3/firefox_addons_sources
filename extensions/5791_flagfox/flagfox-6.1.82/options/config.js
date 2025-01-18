"use strict";

const Flagfox = browser.extension.getBackgroundPage();  // NOTE: This fetches access to the global object for the background scripts (all praise the sync access!!!)

// BUG HACK: Options pages opened via the normal WebExtension API or the Addon Manager always open in a new tab in the current window, however some security conflict
// somewhere prevents this from working properly if the window is in private browsing mode. If that happens, work around this by moving this page to a new tab in a
// new normal window. (simpler than trying to find an existing window to recycle, and avoids showing windows the user intentionally has not shown)
if (!Flagfox) {
    browser.tabs
           .getCurrent()
           .then(tab => {
                assert(tab.incognito, "browser.extension.getBackgroundPage() failed in a normal window!", tab);
                // BUG NOTE: Mozilla has not implemented the "focused" property here and attempting to set it will throw an error; however, it fortunately defaults to true
                browser.windows
                       .create({type: "normal", incognito: false, url: tab.url})  // NOTE: Can't do a tab move, as private->normal is prohibited; need to reload anyway
                       .then(() => browser.tabs.remove(tab.id));
           });
    throw "Attempted to open Flagfox options in a window without access to background scripts; trying again in a new window...";
}

const childDialogURLs = {
    edit    : "editaction.html",
    preview : "preview.html",
    about   : "about.html"
};

const hotkeyPrettifier_separator = "\u200a\u2219\u200a";  // Notation used by the API has pluses for separators; on-screen notation is dots with slight extra spacing (hair space)
const hotkeyPrettifier_modifiers = [
    ["INVALID", "\u26d4"], ["EXISTS", "\u26a0"],  // Red no-entry sign for invalid; yellow warning sign for existing
     ...( Flagfox.SystemInfo.platform.os != "mac" ?
        [["Ctrl", "Ctrl"],   ["Alt", "Alt"],    ["Command", "Meta"]] :     // Normal keyboards get words/abbreviations for their other buttons
        [["Ctrl", "\u2303"], ["Alt", "\u2325"], ["Command", "\u2318"]] ),  // Apple keyboards get glyphs for everything (if it has "Win", it ain't Mac HW)
    ["Win",   "\u229e"],  // The "Win" key gets a Win-logo-ish glyph
    ["Shift", "\u21e7"]   // Up arrow glyph for shift key (same for everyone, for consistiency)
];
const hotkeyPrettifier_keywords = [  // The API needs keywords in the shortcuts for these, but actual characters can be shown on-screen
    ["Comma", ","], ["Period", "."], ["Space", "\u2423"]  // Space characters get shown with an 'open box' glyph
];

const actionsSaveDelay = 3000;  // Commit save after 3 seconds of no further changes (in ms)
let pendingActionsSave = null;

var pendingEditData;  // Data to pass to the edit action dialog, when opened

const pendingDeletes = new Set();  // Set of action object references pending delete (cannot use IDs, in case of reorder)

let selectedActionItemIndex = 0;

const warnPrefs = ["warn.proxy", "warn.stale", "warn.tld"];

// Fetch and cache a ref on first use (apparently not available until after page has loaded)
defineLazyGetter(this, "actionsListBox",  (() => document.getElementById("actionsList")));
defineLazyGetter(this, "iframe",          (() => document.getElementById("lightbox-iframe")));
// This is only needed because Mozilla decided to not implement a proper clipboard API for WebExtensions, and the web API is obviously very restricted
defineLazyGetter(this, "clipboardTarget", (() => document.getElementById("clipboard-target")));
// Buttons that will need enabling/disabling based on availability
defineLazyGetter(this, "cloneButton",     (() => document.getElementById("clone")));
defineLazyGetter(this, "pasteButton",     (() => document.getElementById("paste")));

//BEGIN LOADING/UNLOADING *****************************************************
//{{{

window.addEventListener("load", function() {
    document.getElementById("showFaviconsCheckbox").checked = Flagfox.prefs.get("showfavicons");
    document.getElementById("openInMenu").value = Flagfox.prefs.get("openactionsin");  // Set selection based on value attribute (also sets the selected option index)

    if (warnPrefs.some(Flagfox.prefs.hasUserValue))
        document.getElementById("resetMessagesLink").removeAttribute("hidden");  // Only show reset link if there's something to reset

    disableContextMenu();

    Flagfox.loadPageI18N(document);

    // Set Flagfox version string for about subdialog link
    document.getElementById("aboutLinkLabel").textContent += " " + Flagfox.getFullVersionsString();

    generateActionsEditList();

    actionsListBox.addEventListener("dragover", onDragOver);
    actionsListBox.addEventListener("dragexit", cleanupAllHighlights);
    actionsListBox.addEventListener("drop",     onDragDrop);

    window.addEventListener("focusin", onFocusChange);  // Plain "focus" event doesn't work here
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("copy",    openCloneSelectedAction);
    window.addEventListener("cut",     openCloneSelectedAction);
    window.addEventListener("paste",   onPaste);

    window.addEventListener("beforeunload", emptyTrash);

    // NOTE: Apparently WebExtensions have a CSP that bans all inline scripts, so here's a giant pile of crap to do stuff in a pointlessly more complicated way.
    // NOTE: Also, click handlers (regardless of where) trigger on both mouse click or via keyboard, so the A11Y of this should hopefully be decent, now.
    addElementEventListener("showFaviconsCheckbox",  "change",       setShowFavicons);
    addElementEventListener("openInMenu",            "change",       setOpenIn);
    addElementEventListener("actionsMangement-menu", "pointerenter", updateMenu);
    addElementEventListener("actionsMangement-menu", "focus",        updateMenu);
    addElementEventListener("new",                   "click",        onMenuCommand);
    addElementEventListener("clone",                 "click",        onMenuCommand);
    addElementEventListener("paste",                 "click",        onMenuCommand);
    addElementEventListener("more",                  "click",        onMenuCommand);
    addElementEventListener("down",                  "click",        (() => shiftSelectedAction(+1)));
    addElementEventListener("up",                    "click",        (() => shiftSelectedAction(-1)));
    addElementEventListener("openIconsPreviewLink",  "click",        (() => openLightbox("preview")));
    addElementEventListener("aboutLink",             "click",        (() => openLightbox("about")));
    addElementEventListener("resetMessagesLink",     "click",        resetMessagesPrefs);
});

function updateMenu() {
    setDisabled(cloneButton, !haveSelectedAction());  // Can't clone if there's no action selected to clone
    checkClipboard();                                 // Can't paste if there's no action(s) in the clipboard to paste
}

function generateActionsEditList()  // Returns a promise that resolves upon completion
{
    function setDefaultStatusClass(element, isDefault) {
        if (isDefault)
            element.classList.add("default");
    }
    function setCheckedBox(element, value) {
        element.checked = value;
    }
    function setFaviconSrc(element, src) {  // NOTE: async
        const src_default = element.getAttribute("src");
        element.onerror = (() => element.setAttribute("src", src_default));  // Technically a secondary fallback, as cache already does fallback (may as well keep anyway)
        Flagfox.FaviconCache
               .fetch(src)
               .then(src_cached => element.setAttribute("src", src_cached));
    }
    function setTextContentAndTooltip(element, text) {
        element.textContent = text;
        element.setAttribute("title", text);  // "title" is the tooltip in HTML
    }
    function maybeAppendTooltipLine(element, text) {
        if (!text || !text.includes("."))  // Only want to append host names
            return;
        element.setAttribute("title", element.getAttribute("title") + "\n" + text);
    }

    function getIsDefault(action)  { return !action.custom; }
    function getShowState(action)  { return !!action.show; }
    function getFaviconSrc(action) { return Flagfox.FaviconCache.urlFromActionTemplate(action.template); }
    function getName(action)       { return Flagfox.actions.getLocalizedNameSync(action); }
    function getHostName(action)   { return Flagfox.getHostForActionTemplate(action.template); }
    function getShortcuts(action) {
        if ( !(action.iconclick || action.hotkey) )
            return "";
        let shortcuts = [];
        // TODO/FIXME: There is no support for handling middle-clicks for page actions in the current WebExtension API
        if (action.iconclick && !action.iconclick.includes("middle"))
            shortcuts.push(Flagfox.getLoadedString(hotclickToStringId(action.iconclick)));
        if (action.hotkey)
            shortcuts.push(prettifyHotkeyString(action.hotkey));
        return shortcuts.join(",  ");
    }

    // Element IDs must be unique, which isn't viable for components of a template, so the custom 'data-id' attribute will be used to select them instead
    const dataIdSelector = (id => "[data-id=\""+id+"\"]");
    const getByDataIdSelector = ((item,s) => (s === "item" ? item : item.querySelector(s)));  // element.querySelector() only checks children; "item" indicates root item
    const attributeTemplates = [
        ["item",                      setDefaultStatusClass,    getIsDefault],
        [dataIdSelector("checkbox"),  setCheckedBox,            getShowState],
        [dataIdSelector("favicon"),   setFaviconSrc,            getFaviconSrc],
        [dataIdSelector("name"),      setTextContentAndTooltip, getName],
        [dataIdSelector("name"),      maybeAppendTooltipLine,   getHostName],
        [dataIdSelector("shortcuts"), setTextContentAndTooltip, getShortcuts],
    ];
    const itemTemplate = document.getElementById("actionsList-itemTemplate");

    // First, clear out a previous generation, if needed
    while (actionsListBox.lastChild)
        actionsListBox.removeChild(actionsListBox.lastChild);

    return Promise.all([Flagfox.actions.ensureLoaded(),
                        Flagfox.lazyLoadPropertiesFile(["options","actions"])])  // Needed to do sync string fetches
            .then(() => {
                // Generate the list of actions (starting from templates)
                for (let id=0; id < Flagfox.actions.length; id++)
                {
                    let action = Flagfox.actions.getById(id);

                    let newItem = document.importNode(itemTemplate.content,true).firstElementChild;  // This is an "li" element to be inserted into a "ul"
                    for (const template of attributeTemplates) {
                        const [selector, setter, getter] = template;
                        setter(getByDataIdSelector(newItem, selector), getter(action));
                    }
                    newItem.setAttribute("data-id","aID:"+id);

                    if (isActionDeleteQueued(id))  // Carry over previously pending delete state
                        disableActionListItem(newItem);

                    let plaintext = getName(action) + "\n" + action.template + "\n";
                    let itemDragStartClosure = function(event) {
                        event.dataTransfer.setDragImage(getByDataIdSelector(newItem, dataIdSelector("dragimage")), 16, 16);
                        setDraggedListItem(event.dataTransfer, getIDofActionFromElement(newItem), plaintext);  // Can't use 'id' from loop, as it can change without a list regen
                    };

                    newItem.addEventListener("pointerdown", onActionCommand);  // Select item / activate buttons on mouse / pointer down
                    newItem.addEventListener("dblclick",    onActionCommand);  // Doubleclick to quick open the edit/config dialog
                    newItem.addEventListener("change",      onActionCommand);
                    newItem.addEventListener("dragstart",   itemDragStartClosure);

                    actionsListBox.appendChild(newItem);
                }

                selectAction(selectedActionItemIndex);  // Refresh selection (or 0, as default on first load)
            })
            .catch(e => console.error("Flagfox error generating actions' options list:", e));
}

function hotclickToStringId(hotclick) {
    let count = null;
    switch (hotclick.replace("middle","").replace("click","")) {
        case "":        count = 1;  break;
        case "double":  count = 2;  break;
        case "triple":  count = 3;  break;
    }
    return "opt." + String(count) + (hotclick.includes("middle") ? "m" : "") + "click";
}

function prettifyHotkeyString(hotkeyStr) {
    function substitute(str, ...lists) {
        let rv = str;
        for (let list of lists)
            for (let [a, b] of list)
                rv = rv.replace(a, b);
        return rv;
    }

    if (!isNonEmptyString(hotkeyStr))
        return "";
    if (!hotkeyStr.includes("+"))
        return substitute(hotkeyStr, hotkeyPrettifier_modifiers, hotkeyPrettifier_keywords);

    const parts = hotkeyStr.split("+");  // These pluses are the separators between keys in the combination (only combos are supported)
    const key = parts.pop();
    const mods = parts.join(hotkeyPrettifier_separator);
    return substitute(mods, hotkeyPrettifier_modifiers) + hotkeyPrettifier_separator + substitute(key, hotkeyPrettifier_keywords);
}

function cleanupAllHighlights() {  // Clean up all drop markers
    actionsListBox.classList.remove("droptarget");
    for (let element of actionsListBox.querySelectorAll(".selected, .droptarget-top, .droptarget-bottom"))
        element.classList.remove("selected", "droptarget-top", "droptarget-bottom");  // Firefox 26+ for multiple classes at once
}

function softSaveActions() {  // Make action changes take effect now and queue a save to storage after a delay (minimizes saves for multiple minor changes in a row)
    Flagfox.actions.refresh();
    clearTimeout(pendingActionsSave);  // If a save is already pending, then reset the timer
    pendingActionsSave = setTimeout((() => {
        pendingActionsSave = null;
        Flagfox.actions.save();
    }), actionsSaveDelay);
}

function emptyTrash() {  // Perform any pending deletes and save on window close
    let needToSaveActions = (pendingActionsSave !== null);
    clearTimeout(pendingActionsSave);  // If a save is already pending, then cancel it in favor of below to avoid double saving
    if (pendingDeletes.size > 0) {
        const actionIDs = Flagfox.actions.getActionIdsMap();  // WeakMap of all action objects to their indicies in the current list
        const getID = (action => actionIDs.get(action));
        const hadID = (id => (id !== undefined));  // Shouldn't happen, but handle getID() failure anyway
        const reverseSort = ((a,b) => (b-a));
        const deleteID = (id => Flagfox.actions.remove(id));
        // NOTE: Deletions must be done in descending order (higher indices change after a delete)
        Array.from(pendingDeletes.values(), getID)  // Convert Set to Array and do a map(), in one step (can't map directly from values())
             .filter(hadID)
             .sort(reverseSort)
             .forEach(deleteID);
        pendingDeletes.clear();
        needToSaveActions = true;
    }
    if (needToSaveActions)
        Flagfox.actions.save();        // Save actions if anything changed
    if (!Flagfox.prefs.get("showfavicons"))
        Flagfox.FaviconCache.clear();  // Clear favicons cache if disabled
    else if (needToSaveActions)
        Flagfox.FaviconCache.cull();   // Cull favicons cache if enabled and changed
}

function resetMessagesPrefs() {  // Resets all "don't show this again" selections and resets messages per session limits
    Flagfox.prefs.reset(warnPrefs);
    Flagfox.resetNotificationsThisSession();
    document.getElementById("resetMessagesLink").setAttribute("hidden", "true");  // Property doesn't work here anymore, for some reason
}

function setShowFavicons() {
    Flagfox.prefs.set("showfavicons", document.getElementById("showFaviconsCheckbox").checked);
    Flagfox.actions.refresh();  // All menus will need to be updated, but the actions themselves don't need saving
    generateActionsEditList();  // Regenerate list with new setting
}

function setOpenIn() {
    Flagfox.prefs.set("openactionsin", document.getElementById("openInMenu").value);
}

function gotoGetMorePage() {
    Flagfox.openURL("https://flagfox.net/customactions", "tabF");
}

//}}}
//BEGIN LIGHTBOX IFRAME HANDLING **********************************************
//{{{

function openEditAction(startingData = {id: "new", show:true}) {  // Defaults to blank new action, if called with no arguments
    pendingEditData = startingData;
    openLightbox("edit");
}

function openLightbox(name)  // Pass null as the argument to close
{
    assert(isNonEmptyString(name), "openLightbox() requires a name string!", name);
    iframe.setAttribute("name", name);
    iframe.setAttribute("src", childDialogURLs[name]);
    document.body.setAttribute("data-loadinglightbox", "true");
    document.body.setAttribute("data-showlightbox", "true");
}

// NOTE: Functions here must be defined with function/var and not const/let in order to allow iframes to call them via 'parent'
function closeLightbox() {
    iframe.removeAttribute("name");
    iframe.removeAttribute("src");
    document.body.setAttribute("data-showlightbox", "false");
    document.body.removeAttribute("data-loadinglightbox");
}

// HACK ALERT: Dear anyone reading this: if you know how to do this properly in CSS, please email me... (if such a method even exists)
// That said, based on my attempts to search for answers, I suspect nobody knows how this is supposed to work and it's just very badly designed.
function resizeLightbox() {
    return sleep(0).then(() => {  // The "load" event is actually too soon if sizes were altered in JS; need to recalculate size after it slightly (this is a mess)
        const contents = iframe.contentDocument.getElementById("contents-box");
        iframe.style.height = contents.offsetHeight + "px";
        iframe.style.width = contents.offsetWidth + "px";
    });
}

// NOTE: This needs to be called by the child document after it has loaded everything and is done setting things that affect its size. (including L10N)
function onLightboxLoaded() {
    return resizeLightbox().then(() => {
        document.body.removeAttribute("data-loadinglightbox");
        iframe.contentWindow.focus();
    });
}

function isLightboxOpen() {
    return document.body.getAttribute("data-showlightbox") === "true";
}

//}}}
//BEGIN EVENT HANDLING ********************************************************
//{{{

function onActionCommand(event)  // Called on mouse down, doubleclick, and checkbox change
{
    let element = event.target;

    // HACK BUGFIX: Firefox 60 gave buttons as the target on click; Firefox 78 ESR now gives the img inside it as the target, for some unknown reason
    if (element.parentElement.tagName == "BUTTON")  // TODO: Clean this up after dropping Firefox 60 ESR support
        element = element.parentElement;

    const actionID = getIDofActionFromElement(element);
    const command = (event.type == "dblclick" ? "edit" : element.getAttribute("data-id"));

    debugLog_events("list item event:", event, element, actionID, command);

    selectAction(actionID);  // Change selection on any interaction

    if (event.type == "pointerdown" && element.tagName != "IMG") {  // Favicon always has potential drag cursor; buttons should never have it (tagName is always uppercase for HTML)
        element.classList.add("draggable");
        const endDraggable = (() => element.classList.remove("draggable"));
        window.addEventListener("pointerup",   endDraggable, {once:true});  // Listeners on window to catch event, regardless of where
        window.addEventListener("pointermove", endDraggable, {once:true});
    }

    if (isActionDeleteQueued(actionID) && command != "undelete")  // If disabled from pending delete, then the only valid command is undeletion
        return;

    switch (command)
    {
        case "configure": case "edit":
            openEditAction({id:actionID});
            return;
        case "checkbox":
            Flagfox.actions.getById(actionID).show = maybeBool(element.checked);
            softSaveActions();
            return;
        case "delete":
            queueActionDelete(actionID,true);
            return;
        case "undelete":
            queueActionDelete(actionID,false);
            return;
    }
}

function onMenuCommand(event)
{
    if (!event.target || isDisabled(event.target))
        return;
    switch (event.target.id)
    {
        case "new":
            openEditAction();
            return;
        case "clone":
            openCloneSelectedAction();
            return;
        case "paste":
            document.execCommand("paste", false, null);  // Fire off a new paste event and handle it exactly the same as if was triggered via hotkey or menu
            return;
        case "more":
            gotoGetMorePage();
            return;
    }
}

// If navigating page by tabbing, focus applicable action list item, but leave selection if the focus leaves the actions list (menu/arrow clicks need a selection)
// The enter key acts as a click, and a newly selected action gets focus on the first button (which is edit/configure)
function onFocusChange(event) {
    const focusedActionID = getIDofActionFromElement(event.target);  // Can't use document.activeElement here, as this event is fired before the actual focus change
    if (focusedActionID !== null)
        selectAction(focusedActionID);
}

function onKeyDown(event)
{
    if (event.defaultPrevented)
        return;

    // First, the set of key bindings that are always available, even with subdialogs open
    switch (event.key)
    {
        case "F1": case "Help":
            gotoGetMorePage();
            return;
        case "Escape": case "GoBack": case "Close":
            closeLightbox();
            return;
    }

    if (isLightboxOpen())
        return;

    // Then, the remaining set of key bindings that are only applicable to the main page, and are not available when a subdialog is open
    switch (event.key)
    {
        // Tab key press changes focus, which is handled in onFocusChange(); Enter key press counts as a click on buttons and input elements
        case "ArrowUp":
            event.preventDefault();  // Selection will scroll; prevent default handling to avoid double-scrolling
            if (event.ctrlKey)
                shiftSelectedAction(-1);  // Move action instead of just selection, if holding control key
            else
                shiftActionSelection(-1);
            return;
        case "ArrowDown":
            event.preventDefault();  // Selection will scroll; prevent default handling to avoid double-scrolling
            if (event.ctrlKey)
                shiftSelectedAction(+1);  // Move action instead of just selection, if holding control key
            else
                shiftActionSelection(+1);
            return;
        case "Home":
            event.preventDefault();  // Selection will scroll; prevent default handling to avoid double-scrolling
            if (event.ctrlKey && haveSelectedAction())
                moveAction(selectedActionItemIndex, 0);  // Move action instead of just selection, if holding control key
            else
                selectAction(0);
            return;
        case "End":
            event.preventDefault();  // Selection will scroll; prevent default handling to avoid double-scrolling
            if (event.ctrlKey && haveSelectedAction())
                moveAction(selectedActionItemIndex, actionsListBox.childElementCount-1);  // Move action instead of just selection, if holding control key
            else
                selectAction(actionsListBox.childElementCount-1);
            return;
        //case "PageUp": case "PageDown:": return;  // FIXME/TODO: page up/down event fires before scrolling, so can't easily find in-view element to select
        case "F2": case "Open": case "ContextMenu":
            if (haveSelectedAction()) {
                queueActionDelete(selectedActionItemIndex, false);  // Undelete, if needed
                openEditAction({id:selectedActionItemIndex});
            }
            return;
        case "Insert": case "New":
            openEditAction();
            return;
        case "Delete": case "Del": case "Backspace": case "Clear":
            if (haveSelectedAction() && Flagfox.actions.getById(selectedActionItemIndex).custom) {
                queueActionDelete(selectedActionItemIndex, !isActionDeleteQueued(selectedActionItemIndex));  // Delete or undelete
                shiftActionSelection(+1);  // Also select the next item in the list to make multi-(un)deletions quicker to do
            }
            return;
        case "Undo":
            if (haveSelectedAction() && isActionDeleteQueued(selectedActionItemIndex))  // TODO: just fetch last from bin?
                queueActionDelete(selectedActionItemIndex, false);  // Undelete
            return;
    }
}

function onDragOver(event)
{
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer)
        return;

    if (isDebugLevelEnabled("events")) {
        const output = [];
        for (const type of dataTransfer.types) {
            const data = dataTransfer.getData(type);  // NOTE: getData doesn't work cross-origin here, anymore (does work on drop, though)
            output.push(type + ": " + (data ? data.dropSuffix("\n") : "(...)"));
        }
        debugLog_events(output.join("\n"));
    }

    const draggedID = getDraggedListItemID(dataTransfer);
    if (draggedID !== null)  // Dragging action in list to reorder
    {
        const targetID = getDragTargetID(event);
        if (targetID === null)
            return;

        const targetItem = actionsListBox.children[targetID];

        event.preventDefault();  // Allow dropping
        dataTransfer.dropEffect = "move";

        // Show drop marker at target location
        const delta = targetID - draggedID;
        if (delta == 0)
            targetItem.classList.add("selected");
        else if (delta < 0)
            targetItem.classList.add("droptarget-top");
        else if (delta > 0)
            targetItem.classList.add("droptarget-bottom");

        // Automatically scroll as needed
        ensureIndexIsVisible(targetID);
    }
    else if (parsableMimeTypes(dataTransfer).length)  // Search for something else that can be parsed
    {
        event.preventDefault();  // Allow dropping
        dataTransfer.dropEffect = "copy";
        actionsListBox.classList.add("droptarget");
    }
}

function onDragDrop(event)
{
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer)
        return;

    debugLog_events("dropped:", dataTransfer);

    event.preventDefault();
    cleanupAllHighlights();

    const draggedID = getDraggedListItemID(dataTransfer);
    if (draggedID !== null)  // Dragging action in list to reorder
        moveAction(draggedID, getDragTargetID(event));
    else if (dataTransfer.files.length)  // Dragging a file
        importFile(dataTransfer.files[0]);  // Only accept one at a time
    else for (const mimeType of parsableMimeTypes(dataTransfer))  // Search for something else that can be parsed
        if (importData(mimeType,dataTransfer))
            return;  // Done; end search loop
}

function onPaste(event)
{
    clipboardTarget.value = "";  // This doesn't need a value, as it will be better extracted from the event using its listed mime-type

    const dataTransfer = event.clipboardData;  // Pointlessly different property name
    if (!dataTransfer)
        return;

    event.preventDefault();

    if (event.target === clipboardTarget)
        checkClipboard(dataTransfer);   // If this is for the clipboard target element, then we're checking the clipboard to see if it's viable
    else
        importClipboard(dataTransfer);  // If it's a regular paste event, then handle the user's requested import from clipboard
}

//}}}
//BEGIN SELECTION AND LIST HANDLING *******************************************
//{{{

function selectAction(id) {  // Sets selectedActionItemIndex with a bounds check; always changes selection to a valid ID or null
    if (selectedActionItemIndex === id && actionsListBox.querySelector(".selected") !== null)  // If no change and something is actually shown as selected, then nothing to do here
        return;

    selectedActionItemIndex = null;
    cleanupAllHighlights();
    if (!Flagfox.actions.validateID(id))
        return;

    actionsListBox.children[id].classList.add("selected");
    selectedActionItemIndex = id;

    if (getIDofActionFromElement(document.activeElement) !== id) {  // Don't alter focus if already in the selection (keep focus on specific button/checkbox)
        let button = actionsListBox.children[id].querySelector("button");  // This doesn't care about visibility, and there is no ":visible" pseudo-class
        while (button && isHidden(button))
            button = button.nextElementSibling
        if (button)
            button.focus();  // Focus first visible button (list items don't take focus, themselves)
    }

    ensureIndexIsVisible(id);  // If selected by keyboard, make sure it's in view

    // Disable arrows if the selected item can't move any further in one direction
    setDisabled(document.getElementById("up"),   !validateSelectionDelta(-1));
    setDisabled(document.getElementById("down"), !validateSelectionDelta(+1));
}

function haveSelectedAction() {
    return selectedActionItemIndex !== null;
}

function validateSelectionDelta(delta) {
    return delta !== 0 && haveSelectedAction() && Flagfox.actions.validateID(selectedActionItemIndex + delta);
}

function shiftSelectedAction(delta) {
    if (validateSelectionDelta(delta))
        moveAction(selectedActionItemIndex, selectedActionItemIndex + delta);
}

function shiftActionSelection(delta) {
    if (validateSelectionDelta(delta))
        selectAction(selectedActionItemIndex + delta);
}

function moveAction(oldID, newID) {
    if (oldID === null || newID === null)
        return;
    // Move action in main array
    let action = Flagfox.actions.remove(oldID);
    Flagfox.actions.insert(newID,action);
    softSaveActions();
    // Move element in edit box
    let item = actionsListBox.children[oldID];
    item = actionsListBox.removeChild(item);
    let newNextSibling = actionsListBox.children[newID];
    actionsListBox.insertBefore(item,newNextSibling);
    // Select and force it to be in view
    selectAction(newID);
    ensureIndexIsVisible(selectedActionItemIndex);
}

function disableActionListItem(item, disabled=true) {
    const checkbox = item.querySelector("[data-id=\"checkbox\"]");
    disableInput(checkbox, disabled);  // Uncheck and disable input for the checkbox
    setDisabled(item, disabled);       // Grey out the list item
}

function queueActionDelete(id, doDelete=true) {  // Delete/Undelete, by ID
    const action = Flagfox.actions.getById(id);
    if (!action || !action.custom)  // May only delete user's custom actions, not defaults
        return;
    action.show = false;  // Remove from menu immediately
    softSaveActions();
    disableActionListItem(actionsListBox.children[id], doDelete);  // Set/unset disabled state
    if (doDelete)
        pendingDeletes.add(action);
    else
        pendingDeletes.delete(action);
}

function isActionDeleteQueued(id) {
    const action = Flagfox.actions.getById(id);
    if (!action || !action.custom)
        return false;
    return pendingDeletes.has(action);
}

function openCloneSelectedAction() {
    if (!haveSelectedAction())
        return;
    const action = Flagfox.actions.getById(selectedActionItemIndex);
    if (!action)
        return;
    Flagfox.actions.getLocalizedName(action)
           .then(name => openEditAction({id:"new", show:true, name:name, template:action.template}));
}

function ensureIndexIsVisible(focusID) {
    const maxID = actionsListBox.childElementCount - 1;
    if (focusID < 0)
        focusID = 0;
    else if (!isIntegerInRange(focusID, 0, maxID))
        focusID = maxID;
    const element = actionsListBox.children[focusID];
    if (element)
        scrollIntoViewIfNeeded(element, actionsListBox);  // Works better than element.scrollIntoView()
}

//}}}
//BEGIN IMPORT HANDLING ********************************************************
//{{{
//*** (see also: import.js) ***//

function importData(mimeType, dataTransfer) {
    const newActionsArray = parseData(mimeType, dataTransfer);
    if (newActionsArray.length > 1) {
        Flagfox.actions.append(newActionsArray);
        softSaveActions();
        generateActionsEditList().then(() => {
            selectAction(Flagfox.actions.length-1);
            ensureIndexIsVisible(selectedActionItemIndex);
        });
        return true;
    }
    if (newActionsArray.length == 1 && newActionsArray[0].template) {  // Might not have a name and also might only have a URL instead of a full template
        openEditAction({id:"new", show:true, name:newActionsArray[0].name, template:newActionsArray[0].template});
        return true;
    }
    return false;
}

function importFile(file)
{
    debugLog("Attempting import from file...");
    let mimeType = "text/plain";
    if (isString(file.type) && ["json", "javascript"].some(j => file.type.includes(j)))  // JSON types and extensions are all over the place; detect any
        mimeType = "application/json";
    const reader = new FileReader();
    reader.onload = (() => importData(mimeType, reader.result));  // Will attempt to detect JSON and import as plain list if not
    reader.readAsText(file);
}

function importClipboard(dataTransfer) {
    cleanupAllHighlights();
    for (const mimeType of parsableMimeTypes(dataTransfer))  // Search for something that can be parsed (dragged list items N/A here)
        if (importData(mimeType,dataTransfer))
            return;  // Done; end search loop
}

function checkClipboard(dataTransfer) {
    // The primitive clipboard API requires triggering a paste event on a focused element (which must not be hidden, though can be invisible...)
    if (!dataTransfer) {
        rememberRealFocusState(true);
        clipboardTarget.focus();
        if (!document.execCommand("paste", false, null)) {  // This will fire a paste event which will end up sending its dataTransfer here, via onPaste()
            console.error("paste event failed to fire to check clipboard contents");
            setDisabled(pasteButton, true);
        }
        return;
    }

    // Once we have a paste event, restore the proper focus
    rememberRealFocusState(false);

    // Then check the event's data for something that is possible to import
    let importable = false;
    for (const mimeType of parsableMimeTypes(dataTransfer))
        if (importable = containsImportableText(dataTransfer.getData(mimeType)))
            break;  // End search loop as soon as anything is found

    // Finally, set the disabled state of the paste menu button based on the result
    setDisabled(pasteButton, !importable);
}

const focusTmp = {};

// The dumb clipbard API requires changing focus, so remember the currently focused element and scroll position to re-set later
function rememberRealFocusState(store) {
    if (store) {
        focusTmp.what = document.activeElement;
        focusTmp.where = actionsListBox.scrollTop;
        return;
    }
    if (document.activeElement === clipboardTarget) {
        clipboardTarget.blur();
        if (focusTmp.what) {
            focusTmp.what.focus();                      // If this element is scrolled out of view, this refocus will try to force it to scroll
            actionsListBox.scrollTop = focusTmp.where;  // Also saving and remembering the scroll position prevents it from jumping around
        }
    }
    delete focusTmp.what;
    delete focusTmp.where;
}

//}}}
//BEGIN DRAG/DROP DATA FUNCTIONS **********************************************
//{{{

// NOTE: I previously used "application/x-moz-node" here, as per MDN's recommendation, however in a WebExtension it throws a cryptic security error.
// Passing just the ID via JSON turns out to be simpler, anyway.
function setDraggedListItem(dataTransfer, data_itemid, data_plain) {
    dataTransfer.setData("application/json", JSON.stringify({ id: data_itemid }));  // Data for drag to reorder in list
    dataTransfer.setData("text/plain", data_plain);                                 // Data for drag to copy as text
}

function getDraggedListItemID(dataTransfer) {  // Returns null if N/A
    try {
        const text = dataTransfer.getData("application/json");
        if (text.length > 16)
            return null;
        const id = JSON.parse(text).id;
        if (Flagfox.actions.validateID(id))
            return id;
    } catch {}
    return null;
}

function getDragTargetID(event) {  // Returns the ID of the actions list item that is the intended target of drag event
    const id = getIDofActionFromElement(event.target);
    return Flagfox.actions.validateID(id) ? id : null;
}

//}}}
//BEGIN DOM HANDLING FUNCTIONS ************************************************
//{{{

function getIDofActionFromElement(element) {  // Will always be an integer or null
    return getIndexOfElementInParent(getElementContainerByTagName(element,"LI"));  // Must be uppercase, due to odd HTML quirk
}

function disableInput(element, disabled=true) {
    if (disabled)
        element.checked = false;
    element.disabled = disabled;
}

// HTML is a PITA because unlike XUL, you can't just use a single property everywhere; only input items work with it here
function setDisabled(item, disabled=true) {
    item.classList.toggle("disabled", disabled);
}

function isDisabled(element) {
    do {
        if (element.classList && element.classList.contains("disabled"))
            return true;
    } while (element = element.parentElement);
    return false;
}

function isHidden(element) {
    const style = window.getComputedStyle(element);
    return style.display == "none" || style.visibility == "hidden";
}

//}}}
