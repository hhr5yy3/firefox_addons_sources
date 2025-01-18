var PopupModel = (function createPopupModel() {
    D.func();

    const FIRST_4_SYMBOLS_FAST_UNLOCK = 1;
    const GET_DOCUMENT_TIMEOUT = 500; // 0.5 sec
    const AUTOFILL_CURRENT_ACCOUNT_TIMEOUT = 30 * 1000; // 30 sec

    var PROTOCOL_VERSION = 13; // FIXME: version

    var _tab = {};
    var _getUrlResponse = null;
    var _currentAccount = null;
    var _port = null;
    var _mDocument = document.createElement("div");
    var _foundForms = null;
    var _getDocumentTimer = null;
    var _state = null;
    var _searchFor = { loginForm: true, registrationForm: true, changePasswordForm: true };

    const InitalState = {
        name: "InitalState",

        onSelectAccount(account) {
            D.func(account);
            // autofill
            tryAutofillAccount(account);
        }
    }

    const ChangePasswordState = {
        __proto__: InitalState,
        name: "ChangePasswordState",

        onTokenAcquired() {
            D.func();
            // change password
            getAccounts(onChangePasswordGetAccounts);
        },

        onSelectAccount(account) {
            D.func(account);
            // set change password layout
            Popup.pushLayout("ChangePasswordLayout", { account: account });
        }
    }

    const SearchState = {
        __proto__: InitalState,
        name: "SearchState",

        onSelectAccount(account) {
            D.func(account);
            // set autofill state
            setState(AutofillAccountState);
            _state.onSelectAccount(account);
        },

        onTokenAcquired() {
            D.func();
            // get all accounts
            getAllAccounts();
        }
    }

    const SelectActionState = {
        __proto__: InitalState,
        name: "SelectActionState",

        onTokenAcquired() {
            D.func();
            // let user select autofill action
            Popup.pushLayout("SelectActionLayout");
        }
    }

    const SelectFormState = {
        __proto__: InitalState,
        name: "SelectFormState",

        onTokenAcquired() {
            D.func();
            // let user select form to autofill
            Popup.pushLayout("SelectFormLayout");
        },

        onSelectAction() {
            D.func();
            // let user select form to autofill
            Popup.pushLayout("SelectFormLayout");
        }
    }

    const AutofillCardState = {
        __proto__: InitalState,
        name: "AutofillCardState",

        onTokenAcquired() {
            D.func();
            // get cards
            getCards();
        },

        onSelectAction() {
            D.func();
            // get cards
            getCards();
        }
    }

    const AutofillAccountState = {
        __proto__: InitalState,
        name: "AutofillAccountState",

        onTokenAcquired() {
            D.func();
            // get accounts
            getAccounts(onGetAccounts);
        },

        onSelectAction() {
            D.func();
            // get accounts
            getAccounts(onGetAccounts);
        }
    }

    const CannotAutofillState = {
        __proto__: InitalState,
        name: "CannotAutofillState",

        onTokenAcquired() {
            D.func();
            getAccounts(onGetAccounts);
        }
    }

    function setState(state) {
        D.func(state.name);
        // set new state
        _state = state;
    }

    function start() {
        D.func();
        // set initial state
        setState(InitalState);
        Popup.pushLayout("IdleLayout");
        // get url
        getUrl();
    }

    const KNOK_KNOK_URL_1 = "knok-knok.url.1";
    const KNOK_KNOK_URL_2 = "knok-knok.url.2";

    function getToken() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "getToken"
        }, function onGetToken(response) {
            D.func();
            if (response.token) {
                knokKnok(KNOK_KNOK_URL_1);
            } else {
                shakeHands();
            }
        });
    }

    function knokKnok(url) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "getAccounts",
            args: [url]
        }, function(response) {
            onKnokKnok(response);
        });
    }

    function onKnokKnok(response) {
        D.func();
        if (response.success) {
            // knok knok twice to avoid ask-always traps
            if (response.url == KNOK_KNOK_URL_1) {
                knokKnok(KNOK_KNOK_URL_2);
            } else {
                onTokenAcquired();
            }
        } else {
            acquireToken();
        }
    }

    function handleError(response, reportProblem) {
        D.func();
        if (isStartAppSupported() && response.shouldStartApp) {
            Popup.pushLayout("StartAppLayout");
        } else {
            Popup.pushLayout("ErrorLayout", { error: response.error, reportProblem: reportProblem });
        }
    }

    function shakeHands() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "shakeHands"
        }, function onShakeHands(response) {
            D.func();
            // error ?
            if (response.error) {
                handleError(response, false);
            } else {
                acquireToken();
            }
        });
    }

    function acquireToken() {
        D.func();
        // try to authorize in app
        canAuthorize();
    }

    function canAuthorize() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "canAuthorize"
        }, function onCanAuthorize(response) {
            D.func();
            // can ?
            if (response.success) {
                startAuthorization();
            } else {
                canFastUnlock();
            }
        });
    }

    function startAuthorization() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "startAuthorization"
        }, function onStartAuthorization(response) {
            D.func();
            // started ?
            if (response.success) {
                Popup.pushLayout("AuthorizationLayout");
                getAuthorizationResult();
            } else {
                // fallback: authenticate old way for older versions
                canFastUnlock();
            }
        });
    }

    function getAuthorizationResult() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "getAuthorizationResult"
        }, function onGetAuthorizationResult(response) {
            D.func();
            // error ?
            if (response.error) {
                handleError(response, false);
            } else {
                // got result ?
                if (response.success) {
                    // authorized ?
                    if (response.token) {
                        // yes
                        onTokenAcquired();
                    } else {
                        // no
                        onAccessDenied();
                    }
                } else {
                    // not yet, check later
                    window.setTimeout(function onCheckForAuthorizationTimeout() {
                        D.func();
                        getAuthorizationResult();
                    }, 500);
                }
            }
        });
    }

    function onAccessDenied() {
        D.func();
        Popup.pushLayout("ErrorLayout", { error: Strings.get("access_denied_error"), reportProblem: false });
    }

    function canFastUnlock() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "canFastUnlock"
        }, function onCanFastUnlock(response) {
            D.func();
            // error ?
            if (response.error) {
                if (response.shouldStartApp && isStartAppSupported()) {
                    Popup.pushLayout("StartAppLayout");
                } else {
                    Popup.pushLayout("PasswordLayout"); // ignore error (old app version)
                }
            } else {
                // can ?
                if (response.success) {
                    if (!response.mode) {
                        response.mode = FIRST_4_SYMBOLS_FAST_UNLOCK; // for older app versions
                    }
                    Popup.pushLayout("FastUnlockLayout", { mode: response.mode });
                } else {
                    Popup.pushLayout("PasswordLayout");
                }
            }
        });
    }

    function fastUnlock(symbols) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "fastUnlock",
            args: [symbols]
        }, function onFastUnlock(response) {
            D.func();
            if (!response.error && !response.success) {
                // wrong attempt
                Popup.pushLayout("PasswordLayout");
            } else {
                onAuthenticate(response);
            }
        });
    }

    function authenticate(password) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "authenticate",
            args: [password]
        }, onAuthenticate);
    }

    function onAuthenticate(response) {
        D.func();
        if (response.error) {
            handleError(response, false);
        } else if (response.success) {
            onTokenAcquired();
        } else {
            Popup.onWrongPassword();
        }
    }

    function onTokenAcquired() {
        D.func();
        // remove authentication layout from stack 
        Popup.popAuthorizationLayout();
        _state.onTokenAcquired();
    }

    function getUrl() {
        D.func();
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function onQueryActiveTab(tabs) {
            D.func();
            if (tabs && tabs.length != 0) {
                _tab.id = tabs[0].id;
                _tab.href = tabs[0].url;
                // get url
                chrome.tabs.sendMessage(_tab.id, {
                    target: "geturl.js"
                }, function onGetUrl(response) {
                    D.func();
                    _getUrlResponse = response;
                    if (!_getUrlResponse) {
                        // cannot access page
                        Popup.pushLayout("ErrorLayout", { error: Strings.get("reload_page_error"), reportProblem: false });
                    } else {
                        // get account
                        getCurrentAccount(onGetCurrentAccount);
                    }
                });
            } else {
                close();
            }
        });
    }
    
    function onGetCurrentAccount(account) {
        D.func();
        _currentAccount = account;
        // get document
        getDocument();
    }

    function getDocument() {
        D.func();
        _foundForms = null;
        // create port
        _port = chrome.tabs.connect(_tab.id, { name: "GetDocument" });
        _port.onMessage.addListener(function onPortMessage(response) {
            D.func(response.url);
            if (response) {
                onGetDocumentMessage(response)
            }
        });
        // get document
        _port.postMessage({ method: "getDocument" });
        // and start timer
        startGetDocumentTimer();
    }

    function onGetDocumentMessage(response) {
        D.func();
        const container = document.createElement("div");
        container.innerHTML = response.mDocument;
        _mDocument.appendChild(container.firstChild);
    }

    function startGetDocumentTimer() {
        D.func();
        if (_getDocumentTimer) {
            clearTimeout(_getDocumentTimer);
        }
        _getDocumentTimer = setTimeout(onGetDocumentTimeout, GET_DOCUMENT_TIMEOUT);
    }

    function onGetDocumentTimeout() {
        D.func();
        // no content scripts ?
        if (!hasMDocument() || !_getUrlResponse) {
            Popup.pushLayout("ErrorLayout", { error: Strings.get("reload_page_error"), reportProblem: false });
        } else {
            onGetDocument();
        }
        shutGetDocument();
    }

    function shutGetDocument() {
        D.func();
        if (_getDocumentTimer) {
            clearTimeout(_getDocumentTimer);
            _getDocumentTimer = null;
        }
        if (_port) {
            _port.disconnect();
            _port = null;
        }
    }

    function hasAccountForm(foundForms) {
        return foundForms.loginForm || foundForms.registrationForm;
    }

    function hasChangePasswordForm(foundForms) {
        return isChangePasswordSupported() && foundForms.changePasswordForm;
    }

    function canAutofillAccount() {
        return _foundForms && (hasAccountForm(_foundForms) || hasChangePasswordForm(_foundForms));
    }

    function hasMDocument() {
        return _mDocument.querySelector("div");
    }

    function shouldAutofillCurrentAccount() {
        D.func();
        if (_currentAccount) {
            const millis = Date.now() - _currentAccount.time;
            if (millis < AUTOFILL_CURRENT_ACCOUNT_TIMEOUT) {
                const foundInputs = MetaFinder.findInputs(_getUrlResponse.href, _mDocument, { loginForm: true });
                // form without login input ?
                if (foundInputs && !foundInputs.hasLoginInput) {
                    // with password input ?
                    if (foundInputs.hasPasswordInput) {
                        // with matching login label ?
                        if (foundInputs.login == _currentAccount.login) {                            
                            return true;
                        } else {
                            return false;
                        }
                    }
                    // with passcode input ?
                    if (foundInputs.hasPascodeInput) {
                        // account has otp ?
                        if (_currentAccount.oneTimePassword) {
                            return true;
                        } else {
                            return false;

                        }
                    }
                }
                return false;
            }
        }
        return false;
    }

    function onGetDocument() {
        D.func();
        _foundForms = MetaFinder.findForms(_getUrlResponse.href, _mDocument);
        // // FIXME: print forms
        // const foundInputs = MetaFinder.findInputs(_getUrlResponse.href, _mDocument, _searchFor);
        // const autofillIds = MetaFinder.getAutofillIds(_getUrlResponse.href, _mDocument, _searchFor);
        // D.print("==========================================");
        // D.print(_mDocument);
        // D.print(_foundForms);
        // D.print(foundInputs);
        // D.print(autofillIds);
        // D.print("==========================================");
        // card ?
        if (_foundForms.cardForm) {
            // and account ?
            if (hasAccountForm(_foundForms)) {
                // select action
                setState(SelectActionState);
            } else {
                // autofill card
                setState(AutofillCardState);
            }
        } 
        // change password ?
        else if (hasChangePasswordForm(_foundForms)) {
            // change password
            setState(ChangePasswordState);
        } 
        // registration ?
        else if (_foundForms.registrationForm) {
            // and login ?
            if (_foundForms.loginForm) {
                // select form
                setState(SelectFormState);
            } else {
                // autofill registration
                setState(AutofillAccountState);
            }
        }  // login ?
        else if (_foundForms.loginForm) {
            // eco autofill ?
            if (shouldAutofillCurrentAccount()) {
                // autofill current account
                tryAutofillAccount(_currentAccount);
                return; // no need for auth
            } else {
                // autofill login
                setState(AutofillAccountState);
            }
        } else {
            // cannot autofill
            setState(CannotAutofillState);
        }
        // get token
        getToken();
    }

    function isChangePasswordSupported() {
        // changePassword function supported ?
        return Settings.getVersion() >= 10;
    }

    function onChangePasswordGetAccounts(response) {
        D.func();
        if (response.error) {
            // error
            handleError(response, false);
        } else {
            if (response.success) {
                // not found ?
                if (!response.accounts || response.accounts.length == 0) {
                    onNotFoundAccounts();
                } else {
                    // single match ?
                    if (response.accounts.length == 1) {
                        // change password
                        Popup.pushLayout("ChangePasswordLayout", { account: response.accounts[0] });
                    } else {
                        // select account where change password
                        Popup.pushLayout("SelectAccountLayout", { accounts: response.accounts, isSearchAccountSupported: false });
                    }
                }
            } else {
                // get token again
                acquireToken();
            }
        }
    }

    function onNotFoundAccounts() {
        D.func();
        if (isSearchAccountSupported()) {
            // add or find account
            Popup.pushLayout("NotFoundLayout");
        } else {
            // add account
            Popup.pushLayout("AddAccountLayout");
        }
    }

    function onSelectAction(action) {
        D.func(action);
        // set state according to action
        if (action === "autofill_card") {
            setState(AutofillCardState);
        } else if (action === "autofill_account") {
            if (_foundForms.loginForm && _foundForms.registrationForm) {
                setState(SelectFormState);
            } else {
                setState(AutofillAccountState);
            }
        }
        _state.onSelectAction();
    }

    function onSelectForm(form) {
        D.func(form);
        setState(AutofillAccountState);
        if (form === "registration_form") {
            // ignore login & change password forms
            _searchFor = { registrationForm: true };
        } else if (form === "login_form") {
            // ignore registration & change password forms
            _searchFor = { loginForm: true };
        }
        _state.onSelectAction();
    }

    function getCards() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "getCards",
            args: []
        }, function onGetCards(response) {
            D.func();
            if (response.error) {
                // error
                handleError(response, false);
            } else {
                if (response.success) {
                    // not found ?
                    if (!response.cards || response.cards.length == 0) {
                        // error
                        Popup.pushLayout("ErrorLayout", { error: Strings.get("cards_not_found_error"), reportProblem: true });
                    } else {
                        Popup.pushLayout("SelectCardLayout", { cards: response.cards });
                    }
                } else {
                    // get token again
                    acquireToken();
                }
            }
        });
    }

    function isSearchAccountSupported() {
        // getAllAccounts & assignAccount functions supported ?
        return Settings.getVersion() >= 9;
    }

    function getAccounts(callback) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "getAccounts",
            args: [_getUrlResponse.url]
        }, function(response) {
            callback(response);
        });
    }

    function isStartAppSupported() {
        return Settings.getVersion() >= 11;
    }

    function onGetAccounts(response) {
        D.func();
        if (response.error) {
            // error
            handleError(response, false);
        } else {
            if (response.success) {
                // not found ?
                if (!response.accounts || response.accounts.length == 0) {
                    onNotFoundAccounts();
                } else {
                    // single match ?
                    if (response.accounts.length == 1) {
                        // can autofill ?
                        if (canAutofillAccount()) {
                            // has login or login input ?
                            const foundInputs = MetaFinder.findInputs(_getUrlResponse.href, _mDocument, _searchFor);
                            if (foundInputs.login || foundInputs.hasLoginInput || !response.accounts[0].login) {
                                // autofill now
                                autofillAccount(response.accounts[0]);
                            } else {
                                // show found account
                                Popup.pushLayout("SelectAccountLayout", { accounts: response.accounts, isSearchAccountSupported: isSearchAccountSupported() });
                            }
                        } else {
                            // show account
                            showAccount(response.accounts[0]);
                        }
                    } else {
                        // select account
                        Popup.pushLayout("SelectAccountLayout", { accounts: response.accounts, isSearchAccountSupported: isSearchAccountSupported() });
                    }
                }
            } else {
                // get token again
                acquireToken();
            }
        }
    }

    function showAccount(account) {
        D.func();
        setCurrentAccount(account, function onSetCurrentAccount(currentAccount) {
            D.func();
            Popup.pushLayout("ShowAccountLayout", { account: currentAccount, errorText: Strings.get("no_input_fields_error"), closeButton: true });
        });
    }

    function autofillAccount(account) {
        D.func();
        account.copyToClipboard = Settings.isCopyOtp();
        setCurrentAccount(account, function onSetCurrentAccount(currentAccount) {
            D.func();
            const autofillIds = MetaFinder.getAutofillIds(_getUrlResponse.href, _mDocument, _searchFor, currentAccount.extras);
            // autofill
            chrome.tabs.sendMessage(_tab.id, {
                target: "autofill.js",
                account: currentAccount,
                autofillIds: autofillIds
            });
            // and close
            close();
        });
    }

    function addAccount(account) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "addAccount",
            args: [_getUrlResponse.url, _getUrlResponse.href, account]
        });
    }

    function getLogins() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "getLogins"
        }, function onGetLogins(response) {
            D.func();
            if (response.logins && response.logins.length != 0) {
                Popup.showInsertLoginPopup(response.logins);
            }
        });
    }

    function autofillCard(card) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Data",
            method: "setCurrentCard",
            args: [card]
        }, function onSetCurrentCard(card2) {
            D.func();
            const autofillIds = MetaFinder.getAutofillIds(_getUrlResponse.href, _mDocument, _searchFor);
            // autofill
            chrome.tabs.sendMessage(_tab.id, {
                target: "autofill.js",
                card: card2,
                autofillIds: autofillIds
            });
            // and close
            close();
        });
    }

    function shouldUpdateApp() {
        D.func();
        // FIXME: embargo
        var embargo = new Date(2024, 1, 15); // 15 Feb 2024
        if (new Date() < embargo) {
            return false;
        }
        return Settings.getVersion() && Settings.getVersion() < PROTOCOL_VERSION;
    }

    function searchAccount() {
        D.func();
        setState(SearchState);
        getAllAccounts();
    }

    function getAllAccounts() {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "getAllAccounts",
        }, function onGetAllAccounts(response) {
            D.func();
            if (response.error) {
                // error
                handleError(response, false);
            } else {
                if (response.success) {
                    Popup.pushLayout("SearchAccountLayout", { accounts: response.accounts });
                } else {
                    // access denied
                    acquireToken();
                }
            }
        });
    }

    function assignAccount(account) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "assignAccount",
            args: [_getUrlResponse.url, _getUrlResponse.href, account]
        });
    }

    function tryAutofillAccount(account) {
        D.func();
        if (canAutofillAccount()) {
            // autofill now
            autofillAccount(account);
        } else {
            // show account
            showAccount(account);
        }
    }

    function setCurrentAccount(account, callback) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Data",
            method: "setCurrentAccount",
            args: [_getUrlResponse.url, account]
        }, function onSetCurrentAccount(currentAccount) {
            D.func();
            if (callback) {
                callback(currentAccount);
            }
        });
    }

    function getCurrentAccount(callback) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Data",
            method: "getCurrentAccount",
            args: [_getUrlResponse.url]
        }, function onGetCurrentAccount(account) {
            D.func();
            callback(account);
        });
    }

    function changePassword(account) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "changePassword",
            args: [account]
        });
    }

    function onSelectAccount(account) {
        D.func();
        _state.onSelectAccount(account);
    }

    function setHasStar(account) {
        D.func();
        chrome.runtime.sendMessage({
            target: "Client",
            method: "setHasStar",
            args: [account]
        });
    }

    return {
        start: function() {
            start();
        },

        authenticate: function(password) {
            authenticate(password);
        },

        fastUnlock: function(symbols) {
            fastUnlock(symbols);
        },

        autofillAccount: function(account) {
            autofillAccount(account);
        },

        autofillCard: function(card) {
            autofillCard(card);
        },

        addAccount: function(account) {
            addAccount(account);
        },

        getLogins: function() {
            getLogins();
        },

        onSelectAction: function(action) {
            onSelectAction(action);
        },

        onSelectForm: function(form) {
            onSelectForm(form);
        },

        searchAccount: function() {
            searchAccount();
        },

        assignAccount: function(account) {
            assignAccount(account);
        },

        tryAutofillAccount: function(account) {
            tryAutofillAccount(account);
        },

        setCurrentAccount: function(account) {
            setCurrentAccount(account);
        },

        getCurrentAccount: function(callback) {
            getCurrentAccount(callback);
        },

        changePassword: function(account) {
            changePassword(account);
        },

        onSelectAccount: function(account) {
            onSelectAccount(account);
        },

        setHasStar: function(account) {
            setHasStar(account);
        },

        shouldUpdateApp: function() {
            return shouldUpdateApp();
        },

        getPrefilledLogin: function() {
            const foundInputs = MetaFinder.findInputs(_getUrlResponse.href, _mDocument, _searchFor);
            return foundInputs ? foundInputs.login : null;
        },

        getPrefilledPassword: function() {
            const foundInputs = MetaFinder.findInputs(_getUrlResponse.href, _mDocument, _searchFor);
            return foundInputs ? foundInputs.password : null;
        },

        getPrefilledNewPassword: function() {
            const foundInputs = MetaFinder.findInputs(_getUrlResponse.href, _mDocument, _searchFor);
            return foundInputs ? foundInputs.newPassword : null;
        },

        getHref: function() {
            return _getUrlResponse ? _getUrlResponse.href : null;
        },

        getTitle: function() {
            return _getUrlResponse ? _getUrlResponse.title : null;
        },

        getUrl: function() {
            return _getUrlResponse ? _getUrlResponse.url : null;
        }
    }

})();