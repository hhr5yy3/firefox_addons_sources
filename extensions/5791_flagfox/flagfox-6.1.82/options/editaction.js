"use strict";

const Flagfox = browser.extension.getBackgroundPage();  // NOTE: This fetches access to the global object for the background scripts (all praise the sync access!!!)

/* TODO:REIMPLEMENT
const fullHelpContents =  // Lists of sections and their contents
[
    "new_column",
    ["url","{baseDomainName}","{domainName}","{TLD}","{fullURL}"],
    ["meta","{title}","{meta-author}","{meta-description}","{meta-keywords}","_meta"],
    ["advanced","copystring:","javascript:"],
    "new_column",
    ["server","{IPaddress}","{countryCode}","{countryName}"],
    ["languages","{locale}","{locale-page}","{locale-UI}","{locale-OS}","{baseLocale}","_baselocale"],
    ["tips","_bookmarklets"]
];
*/

let currentActionID;
let oldHotkey;
let newHotkey;

defineLazyGetter(this, "saveButton",    (() => document.getElementById("saveButton")));
defineLazyGetter(this, "nameField",     (() => document.getElementById("name")));
defineLazyGetter(this, "hotkeyField",   (() => document.getElementById("hotkey")));
defineLazyGetter(this, "templateField", (() => document.getElementById("template")));
defineLazyGetter(this, "autocomplete",  (() => document.getElementById("templateAutocompletePopup")));
defineLazyGetter(this, "favicon",       (() => document.getElementById("favicon")));

//BEGIN LOADING/UNLOADING *****************************************************
//{{{

window.addEventListener("load", function() {
    assert(!!parent, "Missing parent document. This page can only be loaded as a subdocument of the main config.html page.");
    assert(isObject(parent.pendingEditData), "Missing pending edit data. Must be set prior to loading edit action dialog.")

    const pendingEditData = parent.pendingEditData;
    parent.pendingEditData = undefined;
    currentActionID = pendingEditData.id;

    if (currentActionID == "new") {  // New action
        //document.getElementById("saveButton").setAttribute("icon","add"); // FIXME
        updateFields(pendingEditData, false);
    }
    else {  // Loading from settings
        const action = Flagfox.actions.getById(pendingEditData.id);
        Flagfox.actions.assertValidAction(action);
        updateFields(action, !action.custom);
    }

    if (!templateField.readOnly) {
        // Drops directly onto text boxes will still work as normal; these listeners are to let drops onto other parts of the dialog have an effect
        window.addEventListener("dragover", onDragOver);
        window.addEventListener("drop",     onDragDrop);
    }

    Flagfox.lazyLoadPropertiesFile(["options","countrynames"]).then(() => {  // For sync string fetches
        const quickhelp_demo = [
            "Flagfox - Add-ons for Firefox",
            "https://addons.mozilla.org/addon/flagfox",
            "addons.mozilla.org",
            "54.71.189.148",
            Flagfox.getLoadedString("US")
        ];
        const localizedExampleTooltipPrefix = Flagfox.getLoadedString("opt.example") + " ";
        let quickHelpTableRows = document.getElementById("quickhelp").rows;
        for (let i=0; i<quickHelpTableRows.length; ++i)
            quickHelpTableRows[i].setAttribute("title", localizedExampleTooltipPrefix + quickhelp_demo[i]);
    });

    disableContextMenu();

    addElementEventListener("favicon",        "error",   (() => favicon.setAttribute("src", "/icons/default.png")));
    addElementEventListener("hotkey",         "keydown", enterHotkey);  // NOTE: Must use 'keydown'; 'keypress' gets (inconsistiently) intercepted if already set
    //addElementEventListener("fullhelplink", "click",   showFullHelpPopup);
    addElementEventListener("name",           "input",   updateState);
    addElementEventListener("template",       "input",   updateState);
    addElementEventListener("getMoreLink",    "click",   gotoGetMorePage);
    addElementEventListener("saveButton",     "click",   (() => { save(); parent.closeLightbox(); }));
    addElementEventListener("closeButton",    "click",   parent.closeLightbox);

    Flagfox.loadPageI18N(document)
           .then(parent.onLightboxLoaded);
});

function save()
{
    if (currentActionID === "new")
        currentActionID = Flagfox.actions.create();  // Create a new blank custom action at the end of the list
    assert(Flagfox.actions.validateID(currentActionID), "invalid action ID to save!", currentActionID);

    let action = Flagfox.actions.getById(currentActionID);  // If the action is new, it is not yet valid

    if (action.custom) {
        action.name = nameField.value.trim();
        action.template = safeDecodeURI(templateField.value.trim());  // Avoid user encoding; would double-encode
        Flagfox.actions.assertValidAction(action);
    }

    action.show = maybeBool(document.getElementById("show").checked);

    const newHotclick = document.getElementById("iconclick").value;
    Flagfox.actions.setBindings(currentActionID, { hotclick: newHotclick, hotkey: newHotkey });
    parent.softSaveActions();  // Does a Flagfox.actions.refresh(); Flagfox.actions.save() on options close
    parent.generateActionsEditList()
          .then(() => parent.selectAction(currentActionID));  // Not ready to be selected until after the list is re-generated
}

function importData(mimeType, dataTransfer)
{
    const importedAction = parseData(mimeType, dataTransfer)[0];  // For importing here, just take the first object
    if (!importedAction)
        return false;
    updateFields(importedAction, false);
    return true;
}

function updateFields(action, isDefault)
{
    // TODO: Do I even need this anymore?
    const titleStringId = "opt." + (action.id === "new" ? "newtitle"
                                                        : (isDefault ? "editdefaulttitle"
                                                                     : "editcustomtitle"));
    Flagfox.getString(titleStringId)
           .then(titleStringValue => (document.title = titleStringValue));

    document.getElementById("show").checked = !!action.show;

    if (isDefault) {  // User may only edit name/template of custom actions
        nameField.readOnly = true;
        templateField.readOnly = true;
        document.getElementById("contents-box").classList.add("default");  // Stuff to hide is set in common.css
        Flagfox.actions.getLocalizedName(action)
               .then(name => (nameField.value = name));
    } else if (action.name) {
        nameField.value = action.name;
    }

    if (action.template) {
        templateField.value = action.template;
    }

    updateState();  // Set favicon and disabled state of save button

    if (action.iconclick) {
        document.getElementById("iconclick").value = action.iconclick;
        if (action.iconclick === "click") {
            // Require a click action to always be set; hide the no click option if this is the one currently with it
            document.getElementById("noclick").setAttribute("hidden", "true");
        }
    }

    if (action.hotkey) {
        Flagfox.Hotkeys
               .validate(action.hotkey)  // Check validity first; old hotkeys which are now incompatible are only changed after saving here
               .then(({valid}) => updateHotkeyField(valid ? (newHotkey = oldHotkey = action.hotkey)
                                                          : ("INVALID " + action.hotkey)));
    }
}

//}}}
//BEGIN EVENT HANDLING ********************************************************
//{{{

function onDragOver(event)  // TODO/FIXME: Maybe importing shouldn't work here at all, if it can't be consistent? Disabled for now (was broken...)
{
//     if (!event.dataTransfer || event.target.id === "template")  // Allow dropping placeholders into template box as normal
//         return;
//     if (parsableMimeTypes(event.dataTransfer).length > 0) {
//         event.preventDefault();  // Allow dropping
//         event.dataTransfer.dropEffect = "copy";
//     }
}

function onDragDrop(event)
{
//     if (!event.dataTransfer || event.target.id === "template")  // Allow dropping placeholders into template box as normal
//         return;
//     for (const mimeType of parsableMimeTypes(event.dataTransfer))  // Search for something that can be parsed
//         if (importData(mimeType, event.dataTransfer))
//             return;
}

function enterHotkey(event)  // All keydown events in the hotkey input field get sent here (including each modifier)
{
    const key = event.key;
    if (!isString(key))
        return;
    if (["Escape", "Undo"].includes(key))
        return void updateHotkeyField(newHotkey = oldHotkey);
    if (["Backspace", "Clear", "Delete", "EraseEof"].includes(key))
        return void updateHotkeyField(newHotkey = undefined);
    if (key.length !== 1)  // Character keys only
        return;

    const parts = [];
    if (event.ctrlKey)
        parts.push("Ctrl");
    if (event.altKey)
        parts.push("Alt");
    if (event.metaKey)  // Does not work under Windows/Linux anymore
        parts.push("Command");
    if (event.shiftKey)
        parts.push("Shift");

    // NOTE: The WebExtension API has a limit of two modifiers, the first of which must be one of ctrl/alt/command.
    //       Firefox 63+ allows any two modifiers. Older versions require the second modifier be only shift or not present.
    //       The validation check done below will detect support automatically. Excess modifiers are dropped here, for simplicity.
    while (parts.length > 2)
        parts.pop();

    // The only special characters allowed are the following, and they need to be in word-form to be valid
    if (key === ",")
        parts.push("Comma");
    else if (key === ".")
        parts.push("Period");
    else if (key === " ")
        parts.push("Space");
    else
        parts.push(key.toUpperCase());

    const enteredHotkey = parts.join("+");  // Mozilla's hotkey notation used via the command API uses pluses as separators

    debugLog_events("hotkey input event:", event, enteredHotkey);

    Flagfox.Hotkeys
           .validate(enteredHotkey)
           .then(({valid, exists}) => {  // NOTE: Valid means the API will accept it, not that it 100% will work; Exists means Flagfox already has it set for another action
                newHotkey = (valid ? enteredHotkey : undefined);
                if (exists && oldHotkey != newHotkey)
                    updateHotkeyField("EXISTS "+enteredHotkey);  // Show shortcut prefixed with a warning icon
                else if (!valid)
                    updateHotkeyField("INVALID "+enteredHotkey, true);  // Show shortcut prefixed with an invalid icon for a few seconds, then clear the field
                else
                    updateHotkeyField(enteredHotkey);
                // If potentially set for something else, then stop it from triggering (blocklist check is sync, but can't prevent some, e.g. Ctrl+W)
                // NOTE: Other unknown conflicts that can't be detected here SHOULD go through and trigger normally so the user can see the conflict before saving
                if (!valid || exists)
                    event.preventDefault();
           });
}

// Sets the hotkey string shown in the relevant field, optionally clearing after a few seconds (for invalid combinations)
function updateHotkeyField(hotkeyStr, tmp=false) {
    hotkeyField.value = parent.prettifyHotkeyString(hotkeyStr);
    if (tmp) {
        const currentValue = hotkeyField.value;
        sleep(3000).then(() => {
            if (hotkeyField.value == currentValue) {  // Only clear if not already changed in the interim
                hotkeyField.value = "";
            }
        });
    }
}

const faviconUpdateDelay = 500;  // Wait until 500ms after last template field change
let pendingFaviconUpdate = undefined;

function updateState()  // Called on name and template field input events (each keyboard input & cut/paste/undo)
{
    if (!document.getElementById("contents-box").classList.contains("default")) {  // Only applicable to custom actions
        const name = nameField.value.trim();
        const template = templateField.value.trim();
        saveButton.disabled = (!name || !template);

        const updateFavicon = (() => {
            favicon.src = Flagfox.FaviconCache.urlFromActionTemplate(template);
            pendingFaviconUpdate = null;
        });

        if (pendingFaviconUpdate === undefined) {
            // On first load, update the favicon immediately
            updateFavicon();
        } else {
            // On updates on input, use a timeout to throttle icon fetch attempts
            clearTimeout(pendingFaviconUpdate);
            pendingFaviconUpdate = setTimeout(updateFavicon, faviconUpdateDelay);
        }
    }
}

function onEnterKeyPress()
{
/*
    if (autocomplete.state == "open") {
        const listBox = autocomplete.firstChild;  // FIXME
        if (!listBox.selectedItem)
            autocomplete.hidePopup();
        else
            listBox.selectedItem.click();
        return;
    }
*/
    if (saveButton.disabled || nameField.readonly || !document.activeElement)
        return;
    const focusedID = document.activeElement.id;
    if (focusedID != "template" && focusedID != "name")  // Return key saves and closes for these two fields
        return;
    save();
    parent.closeLightbox();
}

//}}}
//BEGIN AUTOCOMPLETE/HELP *****************************************************
//{{{

// FIXME
/*
function generateAutocomplete()
{
    function newListBox(rowCount)
    {
        var listBox = document.createElement("listbox");
        listBox.setAttribute("rows", rowCount+1);  // FIXME: need +1 to prevent occasional phantom vertical scroll bar for no reason
        listBox.setAttribute("style", "margin: 0;");
        var listCols = document.createElement("listcols");
        listCols.appendChild(document.createElement("listcol"));
        listCols.appendChild(document.createElement("listcol"));
        listBox.appendChild(listCols);
        return listBox;
    }
    function newItem(label,value)
    {
        var row = document.createElement("listitem");
        var cell = document.createElement("listcell");
        cell.setAttribute("label", label);
        row.appendChild(cell);
        cell = document.createElement("listcell");
        cell.setAttribute("label", value);
        row.appendChild(cell);
        return row;
    }

    function findPossibleCompletions(str)
    {
        var matches1 = [];
        var matches2 = [];
        fullHelpContents.forEach( function(sectionContents) {
            if (sectionContents instanceof Array)
                sectionContents.forEach( function(content) {
                    if (content[0] == "{")
                    {
                        var contentLabel = getHelpString(content);
                        var contentPos = content.toLowerCase().indexOf(str);
                        if (contentPos != -1)
                        {
                            matches1.push([content, contentLabel, contentPos]);
                            return;
                        }
                        var labelPos = contentLabel.toLocaleLowerCase().indexOf(str);
                        if (labelPos != -1)
                        {
                            matches2.push([content, contentLabel, labelPos]);
                            return;
                        }
                    }
                });
        });
        // Sort first by whether the match was in the parameter or its description, then by position of the match in where it was found
        function sortByRank(a,b) { return a[2] - b[2]; }
        matches1.sort(sortByRank);
        matches2.sort(sortByRank);
        return matches1.concat(matches2);
    }

    if (autocomplete.firstChild)
        autocomplete.removeChild(autocomplete.firstChild);  // Clear autocomplete popup contents if needed

    var textBeforeCursor = templateField.value.substring(0,templateField.selectionEnd);
    var openBracePos = textBeforeCursor.lastIndexOf("{");
    var textToAutocomplete = (openBracePos != -1) ? textBeforeCursor.substring(openBracePos+1) : "";
    if (textToAutocomplete && textToAutocomplete.lastIndexOf("}") == -1)
    {
        var autocompletions = findPossibleCompletions(textToAutocomplete.toLocaleLowerCase());
        if (autocompletions)
        {
            var listBox = newListBox(autocompletions.length);
            for (let i in autocompletions)
            {
                let param = autocompletions[i][0];
                var label = autocompletions[i][1];
                var item = newItem(label,param);
                let onSelectItem = function()
                {
                    templateField.value = templateField.value.substring(0,openBracePos) + param + templateField.value.substring(templateField.selectionEnd);
                    templateField.selectionStart = templateField.selectionEnd = openBracePos + param.length;
                    autocomplete.hidePopup();
                };
                item.addEventListener("click",onSelectItem);
                let onHoverItem = function(event)
                {
                    listBox.selectedItem = event.target;
                };
                item.addEventListener("pointerover",onHoverItem);  // TODO:TEST: was "mouseover"
                listBox.appendChild(item);
            }
            autocomplete.appendChild(listBox);
            autocomplete.openPopup(templateField,"after_start");
            return;
        }
    }
    autocomplete.hidePopup();
}
*/

function onArrowKeyPress(key)  // Select up/down in the list box, with wrap-around  // FIXME
{
/*
    if (autocomplete.state == "open")
    {
        var listBox = autocomplete.firstChild;
        if (key == "up")
        {
            if (listBox.selectedIndex > 0)
                listBox.selectedIndex--;
            else
                listBox.selectedIndex = listBox.getRowCount()-1;
        }
        else if (key == "down")
        {
            if (listBox.selectedIndex < listBox.getRowCount()-1)
                listBox.selectedIndex++;
            else
                listBox.selectedIndex = 0;
        }
    }
*/
}

function getHelpString(name) {
    //return Flagfox.helpstrings.GetStringFromName(name.toLowerCase().replace(/[{}:]/g,""));  // FIXME!!!
}

// FIXME
/*
function generateFullHelpPopup(fullPlaceholdersPallete)
{
    function createLabel(text)
    {
        var label = document.createElement("label");
        label.setAttribute("value",text);
        return label;
    }
    function createDescription(text)
    {
        var desc = document.createElement("description");
        desc.setAttribute("width","100%");
        desc.setAttribute("flex","1");
        desc.textContent = text;
        return desc;
    }
    function createPasteButton(toPaste)
    {
        var icon = document.createElement("image");
        icon.setAttribute("class","icon");
        icon.setAttribute("minwidth","16");
        icon.setAttribute("minheight","16");
        icon.setAttribute("src","/icons/copy.png");
        icon.setAttribute("tooltiptext",Flagfox.strings.GetStringFromName("opt.pastetemplate"));  // FIXME (easily done by using a data-i18n attribute)
        icon.onclick = function() {
            closeFullHelpPopup();
            pastePlaceholder(toPaste);
        };
        return icon;
    }

    var columnRows;  // Created by each "new_column"

    fullHelpContents.forEach( function(sectionContents) {
        if (sectionContents == "new_column")
        {
            var columnGrid = document.createElement("grid");
            columnGrid.setAttribute("style","padding: 2px 10px;");
            var gridColumns = document.createElement("columns");
            var gridColumn = document.createElement("column");
            gridColumn.setAttribute("flex","1");
            gridColumns.appendChild(gridColumn);
            gridColumns.appendChild(gridColumn.cloneNode(false));
            gridColumns.appendChild(gridColumn.cloneNode(false));
            columnGrid.appendChild(gridColumns);
            columnRows = document.createElement("rows");
            columnGrid.appendChild(columnRows);
            fullPlaceholdersPallete.appendChild(columnGrid);
            return;
        }
        sectionContents.forEach( function(content) {
            if (content[0] == "{")  // "{something}"
            {
                var row = document.createElement("row");
                row.appendChild(createLabel(getHelpString(content)));
                row.appendChild(createLabel(content));
                row.appendChild(createPasteButton(content));
                columnRows.appendChild(row);
            }
            else if (content[content.length-1] == ":")  // "something:"
            {
                var row = document.createElement("hbox");
                row.appendChild(createDescription(getHelpString(content)));
                row.appendChild(createPasteButton(content));
                columnRows.appendChild(row);
            }
            else if (content[0] == "_")  // Comment (IDs start with '_')
            {
                var desc = createDescription(getHelpString(content));
                columnRows.appendChild(desc);
            }
            else  // Section header
            {
                var label = createLabel(getHelpString(content));
                label.setAttribute("style","font-weight: bold; padding-top: 10px;");
                columnRows.appendChild(label);
            }
        });
    });
}

function showFullHelpPopup()
{
    var popup = document.getElementById("fullHelpPopup");
    var fullPlaceholdersPallete = document.getElementById("fullPlaceholdersPallete");
    if (fullPlaceholdersPallete.firstChild)
    {
        // Center relative to this window (if done by screen, may show wrong with multiple monitors)
        var x = window.screenX + window.outerWidth/2 - popup.boxObject.width/2;
        var y = window.screenY + window.outerHeight/2 - popup.boxObject.height/2;
        popup.openPopupAtScreen(x,y);
        return;
    }

    // No children; need to generate popup contents
    generateFullHelpPopup(fullPlaceholdersPallete);

    if (!fullPlaceholdersPallete.firstChild)
        throw "Failed to generate help popup contents!";

    /* HACK: There seems to be no sane way to open it centered directly as it has no dimensions until opened.
        The only way around this is to show it once to render dimensions then move it to where it needs to go.
        Once it has been rendered once, it can be hidden and reshown at its correct position on screen. * /
    function onceMoreWithFeeling()
    {
        popup.removeEventListener("popupshown",onceMoreWithFeeling);
        popup.hidePopup();
        showFullHelpPopup();
    }
    popup.addEventListener("popupshown",onceMoreWithFeeling);
    popup.openPopup();
}

function closeFullHelpPopup()
{
    document.getElementById("fullHelpPopup").hidePopup();
}
*/


function pastePlaceholder(toPaste)
{
    if (toPaste[toPaste.length-1] == ":")  // Prefix
    {
        if (templateField.value.startsWith(toPaste))
            return;  // Don't paste prefix twice

        if (templateField.value[10] != ":")  // FIXME: what is this black magic number?... (length of built-in template prefixes is probably all 10)
            templateField.value = toPaste + templateField.value;
        else  // Already has a prefix; replace instead of paste
            templateField.value = toPaste + templateField.value.substr(11);

        updateState();  // FIXME: Might not need anymore (check once this function is reimplemented)
    }
    else
    {
        templateField.value = templateField.value.substr(0,templateField.selectionStart) + toPaste + templateField.value.substr(templateField.selectionEnd);
    }
}

function gotoGetMorePage()
{
    parent.gotoGetMorePage();
    if (currentActionID == "new" && templateField.value == "")
        parent.closeLightbox();  // Close this dialog if it hasn't been used yet when we're going to the forum for new actions
}

//}}}
