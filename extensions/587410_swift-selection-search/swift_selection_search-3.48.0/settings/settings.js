var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Sortable;
var SSS_Settings;
(function (SSS_Settings) {
    const page = {
        engines: undefined,
        inputs: undefined,
        toggleDarkMode: undefined,
        addEngineButton: undefined,
        addGroupButton: undefined,
        addSeparatorButton: undefined,
        importBrowserEnginesButton: undefined,
        resetSearchEnginesButton: undefined,
        minSelectedCharacters: undefined,
        maxSelectedCharacters: undefined,
        popupDelay: undefined,
        middleMouseSelectionClickMargin: undefined,
        websiteBlocklist: undefined,
        selectionTextFieldLocation: undefined,
        nPopupIconsPerRow: undefined,
        iconAlignmentInGrid: undefined,
        popupBackgroundColorPicker: undefined,
        popupBackgroundColor: undefined,
        popupHighlightColorPicker: undefined,
        popupHighlightColor: undefined,
        useCustomPopupCSS: undefined,
        customPopupCSS: undefined,
        exportSettingsToFileButton: undefined,
        importSettingsFromFileButton: undefined,
        importSettingsFromFileButton_real: undefined,
        saveSettingsToSyncButton: undefined,
        loadSettingsFromSyncButton: undefined,
        resetSettingsButton: undefined,
    };
    class EncodingGroup {
        constructor(name, encodings) {
            this.name = name;
            this.encodings = encodings;
        }
    }
    const encodings = [
        new EncodingGroup("Native", [
            ["Default (UTF-8)", "utf8"],
            ["UCS2", "ucs2"],
            ["ASCII", "ascii"],
        ]),
        new EncodingGroup("ISO codepages", [
            ["ISO-8859-1 (Latin-1)", "iso88591"],
            ["ISO-8859-16 (Latin-10)", "iso885916"],
        ]),
        new EncodingGroup("Cyrillic (Russia, Ukraine)", [
            ["KOI8-R", "koi8r"],
            ["KOI8-U", "koi8u"],
            ["KOI8-RU", "koi8ru"],
            ["KOI8-T", "koi8t"],
            ["Windows-1251", "windows1251"],
        ]),
        new EncodingGroup("Chinese (China)", [
            ["GBK", "gbk"],
            ["GB 18030", "gb18030"],
            ["EUC-CN", "euccn"],
        ]),
        new EncodingGroup("Chinese (Taiwan, Hong Kong)", [
            ["Big5", "big5"],
            ["Code page 950", "cp950"],
        ]),
        new EncodingGroup("Japanese", [
            ["Shift JIS", "shiftjis"],
            ["EUC-JP", "eucjp"],
        ]),
        new EncodingGroup("Korean", [
            ["EUC-KR", "euckr"],
        ]),
    ];
    let settings;
    let hasPageLoaded = false;
    let isFocused = true;
    let isPendingSettings = false;
    let DEBUG;
    let log;
    let sssIcons;
    let defaultSettings;
    let browserVersion;
    let hasDOMContentLoaded = false;
    document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
    browser.runtime.sendMessage({ type: "getDataForSettingsPage" }).then(data => {
        DEBUG = data.DEBUG;
        browserVersion = data.browserVersion;
        sssIcons = data.sssIcons;
        defaultSettings = data.defaultSettings;
        if (DEBUG) {
            log = console.log;
        }
        browser.storage.local.get().then(onSettingsAcquired, getErrorHandler("Error getting settings in settings page."));
        browser.storage.onChanged.addListener(onSettingsChanged);
        if (hasDOMContentLoaded) {
            onPageLoaded();
        }
    }, getErrorHandler("Error sending getDataForSettingsPage message from settings."));
    function getErrorHandler(text) {
        if (DEBUG) {
            return error => { log(`${text} (${error})`); };
        }
        else {
            return undefined;
        }
    }
    function createDefaultEngine(engine) {
        return __awaiter(this, void 0, void 0, function* () {
            engine.uniqueId = yield browser.runtime.sendMessage({ type: "generateUniqueEngineId" });
            engine.isEnabled = true;
            engine.isEnabledInContextMenu = true;
            return engine;
        });
    }
    function addBrowserEnginesToEnginesList(browserSearchEngines) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const names = {};
            for (const engine of settings.searchEngines) {
                if (engine.type === "browser-search-api") {
                    names[engine.name] = true;
                }
            }
            let nAddedEngines = 0;
            for (const browserSearchEngine of browserSearchEngines) {
                if (names.hasOwnProperty(browserSearchEngine.name))
                    continue;
                settings.searchEngines.push(yield createDefaultEngine({
                    type: "browser-search-api",
                    name: browserSearchEngine.name,
                    iconUrl: (_a = browserSearchEngine.favIconUrl) !== null && _a !== void 0 ? _a : "",
                }));
                nAddedEngines++;
            }
            if (nAddedEngines == 0) {
                alert("No new engines were added.");
            }
        });
    }
    function getDataUriFromImgUrl(imageUrl, callback) {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = _ => {
            const maxSize = 48;
            let width;
            let height;
            let xPos = 0;
            let yPos = 0;
            if (img.width > img.height) {
                width = Math.min(maxSize, img.width);
                height = width * img.height / img.width;
                yPos = (width - height) / 2;
            }
            else if (img.height > img.width) {
                height = Math.min(maxSize, img.height);
                width = height * img.width / img.height;
                xPos = (height - width) / 2;
            }
            else {
                width = Math.min(maxSize, img.width);
                height = width;
            }
            if (DEBUG) {
                log(img.width + "x" + img.height + " became " + width + "x" + height);
            }
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = Math.max(width, height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, xPos, yPos, width, height);
            const dataURL = canvas.toDataURL();
            if (DEBUG) {
                log(dataURL.length);
            }
            if (DEBUG) {
                log(imageUrl);
            }
            if (DEBUG) {
                log(dataURL);
            }
            callback(dataURL);
        };
        img.src = imageUrl;
    }
    function onDOMContentLoaded() {
        if (defaultSettings !== undefined) {
            onPageLoaded();
        }
        hasDOMContentLoaded = true;
    }
    function setGroupIconColor(iconCanvas, colorAsString) {
        const iconSize = iconCanvas.width;
        const ctx = iconCanvas.getContext("2d");
        ctx.clearRect(0, 0, iconSize, iconSize);
        ctx.beginPath();
        ctx.arc(iconSize / 2, iconSize / 2, iconSize / 2, 0, 2 * Math.PI);
        ctx.fillStyle = colorAsString;
        ctx.fill();
    }
    function generateRandomColorAsString() {
        function channelToHex(channel) {
            const hex = channel.toString(16);
            return hex.length == 2 ? hex : "0" + hex;
        }
        return "#" + channelToHex(Math.floor(Math.random() * 256))
            + channelToHex(Math.floor(Math.random() * 256))
            + channelToHex(Math.floor(Math.random() * 256));
    }
    function showGroupPopup(groupEngineToEdit = null) {
        const groupEnginePopup = document.querySelector("#group-popup");
        groupEnginePopup.classList.remove("hidden");
        const backgroundDiv = document.querySelector("#group-background-div");
        backgroundDiv.onclick = _ => hideGroupPopup();
        document.body.style.overflow = "hidden";
        const isEditing = groupEngineToEdit !== null;
        const groupEngineUniqueIds = isEditing ? [...groupEngineToEdit.enginesUniqueIds] : [];
        const groupIconAsImage = document.querySelector("#group-icon-img");
        const groupIconAsCanvas = document.querySelector("#group-icon-canvas");
        const groupColorPicker = document.querySelector("#group-color-picker");
        let color = isEditing ? groupEngineToEdit.color : generateRandomColorAsString();
        let wasIconModifiedByUser = isEditing && !groupEngineToEdit.iconUrl.startsWith("data:image/png");
        if (wasIconModifiedByUser) {
            groupIconAsImage.classList.remove("hidden");
            groupIconAsImage.src = groupEngineToEdit.iconUrl;
            groupColorPicker.onclick = ev => {
                if (!wasIconModifiedByUser)
                    return;
                if (confirm("Revert to the default icon?")) {
                    groupIconAsImage.classList.add("hidden");
                    groupIconAsCanvas.classList.remove("hidden");
                    setGroupIconColor(groupIconAsCanvas, color);
                    groupColorPicker.value = color;
                    wasIconModifiedByUser = false;
                }
                else {
                    ev.preventDefault();
                }
            };
        }
        else {
            groupIconAsCanvas.classList.remove("hidden");
            setGroupIconColor(groupIconAsCanvas, color);
            groupColorPicker.value = color;
        }
        groupColorPicker.oninput = _ => {
            color = groupColorPicker.value;
            setGroupIconColor(groupIconAsCanvas, color);
        };
        const groupTitleField = document.querySelector("#group-title-field");
        groupTitleField.placeholder = "Group name";
        groupTitleField.value = isEditing ? groupEngineToEdit.name : "";
        groupTitleField.focus();
        const engineRows = [];
        const selectedEnginesContainer = document.querySelector("#group-selected-engines-container");
        const availableEnginesContainer = document.querySelector("#group-available-engines-container");
        const engineRowTemplate = document.querySelector("#group-engines-list-row-template");
        const availableEngines = settings.searchEngines.filter(e => e !== groupEngineToEdit && e.type !== "sss" && e.type !== "browser-search-api");
        for (let i = 0; i < availableEngines.length; i++) {
            const engine = availableEngines[i];
            const groupEnginesListRow = engineRowTemplate.content.firstElementChild.cloneNode(true);
            groupEnginesListRow["engineIndex"] = i;
            const dragger = groupEnginesListRow.querySelector(".engine-dragger");
            dragger.style.display = "none";
            let isSelected = isEditing && groupEngineUniqueIds.indexOf(engine.uniqueId) > -1;
            groupEnginesListRow.onclick = _ => {
                if (isSelected)
                    return;
                if (isEditing && engine.type === "group") {
                    function findRecursively(groupEngine, engineToFind) {
                        for (const engineId of groupEngine.enginesUniqueIds) {
                            const engine = settings.searchEngines.find(eng => eng.uniqueId === engineId);
                            if (engine.type === "group") {
                                if (engine === engineToFind)
                                    return true;
                                if (findRecursively(engine, engineToFind))
                                    return true;
                            }
                        }
                        return false;
                    }
                    if (findRecursively(engine, groupEngineToEdit)) {
                        alert("Adding this group engine would create an infinite cycle, since it contains (directly or indirectly) the group you're currently editing. You can't do that! ;)");
                        return;
                    }
                }
                isSelected = true;
                groupEngineUniqueIds.push(engine.uniqueId);
                dragger.style.display = "block";
                selectedEnginesContainer.appendChild(groupEnginesListRow);
                saveButton.disabled = false;
            };
            const engineIconImg = groupEnginesListRow.querySelector(".engine-icon-img > img");
            setupEngineIconImg(engine, engineIconImg);
            const engineName = groupEnginesListRow.querySelector(".engine-in-group-name");
            engineName.textContent = engine.name;
            const deleteButton = groupEnginesListRow.querySelector(".group-remove-engine-button > input");
            deleteButton.onclick = ev => {
                const index = groupEngineUniqueIds.indexOf(engine.uniqueId);
                groupEngineUniqueIds.splice(index, 1);
                const engineIndex = groupEnginesListRow["engineIndex"];
                let wasInserted = false;
                for (const child of availableEnginesContainer.children) {
                    if (child["engineIndex"] > engineIndex) {
                        availableEnginesContainer.insertBefore(groupEnginesListRow, child);
                        wasInserted = true;
                        break;
                    }
                }
                if (!wasInserted) {
                    availableEnginesContainer.appendChild(groupEnginesListRow);
                }
                dragger.style.display = "none";
                isSelected = false;
                saveButton.disabled = groupEngineUniqueIds.length === 0;
                ev.stopPropagation();
            };
            if (isSelected) {
                engineRows[groupEngineUniqueIds.indexOf(engine.uniqueId)] = groupEnginesListRow;
                dragger.style.display = "block";
            }
            availableEnginesContainer.appendChild(groupEnginesListRow);
        }
        selectedEnginesContainer.append(...engineRows);
        const cancelButton = document.querySelector("#group-popup-cancel-button");
        cancelButton.onclick = _ => hideGroupPopup();
        const saveButton = document.querySelector("#group-popup-save-button");
        saveButton.disabled = groupEngineUniqueIds.length === 0;
        saveButton.onclick = (_) => __awaiter(this, void 0, void 0, function* () {
            const groupName = groupTitleField.value.length > 0 ? groupTitleField.value : (groupEngineToEdit === null || groupEngineToEdit === void 0 ? void 0 : groupEngineToEdit.name) || "Group";
            const iconUrl = wasIconModifiedByUser ? groupIconAsImage.src : groupIconAsCanvas.toDataURL();
            const groupData = {
                name: groupName,
                enginesUniqueIds: groupEngineUniqueIds,
                iconUrl: iconUrl,
                color: color,
                type: "group",
            };
            if (groupEngineToEdit) {
                Object.assign(groupEngineToEdit, groupData);
            }
            else {
                settings.searchEngines.push(yield createDefaultEngine(groupData));
            }
            saveSettings({ searchEngines: settings.searchEngines });
            updateUIWithSettings();
            hideGroupPopup();
        });
        const groupPopupSortableManager = Sortable.create(selectedEnginesContainer, {
            handle: ".engine-dragger",
            onEnd: ev => {
                groupEngineUniqueIds.splice(ev.newIndex, 0, groupEngineUniqueIds.splice(ev.oldIndex, 1)[0]);
            },
        });
        groupEnginePopup.onkeydown = ev => {
            switch (ev.key) {
                case "Escape":
                    hideGroupPopup();
                    break;
                case "Enter":
                    saveButton.click();
                    break;
            }
        };
        function hideGroupPopup() {
            groupEnginePopup.classList.add("hidden");
            selectedEnginesContainer.innerHTML = "";
            availableEnginesContainer.innerHTML = "";
            groupIconAsImage.classList.add("hidden");
            groupIconAsCanvas.classList.add("hidden");
            groupPopupSortableManager.destroy();
            document.body.style.overflow = "auto";
        }
    }
    function onPageLoaded() {
        page.engines = document.querySelector("#engines");
        page.inputs = document.querySelectorAll("input, select, textarea");
        for (const item of page.inputs) {
            page[item.name] = item;
        }
        const container = document.querySelector("#settings");
        container.onchange = ev => {
            const item = ev.target;
            if (DEBUG) {
                log("onFormChanged target: " + item.name + ", value: " + item.value);
            }
            if (item.name === "importSettingsFromFileButton_real") {
                const reader = new FileReader();
                reader.onload = _ => {
                    const importedSettings = JSON.parse(reader.result);
                    importSettings(importedSettings);
                };
                reader.readAsText(ev.target.files[0]);
            }
            else {
                saveElementValueToSettings(item, true);
            }
        };
        page.importBrowserEnginesButton.onclick = (_) => __awaiter(this, void 0, void 0, function* () {
            if (confirm("Really import your browser's search engines?")) {
                const browserSearchEngines = yield browser.search.get();
                if (DEBUG) {
                    log(browserSearchEngines);
                }
                yield addBrowserEnginesToEnginesList(browserSearchEngines);
                updateUIWithSettings();
                saveSettings({ searchEngines: settings.searchEngines });
            }
        });
        page.exportSettingsToFileButton.onclick = _ => {
            browser.permissions.request({ permissions: ["downloads"] }).then(wasPermissionGranted => {
                if (!wasPermissionGranted) {
                    alert("Sorry, you cannot export your file without the \"Downloads\" permission! I know it's weird, but it's really needed. :(");
                    return;
                }
                var blob = runActionOnDietSettings(settings, (settings) => new Blob([JSON.stringify(settings)]));
                const filename = "SSS settings backup (" + new Date(Date.now()).toJSON().replace(/:/g, ".") + ").json";
                browser.downloads.download({
                    "saveAs": true,
                    "url": URL.createObjectURL(blob),
                    "filename": filename,
                });
            });
        };
        page.importSettingsFromFileButton.onclick = _ => page.importSettingsFromFileButton_real.click();
        page.popupBackgroundColorPicker.oninput = _ => updateColorText(page.popupBackgroundColor, page.popupBackgroundColorPicker.value);
        page.popupBackgroundColor.oninput = _ => updatePickerColor(page.popupBackgroundColorPicker, page.popupBackgroundColor.value);
        page.popupHighlightColorPicker.oninput = _ => updateColorText(page.popupHighlightColor, page.popupHighlightColorPicker.value);
        page.popupHighlightColor.oninput = _ => updatePickerColor(page.popupHighlightColorPicker, page.popupHighlightColor.value);
        page.websiteBlocklist.onclick = _ => {
            browser.permissions.request({ permissions: ["tabs"] }).then(wasPermissionGranted => {
                if (!wasPermissionGranted) {
                    page.websiteBlocklist.blur();
                    alert("Sorry, the website blocklist won't work without the \"Tabs\" permission!");
                }
            });
        };
        for (const elem of document.querySelectorAll(".setting-reset")) {
            const inputElements = elem.querySelectorAll("input");
            if (inputElements.length == 0)
                continue;
            inputElements[0].onclick = _ => {
                const parent = elem.closest(".setting");
                const formElement = parent.querySelector(".setting-input");
                const settingName = formElement.name;
                const defaultValue = defaultSettings[settingName];
                settings[settingName] = defaultValue;
                saveSettings({ [settingName]: defaultValue });
                loadSettingValueIntoElement(formElement);
            };
        }
        for (const sectionNameElement of document.querySelectorAll(".section-name")) {
            sectionNameElement.onclick = _ => {
                if (settings.sectionsExpansionState === undefined) {
                    settings.sectionsExpansionState = {};
                }
                const isCollapsed = sectionNameElement.parentElement.classList.toggle("collapsed-section");
                settings.sectionsExpansionState[sectionNameElement.parentElement.id] = !isCollapsed;
                saveSettings({ sectionsExpansionState: settings.sectionsExpansionState });
            };
        }
        browser.runtime.getPlatformInfo().then(info => {
            let platformSpecificElements;
            switch (info.os) {
                case "android":
                case "cros":
                case "linux":
                case "openbsd":
                    platformSpecificElements = document.querySelectorAll(".os-linux");
                    break;
                case "mac":
                    platformSpecificElements = document.querySelectorAll(".os-mac");
                    break;
                case "win":
                default:
                    platformSpecificElements = document.querySelectorAll(".os-windows");
                    break;
            }
            for (const elem of platformSpecificElements) {
                elem.style.display = "inline";
            }
        });
        window.onfocus = _ => {
            if (isPendingSettings) {
                browser.storage.local.get().then(onSettingsAcquired, getErrorHandler("Error getting settings in settings page."));
            }
            isFocused = true;
        };
        window.onblur = _ => {
            isFocused = false;
        };
        page.toggleDarkMode.setDarkModeState = enable => {
            if (enable) {
                document.body.classList.add("dark");
            }
            else {
                document.body.classList.remove("dark");
            }
        };
        page.toggleDarkMode.onclick = _ => {
            settings.useDarkModeInOptionsPage = !settings.useDarkModeInOptionsPage;
            page.toggleDarkMode.setDarkModeState(settings.useDarkModeInOptionsPage);
            saveSettings({ useDarkModeInOptionsPage: settings.useDarkModeInOptionsPage });
        };
        page.addEngineButton.onclick = (_) => __awaiter(this, void 0, void 0, function* () {
            const searchUrl = "https://www.google.com/search?q={searchTerms}";
            const iconUrl = getIconUrlFromSearchUrl(searchUrl);
            settings.searchEngines.push(yield createDefaultEngine({
                type: "custom",
                name: "New Search Engine",
                searchUrl: searchUrl,
                iconUrl: iconUrl
            }));
            saveSettings({ searchEngines: settings.searchEngines });
            updateUIWithSettings();
        });
        page.addGroupButton.onclick = _ => {
            showGroupPopup();
        };
        page.addSeparatorButton.onclick = (_) => __awaiter(this, void 0, void 0, function* () {
            settings.searchEngines.push(yield createDefaultEngine({
                type: "sss",
                id: "separator",
            }));
            saveSettings({ searchEngines: settings.searchEngines });
            updateUIWithSettings();
        });
        page.saveSettingsToSyncButton.onclick = _ => {
            if (DEBUG) {
                log("saving!");
            }
            var settingsStr = runActionOnDietSettings(settings, (settings) => JSON.stringify(settings));
            const chunks = {};
            let chunkIndex = 0;
            for (let i = 0, length = settingsStr.length; i < length; i += 1000, chunkIndex++) {
                chunks["p" + chunkIndex] = settingsStr.substring(i, i + 1000);
            }
            browser.storage.sync.clear();
            browser.storage.sync.set(chunks).then(() => { if (DEBUG) {
                log("All settings and engines were saved in Sync!");
            } }, () => { if (DEBUG) {
                log("Uploading to Sync failed! Is your network working? Are you under the 100KB size limit?");
            } });
            if (DEBUG) {
                log("saved in sync!", chunks);
            }
        };
        page.resetSearchEnginesButton.onclick = _ => {
            if (confirm("Really reset search engines to the default ones?")) {
                const defaultEngines = JSON.parse(JSON.stringify(defaultSettings.searchEngines));
                settings.searchEngines = defaultEngines;
                updateUIWithSettings();
                saveSettings({ searchEngines: settings.searchEngines });
            }
        };
        page.resetSettingsButton.onclick = _ => {
            if (confirm("Really reset all settings to their default values?")) {
                const searchEngines = settings.searchEngines;
                settings = JSON.parse(JSON.stringify(defaultSettings));
                settings.searchEngines = searchEngines;
                updateUIWithSettings();
                saveSettings(settings);
            }
        };
        page.loadSettingsFromSyncButton.onclick = _ => {
            if (confirm("Really load all settings from Firefox Sync?")) {
                browser.storage.sync.get().then(chunks => {
                    if (DEBUG) {
                        log(chunks);
                    }
                    const chunksList = [];
                    let p;
                    for (let i = 0; (p = chunks["p" + i]) !== undefined; i++) {
                        chunksList.push(p);
                    }
                    const parsedSettings = parseSyncChunksList(chunksList);
                    if (parsedSettings !== null) {
                        importSettings(parsedSettings);
                    }
                }, getErrorHandler("Error getting settings from sync."));
            }
        };
        hasPageLoaded = true;
        if (settings !== undefined) {
            updateUIWithSettings();
        }
        setTimeout(() => {
            document.body.style.display = "inherit";
        }, 0);
    }
    function parseSyncChunksList(chunksList) {
        let settingsStr = "";
        let parsedSettings = null;
        while (chunksList.length > 0) {
            settingsStr = chunksList.join("");
            try {
                parsedSettings = JSON.parse(settingsStr);
                break;
            }
            catch (_a) {
                if (DEBUG) {
                    log("error parsing settings from sync: " + settingsStr);
                }
                if (DEBUG) {
                    log("trying again with one chunk fewer");
                }
                chunksList.pop();
            }
        }
        if (DEBUG) {
            log("settings from sync, as string: " + settingsStr);
        }
        return parsedSettings;
    }
    function onSettingsAcquired(_settings) {
        settings = _settings;
        if (hasPageLoaded) {
            updateUIWithSettings();
        }
    }
    function onSettingsChanged() {
        if (!isFocused) {
            isPendingSettings = true;
        }
    }
    function updateUIWithSettings() {
        if (DEBUG) {
            log("updateUIWithSettings", settings);
        }
        for (const item of page.inputs) {
            loadSettingValueIntoElement(item);
        }
        calculateAndShowSettingsSize();
        if (settings.searchEngines !== undefined) {
            const engineParent = page.engines;
            while (engineParent.firstChild) {
                engineParent.removeChild(engineParent.firstChild);
            }
            let currentlyExpandedEngineOptions = null;
            for (let i = 0; i < settings.searchEngines.length; i++) {
                const engine = settings.searchEngines[i];
                const tableRow = buildSearchEngineTableRow();
                const engineRow = buildSearchEngineRow(engine, i);
                tableRow.appendChild(engineRow);
                const optionsRow = buildSearchEngineOptionsTableRow(engine, i);
                tableRow.appendChild(optionsRow);
                tableRow.onclick = ev => {
                    if (currentlyExpandedEngineOptions !== null && currentlyExpandedEngineOptions !== optionsRow) {
                        currentlyExpandedEngineOptions.style.display = "none";
                    }
                    optionsRow.style.display = "initial";
                    currentlyExpandedEngineOptions = optionsRow;
                    ev.stopPropagation();
                };
                page.engines.appendChild(tableRow);
            }
            document.onclick = ev => {
                if (currentlyExpandedEngineOptions !== null) {
                    if (ev.target.closest(".engine-table-row") === null) {
                        currentlyExpandedEngineOptions.style.display = "none";
                    }
                }
            };
            Sortable.create(page.engines, {
                handle: ".engine-dragger",
                onStart: ev => {
                    if (DEBUG) {
                        log("start drag", ev.oldIndex);
                    }
                },
                onUpdate: ev => {
                    var item = ev.item;
                    if (DEBUG) {
                        log("onUpdate", item);
                    }
                },
                onEnd: ev => {
                    if (DEBUG) {
                        log("onEnd", settings);
                    }
                    settings.searchEngines.splice(ev.newIndex, 0, settings.searchEngines.splice(ev.oldIndex, 1)[0]);
                    saveSettings({ searchEngines: settings.searchEngines });
                    updateUIWithSettings();
                },
            });
        }
        if (settings.sectionsExpansionState !== undefined) {
            for (const sectionId of Object.keys(settings.sectionsExpansionState)) {
                const classList = document.querySelector("#" + sectionId).classList;
                const isExpanded = settings.sectionsExpansionState[sectionId];
                classList.toggle("collapsed-section", !isExpanded);
            }
        }
        page.toggleDarkMode.setDarkModeState(settings.useDarkModeInOptionsPage);
    }
    function saveElementValueToSettings(item, didElementValueChange = false) {
        const name = item.name;
        if (!(name in settings))
            return false;
        let value;
        if (item.type === "checkbox") {
            value = item.checked;
        }
        else if (item.type === "number") {
            value = parseInt(item.value);
        }
        else {
            value = item.value;
        }
        if (didElementValueChange) {
            updateSetting(name, value);
        }
        settings[name] = value;
        saveSettings({ [name]: value });
        return true;
    }
    function loadSettingValueIntoElement(item) {
        const name = item.name;
        if (!(name in settings))
            return false;
        const value = settings[name];
        if (item.type === "checkbox") {
            item.checked = value;
        }
        else {
            item.value = value;
        }
        updateSetting(name, value);
        return true;
    }
    function updateSetting(name, value) {
        switch (name) {
            case "popupBackgroundColor":
                updatePickerColor(page.popupBackgroundColorPicker, value);
                break;
            case "popupHighlightColor":
                updatePickerColor(page.popupHighlightColorPicker, value);
                break;
            case "popupOpenBehaviour":
                updateHtmlElementSetting(page.popupDelay, value === "auto");
                updateHtmlElementSetting(page.minSelectedCharacters, value === "auto");
                updateHtmlElementSetting(page.maxSelectedCharacters, value === "auto");
                updateHtmlElementSetting(page.middleMouseSelectionClickMargin, value === "middle-mouse");
                ;
                break;
            case "showSelectionTextField":
                updateHtmlElementSetting(page.selectionTextFieldLocation, value === true);
                break;
            case "useSingleRow":
                updateHtmlElementSetting(page.nPopupIconsPerRow, value === false);
                updateHtmlElementSetting(page.iconAlignmentInGrid, value === false);
                break;
            case "useCustomPopupCSS":
                updateHtmlElementSetting(page.customPopupCSS, value === true);
                break;
        }
        function updateHtmlElementSetting(element, enabled) {
            const setting = element.closest(".setting");
            if (enabled) {
                setting.classList.remove("hidden");
            }
            else {
                setting.classList.add("hidden");
            }
        }
    }
    function calculateAndShowSettingsSize() {
        const storageSize = runActionOnDietSettings(settings, settings => JSON.stringify(settings).length * 2);
        const maxRecommendedStorageSize = 100 * 1024;
        for (const elem of document.querySelectorAll(".warn-when-over-storage-limit")) {
            elem.style.color = storageSize > maxRecommendedStorageSize ? "red" : "";
        }
        document.querySelector("#storage-size").textContent = getSizeWithUnit(storageSize);
    }
    function buildSearchEngineTableRow() {
        const parent = document.createElement("div");
        parent.className = "engine-table-row";
        return parent;
    }
    function buildSearchEngineRow(engine, i) {
        const engineRow = document.createElement("div");
        engineRow.className = "engine-itself";
        const dragger = createElement_EngineDragger();
        engineRow.appendChild(dragger);
        const isEnabledCheckboxParent = document.createElement("div");
        isEnabledCheckboxParent.className = "engine-is-enabled";
        const isEnabledCheckbox = document.createElement("input");
        isEnabledCheckbox.type = "checkbox";
        isEnabledCheckbox.checked = engine.isEnabled;
        isEnabledCheckbox.autocomplete = "off";
        isEnabledCheckbox.title = "Show in popup";
        isEnabledCheckbox.onchange = _ => {
            setEnabledInPopup(engine, i, isEnabledCheckbox.checked);
        };
        isEnabledCheckboxParent.appendChild(isEnabledCheckbox);
        engineRow.appendChild(isEnabledCheckboxParent);
        const isEnabledInContextMenuCheckboxParent = document.createElement("div");
        isEnabledInContextMenuCheckboxParent.className = "engine-is-enabled-in-context-menu";
        const isEnabledInContextMenuCheckbox = document.createElement("input");
        isEnabledInContextMenuCheckbox.type = "checkbox";
        isEnabledInContextMenuCheckbox.checked = engine.isEnabledInContextMenu;
        isEnabledInContextMenuCheckbox.autocomplete = "off";
        isEnabledInContextMenuCheckbox.title = "Show in context menu";
        isEnabledInContextMenuCheckbox.onchange = _ => {
            setEnabledInContextMenu(engine, i, isEnabledInContextMenuCheckbox.checked);
        };
        isEnabledInContextMenuCheckboxParent.appendChild(isEnabledInContextMenuCheckbox);
        engineRow.appendChild(isEnabledInContextMenuCheckboxParent);
        const engineIcon = document.createElement("div");
        engineIcon.className = "engine-icon-img";
        const iconImg = document.createElement("img");
        engineIcon.appendChild(iconImg);
        setupEngineIconImg(engine, iconImg);
        engineRow.appendChild(engineIcon);
        if (engine.type === "sss") {
            const sssIcon = sssIcons[engine.id];
            engineRow.appendChild(createElement_UneditableEngineName(sssIcon.name));
            const engineDescription = document.createElement("div");
            engineDescription.className = "engine-uneditable engine-uneditable-description";
            engineDescription.textContent = sssIcon.description;
            engineRow.appendChild(engineDescription);
            if (engine.id === "separator") {
                engineRow.appendChild(createElement_EngineShortcutFieldDiv());
                engineRow.appendChild(createElement_DeleteButton(i));
            }
            else {
                engineRow.appendChild(createElement_EngineShortcutField(engine));
                engineRow.appendChild(createElement_DeleteButtonDiv());
            }
        }
        else {
            if (engine.type === "browser-search-api") {
                engineRow.appendChild(createElement_UneditableEngineName(engine.name));
            }
            else {
                engineRow.appendChild(createElement_EngineName(engine));
            }
            const references = {};
            if (engine.type === "browser-search-api") {
                const engineDescription = document.createElement("div");
                engineDescription.className = "engine-uneditable engine-description-small";
                engineDescription.textContent = "[Browser] Engine imported from the browser.";
                engineRow.appendChild(engineDescription);
            }
            else if (engine.type === "group") {
                const engineDescription = document.createElement("div");
                engineDescription.title = "Click to edit this group";
                engineDescription.className = "engine-uneditable engine-description-small group-engine-description";
                engineDescription.textContent = getGroupEngineDescription(engine);
                engineDescription.onclick = _ => showGroupPopup(engine);
                engineRow.appendChild(engineDescription);
            }
            else {
                engineRow.appendChild(createElement_EngineSearchLink(engine, references));
            }
            engineRow.appendChild(createElement_EngineIconLink(engine, iconImg, references));
            engineRow.appendChild(createElement_EngineShortcutField(engine));
            engineRow.appendChild(createElement_DeleteButton(i));
        }
        return engineRow;
    }
    function getGroupEngineDescription(groupEngine) {
        return groupEngine.enginesUniqueIds
            .map(engineId => {
            const engine = settings.searchEngines.find(eng => eng.uniqueId === engineId);
            return engine.type === "sss"
                ? sssIcons[engine.id].name
                : engine.name;
        })
            .join(", ");
    }
    function createElement_EngineDragger() {
        const dragger = document.createElement("div");
        dragger.className = "engine-dragger";
        dragger.textContent = "☰";
        return dragger;
    }
    function setupEngineIconImg(engine, iconImg) {
        let iconImgSource;
        if (engine.type === "sss") {
            const sssIcon = sssIcons[engine.id];
            iconImgSource = browser.extension.getURL(sssIcon.iconPath);
        }
        else {
            iconImgSource = engine.iconUrl;
        }
        if (iconImgSource.startsWith("data:") || iconImgSource.startsWith("moz-extension:")) {
            iconImg.src = iconImgSource;
        }
        else if (settings.searchEnginesCache[iconImgSource] === undefined && iconImgSource) {
            iconImg.src = iconImgSource;
            getDataUriFromImgUrl(iconImgSource, base64Img => {
                iconImg.src = base64Img;
                settings.searchEnginesCache[iconImgSource] = base64Img;
                saveSettings({ searchEnginesCache: settings.searchEnginesCache });
            });
        }
        else {
            iconImg.src = settings.searchEnginesCache[iconImgSource];
        }
    }
    function buildSearchEngineOptionsTableRow(engine, i) {
        const engineOptions = document.createElement("div");
        engineOptions.className = "engine-options";
        if (engine.type === "sss" && engine.id === "copyToClipboard") {
            const copyEngine = engine;
            const isPlainTextCheckboxParent = createCheckbox("Copy as plain-text", `copy-as-plain-text`, copyEngine.isPlainText, isOn => {
                copyEngine.isPlainText = isOn;
                saveSettings({ searchEngines: settings.searchEngines });
            });
            engineOptions.appendChild(isPlainTextCheckboxParent);
        }
        if (engine.type === "custom") {
            const customEngine = engine;
            const textEncodingDropdownParent = createDropdown("Text encoding", `encoding-dropdown-${i}`, encodings, customEngine.encoding, value => {
                if (value !== null) {
                    customEngine.encoding = value;
                }
                else {
                    delete customEngine.encoding;
                }
                saveSettings({ searchEngines: settings.searchEngines });
            });
            textEncodingDropdownParent.title = "If this is a search engine for non-latin alphabets, like Cyrillic, Chinese, Japanese, etc, it might use a different text encoding. You can change it here.";
            engineOptions.appendChild(textEncodingDropdownParent);
            const discardOnOpenCheckboxParent = createCheckbox("Discard on open (Advanced)", `discard-on-open-${i}`, customEngine.discardOnOpen, isOn => {
                customEngine.discardOnOpen = isOn;
                saveSettings({ searchEngines: settings.searchEngines });
            });
            discardOnOpenCheckboxParent.title = "Opens the search but discards the resulting page. Useful if this is a \"non-http\" search engine that opens outside the browser, because that would generate an empty tab/page.";
            engineOptions.appendChild(discardOnOpenCheckboxParent);
        }
        if (!engineOptions.hasChildNodes()) {
            const noExtraOptionsLabel = document.createElement("label");
            noExtraOptionsLabel.textContent = "No extra options.";
            noExtraOptionsLabel.style.color = "#999";
            engineOptions.appendChild(noExtraOptionsLabel);
        }
        return engineOptions;
    }
    function createCheckbox(labelText, elementId, checked, onChange) {
        const parent = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = elementId;
        checkbox.checked = checked;
        checkbox.autocomplete = "off";
        checkbox.onchange = _ => onChange(checkbox.checked);
        parent.appendChild(checkbox);
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = " " + labelText;
        parent.appendChild(label);
        return parent;
    }
    function createDropdown(labelText, elementId, encodingGroups, currentValue, onChange) {
        const parent = document.createElement("div");
        const dropdown = document.createElement("select");
        dropdown.style.maxWidth = "250px";
        dropdown.style.marginLeft = "10px";
        for (let i = 0; i < encodingGroups.length; i++) {
            const encodingGroup = encodingGroups[i];
            var optionGroup = document.createElement("optgroup");
            optionGroup.label = encodingGroup.name;
            dropdown.appendChild(optionGroup);
            for (let j = 0; j < encodingGroup.encodings.length; j++) {
                const value = encodingGroup.encodings[j];
                var option = document.createElement("option");
                option.text = value[0];
                option.value = value[1];
                optionGroup.appendChild(option);
            }
        }
        dropdown.id = elementId;
        if (currentValue) {
            dropdown.value = currentValue;
        }
        dropdown.onchange = _ => onChange(dropdown.value);
        const label = document.createElement("label");
        label.textContent = " " + labelText;
        parent.appendChild(label);
        parent.appendChild(dropdown);
        return parent;
    }
    function setEnabledInPopup(engine, i, value) {
        const engineRow = page.engines.children[i];
        const checkbox = engineRow.querySelector(".engine-is-enabled input");
        checkbox.checked = value;
        engine.isEnabled = value;
        saveSettings({ searchEngines: settings.searchEngines });
    }
    function setEnabledInContextMenu(engine, i, value) {
        const engineRow = page.engines.children[i];
        const checkbox = engineRow.querySelector(".engine-is-enabled-in-context-menu input");
        checkbox.checked = value;
        engine.isEnabledInContextMenu = value;
        saveSettings({ searchEngines: settings.searchEngines });
    }
    function createElement_UneditableEngineName(name) {
        const engineName = document.createElement("div");
        engineName.className = "engine-uneditable engine-uneditable-name";
        engineName.textContent = name;
        return engineName;
    }
    function createElement_EngineName(engine) {
        const parent = document.createElement("div");
        parent.className = "engine-name";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = engine.name;
        nameInput.onchange = _ => {
            engine.name = nameInput.value;
            const groupEngines = settings.searchEngines.filter(engine => engine.type === "group");
            const groupEngineDescriptions = document.querySelectorAll(".group-engine-description");
            for (let i = 0; i < groupEngines.length; i++) {
                groupEngineDescriptions[i].textContent = getGroupEngineDescription(groupEngines[i]);
            }
            saveSettings({ searchEngines: settings.searchEngines });
            calculateAndShowSettingsSize();
        };
        parent.appendChild(nameInput);
        return parent;
    }
    function createElement_EngineSearchLink(engine, references) {
        const parent = document.createElement("div");
        parent.className = "engine-search-link";
        const searchLinkInput = document.createElement("input");
        searchLinkInput.type = "text";
        searchLinkInput.value = engine.searchUrl;
        let previousSearchLinkInputValue = engine.searchUrl;
        searchLinkInput.onchange = _ => {
            let url = searchLinkInput.value.trim();
            if (url.length > 0 && !url.match(/^[0-9a-zA-Z\-+]+:(\/\/)?/)) {
                url = "http://" + url;
            }
            if (previousSearchLinkInputValue !== url) {
                if (engine.iconUrl.length == 0 || engine.iconUrl === getIconUrlFromSearchUrl(previousSearchLinkInputValue)) {
                    const iconUrl = getIconUrlFromSearchUrl(url);
                    references.iconLinkInput.value = iconUrl;
                    setIconUrlInput(engine, references.iconLinkInput, references.icon);
                }
                previousSearchLinkInputValue = url;
            }
            if (searchLinkInput.value !== url) {
                searchLinkInput.value = url;
            }
            engine.searchUrl = url;
            saveSettings({ searchEngines: settings.searchEngines });
            calculateAndShowSettingsSize();
        };
        parent.appendChild(searchLinkInput);
        references.searchLinkInput = searchLinkInput;
        return parent;
    }
    function createElement_EngineIconLink(engine, icon, references) {
        const parent = document.createElement("div");
        parent.className = "engine-icon-link";
        const iconLinkInput = document.createElement("input");
        iconLinkInput.type = "text";
        iconLinkInput.value = engine.iconUrl;
        iconLinkInput.oninput = _ => {
            setIconUrlInput(engine, iconLinkInput, icon);
        };
        iconLinkInput.onchange = _ => {
            if (iconLinkInput.value.length == 0 && references.searchLinkInput !== undefined) {
                iconLinkInput.value = getIconUrlFromSearchUrl(references.searchLinkInput.value);
                setIconUrlInput(engine, iconLinkInput, icon);
            }
            trimSearchEnginesCache(settings);
            saveSettings({ searchEngines: settings.searchEngines, searchEnginesCache: settings.searchEnginesCache });
            calculateAndShowSettingsSize();
        };
        references.icon = icon;
        references.iconLinkInput = iconLinkInput;
        parent.appendChild(iconLinkInput);
        return parent;
    }
    function setIconUrlInput(engine, iconLinkInput, icon) {
        engine.iconUrl = iconLinkInput.value.trim();
        icon.src = engine.iconUrl;
        if (!engine.iconUrl.startsWith("data:")) {
            getDataUriFromImgUrl(engine.iconUrl, base64Img => {
                icon.src = base64Img;
                settings.searchEnginesCache[engine.iconUrl] = base64Img;
            });
        }
    }
    function createElement_EngineShortcutField(engine) {
        const parent = createElement_EngineShortcutFieldDiv();
        const shortcutField = document.createElement("input");
        shortcutField.type = "text";
        shortcutField.title = "Type a single character to use as a shortcut for this engine. Shortcuts can then be used when the popup is visible.";
        if (engine.shortcut) {
            shortcutField.value = engine.shortcut;
        }
        shortcutField.onkeydown = (e) => {
            if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)
                e.preventDefault();
        };
        shortcutField.oninput = (e) => {
            let newValue = shortcutField.value;
            if (newValue.length > 1) {
                newValue = newValue[shortcutField.selectionStart - 1];
                shortcutField.value = newValue;
            }
            newValue = newValue.toUpperCase();
            if (newValue.length > 0 && newValue !== engine.shortcut) {
                const engineWithShortcut = settings.searchEngines.find(e => e.shortcut === newValue);
                if (engineWithShortcut) {
                    const engineName = engineWithShortcut.type === "sss"
                        ? sssIcons[engineWithShortcut.id].name
                        : engineWithShortcut.name;
                    const override = confirm(`This shortcut is already assigned to "${engineName}"! Override?`);
                    if (override) {
                        engine.shortcut = newValue;
                        engineWithShortcut.shortcut = undefined;
                        updateUIWithSettings();
                    }
                    else {
                        shortcutField.value = engine.shortcut || "";
                        return;
                    }
                }
            }
            engine.shortcut = newValue;
            saveSettings({ searchEngines: settings.searchEngines });
        };
        parent.appendChild(shortcutField);
        return parent;
    }
    function createElement_EngineShortcutFieldDiv() {
        const parent = document.createElement("div");
        parent.className = "engine-shortcut";
        return parent;
    }
    function createElement_DeleteButton(i) {
        const parent = createElement_DeleteButtonDiv();
        const deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.value = "✖";
        deleteButton.title = "Delete";
        deleteButton.onclick = _ => {
            const engineToDelete = settings.searchEngines[i];
            const groupsContainingEngine = settings.searchEngines.filter(engine => engine.type === "group" && engine.enginesUniqueIds.indexOf(engineToDelete.uniqueId) > -1);
            if (groupsContainingEngine.length > 0) {
                const groupNames = groupsContainingEngine.map(group => `\u2022 ${group.name}`).join("\n");
                if (confirm(`This engine will also be removed from the following group(s): \n\n${groupNames}\n\nAre you sure?`)) {
                    for (const group of groupsContainingEngine) {
                        group.enginesUniqueIds.splice(group.enginesUniqueIds.indexOf(engineToDelete.uniqueId), 1);
                    }
                }
                else {
                    return;
                }
            }
            settings.searchEngines.splice(i, 1);
            trimSearchEnginesCache(settings);
            saveSettings({ searchEngines: settings.searchEngines, searchEnginesCache: settings.searchEnginesCache });
            updateUIWithSettings();
        };
        parent.appendChild(deleteButton);
        return parent;
    }
    function createElement_DeleteButtonDiv() {
        const parent = document.createElement("div");
        parent.className = "engine-delete";
        return parent;
    }
    function trimSearchEnginesCache(settings) {
        const newCache = {};
        for (const engine of settings.searchEngines) {
            if (!engine.iconUrl || engine.iconUrl.startsWith("data:")) {
                continue;
            }
            const cachedIcon = settings.searchEnginesCache[engine.iconUrl];
            if (cachedIcon) {
                newCache[engine.iconUrl] = cachedIcon;
            }
        }
        settings.searchEnginesCache = newCache;
    }
    function runActionOnDietSettings(settings, onCleaned) {
        const cache = settings.searchEnginesCache;
        delete settings.searchEnginesCache;
        const result = onCleaned(settings);
        settings.searchEnginesCache = cache;
        return result;
    }
    function importSettings(importedSettings) {
        if (importedSettings.searchEngines === undefined) {
            if (DEBUG) {
                log("imported settings are empty!", importedSettings);
            }
            return;
        }
        importedSettings.searchEnginesCache = {};
        browser.runtime.sendMessage({ type: "runBackwardsCompatibilityUpdates", settings: importedSettings }).then((_settings) => {
            settings = _settings;
            if (DEBUG) {
                log("imported settings!", settings);
            }
            saveSettings(settings);
            updateUIWithSettings();
        }, getErrorHandler("Error sending runBackwardsCompatibilityUpdates message from settings."));
    }
    function updateColorText(text, value) {
        value = value.toUpperCase();
        if (text.value !== value) {
            text.value = value;
            saveSettings({ [text.name]: value });
        }
    }
    function updatePickerColor(picker, value) {
        value = value.substring(0, 7);
        if (picker.value !== value) {
            picker.value = value;
        }
    }
    function getSizeWithUnit(size) {
        let unit = 0;
        while (size >= 1024 && unit <= 2) {
            size /= 1024;
            unit++;
        }
        size = Math.round(size);
        if (unit == 0)
            return size + "B";
        if (unit == 1)
            return size + "KB";
        if (unit == 2)
            return size + "MB";
        return size + "GB";
    }
    function saveSettings(obj) {
        browser.storage.local.set(obj);
        if (DEBUG) {
            log("saved!", settings);
        }
    }
    function getIconUrlFromSearchUrl(url) {
        if (settings.searchEngineIconsSource === "favicon-kit") {
            return "https://api.faviconkit.com/" + getDomainFromUrl(url) + "/64";
        }
        else {
            return "";
        }
    }
    function getDomainFromUrl(url) {
        if (url.indexOf("//") !== -1) {
            url = url.split("//")[1];
        }
        url = url.split("/")[0];
        url = url.split(":")[0];
        url = url.split("?")[0];
        return url;
    }
})(SSS_Settings || (SSS_Settings = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUEwQkEsSUFBSSxRQUFRLENBQUM7QUFFYixJQUFVLFlBQVksQ0FrdURyQjtBQWx1REQsV0FBVSxZQUFZO0lBR3JCLE1BQU0sSUFBSSxHQUFHO1FBQ1osT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFNBQVM7UUFFakIsY0FBYyxFQUFFLFNBQVM7UUFFekIsZUFBZSxFQUFFLFNBQVM7UUFDMUIsY0FBYyxFQUFFLFNBQVM7UUFDekIsa0JBQWtCLEVBQUUsU0FBUztRQUM3QiwwQkFBMEIsRUFBRSxTQUFTO1FBQ3JDLHdCQUF3QixFQUFFLFNBQVM7UUFFbkMscUJBQXFCLEVBQUUsU0FBUztRQUNoQyxxQkFBcUIsRUFBRSxTQUFTO1FBQ2hDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLCtCQUErQixFQUFFLFNBQVM7UUFDMUMsZ0JBQWdCLEVBQUUsU0FBUztRQUUzQiwwQkFBMEIsRUFBRSxTQUFTO1FBQ3JDLGlCQUFpQixFQUFFLFNBQVM7UUFDNUIsbUJBQW1CLEVBQUUsU0FBUztRQUM5QiwwQkFBMEIsRUFBRSxTQUFTO1FBQ3JDLG9CQUFvQixFQUFFLFNBQVM7UUFDL0IseUJBQXlCLEVBQUUsU0FBUztRQUNwQyxtQkFBbUIsRUFBRSxTQUFTO1FBRTlCLGlCQUFpQixFQUFFLFNBQVM7UUFDNUIsY0FBYyxFQUFFLFNBQVM7UUFFekIsMEJBQTBCLEVBQUUsU0FBUztRQUNyQyw0QkFBNEIsRUFBRSxTQUFTO1FBQ3ZDLGlDQUFpQyxFQUFFLFNBQVM7UUFDNUMsd0JBQXdCLEVBQUUsU0FBUztRQUNuQywwQkFBMEIsRUFBRSxTQUFTO1FBRXJDLG1CQUFtQixFQUFFLFNBQVM7S0FDOUIsQ0FBQztJQUVGLE1BQU0sYUFBYTtRQUVsQixZQUFtQixJQUFZLEVBQVMsU0FBcUI7WUFBMUMsU0FBSSxHQUFKLElBQUksQ0FBUTtZ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