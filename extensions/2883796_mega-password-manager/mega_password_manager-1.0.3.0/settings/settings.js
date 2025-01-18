window.mega = window.mega || {};
window.mega.ui = window.mega.ui || {};
window.mega.ui.pm = window.mega.ui.pm || {
    send: async(message) => {
        'use strict';
        await chrome.runtime.sendMessage({type: 'alive'});

        return chrome.runtime.sendMessage(message);
    }
};

var u_attr;
var POPUP_WIDTH = window.innerWidth;
var POPUP_HEIGHT = window.innerHeight;
var POPUP_SIDE_MARGIN = 0;
var POPUP_TOP_MARGIN = 0;
var dlID = false;
var file = null;
var importInFlight = false;
var offline = false;

window.mainlayout = window.mainlayout || document.querySelector('.mega-pm-body');
window.settingsUI = {};
window.settings = {};
window.importSelected = 'google';
var keepAliveInterval;

MegaBanner.init();

chrome.storage.local.get(['sid', 'settings']).then(result => {
    'use strict';
    window.u_sid = result.sid;
    window.settings = result.settings;
    keepAliveInterval = setInterval(() => {
        mega.ui.pm.send('keep_alive');
    }, 10000);

    // if user trying to get access to settings before logging in, or while on settings page and try logout,
    // just close the tab as this is invalid usage
    if (result.sid) {
        chrome.storage.onChanged.addListener((changes, namespace) => {

            if (namespace === 'local' && changes.sid && !changes.sid.newValue) {
                chrome.tabs.getCurrent(tab => chrome.tabs.remove(tab.id));
            }
        });
    }
    else {
        chrome.tabs.getCurrent(tab => chrome.tabs.remove(tab.id));
    }
});

chrome.runtime.connect({name: 'settings-opened'});

chrome.runtime.onMessage.addListener((message, sender) => {
    "use strict";

    // Reject all messages not coming from the extension
    if (sender.id !== chrome.runtime.id) {
        return false;
    }

    if (message.type === 'u_attr') {
        u_attr = message.u_attr;
        mega.ui.setTheme();
    }
    else if (message.type === 'u_attr:webtheme') {
        mega.ui.setTheme(null, message.payload);
    }
    else if (message.type === 'connection-off') {
        offline = true;
        const importBtn = document.querySelector('.import-file');
        const chooseFileBtn = document.querySelector('.choose-file');
        const errorMessage = document.querySelector('.import-error-message');

        if (importInFlight) {
            errorMessage.classList.remove('hidden');
            chooseFileBtn.disabled = false;
            importBtn.disabled = false;
            importBtn.loading = false;
        }
    }
    else if (message.type === 'connection-on') {
        offline = false;
    }
});

mBroadcaster.sendMessage('boot_done');

mBroadcaster.addListener('lang_loaded', drawSettings);

window.addEventListener('unload', () => {
    "use strict";

    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
    }
});

window.addEventListener('resize', () => {
    "use strict";

    POPUP_WIDTH = window.innerWidth;
    POPUP_HEIGHT = window.innerHeight;
});

var clearClipBoardTimes = {};
var importProvider = {};

function tell(ex) {
    'use strict';
    if (d) {
        console.error(ex);
    }

    msgDialog('warninga', l.unsuccessful_action, l.request_failed, `${l.error_code} : ${ex}`);
}

async function drawSettings() {
    "use strict";

    clearClipBoardTimes = {
        '15': mega.icu.format(l.seconds, 15),
        '30': mega.icu.format(l.seconds, 30),
        '60': mega.icu.format(l.minutes, 1),
        '180': mega.icu.format(l.minutes, 3),
        '10000': l.clear_clipboard_choice_never
    };

    importProvider = {
        'google': l.google_password_manager,
        'keepass': l.keepass,
        'lastpass': l.lastpass,
        'dashlane': l.dashlane,
        '1password': l['1password'],
        'bitwarden': l.bitwarden,
        'nordpass': l.nordpass,
        'proton': l.proton,
        'other': l.generic_csv
    };

    const settingsContainer = document.querySelector('.settings-container');

    const title = document.createElement('h1');
    title.textContent = l[823];
    settingsContainer.appendChild(title);

    const {settings} = await chrome.storage.local.get('settings');

    window.settingsUI.accountList = new MegaPassList({
        parentNode: settingsContainer,
        title: l.mega_account_title,
        items: {
            'account-settings': {
                title: l.account_settings_title,
                subtitle: l.account_settings_subtitle,
                iconButton: {
                    icon: 'sprite-pm-ext-mono icon-external-link-thin-outline',
                    text: l.account_settings_label,
                    href: 'https://mega.nz/fm/account',
                    target: '_blank',
                    iconSize: 24,
                    iconSizeSmall: 16,
                    title: l.account_settings_label,
                    evId: 590029
                }
            },
            'account-reload': {
                title: l[23433],
                subtitle: l[7713],
                iconButton: {
                    icon: 'sprite-pm-ext-mono icon-sync-thin-outline',
                    text: l.reload_account_btn,
                    iconSize: 24,
                    iconSizeSmall: 16,
                    title: l.reload_account_btn,
                    onClick: () => {
                        mega.ui.dialog.show({
                            name: 'reload-account-confirm',
                            icon: 'sprite-pm-ext-mono icon-help-circle-thin-outline info',
                            contents: [parseHTML(`${l[7713]}<br><br>${l[6994]}`)],
                            showClose: true,
                            actions: [
                                {
                                    type: 'normal',
                                    text: l[79],
                                    componentClassname: 'secondary',
                                    onClick: () => mega.ui.dialog.hide()
                                },
                                {
                                    type: 'normal',
                                    text: l[78],
                                    onClick: () => mega.ui.pm.send({type: 'pm-reload'})
                                }
                            ]
                        });
                    }
                }
            }
        }
    });

    window.settingsUI.autofillList = new MegaPassList({
        parentNode: settingsContainer,
        title: l.autofill_title,
        items: {
            'autofill': {
                title: l.autofill_title,
                subtitle: l.autofill_subtitle,
                toggle: {
                    value: 'autofill',
                    checked: settings.autofill === null ? true : settings.autofill,
                    id: 'autofill',
                    events: [590030, 590031],
                    onChange: changeToggle,
                    beforeToggle: validateUserStatus
                }
            },
            'autosave': {
                title: l.autosave_title,
                subtitle: l.autosave_subtitle,
                toggle: {
                    value: 'autosave',
                    checked: settings.autosave === null ? true : settings.autosave,
                    id: 'autosave',
                    events: [590032, 590033],
                    onChange: changeToggle,
                    beforeToggle: validateUserStatus
                }
            }
        }
    });

    const importBlock = window.settingsUI.import = new MegaPassList({
        parentNode: settingsContainer,
        title: l.import_title
    });

    importBlock.domNode.id = 'import';

    const importTitleItem = document.createElement('div');
    importTitleItem.className = 'mega-list-item';
    const titleItemText = document.createElement('div');
    titleItemText.className = 'mega-list-item-text';
    importTitleItem.append(titleItemText);
    const importTitle = document.createElement('span');
    importTitle.className = 'mega-item-list-title';
    importTitle.textContent = l.import_password;
    titleItemText.appendChild(importTitle);
    const importSubtitle = document.createElement('span');
    importSubtitle.className = 'mega-item-list-subtitle';
    importSubtitle.append(parseHTML(l.import_notes));
    titleItemText.appendChild(importSubtitle);
    importBlock.listNode.append(importTitleItem);

    const importSelectItem = document.createElement('div');
    importSelectItem.className = 'mega-list-item force-wrap';
    const selectItemText = document.createElement('div');
    selectItemText.className = 'mega-list-item-text';
    importSelectItem.append(selectItemText);
    const selectFileTitle = document.createElement('span');
    selectFileTitle.className = 'mega-item-list-title-small';
    selectFileTitle.textContent = l.select_file_label;
    selectItemText.appendChild(selectFileTitle);
    const selectFileNotes = document.createElement('span');
    selectFileNotes.className = 'mega-item-list-subtitle';
    selectFileNotes.append(parseHTML(l.select_file_notes));
    selectItemText.appendChild(selectFileNotes);
    const buttonLine = document.createElement('div');
    buttonLine.className = 'mega-list-item-second';
    importSelectItem.appendChild(buttonLine);
    window.settingsUI.importProviderDropdown = new MegaDropdown({
        parentNode: buttonLine,
        dropdownOptions: {},
        text: l.google_password_manager,
        selected: window.importSelected,
        id: 'import-provider-dropdown',
        name: 'import-provider-dropdown',
        dropdownItems: importProvider,
        onSelected: selectProvider
    });
    const fileInput = document.createElement('input');
    fileInput.style.display = 'none';
    fileInput.type = 'file';
    fileInput.multiple = false;
    fileInput.accept = '.csv';
    fileInput.id = 'file-select';
    buttonLine.appendChild(fileInput);
    const chooseFileBtn = new MegaButton({
        parentNode: buttonLine,
        componentClassname: 'choose-file secondary',
        text: l.choose_file_btn,
        onClick: getFile
    });
    importBlock.listNode.append(importSelectItem);

    const importButtonItem = document.createElement('div');
    importButtonItem.className = 'mega-list-item force-wrap';
    const importButtonText = document.createElement('div');
    importButtonText.className = 'mega-list-item-text';
    importButtonItem.append(importButtonText);
    const importBtnText = document.createElement('span');
    importBtnText.className = 'mega-item-list-title-small import-passwords-label';
    importBtnText.textContent = l.import_passwords_label;
    importButtonText.appendChild(importBtnText);
    importButtonItem.append(importButtonText);
    const importButtonLine = document.createElement('div');
    importButtonLine.className = 'mega-list-item-second';
    importButtonItem.append(importButtonLine);
    const errorMessage = document.createElement('span');
    errorMessage.className = 'mega-item-list-title-small import-error-message hidden';
    errorMessage.textContent = l.import_fail_message;
    errorMessage.prepend(parseHTML('<i class="sprite-pm-ext-mono icon-alert-triangle-thin-outline"></i>'));
    const importBtn = new MegaButton({
        parentNode: importButtonLine,
        text: l.import_passwords_btn,
        disabled: true,
        componentClassname: 'import-file',
        onClick: () => {
            if (file && validateUserStatus()) {
                const reader = new FileReader();

                reader.onloadstart = function() {
                    mega.ui.fploader.show();
                    importInFlight = true;
                    chooseFileBtn.disabled = true;
                    errorMessage.classList.add('hidden');
                };

                reader.onload = function(e) {
                    const text = e.target.result;
                    const data = parseCSV(text, window.importSelected);
                    if (data.length > 0) {
                        saveData(data, window.importSelected).then(() => {
                            showToast('long-notification', l.import_success_toast);
                            importBtnText.textContent = l.import_passwords_label;
                            fileInput.value = '';
                            file = null;
                            let importEventId;
                            switch (importSelected) {
                                case 'keepass':
                                    importEventId = 590025;
                                    break;
                                case 'lastpass':
                                    importEventId = 590026;
                                    break;
                                case 'dashlane':
                                    importEventId = 590048;
                                    break;
                                case '1password':
                                    importEventId = 590049;
                                    break;
                                case 'bitwarden':
                                    importEventId = 590050;
                                    break;
                                case 'nordpass':
                                    importEventId = 590051;
                                    break;
                                case 'proton':
                                    importEventId = 590052;
                                    break;
                                case 'other':
                                    importEventId = 590053;
                                    break;
                                default:
                                    importEventId = 590024;
                            }
                            eventlog(importEventId);
                        }).catch(tell).finally(() => {
                            chooseFileBtn.disabled = false;
                            importInFlight = false;
                            mega.ui.fploader.hide();
                        });
                    }
                    else {
                        errorMessage.classList.remove('hidden');
                        chooseFileBtn.disabled = false;
                        importInFlight = false;
                        mega.ui.fploader.hide();
                    }
                };
                reader.readAsText(file);
            }
        }
    });
    importBlock.listNode.append(importButtonItem);
    importButtonLine.append(errorMessage);

    fileInput.addEventListener('change', (e) => {
        file = e.target.files[0];
        if (file) {
            importBtnText.textContent = l.import_passwords_label_selected.replace('%1', file.name);
            importBtn.disabled = false;
            errorMessage.classList.add('hidden');
        }
    });

    window.settingsUI.exportList = new MegaPassList({
        parentNode: settingsContainer,
        title: l.pwm_settings_export_title,
        items: {
            'export-csv': {
                title: l.pwm_settings_export_pass_title,
                subtitle: l.pwm_settings_export_pass_desc,
                componentClassname: 'wrap',
                textInteractable: {
                    text: l.pwm_settings_export_btn,
                    iconSize: 24,
                    iconSizeSmall: 16,
                    loaderColor: 'r',
                    title: l.pwm_settings_export_btn,
                    async onClick() {

                        mega.ui.fploader.show();

                        const vault = await mega.ui.pm.send({type: 'export'});
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, '0');
                        const date = String(now.getDate()).padStart(2, '0');
                        const hours = String(now.getHours()).padStart(2, '0');
                        const minutes = String(now.getMinutes()).padStart(2, '0');
                        const seconds = String(now.getSeconds()).padStart(2, '0');

                        const name = `MegaPass_${year}_${month}_${date} ${hours}_${minutes}_${seconds}.csv`;

                        // Add BOM for Excel to recognize UTF-8
                        let csvContent = '\ufeff';

                        // code to export blob from vault array to CSV
                        csvContent += 'name,url,username,password,note\n';
                        csvContent += vault.map(item =>
                            item.map(field => {
                                if (/[\n",]|[\u0080-\uFFFF]/.test(field)) {
                                    return `"${field.replace(/"/g, '""')}"`;
                                }
                                return field;
                            }).join(',')
                        ).join('\n');

                        const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8'});

                        chrome.downloads.download({
                            url: URL.createObjectURL(blob),
                            filename: name
                        }, downloadId => {
                            dlID = downloadId;
                        });

                        mBroadcaster.once('download_complete', () => {
                            mega.ui.fploader.hide();
                            mega.ui.toast.show(l.pwm_settings_export_toast);
                            URL.revokeObjectURL(blob);
                            eventlog(590054);
                        });
                    }
                }
            }
        }
    });

    mega.ui.inlineAlert.create({
        parentNode: window.settingsUI.exportList.listNode,
        componentClassname: 'info',
        text: l.pwm_settings_export_banner,
        icon: 'sprite-pm-ext-mono icon-alert-circle-thin-outline',
        closeButton: false
    });

    const clipboard = chrome.offscreen || chrome.runtime.getBrowserInfo ? {
        title: l.clear_clipboard_title,
        subtitle: l.clear_clipboard_subtitle,
        dropdown: {
            text: clearClipBoardTimes[settings.clipboard || '30'],
            dropdownOptions: {},
            dropdownItems: clearClipBoardTimes,
            selected: settings.clipboard === null ? '30' : settings.clipboard,
            id: 'clipboard-time',
            name: 'clipboard-time',
            rightIcon: 'icon sprite-pm-ext-mono icon-chevron-down-thin-outline',
            onSelected: selectDropdown
        }
    } : {
        title: l.clear_clipboard_title,
        subtitle: parseHTML(l.clear_clipboard_google_update_subtitle),
        tag: {
            text: l.clear_clipboard_google_update_tag
        }
    };

    window.settingsUI.securityList = new MegaPassList({
        parentNode: settingsContainer,
        title: l[7337],
        items: {
            'clipboard-delete': clipboard,
            'recovery-key': {
                title: l.recovery_key_title,
                subtitle: parseHTML(l.recovery_key_subtitle),
                iconButton: {
                    icon: 'sprite-pm-ext-mono icon-download-thin-outline',
                    text: l.recovery_key_button_label,
                    iconSize: 24,
                    iconSizeSmall: 16,
                    title: l.recovery_key_button_label,
                    onClick: async() => {
                        const recoveryKey = await mega.ui.pm.send({type: 'get-recovery-key'});
                        const name = getSafeName(`${l[20830]}.txt`);
                        const blob = new File(
                            [new TextEncoder().encode(`${recoveryKey}`).buffer],
                            name, {type: 'text/plain'}
                        );

                        chrome.downloads.download({
                            url: URL.createObjectURL(blob),
                            filename: name
                        }, downloadId => {
                            dlID = downloadId;
                        });

                        mBroadcaster.once('download_complete', () => {
                            mega.ui.toast.show(l.recovery_key_download_toast); // Downloaded copy
                            URL.revokeObjectURL(blob);
                            eventlog(590039);
                        });
                    }
                }
            }
        }
    });

    window.settingsUI.contactList = new MegaPassList({
        parentNode: settingsContainer,
        title: l.footer_heading_help,
        items: {
            'help-centre': {
                title: l.mobile_settings_help_title,
                subtitle: l.settings_help_centre_desc,
                iconButton: {
                    icon: 'sprite-pm-ext-mono icon-external-link-thin-outline',
                    text: l.mobile_settings_help_title,
                    href: 'https://help.mega.io/',
                    target: '_blank',
                    iconSize: 24,
                    iconSizeSmall: 16,
                    title: l.mobile_settings_help_title,
                    evId: 590040
                }
            },
            'contact-us': {
                title: l[399],
                subtitle: l.settings_contact_us_desc,
                iconButton: {
                    icon: 'sprite-pm-ext-mono icon-external-link-thin-outline',
                    text: l[399],
                    href: 'https://mega.io/contact',
                    target: '_blank',
                    iconSize: 24,
                    iconSizeSmall: 16,
                    title: l[399],
                    evId: 590041
                }
            }
        }
    });

    window.settingsUI.deleteAll = new MegaPassList({
        parentNode: settingsContainer,
        title: l.delete_passwords,
        items: {
            'delete-all': {
                title: l.delete_all,
                subtitle: l.delete_all_msg,
                componentClassname: 'wrap',
                textInteractable: {
                    className: 'delete-all destructive',
                    text: l.delete_all_btn,
                    loaderColor: 'w',
                    onClick: ({currentTarget}) => {
                        if (!navigator.onLine) {
                            showConnectionErrorDialog();
                            return;
                        }

                        if (!validateUserStatus()) {
                            return;
                        }

                        eventlog(590046);

                        mega.ui.dialog.show({
                            name: 'delete-all-confirm',
                            title: l.delete_all_dialog_title,
                            icon: 'sprite-pm-ext-mono icon-x-circle-thin-outline error',
                            contents: [l.delete_all_dialog_msg],
                            showClose: true,
                            actions: [
                                {
                                    type: 'normal',
                                    text: l[82],
                                    componentClassname: 'secondary',
                                    onClick: () => mega.ui.dialog.hide()
                                },
                                {
                                    type: 'normal',
                                    text: l.delete_item,
                                    componentClassname: 'destructive',
                                    onClick: async() => {
                                        if (!navigator.onLine) {
                                            showConnectionErrorDialog();
                                            return;
                                        }

                                        eventlog(590047);
                                        mega.ui.fploader.show();
                                        mega.ui.dialog.hide();

                                        const res = await mega.ui.pm.send({type: 'delete-all'});

                                        if (typeof res === 'object') {
                                            mega.ui.toast.show(l.succesfull_deletion_toast);
                                        }
                                        else {
                                            // show dialog on api request errors
                                            msgDialog('warninga', l.unsuccessful_action, `${l.request_failed}`,
                                                      `${l.error_code}: ${res}`, () => mega.ui.dialog.hide());
                                        }
                                        mega.ui.fploader.hide();
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        }
    });

    onIdle(() => {
        const wrap = document.querySelector('.settings-wrap');
        if (wrap.Ps) {
            wrap.Ps.update();
        }
        else {
            wrap.Ps = new PerfectScrollbar(wrap);
        }
    });
}

function changeToggle() {
    "use strict";
    window.settings[this.input.name] = this.input.checked;
    chrome.storage.local.set({settings});
}

function selectDropdown(e) {
    "use strict";

    const {currentTarget} = e;

    window.settings.clipboard = currentTarget.selected;

    chrome.storage.local.set({settings});
    currentTarget.text = clearClipBoardTimes[currentTarget.selected];
    chrome.runtime.sendMessage({type: 'clipboard-time', value: currentTarget.selected});
    if (currentTarget.selected === '15') {
        eventlog(590034);
    }
    else if (currentTarget.selected === '30') {
        eventlog(590035);
    }
    else if (currentTarget.selected === '60') {
        eventlog(590036);
    }
    else if (currentTarget.selected === '180') {
        eventlog(590037);
    }
    else if (currentTarget.selected === '10000') {
        eventlog(590038);
    }
}

function selectProvider(e) {
    "use strict";

    const importBtn = document.querySelector('.import-file');
    const chooseFileBtn = document.querySelector('.choose-file');
    const importBtnText = document.querySelector('.import-passwords-label');
    const errorMessage = document.querySelector('.import-error-message');
    const fileInput = document.querySelector('#file-select');
    window.importSelected = e.currentTarget.selected;
    e.currentTarget.text = importProvider[e.currentTarget.selected];
    file = null;
    importBtn.disabled = true;
    chooseFileBtn.disabled = false;
    importBtn.loading = false;
    importBtnText.textContent = l.import_passwords_label;
    errorMessage.classList.add('hidden');
    fileInput.value = '';
}

function getFile() {
    "use strict";

    if (validateUserStatus()) {
        const fileInput = document.getElementById('file-select');
        fileInput.click();
    }
}

/**
 * Parses a CSV text input into an array of objects based on the specified type.
 *
 * @param {string} text - The CSV text to be parsed.
 * @param {string} type - The type of CSV being parsed. Can be 'lastpass', 'keepass', or 'google'.
 * @returns {Array<Object>} An array of objects representing each row in the CSV.
 */
function parseCSV(text, type) {
    "use strict";

    const result = [];
    const headers = getHeaders(type);

    let inQuotes = false;
    let currentItem = '';
    let currentLine = {};
    let col = 0;
    let lineNum = 1;

    const _validateLine = line => {

        // check first line is same as known header structure
        if (lineNum === 1) {
            return Object.values(line).join(',') === headers.join(',');
        }

        // check header and line has same column length
        if (Object.keys(line).length !== headers.length) {
            return false;
        }

        if (type === 'nordpass' || type === 'proton') {
            const allowedType = type === 'nordpass' ? 'password' : 'login';

            if (line.type.trim() !== allowedType) {
                return false;
            }
        }

        return true;
    };

    // check every character in the text to determine row parsing
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // This is an escaped double quote, just add it to the current line
                currentItem += char;
                i++; // skip the next double quote
            }
            else {
                // this is real double quote
                inQuotes = !inQuotes;
            }
        }
        else if (!inQuotes && (char === ',' || char === '\n' || char === '\r' && nextChar === '\n')) {

            // end of column or this is new line let's add to the result array
            currentLine[headers[col]] = currentItem.trim();
            currentItem = '';
            col++;

            // if this is new line, increment the line number
            if (char !== ',') {

                if (!_validateLine(currentLine)) {
                    tell(`invalid_csv_file: ln: ${lineNum}`);
                    return false;
                }
                else if (lineNum !== 1) {
                    result.push(currentLine);
                }

                lineNum++;
                currentLine = {};
                col = 0;

                // if this is windows newline, skip the next character('\n')
                if (char === '\r') {
                    i++;
                }
            }
        }
        else {
            currentItem += char;
        }
    }

    // add the last item after the loop if it does not finished with new line
    if (col !== 0) {
        currentLine[headers[col]] = currentItem.trim();

        if (!_validateLine(currentLine)) {
            tell(`invalid_csv_file: ln: ${lineNum}`);
            return false;
        }
        else if (lineNum !== 1) {
            result.push(currentLine);
        }
    }

    return result;
}

async function saveData(data, type) {
    "use strict";

    data = data.map(entry => getPasswordData(entry, type));

    return window.mega.ui.pm.send({type: 'import', data});
}

function getHeaders(type) {
    "use strict";

    if (type === 'keepass') {
        return ["Group", "Title", "Username", "Password", "URL", "Notes", "TOTP", "Icon", "Last Modified", "Created"];
    }
    else if (type === 'google' || type === 'other') {
        return ['name', 'url', 'username', 'password', 'note'];
    }
    else if (type === 'lastpass') {
        return ['url', 'username', 'password', 'totp', 'extra', 'name', 'grouping', 'fav'];
    }
    else if (type === 'nordpass') {
        return [
            'name', 'url', 'additional_urls', 'username', 'password', 'note', 'cardholdername', 'cardnumber', 'cvc',
            'pin', 'expirydate', 'zipcode', 'folder', 'full_name', 'phone_number', 'email', 'address1', 'address2',
            'city', 'country', 'state', 'type', 'custom_fields'
        ];
    }
    else if (type === 'bitwarden') {
        return [
            'folder', 'favorite', 'type', 'name', 'notes', 'fields', 'reprompt', 'login_uri', 'login_username',
            'login_password', 'login_totp'
        ];
    }
    else if (type === '1password') {
        return ['Title', 'Url', 'Username', 'Password', 'OTPAuth', 'Favorite', 'Archived', 'Tags', 'Notes'];
    }
    else if (type === 'dashlane') {
        return ['username', 'username2', 'username3', 'title', 'password', 'note', 'url', 'category', 'otpUrl'];
    }
    else if (type === 'proton') {
        return [
            'type', 'name', 'url', 'email', 'username', 'password', 'note', 'totp', 'createTime', 'modifyTime', 'vault'
        ];
    }
}

/**
 *
 * @param {Object} entry Entry of the imported password line
 * @param {string} type Import provider
 * @returns {{pwm: {u: string, pwd: string, n: string, url: string}, name: string}} Mapped import line in password item
 */
function getPasswordData(entry, type) {
    "use strict";

    if (type === 'keepass') {
        return {name: entry.Title, pwm: {pwd: entry.Password, u: entry.Username, n: entry.Notes, url: entry.URL}};
    }
    else if (type === 'google' || type === 'other' || type === 'nordpass' || type === 'proton') {
        return {name: entry.name, pwm: {pwd: entry.password, u: entry.username, n: entry.note, url: entry.url}};
    }
    else if (type === 'lastpass') {
        return {name: entry.name, pwm: {pwd: entry.password, u: entry.username, n: entry.extra, url: entry.url}};
    }
    else if (type === 'bitwarden') {
        return {
            name: entry.name, pwm: {
                pwd: entry.login_password, u: entry.login_username, n: entry.notes,
                url: entry.login_uri
            }
        };
    }
    else if (type === '1password') {
        return {name: entry.Title, pwm: {pwd: entry.Password, u: entry.Username, n: entry.Notes, url: entry.Url}};
    }
    else if (type === 'dashlane') {
        return {name: entry.title, pwm: {pwd: entry.password, u: entry.username, n: entry.note, url: entry.url}};
    }
}

chrome.downloads.onChanged.addListener(delta => {
    'use strict';

    if (delta.state && delta.state.current === "complete"
        && delta.id === dlID) {
        mBroadcaster.sendMessage('download_complete');
        dlID = false;
    }
});

function showConnectionErrorDialog() {
    'use strict';

    mega.ui.dialog.show({
        name: 'connection-issue-delete-button',
        title: l.unable_to_delete,
        icon: 'sprite-pm-ext-mono icon-alert-triangle-thin-outline warning',
        contents: [l.check_connection],
        showClose: true,
        actions: [
            {
                type: 'normal',
                text: l.ok_button,
                onClick: () => mega.ui.dialog.hide()
            }
        ]
    });
}
