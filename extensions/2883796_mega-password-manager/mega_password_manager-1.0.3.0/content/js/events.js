var dialogOpen = false;
var is_simulating = false;

function makeUUID(a) {
    'use strict';

    return a
        ? (a ^ Math.random() * 16 >> a / 4).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, makeUUID);
}

var _pwmEvents = Object.create(null);

function addPwmEvent(target, event, callback, useCapture) {

    "use strict";

    // Generate a UUID if it doesn't exist
    if (!target.megaUUID) {
        const uuid = makeUUID();

        // Check if the UUID is unique
        if (_pwmEvents[uuid]) {
            return addPwmEvent(target, event, callback, useCapture);
        }

        target.megaUUID = uuid;
        _pwmEvents[uuid] = Object.create(null);
    }

    if (_pwmEvents[target.megaUUID][event] === undefined) {
        _pwmEvents[target.megaUUID][event] = [];
    }

    _pwmEvents[target.megaUUID][event].push([
        target,
        callback,
        useCapture
    ]);

    target.addEventListener(event, callback, useCapture);
}

function removePwmEvent(target, event) {
    "use strict";

    _pwmEvents[target.megaUUID][event].forEach(([target, callback, useCapture], i) => {
        target.removeEventListener(event, callback, useCapture);
        delete _pwmEvents[target.megaUUID][event][i];
    });

    if (_pwmEvents[target.megaUUID][event].length === 0) {
        delete _pwmEvents[target.megaUUID][event];
    }
}

// To destroy all events from content scripts for case it need to be reset
function removeAllPwmEvents() {
    "use strict";

    for (const uuid in _pwmEvents) {
        for (const event in _pwmEvents[uuid]) {
            removePwmEvent(_pwmEvents[uuid][event][0][0], event);
        }
        delete _pwmEvents[uuid];
    }
}

function uninstall() {
    "use strict";

    removeAllPwmEvents();
    const megaElm = document.getElementsByClassName('mega-shadow-dom');
    // delete all mega-shadow-dom elements
    for (let i = megaElm.length; i--;) {
        megaElm[i].remove();
    }
}

/**
 * Handles the opening of a dialog when the icon or input field associated with it is focused or clicked.
 * This function is bound to the input or icon when they are initialized.
 * @returns {void}
 */
function handleDialogOpen() {
    "use strict";

    if (mega.ui.pm.dialog && mega.ui.pm.dialog.srcElm === this) {
        return;
    }

    if (dialogOpen) {
        closeContentDialog();
    }

    if (!is_simulating) {
        dialogOpen = true;
        renderDialog(this);
        addPwmEvent(window, 'resize', () => recalcDialogPosition(this));
    }
}

addPwmEvent(document, 'click', handleWindowClick);

/**
 * Handles Click on the injected icon
 * @returns {void}
 */
function iconClick() {
    "use strict";

    const element = this.nodeName === 'INPUT' ? this : this.querySelector('input');

    const isFocused = element === document.activeElement;

    if (isFocused) {
        element.dispatchEvent(new FocusEvent('focusin'));
        element.dispatchEvent(new FocusEvent('focus'));
    }
    else {
        element.focus();
    }
}

/**
 * Handles window click events to close the dialog if the click is outside relevant elements.
 * @param {MouseEvent} e - The event object for the click.
 * @returns {void}
 */
function handleWindowClick(e) {
    "use strict";

    if (e.target.classList.contains('mega-pm-icon-container')
        || e.target === mega.ui.pm.dialog
        || e.target.closest('.mega-pm-dialog')
        || treatedInputs.has(e.target)
        || e.target.classList.contains('mega-shadow-dialog')) {
        e.stopPropagation();
        return;
    }
    closeContentDialog();
}

function closeContentDialog(fromIframe) {
    "use strict";

    if (!chrome.runtime.id) {
        return false;
    }

    if (!fromIframe) {
        chrome.storage.local.set({closeContentDialog: isIframe || 'top'});
        chrome.storage.local.remove('closeContentDialog');
    }
    
    if (mega.ui.pm.dialog && dialogOpen) {
        dialogOpen = false;
        mega.ui.pm.dialog.classList.add('close');
        delete mega.ui.pm.dialog.srcElm;
    }
}

/**
 * Adds an event listener to document to observe changes after user interactions like clicks.
 * @param {string} [initiator] CSS selector of the element to create click listener on
 * @returns {void}
 */
function watchClick(initiator, delayLoad) {
    "use strict";

    if (initiator) {

        const _ = () => {
            observeNode(document.body);

            setTimeout(() => {
                checkForPasswordField();
            }, 3000);
        };

        if (delayLoad) {
            addPwmEvent(document, 'click', (e) => {
                if (e.target.matches(initiator) || e.target.closest(initiator)) {
                    _();
                }
            }, true);
        }
        else {
            for (const element of document.querySelectorAll(initiator)) {
                addPwmEvent(element, 'click', _);
            }
        }
    }
}

async function submitFormHandler(e) {
    "use strict";

    if (!sid || e.target.classList.contains('mega-pm-save-dialog-form') || !checkSubmitCondition()) {
        return false;
    }

    closeContentDialog();

    await mega.ui.pm.send({
        type: 'save-credentials',
        payload: {submitted: true}
    });

    // This site seems does not trigger any page event after form submission. need to mauallly show save dialog.
    if (specialWebsite && specialWebsite.checkCredentialAfterSubmit) {
        setTimeout(() => {
            checkSavedCredentials();
        }, specialWebsite.checkCredentialAfterSubmit);
    }
}

/**
 * Listener to react to changes in the local storage.
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
    "use strict";

    if (namespace === 'local') {
        if (changes.sid) {
            if (changes.sid.newValue) {
                sid = !!changes.sid.newValue;
                iconClasses = 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension';
            }
            else if (sid && !changes.sid.newValue) {
                sid = false;
                iconClasses = 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension-disabled';
            }
            for (const input of treatedInputs) {
                reRenderIcon(input);
            }
        }
        if (changes.closeContentDialog && changes.closeContentDialog.newValue &&
                changes.closeContentDialog.newValue !== (isIframe || 'top')) {
            closeContentDialog(true);
        }
    }
});

addPwmEvent(document, 'submit', submitFormHandler);
