// backward compatibility
/**
 *
 * @param {String} [type] Dialog type. May also contain button labels: "warninga:Save" or "warninga:!^$Yes!No"
 * @param {String} [title] Title.
 * @param {String} [msg] Primary message.
 * @param {String} [subMsg] Sub Message.
 * @param {Function} [callback] Called on tap of any button, callback({Bool} "OK": true, "Cancel": false).
 * @param {Function} [checkboxCallback] "Do not show again" checkbox, callback({Bool} checkboxState).
 * @param {Boolean} [closeButton] Show close button or not, also use for background tap close
 *
 * @returns {undefined}
 */
function msgDialog(type, title, msg, subMsg, callback, checkboxCallback, closeButton) {
    'use strict';

    const dialogType = type.split(':');
    let icon = '';

    // Determine icon from the dialog type
    if (dialogType) {
        const typeIconLookup = {
            info: 'sprite-pm-ext-mono icon-info-thin-outline info',
            warninga: 'sprite-pm-ext-mono icon-alert-triangle-thin-outline warning',
            warningb: 'sprite-pm-ext-mono icon-alert-triangle-thin-outline warning',
            confirmation: 'sprite-pm-ext-mono icon-check-circle-thin-outline success',
            error: 'sprite-pm-ext-mono icon-x-circle-thin-outline error'
        };

        icon = typeIconLookup[dialogType[0]];
    }

    // Support other button types if necessary (adapted from fm.js msgDialog function first if/else block):
    // 1. Yes and No buttons for confirmation dialogs
    // 2. Action buttons if type contains button label(s)
    var buttonsArray = [];

    if (dialogType[0] === 'confirmation' || dialogType[1] === '!^Yes!No') { // TODO: transifex strings
        buttonsArray = ['Yes', 'No']; // TODO: transifex strings
    }
    else if (dialogType.length > 1) {
        type = dialogType.shift();
        let actionButton = buttonsArray[0] = dialogType.join(':');

        if (actionButton[0] === '!') {
            actionButton = buttonsArray[0] = actionButton.substring(1);

            if (actionButton[0] === '^') {
                var buttons = actionButton.substring(1);
                var pos = buttons.indexOf('!');
                buttonsArray[0] = buttons.substring(0, pos++);
                buttonsArray[1] = buttons.substring(pos);
            }
        }
    }

    // This types are swap button position
    if (type === 'warninga' || type === 'warningb' || type === 'info' || type === 'error' && buttonsArray.length > 1) {
        buttonsArray.reverse();
    }

    megaMsgDialog.render(
        title,
        msg,
        subMsg,
        {
            onInteraction: callback,
            checkbox: checkboxCallback,
        },
        {
            icon: icon,
            buttons: buttonsArray,
            classList: type
        },
        typeof closeButton === 'undefined' ? true : closeButton
    );
}

function asyncMsgDialog(type, title, msg, subMsg, callback, checkboxCallback) {

    'use strict';

    return new Promise((resolve, reject) => {
        callback = callback || echo;
        const asyncCallback = tryCatch((value) => {
            Promise.resolve(callback(value)).then(resolve).catch(reject);
        }, reject);
        msgDialog(type, title, msg, subMsg, asyncCallback, checkboxCallback);
    });
}
