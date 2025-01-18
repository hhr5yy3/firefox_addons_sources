((global) => {

    'use strict';

    chrome.runtime.connect({name: 'popup-opened'});

    global.M = {getNodeByHandle: handle => chrome.runtime.sendMessage({type: 'get-node-by-handle', handle: handle})};

    chrome.runtime.onMessage.addListener((message, sender) => {
        // Reject all messages not coming from the extension
        if (sender.id !== chrome.runtime.id) {
            return false;
        }

        if (message.type === 'u_attr') {
            global.u_attr = message.u_attr;

            if (typeof global.u_attr !== 'undefined') {
                if (mega.ui.header) {
                    if (!mega.ui.header.avatarLoaded) {
                        mega.ui.header.getAvatar();
                    }

                    if (mega.ui.header.avatarBtn.active) {
                        mega.ui.header.updateUserName(u_attr.name);
                    }
                }
                mega.ui.setTheme();
            }
        }
        else if (message.type === 'u_checked') {
            global.u_checked = message.u_checked;
        }
        else if (message.type === 'tell') {
            tell(message.error);
        }
        else if (message.type === 'u_attr:webtheme') {
            mega.ui.setTheme(null, message.payload);
        }
        else if (message.type === 'whyamiblocked') {
            const reasonCode = message.result;
            let onClick = () => redirectToMega('https://mega.io/contact');

            let type = 'warninga';
            var reasonText = '';
            var dialogTitle = l.unable_login; // Unable to log in
            let logout = true;

            if (reasonCode === 200) {
                reasonText = l.blocked_rsn_copyright;
            }
            else if (reasonCode === 300) {
                reasonText = l.blocked_rsn_terminated;
            }
            else if (reasonCode === 400 || reasonCode === 401) {
                // 400: Your account is disabled by administrator
                // 401: Your account is deleted by administrator
                // We are using same message for both 400 & 401, because deleting sub accounts is an API feature
                // that the Webclient/PM has not implemented yet
                reasonText = l.blocked_rsn_business_disabled;
            }
            else if (reasonCode === 700 || reasonCode === 500) {
                // 500: SMS verification doesn't exist anymore so we use email verification instead
                dialogTitle = l.check_email;
                type = `warninga:!^${l.ok_button}!${l[22252]}`;
                reasonText = l.blocked_rsn_data_breach;
                logout = false;

                chrome.storage.local.set({is_account_suspended: true});

                onClick = async(val) => {
                    if (val) {
                        const res = await chrome.runtime.sendMessage({
                            type: 'account-suspension-email-verification'
                        });

                        if (res.result === 0) {
                            mega.ui.toast.show(l[16827]);
                        }
                        else {
                            const contactPage = () => redirectToMega('https://mega.io/contact');

                            if (res === ETEMPUNAVAIL) {
                                msgDialog('warninga', l.resend_email_error, l.resend_email_ten_min_error_info, '',
                                    contactPage);
                            }
                            else {
                                tell(res);
                            }
                        }
                    }

                    mega.ui.pm.comm.logout(true);
                };
            }
            else {
                // Unknown reasonCode
                // Your account was terminated due to breach of Mega's Terms of Service...
                reasonText = l.blocked_rsn_terminated;
            }

            // Log the user out for all scenarios except email verification required (500 & 700)
            mega.ui.pm.comm.logout(logout);

            mega.ui.overlay.hide('Login 2FA Overlay');
            msgDialog(type, dialogTitle, reasonText, false, onClick);
        }
        else if (message.type === 'reloadAvatar') {
            mega.ui.header.loadAvatar(message.avatarMeta);
        }
        else if (message.type === 'logoutFromSW') {
            mega.ui.pm.comm.logout();
        }
        else if (message.type === 'updateName') {
            mega.ui.header.updateUserName(message.name);
        }
        else if (message.type === 'updateEmail') {
            mega.ui.header.updateEmail(message.email);
        }
        else if (message.type === 'show-free-trial') {
            mega.ui.pm.subscription.freeTrial();
        }
        else if (message.type === 'show-feature-plan') {
            mega.ui.pm.subscription.featurePlan();
        }
    });

    // This bit need to be update for web-integration.
    mega.ui.pm = {
        send: message => chrome.runtime.sendMessage({type: 'alive'}).then(() => chrome.runtime.sendMessage(message)),

        comm: {
            getPwmh: () => chrome.storage.local.get('pwmh'),

            createItem: (...args) => chrome.runtime.sendMessage({type: 'create-item', ...args}),

            updateItem: (...args) => chrome.runtime.sendMessage({type: 'update-item', ...args}),

            deleteItem: handle => mega.ui.pm.send({type: 'delete-item', handle}),

            saveLastSelected: handle => chrome.storage.local.set({lastSelectedItem: handle}),

            getLastSelected: () => chrome.storage.local.get('lastSelectedItem'),

            getSortData: () => chrome.storage.local.get('sortdata'),

            setSortData: sortdata => chrome.storage.local.set({sortdata}),

            loadVault: () => chrome.runtime.sendMessage({type: 'load-vault'}),

            logout: informSW => {
                if (informSW) {
                    chrome.runtime.sendMessage({type: 'logout'});
                }

                global.u_attr = undefined;
                global.u_checked = false;
                pushHistoryState('login');
                mega.ui.header.removeClass('logged-in');
                mega.ui.header.avatarLoaded = false;
            }
        }
    };
})(self);
