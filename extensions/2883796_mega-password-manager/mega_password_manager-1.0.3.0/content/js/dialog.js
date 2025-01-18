/**
 * Displays a dialog menu associated with an input field.
 * @param {HTMLInputElement} node - The parent of input field for which the dialog is to be displayed.
 * @returns {void}
 */
async function renderDialog(node) {
    "use strict";

    const inputPosition = node.getBoundingClientRect();

    if (!mega.ui.pm.dialog) {
        const shadowWrap = document.createElement('div');
        shadowWrap.className = 'mega-shadow-dom mega-shadow-dialog';
        shadowWrap.dataset.noFocusLock = 'true';
        document.body.appendChild(shadowWrap);
        const shadow = shadowWrap.attachShadow({mode: "open"});
        injectScriptToShadow(shadow);
        const dialogElement = document.createElement('div');
        dialogElement.className = 'mega-pm-dialog mega-pm-content close';
        shadow.appendChild(dialogElement);
        mega.ui.pm.dialog = dialogElement;
    }

    mega.ui.pm.dialog.srcElm = node;

    const {dialog} = mega.ui.pm;

    dialog.textContent = '';
    await renderDialogContent(node);
    mega.ui.setTheme(dialog);
    dialog.classList.remove('close');
    dialog.style.left = `${inputPosition.left}px`;
    dialog.style.top =
        `${inputPosition.bottom + document.documentElement.scrollTop - parseSize(node.style.paddingBottom) + 1}px`;
}

function recalcDialogPosition(node) {
    "use strict";

    const {dialog} = mega.ui.pm;
    const inputPosition = node.getBoundingClientRect();
    dialog.style.left = `${inputPosition.left}px`;
    dialog.style.top =
        `${inputPosition.bottom + document.documentElement.scrollTop - parseSize(node.style.paddingBottom) + 1}px`;
}

/**
 * Create and add the content for the dialog
 * @param {HTMLElement} input - Input that triggered dialog
 * @returns {Promise}
 */
async function renderDialogContent(input) {
    "use strict";

    const {dialog} = mega.ui.pm;

    // Extension may get updated or deleted lets skip.
    if (!chrome.runtime.id) {
        const icon = document.createElement('i');
        icon.className = 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension-disabled';
        const text = document.createElement('span');
        text.className = 'mega-pm-dialog-content-text';
        text.textContent = l.content_dialog_no_connection;
        dialog.append(icon, text);
        return false;
    }

    if (sid) {
        const response = await mega.ui.pm.send({type: 'get-node-by-url'});

        dialog.classList.remove('has-items');

        if (response && response.length > 0) {
            renderAutofillList(response, input);
            dialog.classList.add('has-items');
        }
        else if (settings.autosave) {
            const text = document.createElement('span');
            const img = document.createElement('i');
            const container = document.createElement('div');
            container.append(img, text);
            const fragment = document.createDocumentFragment();
            img.src = chrome.runtime.getURL('images/empty-autofill.png');
            img.className = 'mega-pm-dialog-content-img';
            text.className = 'mega-pm-dialog-content-text';
            text.textContent = l.logged_in_empty_autofill_message;
            fragment.append(container);
            if (dialog.firstElementChild) {
                dialog.replaceChild(fragment, dialog.firstChild);
            }
            else {
                dialog.append(fragment);
            }
        }
    }
    else {
        const icon = document.createElement('i');
        icon.className = 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension';
        const text = document.createElement('span');
        text.className = 'mega-pm-dialog-content-text';
        text.textContent = l.logged_out_autofill_message;
        dialog.append(icon, text);
    }

    return true;
}

/**
 *
 * @param {Array} nodes - Nodes
 * @param {HTMLElement} input - Input that triggered dialog
 * @returns {void}
 */
function renderAutofillList(nodes, input) {
    "use strict";

    const {dialog} = mega.ui.pm;
    const fragment = document.createDocumentFragment();

    input = input.tagName === 'INPUT' ? input : input.querySelector('input');

    for (const node of nodes) {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'mega-pm-dialog-elem';

        const detail = document.createElement('div');
        detail.className = 'mega-pm-detail';
        const elementName = document.createElement('span');
        elementName.className = 'mega-pm-name';
        elementName.textContent = node.name;

        const elementUsername = document.createElement('span');
        elementUsername.className = 'mega-pm-subtext';
        elementUsername.textContent = node.pwm.u;

        detail.append(elementName, elementUsername);

        const elementIcon = document.createElement('div');
        elementIcon.className = 'mega-pm-favicon';
        const iconInner = document.createElement('span');
        elementIcon.appendChild(iconInner);
        generateFavicon(node.name, node.pwm.url, elementIcon);

        nodeElement.append(elementIcon, detail);
        nodeElement.setAttribute('tabindex', '0');
        fragment.appendChild(nodeElement);

        const form = input.closest('form');

        addPwmEvent(nodeElement, 'click', fillUp.bind(this, node, form), false);
        addPwmEvent(nodeElement, 'keydown', (e) => {
            if (e.key === 'Enter') {
                fillUp(node, form);
            }
        });
    }
    if (dialog.firstElementChild) {
        dialog.replaceChild(fragment, dialog.firstChild);
    }
    else {
        dialog.append(fragment);
    }
}

function fillUp(node, form) {
    "use strict";

    const inputSelector = specialWebsite && specialWebsite.inputSelector || '';

    for (const treatedInput of treatedInputs) {
        if (form && treatedInput.closest('form') !== form) {
            continue;
        }

        const inputElement = treatedInput.tagName === 'INPUT' ?
            treatedInput :
            treatedInput.parentElement
                .querySelector(`input:is(${idSelector}, ${inputSelector}, ${passwordSelector})`);

        // Prevent disabled input to be filled up
        if (inputElement.disabled) {
            continue;
        }

        if (inputElement.matches(`:is(${passwordSelector})`)) {
            simulateInput(inputElement, node.pwm.pwd);
        }
        else if (node.pwm.u) {
            simulateInput(inputElement, node.pwm.u);
            mega.ui.pm.send({type: 'autocomplete-select', handle: node.h});
        }
    }
    closeContentDialog();
}

function simulateInput(element, value) {
    "use strict";

    const isFocused = element === document.activeElement;
    is_simulating = true;

    if (isFocused) {
        element.dispatchEvent(new FocusEvent('focusin'));
        element.dispatchEvent(new FocusEvent('focus'));
    }
    else {
        element.focus();
    }

    element.value = value;

    element.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true}));
    element.dispatchEvent(new KeyboardEvent('keypress', {bubbles: true}));
    element.dispatchEvent(new KeyboardEvent('keyup', {bubbles: true}));

    if (element.value !== value) {
        element.value = value;
    }

    element.dispatchEvent(new Event('input', {bubbles: true}));
    element.dispatchEvent(new Event('change', {bubbles: true}));

    if (isFocused) {
        element.blur();
    }
    else {
        element.dispatchEvent(new FocusEvent('blur'));
        element.dispatchEvent(new FocusEvent('focusout'));
    }

    closeContentDialog();
    is_simulating = false;
}
