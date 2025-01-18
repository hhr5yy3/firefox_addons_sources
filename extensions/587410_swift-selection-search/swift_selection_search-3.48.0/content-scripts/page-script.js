var DEBUG_STATE;
var ContentScript;
(function (ContentScript) {
    class SelectionData {
    }
    ContentScript.SelectionData = SelectionData;
    class Message {
        constructor(type) {
            this.type = type;
            this.type = type;
        }
    }
    class EngineClickMessage extends Message {
        constructor() { super("engineClick"); }
    }
    class LogMessage extends Message {
        constructor(log) {
            super("log");
            this.log = log;
        }
    }
    class GetPopupSettingsMessage extends Message {
        constructor() { super("getPopupSettings"); }
    }
    const DEBUG = typeof DEBUG_STATE !== "undefined" && DEBUG_STATE === true;
    if (DEBUG) {
        var log = msg => browser.runtime.sendMessage(new LogMessage(msg));
    }
    let popup = null;
    const selection = new SelectionData();
    let mousePositionX = 0;
    let mousePositionY = 0;
    let canMiddleClickEngine = true;
    let activationSettings = null;
    let settings = null;
    let sssIcons = null;
    let popupShowTimeout = null;
    setTimeout(() => PopupCreator.onSearchEngineClick = onSearchEngineClick, 0);
    browser.runtime.onMessage.addListener(onMessageReceived);
    if (DEBUG) {
        log("content script has started!");
    }
    function onMessageReceived(msg, sender, callbackFunc) {
        switch (msg.type) {
            case "isAlive":
                callbackFunc(true);
                break;
            case "activate":
                if (activationSettings !== null) {
                    deactivate();
                }
                if (document.documentElement.nodeName !== "HTML") {
                    break;
                }
                activate(msg.activationSettings, msg.isPageBlocked);
                break;
            case "showPopup":
                if (saveCurrentSelection()) {
                    showPopupForSelection(null, true);
                }
                break;
            case "copyToClipboardAsHtml":
                copyToClipboardAsHtml();
                break;
            case "copyToClipboardAsPlainText":
                copyToClipboardAsPlainText();
                break;
            default: break;
        }
    }
    function copyToClipboardAsHtml() {
        document.execCommand("copy");
    }
    function copyToClipboardAsPlainText() {
        document.addEventListener("copy", copyToClipboardAsPlainText_Listener);
        document.execCommand("copy");
        document.removeEventListener("copy", copyToClipboardAsPlainText_Listener);
    }
    function copyToClipboardAsPlainText_Listener(e) {
        if (saveCurrentSelection()) {
            e.clipboardData.setData("text/plain", selection.unprocessedText);
            e.preventDefault();
        }
    }
    function getErrorHandler(text) {
        if (DEBUG) {
            return error => { log(`${text} (${error})`); };
        }
        else {
            return undefined;
        }
    }
    function activate(_activationSettings, isPageBlocked) {
        activationSettings = _activationSettings;
        if (activationSettings.popupLocation === "cursor") {
            document.addEventListener("mousemove", onMouseUpdate);
            document.addEventListener("mouseenter", onMouseUpdate);
        }
        if (activationSettings.useEngineShortcutWithoutPopup) {
            document.documentElement.addEventListener("keydown", onKeyDown);
        }
        if (!isPageBlocked) {
            if (activationSettings.popupOpenBehaviour === "auto" || activationSettings.popupOpenBehaviour === "hold-alt") {
                selectionchange.start();
                document.addEventListener("customselectionchange", onSelectionChange);
            }
            else if (activationSettings.popupOpenBehaviour === "middle-mouse") {
                document.addEventListener("mousedown", onMouseDown);
                document.addEventListener("mouseup", onMouseUp);
            }
        }
        if (DEBUG) {
            log("content script activated, url: " + window.location.href.substr(0, 40));
        }
    }
    function deactivate() {
        document.removeEventListener("mousemove", onMouseUpdate);
        document.removeEventListener("mouseenter", onMouseUpdate);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("customselectionchange", onSelectionChange);
        selectionchange.stop();
        document.documentElement.removeEventListener("keydown", onKeyDown);
        document.documentElement.removeEventListener("mousedown", maybeHidePopup);
        window.removeEventListener("scroll", maybeHidePopup);
        if (popup !== null) {
            document.documentElement.removeChild(popup);
            popup = null;
        }
        activationSettings = null;
        settings = null;
        if (DEBUG) {
            log("content script deactivated");
        }
    }
    function onSelectionChange(ev) {
        if (popup && popup.isReceiverOfEvent(ev.event))
            return;
        if (activationSettings.popupOpenBehaviour === "auto" && activationSettings.popupDelay > 0) {
            clearPopupShowTimeout();
            if (saveCurrentSelection()) {
                popupShowTimeout = window.setTimeout(() => showPopupForSelection(ev, false), activationSettings.popupDelay);
            }
        }
        else {
            if (saveCurrentSelection()) {
                showPopupForSelection(ev, false);
            }
        }
    }
    function showPopupForSelection(ev, isForced) {
        clearPopupShowTimeout();
        if (settings !== null) {
            tryShowPopup(ev, isForced);
        }
        else {
            acquireSettings(() => tryShowPopup(ev, isForced));
        }
    }
    function acquireSettings(onSettingsAcquired) {
        browser.runtime.sendMessage(new GetPopupSettingsMessage()).then(popupSettings => {
            settings = popupSettings.settings;
            sssIcons = popupSettings.sssIcons;
            onSettingsAcquired();
        }, getErrorHandler("Error sending getPopupSettings message from content script."));
    }
    function clearPopupShowTimeout() {
        if (popupShowTimeout !== null) {
            clearTimeout(popupShowTimeout);
            popupShowTimeout = null;
        }
    }
    function saveCurrentSelection() {
        const elem = document.activeElement;
        if (elem instanceof HTMLTextAreaElement || (elem instanceof HTMLInputElement && elem.type !== "password")) {
            selection.isInInputField = true;
            selection.unprocessedText = elem.value.substring(elem.selectionStart, elem.selectionEnd);
            selection.element = elem;
        }
        else {
            selection.isInInputField = false;
            const selectionObject = window.getSelection();
            if (selectionObject === null)
                return false;
            let selectedText = selectionObject.toString();
            if (selectedText.length === 0) {
                selectedText = "";
                for (let i = 0; i < selectionObject.rangeCount; i++) {
                    selectedText += selectionObject.getRangeAt(i).toString();
                }
            }
            selection.unprocessedText = selectedText;
            selection.selection = selectionObject;
        }
        selection.unprocessedText = selection.unprocessedText.trim();
        let text = selection.unprocessedText;
        text = text.replace(/[\r\n]+/g, " ");
        text = text.replace(/\s\s+/g, " ");
        selection.text = text;
        return selection.text.length > 0;
    }
    function tryShowPopup(ev, isForced) {
        if (settings.popupOpenBehaviour === "hold-alt" && !ev["altKey"])
            return;
        if (settings.popupOpenBehaviour === "auto") {
            if ((settings.minSelectedCharacters > 0 && selection.text.length < settings.minSelectedCharacters)
                || (settings.maxSelectedCharacters > 0 && selection.text.length > settings.maxSelectedCharacters)) {
                return;
            }
        }
        if (!isForced) {
            if (!settings.allowPopupOnEditableFields) {
                if (selection.isInInputField)
                    return;
                if (isInContentEditableField(selection.selection.anchorNode))
                    return;
            }
            else {
                if (!ev["isMouse"] && isInContentEditableField(selection.selection.anchorNode))
                    return;
            }
        }
        if (settings.autoCopyToClipboard === "always"
            || (settings.autoCopyToClipboard === "non-editable-only"
                && !selection.isInInputField
                && !isInContentEditableField(selection.selection.anchorNode))) {
            if (DEBUG) {
                log("auto copied to clipboard: " + selection.text);
            }
            document.execCommand("copy");
        }
        if (DEBUG) {
            log("showing popup, previous value was: " + popup);
        }
        if (popup === null) {
            popup = createPopup(settings);
        }
        if (settings.showSelectionTextField === true) {
            popup.setInputFieldText(selection.text);
            if (isForced) {
                setTimeout(() => popup.setFocusOnInputFieldText(), 0);
            }
        }
        popup.show();
        popup.setPopupPosition(settings, selection, mousePositionX, mousePositionY);
        if (settings.popupAnimationDuration > 0) {
            popup.playAnimation(settings);
        }
    }
    function createPopup(settings) {
        if (!customElements.get("sss-popup")) {
            class SSSPopupWithSettings extends PopupCreator.SSSPopup {
                constructor() { super(getSettings(), getIcons()); }
            }
            customElements.define("sss-popup", SSSPopupWithSettings);
        }
        const popup = document.createElement("sss-popup");
        document.documentElement.appendChild(popup);
        if (!settings.useEngineShortcutWithoutPopup) {
            document.documentElement.addEventListener("keydown", onKeyDown);
        }
        document.documentElement.addEventListener("mousedown", maybeHidePopup);
        popup.addEventListener("mousedown", ev => ev.stopPropagation());
        if (settings.hidePopupOnPageScroll) {
            window.addEventListener("scroll", maybeHidePopup);
        }
        return popup;
    }
    function getSettings() {
        return settings;
    }
    function getIcons() {
        return sssIcons;
    }
    function isInContentEditableField(node) {
        for (let elem = node; elem !== document; elem = elem.parentNode) {
            const concreteElem = elem;
            if (concreteElem.isContentEditable === undefined) {
                continue;
            }
            return concreteElem.isContentEditable;
        }
        return false;
    }
    function isAnyEditableFieldFocused() {
        const elem = document.activeElement;
        return elem instanceof HTMLTextAreaElement || (elem instanceof HTMLInputElement && elem.type !== "password") || isInContentEditableField(elem);
    }
    function getEngineWithShortcut(key) {
        key = key.toUpperCase();
        return settings.searchEngines.find(e => e.shortcut === key);
    }
    function onKeyDown(ev) {
        const isPopupVisible = popup !== null && popup.isShown();
        if (!ev.altKey && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey
            && !isAnyEditableFieldFocused()) {
            if ((isPopupVisible && ev.originalTarget.className !== "sss-input-field")
                || (activationSettings.useEngineShortcutWithoutPopup && saveCurrentSelection())) {
                if (settings !== null) {
                    searchWithEngineUsingShortcut(ev.key);
                }
                else {
                    acquireSettings(() => searchWithEngineUsingShortcut(ev.key));
                }
            }
        }
        if (!isPopupVisible)
            return;
        if (ev.key === "Tab") {
            const firstIcon = popup.enginesContainer.firstChild;
            const lastIcon = popup.enginesContainer.lastChild;
            if (document.activeElement.nodeName !== "SSS-POPUP" || ev.originalTarget === lastIcon) {
                firstIcon.focus();
                ev.preventDefault();
                return;
            }
        }
        if (ev.keyCode == 13 && popup.isReceiverOfEvent(ev)) {
            let engine;
            let openingBehaviour;
            if (ev.originalTarget.nodeName === "INPUT") {
                engine = settings.searchEngines.find(e => e.type !== "sss");
                openingBehaviour = "new-bg-tab";
            }
            else {
                const engineIndex = [...popup.enginesContainer.children].indexOf(ev.originalTarget);
                engine = settings.searchEngines[engineIndex];
                openingBehaviour = settings.shortcutBehaviour;
            }
            const message = createSearchMessage(engine, settings);
            message.openingBehaviour = openingBehaviour;
            browser.runtime.sendMessage(message);
        }
        else {
            maybeHidePopup(ev);
        }
    }
    function searchWithEngineUsingShortcut(key) {
        const engine = getEngineWithShortcut(key);
        if (engine) {
            const message = createSearchMessage(engine, settings);
            message.openingBehaviour = settings.shortcutBehaviour;
            browser.runtime.sendMessage(message);
        }
    }
    function maybeHidePopup(ev) {
        if (popup === null)
            return;
        if (ev) {
            if (ev.type === "keydown") {
                if (ev.keyCode == 16)
                    return;
                if (ev.keyCode == 17)
                    return;
                if (ev.keyCode == 18)
                    return;
                if (ev.keyCode == 224)
                    return;
                if (ev.keyCode == 27) {
                    popup.hide();
                    return;
                }
                if (popup.isReceiverOfEvent(ev))
                    return;
                if (!settings.hidePopupOnSearch && getEngineWithShortcut(ev.key))
                    return;
            }
            if (ev.button === 2 && settings && settings.hidePopupOnRightClick === false)
                return;
        }
        popup.hide();
    }
    function onMouseUpdate(ev) {
        mousePositionX = ev.pageX;
        mousePositionY = ev.pageY;
    }
    function onSearchEngineClick(ev, engine, settings) {
        if (ev.button === 1 && !canMiddleClickEngine)
            return;
        if (settings.hidePopupOnSearch) {
            setTimeout(() => maybeHidePopup(), 0);
        }
        if (ev.button === 0 || ev.button === 1 || ev.button === 2) {
            const message = createSearchMessage(engine, settings);
            if (ev[selectionchange.modifierKey]) {
                message.openingBehaviour = "new-bg-tab";
            }
            else if (ev.button === 0) {
                message.openingBehaviour = settings.mouseLeftButtonBehaviour;
            }
            else if (ev.button === 1) {
                message.openingBehaviour = settings.mouseMiddleButtonBehaviour;
            }
            else {
                message.openingBehaviour = settings.mouseRightButtonBehaviour;
            }
            browser.runtime.sendMessage(message);
        }
    }
    function createSearchMessage(engine, settings) {
        const message = new EngineClickMessage();
        message.selection = popup !== null && settings.showSelectionTextField === true ? popup.getInputFieldText() : selection.text;
        message.engine = engine;
        if (window.location) {
            message.href = window.location.href;
        }
        return message;
    }
    function onMouseDown(ev) {
        if (ev.button !== 1)
            return;
        const selection = window.getSelection();
        const elem = document.activeElement;
        if (elem instanceof HTMLTextAreaElement || (elem instanceof HTMLInputElement && elem.type !== "password")) {
            if (forceSelectionIfWithinRect(ev, elem.getBoundingClientRect())) {
                return false;
            }
        }
        for (let i = 0; i < selection.rangeCount; ++i) {
            const range = selection.getRangeAt(i);
            const bounds = range.getBoundingClientRect();
            if (bounds.width > 0 && bounds.height > 0 && forceSelectionIfWithinRect(ev, bounds)) {
                return false;
            }
        }
    }
    function onMouseUp(ev) {
        if (ev.button === 1) {
            canMiddleClickEngine = true;
        }
    }
    function forceSelectionIfWithinRect(ev, rect) {
        const margin = activationSettings.middleMouseSelectionClickMargin;
        if (ev.clientX > rect.left - margin && ev.clientX < rect.right + margin
            && ev.clientY > rect.top - margin && ev.clientY < rect.bottom + margin) {
            ev.preventDefault();
            ev.stopPropagation();
            if (saveCurrentSelection()) {
                ev["isMouse"] = true;
                showPopupForSelection(ev, false);
            }
            canMiddleClickEngine = false;
            return true;
        }
        return false;
    }
})(ContentScript || (ContentScript = {}));
var PopupCreator;
(function (PopupCreator) {
    PopupCreator.onSearchEngineClick = null;
    class SSSPopup extends HTMLElement {
        constructor(settings, sssIcons) {
            super();
            Object.setPrototypeOf(this, SSSPopup.prototype);
            const shadowRoot = this.attachShadow({ mode: "closed" });
            const css = this.generateStylesheet(settings);
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(css));
            shadowRoot.appendChild(style);
            this.content = document.createElement("div");
            this.content.classList.add("sss-content");
            shadowRoot.appendChild(this.content);
            if (settings.showSelectionTextField) {
                this.inputField = document.createElement("input");
                this.inputField.type = "text";
                this.inputField.classList.add("sss-input-field");
                this.content.appendChild(this.inputField);
            }
            if (this.inputField && settings.selectionTextFieldLocation === "top") {
                this.content.appendChild(this.inputField);
            }
            this.enginesContainer = document.createElement("div");
            this.enginesContainer.classList.add("sss-engines");
            this.content.appendChild(this.enginesContainer);
            if (this.inputField && settings.selectionTextFieldLocation === "bottom") {
                this.content.appendChild(this.inputField);
            }
            this.createPopupContent(settings, sssIcons);
        }
        generateStylesheet(settings) {
            return `
				:host {
					all: initial !important;
				}

				.sss-content {
					font-size: 0px !important;
					direction: ltr !important;
					position: absolute;
					z-index: 2147483647;
					user-select: none;
					-moz-user-select: none;
					box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px;
					background-color: ${settings.popupBackgroundColor};
					border-radius: ${settings.popupBorderRadius}px;
					padding: ${settings.popupPaddingY}px ${settings.popupPaddingX}px;
					text-align: center;
					${this.generateStylesheet_Width(settings)}
				}

				.sss-content img {
					width: ${settings.popupItemSize}px;
					height: ${settings.popupItemSize}px;
					padding: ${3 + settings.popupItemVerticalPadding}px ${settings.popupItemPadding}px;
					border-radius: ${settings.popupItemBorderRadius}px;
					cursor: pointer;
				}

				.sss-content img:hover {
					${this.generateStylesheet_IconHover(settings)}
				}

				.separator {
					${this.generateStylesheet_Separator(settings)}
				}

				.sss-engines {
					${this.generateStylesheet_TextAlign(settings)}
				}

				.sss-input-field {
					box-sizing: border-box;
					width: calc(100% - 8px);
					border: 1px solid #ccc;
					border-radius: ${settings.popupBorderRadius}px;
					padding: 4px 7px;
					margin: 4px 0px 2px 0px;
				}

				.sss-input-field:hover {
					border: 1px solid ${settings.popupHighlightColor};
				}

				${settings.useCustomPopupCSS === true ? settings.customPopupCSS : ""}
			`;
        }
        generateStylesheet_TextAlign(settings) {
            let textAlign = "center";
            if (!settings.useSingleRow) {
                switch (settings.iconAlignmentInGrid) {
                    case "left":
                        textAlign = "left";
                        break;
                    case "right":
                        textAlign = "right";
                        break;
                }
            }
            return `text-align: ${textAlign} !important;`;
        }
        generateStylesheet_Width(settings) {
            let width;
            if (settings.useSingleRow) {
                const nSeparators = settings.searchEngines.filter(e => e.type === "sss" && e.id === "separator").length;
                const nPopupIcons = settings.searchEngines.length - nSeparators;
                width = nPopupIcons * (settings.popupItemSize + 2 * settings.popupItemPadding);
                width += nSeparators * (settings.popupItemSize * settings.popupSeparatorWidth / 100 + 2 * settings.popupItemPadding);
            }
            else {
                const nPopupIconsPerRow = Math.max(1, Math.min(settings.nPopupIconsPerRow, settings.searchEngines.length));
                width = nPopupIconsPerRow * (settings.popupItemSize + 2 * settings.popupItemPadding);
            }
            return `width: ${width}px;`;
        }
        generateStylesheet_IconHover(settings) {
            if (settings.popupItemHoverBehaviour === "highlight"
                || settings.popupItemHoverBehaviour === "highlight-and-move") {
                let borderCompensation;
                if (settings.popupItemHoverBehaviour === "highlight-and-move") {
                    const marginTopValue = Math.min(-3 - settings.popupItemVerticalPadding + 2, -2);
                    borderCompensation = `margin-top: ${marginTopValue}px;`;
                }
                else {
                    const paddingBottomValue = Math.max(3 + settings.popupItemVerticalPadding - 2, 0);
                    borderCompensation = `padding-bottom: ${paddingBottomValue}px;`;
                }
                return `
					border-bottom: 2px ${settings.popupHighlightColor} solid;
					border-radius: ${settings.popupItemBorderRadius == 0 ? 2 : settings.popupItemBorderRadius}px;
					${borderCompensation}
				`;
            }
            else if (settings.popupItemHoverBehaviour === "scale") {
                return `
					transform: scale(1.15);
					backface-visibility: hidden;
				`;
            }
            return "";
        }
        generateStylesheet_Separator(settings) {
            const separatorWidth = settings.popupItemSize * settings.popupSeparatorWidth / 100;
            const separatorMargin = (separatorWidth - settings.popupItemSize) / 2;
            return `
				pointer-events: none !important;
				margin-left: ${separatorMargin}px;
				margin-right: ${separatorMargin}px;
			`;
        }
        createPopupContent(settings, sssIcons) {
            for (let i = 0; i < settings.searchEngines.length; i++) {
                const engine = settings.searchEngines[i];
                let icon;
                if (engine.type === "sss") {
                    const sssEngine = engine;
                    const sssIcon = sssIcons[sssEngine.id];
                    const iconImgSource = browser.extension.getURL(sssIcon.iconPath);
                    const isInteractive = sssIcon.isInteractive !== false;
                    icon = this.setupEngineIcon(sssEngine, iconImgSource, sssIcon.name, isInteractive, settings);
                    if (sssEngine.id === "separator") {
                        icon.classList.add("separator");
                    }
                }
                else {
                    const userEngine = engine;
                    let iconImgSource;
                    if (userEngine.iconUrl.startsWith("data:")) {
                        iconImgSource = userEngine.iconUrl;
                    }
                    else {
                        const cachedIcon = settings.searchEnginesCache[userEngine.iconUrl];
                        iconImgSource = cachedIcon ? cachedIcon : userEngine.iconUrl;
                    }
                    icon = this.setupEngineIcon(userEngine, iconImgSource, userEngine.name, true, settings);
                }
                this.enginesContainer.appendChild(icon);
            }
        }
        setupEngineIcon(engine, iconImgSource, iconTitle, isInteractive, settings) {
            const icon = document.createElement("img");
            icon.src = iconImgSource;
            icon.tabIndex = 0;
            if (isInteractive) {
                icon.title = engine.shortcut ? `${iconTitle} (${engine.shortcut})` : iconTitle;
                icon.addEventListener("mouseup", ev => PopupCreator.onSearchEngineClick(ev, engine, settings));
                icon.addEventListener("contextmenu", ev => {
                    ev.preventDefault();
                    return false;
                });
            }
            icon.addEventListener("mousedown", ev => ev.preventDefault());
            icon.ondragstart = _ => false;
            return icon;
        }
        setPopupPosition(settings, selection, mousePositionX, mousePositionY) {
            const bounds = this.content.getBoundingClientRect();
            const width = bounds.width;
            const height = bounds.height;
            let positionLeft;
            let positionTop;
            if (settings.popupLocation === "selection") {
                let rect;
                if (selection.isInInputField) {
                    rect = selection.element.getBoundingClientRect();
                }
                else {
                    const range = selection.selection.getRangeAt(0);
                    rect = range.getBoundingClientRect();
                }
                positionLeft = rect.right + window.pageXOffset;
                positionTop = rect.bottom + window.pageYOffset;
            }
            else if (settings.popupLocation === "cursor") {
                positionLeft = mousePositionX;
                positionTop = mousePositionY - height - 10;
            }
            positionLeft -= width / 2;
            positionLeft += settings.popupOffsetX;
            positionTop -= settings.popupOffsetY;
            const margin = 5;
            if (positionLeft < margin + window.scrollX) {
                positionLeft = margin + window.scrollX;
            }
            else {
                const clientWidth = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
                if (positionLeft + width + margin > clientWidth + window.scrollX) {
                    positionLeft = clientWidth + window.scrollX - width - margin;
                }
            }
            if (positionTop < margin + window.scrollY) {
                positionTop = margin + window.scrollY;
            }
            else {
                const clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                if (positionTop + height + margin > clientHeight + window.scrollY) {
                    positionTop = clientHeight + window.scrollY - height - margin;
                }
            }
            this.content.style.setProperty("left", positionLeft + "px");
            this.content.style.setProperty("top", positionTop + "px");
        }
        playAnimation(settings) {
            this.content.animate({ transform: ["scale(0.8)", "scale(1)"] }, settings.popupAnimationDuration);
            this.content.animate({ opacity: ["0", "1"] }, settings.popupAnimationDuration * 0.5);
        }
        isReceiverOfEvent(ev) {
            return ev.target === this;
        }
        setFocusOnInputFieldText() {
            this.inputField.focus();
        }
        setInputFieldText(text) {
            this.inputField.value = text;
        }
        getInputFieldText() {
            return this.inputField.value;
        }
        isShown() {
            return this.content.style.display === "inline-block";
        }
        show() {
            this.content.style.setProperty("display", "inline-block");
        }
        hide() {
            this.content.style.setProperty("display", "none");
        }
    }
    PopupCreator.SSSPopup = SSSPopup;
})(PopupCreator || (PopupCreator = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWdlLXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSxJQUFJLFdBQW9CLENBQUM7QUFFekIsSUFBVSxhQUFhLENBMG9CdEI7QUExb0JELFdBQVUsYUFBYTtJQUV0QixNQUFhLGFBQWE7S0FPekI7SUFQWSwyQkFBYSxnQkFPekIsQ0FBQTtJQVVELE1BQWUsT0FBTztRQUVyQixZQUFtQixJQUFpQjtZQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO1lBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFBQyxDQUFDO0tBQzNEO0lBRUQsTUFBTSxrQkFBbUIsU0FBUSxPQUFPO1FBT3ZDLGdCQUFnQixLQUFLLGVBQXlCLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsTUFBTSxVQUFXLFNBQVEsT0FBTztRQUUvQixZQUFtQixHQUFRO1lBQUksS0FBSyxPQUFpQixDQUFDO1lBQW5DLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBNEIsQ0FBQztLQUN4RDtJQUVELE1BQU0sdUJBQXdCLFNBQVEsT0FBTztRQUU1QyxnQkFBZ0IsS0FBSyxvQkFBOEIsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7SUFFRCxNQUFNLEtBQUssR0FBRyxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksV0FBVyxLQUFLLElBQUksQ0FBQztJQUV6RSxJQUFJLEtBQUssRUFBRTtRQUdWLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNsRTtJQUdELElBQUksS0FBSyxHQUEwQixJQUFJLENBQUM7SUFDeEMsTUFBTSxTQUFTLEdBQWtCLElBQUksYUFBYSxFQUFFLENBQUM7SUFDckQsSUFBSSxjQUFjLEdBQVcsQ0FBQyxDQUFDO0lBQy9CLElBQUksY0FBYyxHQUFXLENBQUMs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