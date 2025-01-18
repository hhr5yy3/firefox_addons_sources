/**
 * Shows a custom message e.g. error or success message in a popup overlay
 */
var megaMsgDialog = (() => {
    'use strict';

    let targetDialog;

    /* Button variables */
    let buttonTemplate;
    let confirmButton;
    let buttons = [];

    /**
     * Handle messageDialog close event.
     *
     * @param {Object} callbacks Argument object of callbacks.
     * @param {Bool|*} callbackArg The argument(s) provided to the onInteraction callback.
     * @param {MegaButton} [actionButton] The button the handler is applied too.
     * @param {number} [index] The index of the button provided to the callback.
     *
     * @returns {Function} The close handler function.
     */
    const closeHandler = (callbacks, callbackArg, actionButton, index) => {
        return function() {
            /* Cleanup */
            if (actionButton) {
                actionButton.off('tap');
                targetDialog.hide();
            }
            targetDialog.off('close.megaDialog');

            if (callbacks) {
                if (callbacks.onInteraction && typeof callbacks.onInteraction === 'function') {
                    callbacks.onInteraction(callbackArg || false, index);
                }

                if (callbackArg && callbacks.onSuccess && typeof callbacks.onSuccess === 'function') {
                    callbacks.onSuccess(index);
                }

                if (!callbackArg && callbacks.onFailure && typeof callbacks.onFailure === 'function') {
                    callbacks.onFailure(index);
                }
            }
        };
    };

    /**
     * Renders the checkbox from the callback.
     *
     * @param {Function} checkboxCallback The callback on checkbox state change.
     *
     * @returns {undefined}
     */
    function renderCheckbox(checkboxCallback) {
        if (checkboxCallback && typeof checkboxCallback === 'function') {
            const checkboxNode = new MegaCheckbox({
                parentNode: targetDialog.actionsNode,
                componentClassname: 'mega-checkbox',
                checkboxName: 'show-again',
                checkboxAlign: 'left',
                labelTitle: 'Do not show again', // TODO: Transifex strings
                checked: false
            });
            checkboxNode.on('tap', () => {
                // We haven't hit the rising or falling edge yet, so it's actually
                // the inverse of the current state.
                // Looks like tap is called before click...
                checkboxCallback(!checkboxNode.checked);
            });
        }
    }

    function generateAdditionalButtons(buttonsArg) {
        if (buttonsArg) {
            if (Array.isArray(buttonsArg)) {
                let button;
                for (let i = 0; i < buttonsArg.length; i++) {
                    button = buttonsArg[i];
                    if (i === 0) {
                        button = typeof button === 'string' ? {
                            ...buttonTemplate,
                            text: button,
                            componentClassname: 'primary'
                        } : button;
                        confirmButton = button;
                    }
                    else {
                        button = typeof button === 'string' ? {
                            ...buttonTemplate,
                            text: button,
                            componentClassname: 'secondary',
                        } : button;
                        buttons.push(button);
                    }
                }
            }
            else {
                buttons.push(typeof buttonsArg === 'string' ? {
                    ...buttonTemplate,
                    text: buttonsArg,
                } : buttonsArg);
            }
        }
    }

    /**
     * Render the buttons in the confirmButton and buttons variables if
     * they are avaliable.
     *
     * @param {Object} callbacks Argument object of callbacks.
     *
     * @returns {undefined}
     */
    function renderButtons(callbacks) {
        let subNode;
        if (confirmButton) {
            subNode = new MegaButton(confirmButton);
            subNode.on('click', closeHandler(callbacks, true, subNode));
        }

        if (buttons.length) {
            for (let i = 0; i < buttons.length; i++) {
                subNode = new MegaButton(buttons[i]);
                subNode.on('click', closeHandler(callbacks, false, subNode, i));
            }
        }
    }

    return {
        /**
         * Render and show the Msg dialog.
         * @param {String} title title of the dialog
         * @param {String} msg message of the dialog
         * @param {String} subMsg sub message of the dialog
         * @param {Object} [callbacks] Object containing callbacks for the overlay.
         * @param {Function} [callbacks.onSuccess] Called on success (user pressing primary button).
         * @param {Function} [callbacks.onFailure] Called on failure (user pressing cancel button or sheet close).
         * @param {Function} [callbacks.onInteraction] Called on any interaction with callback({Bool} interactionType).
         * @param {Function} [callbacks.checkbox] Shows the "Do not show again" checkbox and callback with state.
         * @param {Object} [options] Object containing additional options for the overlay.
         * @param {String} [options.name] The name of the dialog.
         * @param {String|Object} [options.icon] Sheet icon class to display. May be string or sheet icon class.
         * @param {String|List} [options.buttons] Additional buttons to display. If string, button is added
         * as secondary "Failure/cancel" button. If array, i=0 is confirm, i>0 is cancel and index is passed.
         * @param {Boolean} closeButton if true, the close button will be shown
         *
         * @returns {void}
         */
        render(title, msg, subMsg, callbacks, options, closeButton) {
            let msgNode, subMsgNode;

            if (!options.name) {
                options.name = title ? title.toLowerCase().replace(/\s+/g, '') : 'msg-dialog';
            }

            targetDialog = mega.ui.dialog;

            buttonTemplate = {
                parentNode: targetDialog.actionsNode,
                type: 'normal',
                componentClassname: 'primay block',
            };
            confirmButton = {
                ...buttonTemplate,
                componentClassname: 'primary',
                text: 'OK, got it', // TODO: transifex strings
            };
            buttons = [];

            if (options) {
                generateAdditionalButtons(options.buttons);
            }

            // Bind to the dialog actions
            targetDialog.on('close.megaDialog', closeHandler(callbacks, false));

            if (msg) {
                msgNode = document.createElement('div');
                msgNode.classList.add('primary-message');
                msgNode.append(parseHTML(msg));
            }

            if (subMsg) {
                subMsgNode = document.createElement('div');
                subMsgNode.classList.add('sub-message');
                subMsgNode.append(parseHTML(subMsg.message || subMsg));
            }

            const dialogOptions = {
                name: options.name,
                icon: options.icon,
                title: title,
                contents: [msg && msgNode, subMsg && subMsgNode],
                showClose: closeButton || false,
                preventBgClosing: typeof closeButton === 'boolean' ? !closeButton : true,
                classList: [options.classList]
            };

            targetDialog.show(dialogOptions);

            if (callbacks) {
                renderCheckbox(callbacks.checkbox);
            }
            renderButtons(callbacks);
        },

        /**
         * Shows the msg dialog.
         *
         * @param {String} message The main message to be displayed
         * @param {String} [subMessage] An optional second message to be displayed after the first
         * @param {String} [icon] An optional class name to show an icon, empty-icon classes can be found in mobile.css
         * @param {String} [buttons] An optional second button in place of text-link close
         * @param {Function} [checkboxCallback] An optional function callback for a "Do not show again" checkbox
         * @param {Boolean} [closeButton] Show close button or not. also use for background tap close.
         * Note: for case that using .catch() on show, you have to set closeButton as true, in order to make it works
         *       on the other hand if you have closeButton true or have 2 buttons which one of them cause fail,
         *       you have to set catch to prevent exception.
         *
         *
         * @returns {Promise} Promise when an action takes place in the dialog.
         */
        show(message, subMessage, icon, buttons, checkboxCallback, closeButton) {

            return new Promise((resolve, reject) => this.render(
                '',
                message,
                subMessage,
                {
                    onSuccess: resolve,
                    onFailure: reject,
                    checkbox: checkboxCallback,
                },
                {
                    icon: icon,
                    buttons: buttons,
                },
                closeButton
            ));
        }
    };
})();

if (is_mobile) {
    mobile.messageOverlay = megaMsgDialog;
}
