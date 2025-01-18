/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
if (!window.kwExtensionInstalled) {
    window.kwExtensionInstalled = true;
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (sender.id !== chrome.runtime.id) {
            return;
        }
        const response = run(message);
        if (response) {
            sendResponse(response);
        }
        function run(message) {
            if (location.href !== message.url) {
                return;
            }
            switch (message.action) {
                case 'auto-fill':
                    autoFill(message);
                    break;
                case 'get-next-auto-fill-command':
                    return getNextAutoFillCommand();
            }
        }
        function getNextAutoFillCommand() {
            const input = document.activeElement;
            if (input?.tagName !== 'INPUT') {
                return;
            }
            let nextCommand;
            if (input.type === 'password') {
                nextCommand = 'submit-password';
            }
            else {
                const passInput = getNextFormPasswordInput(input);
                if (passInput) {
                    nextCommand = 'submit-username-password';
                }
                else {
                    nextCommand = 'submit-username';
                }
            }
            return { nextCommand };
        }
        function autoFill(arg) {
            const { text, password, submit } = arg;
            let input = document.activeElement;
            if (!input) {
                return;
            }
            if (!text) {
                return;
            }
            setInputText(input, text);
            const form = input.form;
            if (password) {
                input = getNextFormPasswordInput(input);
                if (!input) {
                    return;
                }
                input.focus();
                setInputText(input, password);
            }
            if (form && submit) {
                submitForm(form);
            }
        }
        function setInputText(input, text) {
            input.value = text;
            input.dispatchEvent(new InputEvent('input', { inputType: 'insertFromPaste', data: text, bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
        function getNextFormPasswordInput(input) {
            if (!input.form) {
                const inputs = [...document.querySelectorAll('input')];
                if (!inputs.includes(input)) {
                    return undefined;
                }
                for (let ix = inputs.indexOf(input) + 1; ix < inputs.length; ix++) {
                    const nextInput = inputs[ix];
                    if (nextInput.form) {
                        return undefined;
                    }
                    switch (nextInput.type) {
                        case 'password':
                            return nextInput;
                        case 'checkbox':
                        case 'hidden':
                            continue;
                        default:
                            return undefined;
                    }
                }
                return undefined;
            }
            let found = false;
            for (const element of input.form.elements) {
                if (found) {
                    if (element.tagName === 'INPUT') {
                        const inputEl = element;
                        if (inputEl.type === 'password') {
                            return inputEl;
                        }
                    }
                }
                if (element === input) {
                    found = true;
                }
            }
            return undefined;
        }
        function submitForm(form) {
            const submitButton = (form.querySelector('input[type=submit],button[type=submit]'));
            if (typeof form.requestSubmit === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                form.requestSubmit(submitButton);
            }
            else if (submitButton) {
                submitButton.click();
            }
            else {
                const btn = document.createElement('input');
                btn.type = 'submit';
                btn.hidden = true;
                form.appendChild(btn);
                btn.click();
                form.removeChild(btn);
            }
        }
    });
}

})();

/******/ })()
;