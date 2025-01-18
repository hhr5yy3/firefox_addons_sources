var Client = (function createClient() {
    D.func();

    const TOKEN_SETTING = "token";

    const CLIENT_ID_SIZE = 32;
    const KEY_SIZE = 32;
    const IV_SIZE = 16;

    const LOCALHOST_URL = "http://localhost:19756/";

    const TEST_HANDSHAKE_REQUEST = "test_handshake";
    const HANDSHAKE_REQUEST = "handshake";
    const AUTHENTICATE_REQUEST = "authenticate";
    const GET_ACCOUNTS_REQUEST = "get_web_accounts_2";
    const GET_LOGINS_REQUEST = "get_logins";
    const ADD_ACCOUNT_REQUEST = "add_card";
    const CAN_FAST_UNLOCK_REQUEST = "can_fast_unlock";
    const FAST_UNLOCK_REQUEST = "fast_unlock";
    const FORM_SUBMIT_REQUEST = "form_submit";
    // version 6
    const GET_CARDS_REQUEST = "get_cards";
    // version 7
    const START_AUTHORIZATION_REQUEST = "start_authorization";
    const GET_AUTHORIZATION_RESULT_REQUEST = "get_authorization_result";
    // version 8
    const CAN_AUTHORIZE_REQUEST = "can_authorize";
    // version 9
    const GET_ALL_ACCOUNTS_REQUEST = "get_all_accounts";
    const ASSIGN_ACCOUNT_REQUEST = "assign_account";
    // version 10
    const CHANGE_PASSWORD_REQUEST = "change_password";
    const GET_COUNT_REQUEST = "get_count";
    // version 11
    const SET_HAS_STAR_REQUEST = "set_has_star";
    const CHANGE_SUBMIT_REQUEST = "change_submit";

    var _clientId = Base64.encode(getRandomByteArray(CLIENT_ID_SIZE));
    var _key = null;
    var _lastAccount = null;
    var _justStarted = true;

    shakeHands(function onInitialHandshake(response) {
        D.func();
    });

    function setToken(token) {
        D.func();
        localStorage[TOKEN_SETTING] = token;
    }

    function getToken() {
        D.func();
        if(_justStarted && Settings.isLockAtBrowserExit() ){
            _justStarted = false;
            localStorage[TOKEN_SETTING] = null;
        }
        return localStorage[TOKEN_SETTING];
    }

    function shakeHands(callback) {
        D.func();
        // has key ?
        if (_key) {
            // test handshake
            var request = { type: TEST_HANDSHAKE_REQUEST };
            setRequestVerifier(request, _key);
            return sendRequest(request, _key, function onTestHandshake(response) {
                D.func();
                // error ?
                if (response.error) {
                    makeNewHandshake(callback);
                } else {
                    // success
                    callback(response);
                }
            });
        } else {
            return makeNewHandshake(callback);
        }
    }

    function makeNewHandshake(callback) {
        D.func();
        var key = Base64.encode(getRandomByteArray(KEY_SIZE));
        var request = {
            type: HANDSHAKE_REQUEST,
            key: key
        };
        setRequestVerifier(request, key);
        return sendRequest(request, key, function onNewHandshake(response) {
            D.func();
            // success ?
            if (!response.error) {
                // save key & version
                _key = key;
                Settings.setVersion(response.version);
                D.print("Key saved");
            }
            callback(response);
        });
    }

    function getRandomByteArray(len) {
        if (!len) {
            len = 16;
        }
        var bytes = [];
        for (var i = 0; i < len; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    }

    function canAuthorize(callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: CAN_AUTHORIZE_REQUEST
                };
                setRequestVerifier(request, _key);
                sendRequest(request, _key, function onCanAuthorize(response) {
                    D.func();
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function startAuthorization(callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // start
                var request = {
                    type: START_AUTHORIZATION_REQUEST
                };
                setRequestVerifier(request, _key);
                sendRequest(request, _key, function onStartAuthorization(response) {
                    D.func();
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function getAuthorizationResult(callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // start
                var request = {
                    type: GET_AUTHORIZATION_RESULT_REQUEST
                };
                setRequestVerifier(request, _key);
                request.expiresin = Settings.getExpiresIn();
                sendRequest(request, _key, function onIsAuthorized(response) {
                    D.func();
                    // authorized ?
                    if (response.success && response.token) {
                        // decrypt response data
                        response.token = Cipher.decryptString(response.token, _key, request.nonce);
                        // save token
                        setToken(response.token);
                    }
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function authenticate(password, callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // authenticate
                var request = {
                    type: AUTHENTICATE_REQUEST
                };
                setRequestVerifier(request, _key);
                request.password = Cipher.encryptString(password, _key, request.nonce);
                request.expiresin = Settings.getExpiresIn();
                sendRequest(request, _key, function onAuthenticate(response) {
                    D.func();
                    // authenticated ?
                    if (response.success && response.token) {
                        // decrypt response data
                        response.token = Cipher.decryptString(response.token, _key, request.nonce);
                        // save token
                        setToken(response.token);
                    }
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function canFastUnlock(callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: CAN_FAST_UNLOCK_REQUEST
                };
                setRequestVerifier(request, _key);
                sendRequest(request, _key, function onCanFastUnlock(response) {
                    D.func();
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function fastUnlock(symbols, callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // authenticate
                var request = {
                    type: FAST_UNLOCK_REQUEST
                };
                setRequestVerifier(request, _key);
                request.fastUnlock = Cipher.encryptString(symbols, _key, request.nonce);
                request.expiresin = Settings.getExpiresIn();
                sendRequest(request, _key, function onFastUnlock(response) {
                    D.func();
                    // unlocked ?
                    if (response.success && response.token) {
                        // decrypt response data
                        response.token = Cipher.decryptString(response.token, _key, request.nonce);
                        // save token
                        setToken(response.token);
                    }
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function getCards(callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // get cards
                var request = {
                    type: GET_CARDS_REQUEST
                };
                setRequestVerifier(request, _key);
                request.token = Cipher.encryptString(getToken(), _key, request.nonce);
                sendRequest(request, _key, function onGetCards(response) {
                    D.func();
                    // decrypt response data
                    if (response.success && response.cards) {
                        for (var i = 0; i < response.cards.length; i++) {
                            decryptCard(response.cards[i], request.nonce);
                        }
                    }
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function decryptCard(card, nonce) {
        card.title2 = Cipher.decryptString(card.title2, _key, nonce);
        card.name = Cipher.decryptString(card.name, _key, nonce);
        card.number = Cipher.decryptString(card.number, _key, nonce);
        card.expMonth = Cipher.decryptString(card.expMonth, _key, nonce);
        card.expYear = Cipher.decryptString(card.expYear, _key, nonce);
        card.csc = Cipher.decryptString(card.csc, _key, nonce);
        if (card.databaseName) {
            card.databaseName = Cipher.decryptString(card.databaseName, _key, nonce);
        } else {
            card.databaseName = "";
        }
    }

    function getAccounts(url, callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // get accounts
                var request = {
                    type: GET_ACCOUNTS_REQUEST
                };
                setRequestVerifier(request, _key);
                request.url = Cipher.encryptString(url, _key, request.nonce);
                request.token = Cipher.encryptString(getToken(), _key, request.nonce);
                sendRequest(request, _key, function onGetAccounts(response) {
                    D.func();
                    // decrypt response data
                    response.url = url;
                    if (response.success && response.accounts) {
                        for (var i = 0; i < response.accounts.length; i++) {
                            decryptAccount(response.accounts[i], request.nonce);
                        }
                        // cache first account
                        if (response.accounts.length != 0) {
                            _lastAccount = response.accounts[0];
                            _lastAccount.url = url;
                        }
                    }
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function getAllAccounts(callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // get accounts
                var request = {
                    type: GET_ALL_ACCOUNTS_REQUEST
                };
                setRequestVerifier(request, _key);
                request.token = Cipher.encryptString(getToken(), _key, request.nonce);
                sendRequest(request, _key, function onGetAllAccounts(response) {
                    D.func();
                    // decrypt response data
                    if (response.success && response.accounts) {
                        for (var i = 0; i < response.accounts.length; i++) {
                            decryptAccount(response.accounts[i], request.nonce);
                        }
                    }
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function decryptAccount(account, nonce) {
        account.title2 = Cipher.decryptString(account.title2, _key, nonce);
        account.login = Cipher.decryptString(account.login, _key, nonce);
        account.password = Cipher.decryptString(account.password, _key, nonce);
        account.oneTimePassword = Cipher.decryptString(account.oneTimePassword, _key, nonce);
        // websites
        for (let i = 0; account.websites && i < account.websites.length; i++) {
            account.websites[i] = Cipher.decryptString(account.websites[i], _key, nonce);
        }
        // extras
        for (let i = 0; account.extras && i < account.extras.length; i++) {
            account.extras[i].name = Cipher.decryptString(account.extras[i].name, _key, nonce);
            account.extras[i].value = Cipher.decryptString(account.extras[i].value, _key, nonce);
        }
        if (account.databaseName) {
            account.databaseName = Cipher.decryptString(account.databaseName, _key, nonce);
        } else {
            account.databaseName = "";
        }
    }

    function encryptAccount(account, nonce) {
        let encrypted = JSON.parse(JSON.stringify(account));
        encrypted.title2 = Cipher.encryptString(encrypted.title2, _key, nonce);
        encrypted.login = Cipher.encryptString(encrypted.login, _key, nonce);
        encrypted.password = Cipher.encryptString(encrypted.password, _key, nonce);
        encrypted.oldPassword = Cipher.encryptString(encrypted.oldPassword, _key, nonce);
        encrypted.oneTimePassword = Cipher.encryptString(encrypted.oneTimePassword, _key, nonce);
        // websites
        for (let i = 0; encrypted.websites && i < encrypted.websites.length; i++) {
            encrypted.websites[i] = Cipher.encryptString(encrypted.websites[i], _key, nonce);
        }
        // extras
        for (let i = 0; encrypted.extras && i < encrypted.extras.length; i++) {
            encrypted.extras[i].name = Cipher.encryptString(encrypted.extras[i].name, _key, nonce);
            encrypted.extras[i].value = Cipher.encryptString(encrypted.extras[i].value, _key, nonce);
        }
        if (encrypted.databaseName) {
            encrypted.databaseName = Cipher.encryptString(encrypted.databaseName, _key, nonce);
        } else {
            encrypted.databaseName = "";
        }
        return encrypted;
    }

    function getLogins(callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // get logins
                var request = {
                    type: GET_LOGINS_REQUEST
                };
                setRequestVerifier(request, _key);
                request.token = Cipher.encryptString(getToken(), _key, request.nonce);
                sendRequest(request, _key, function onGetLogins(response) {
                    D.func();
                    // decrypt response data
                    if (response.success && response.logins) {
                        for (var i = 0; i < response.logins.length; i++) {
                            response.logins[i] = Cipher.decryptString(response.logins[i], _key, request.nonce);
                        }
                    }
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function addAccount(url, href, account) {
        D.func();
        // handshake
        shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // add card
                var request = {
                    type: ADD_ACCOUNT_REQUEST
                };
                setRequestVerifier(request, _key);
                request.url = Cipher.encryptString(url, _key, request.nonce);
                request.href = Cipher.encryptString(href, _key, request.nonce);
                request.account = encryptAccount(account, request.nonce);
                sendRequest(request, _key, function onAddAccount(response) {
                    D.func();
                });
            }
        });
        return false;
    }

    function formSubmit(url, href, account) {
        D.func();
        // handshake
        shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: FORM_SUBMIT_REQUEST
                };
                setRequestVerifier(request, _key);
                request.url = Cipher.encryptString(url, _key, request.nonce);
                request.href = Cipher.encryptString(href, _key, request.nonce);
                request.account = encryptAccount(account, request.nonce);
                sendRequest(request, _key, function onFormSubmit(response) {
                    D.func();
                });
            }
        });
        return false;
    }

    function assignAccount(url, href, account) {
        D.func();
        // handshake
        shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: ASSIGN_ACCOUNT_REQUEST
                };
                setRequestVerifier(request, _key);
                request.url = Cipher.encryptString(url, _key, request.nonce);
                request.href = Cipher.encryptString(href, _key, request.nonce);
                request.account = encryptAccount(account, request.nonce);
                sendRequest(request, _key, function onAssignAccount(response) {
                    D.func();
                });
            }
        });
        return false;
    }

    function changePassword(account) {
        D.func();
        // handshake
        shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: CHANGE_PASSWORD_REQUEST
                };
                setRequestVerifier(request, _key);
                request.account = encryptAccount(account, request.nonce);
                sendRequest(request, _key, function onChangePassword(response) {
                    D.func();
                });
            }
        });
        return false;
    }

    function getCount(url, callback) {
        D.func();
        // handshake
        return shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: GET_COUNT_REQUEST
                };
                setRequestVerifier(request, _key);
                request.url = Cipher.encryptString(url, _key, request.nonce);
                sendRequest(request, _key, function onGetCount(response) {
                    D.func();
                    callback(response);
                });
            } else {
                // handshake error
                callback(response);
            }
        });
    }

    function setHasStar(account) {
        D.func();
        // handshake
        shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: SET_HAS_STAR_REQUEST
                };
                setRequestVerifier(request, _key);
                request.account = encryptAccount(account, request.nonce);
                sendRequest(request, _key, function onSetHasStar(response) {
                    D.func();
                });
            }
        });
        return false;
    }

    function changeSubmit(url, account) {
        D.func();
        // handshake
        shakeHands(function onHandshake(response) {
            D.func();
            // handshake success ?
            if (!response.error) {
                // ask
                var request = {
                    type: CHANGE_SUBMIT_REQUEST
                };
                setRequestVerifier(request, _key);
                request.url = Cipher.encryptString(url, _key, request.nonce);
                request.account = encryptAccount(account, request.nonce);
                sendRequest(request, _key, function onChangeSubmit(response) {
                    D.func();
                });
            }
        });
        return false;
    }

    // -- REQUEST --------------------------------------------------------

    function sendRequest(request, key, callback) {
        D.func();
        // send
        var xhr = new XMLHttpRequest();
        xhr.onload = function onRequestLoad(event) {
            D.func(this.readyState);
            // ready ?
            if (this.readyState === 4) {
                D.print("Response: " + this.status + " => " + this.responseText);
                // success ?
                if (this.status >= 200 && this.status <= 299) {
                    // parse response
                    try {
                        var response = JSON.parse(this.responseText);
                        if (!verifyResponse(response, key)) {
                            response.error = "Failed to verify application response.";
                        }
                        callback(response);
                    } catch (e) {
                        callback({ error: Strings.get("communication_error") });
                    }
                } else {
                    if (this.responseText) {
                        callback({ error: this.responseText });
                    } else {
                        callback({ error: Strings.get("error_text") + ": " + this.statusText + " (" + this.status + ")" });
                    }
                }
            }
        };
        xhr.onerror = function onRequestError(event) {
            D.func();
            if (this.status == 0) {
                callback({ error: Strings.get("app_not_running_error"), shouldStartApp: true });
            } else {
                if (this.responseText) {
                    callback({ error: this.responseText });
                } else {
                    callback({ error: Strings.get("error_text") + ": " + this.statusText + " (" + this.status + ")" });
                }
            }
        };
        xhr.open("POST", LOCALHOST_URL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        request.clientId = _clientId;
        request.savePasswords = Settings.getSavePasswords();
        var requestJson = JSON.stringify(request);
        D.print("Request: " + requestJson);
        xhr.send(requestJson);
        return true;
    }

    function verifyResponse(response, key) {
        D.func();
        if (response.nonce && response.verifier) {
            var iv = response.nonce;
            var value = Cipher.decryptString(response.verifier, key, iv);
            return value == response.nonce;
        }
        return false;
    }

    function setRequestVerifier(request, key) {
        D.func();
        var iv = Base64.encode(getRandomByteArray(IV_SIZE));
        request.nonce = iv;
        request.verifier = Cipher.encryptString(request.nonce, key, iv);
    }

    function handleVersionError(callback) {
        D.func();
        const response = {
            error: "Protocol version error."
        };
        callback(response);
        return false;
    }

    return {
        shakeHands: function(callback) {
            return shakeHands(callback);
        },

        authenticate: function(password, callback) {
            return authenticate(password, callback);
        },

        getAccounts: function(url, callback) {
            return getAccounts(url, callback);
        },

        getLogins: function(callback) {
            return getLogins(callback);
        },

        addAccount: function(url, href, account) {
            return addAccount(url, href, account);
        },

        canFastUnlock: function(callback) {
            return canFastUnlock(callback);
        },

        fastUnlock: function(symbols, callback) {
            return fastUnlock(symbols, callback);
        },

        formSubmit: function(url, href, account) {
            return formSubmit(url, href, account);
        },

        getCards: function(callback) {
            if (Settings.getVersion() >= 6) {
                return getCards(callback);
            }
            return handleVersionError(callback);
        },

        startAuthorization: function(callback) {
            if (Settings.getVersion() >= 7) {
                return startAuthorization(callback);
            }
            return handleVersionError(callback);
        },

        getAuthorizationResult: function(callback) {
            if (Settings.getVersion() >= 7) {
                return getAuthorizationResult(callback);
            }
            return handleVersionError(callback);
        },

        canAuthorize: function(callback) {
            if (Settings.getVersion() >= 8) {
                return canAuthorize(callback);
            }
            return handleVersionError(callback);
        },

        getAllAccounts: function(callback) {
            if (Settings.getVersion() >= 9) {
                return getAllAccounts(callback);
            }
            return handleVersionError(callback);
        },

        assignAccount: function(url, href, account) {
            if (Settings.getVersion() >= 9) {
                return assignAccount(url, href, account);
            }
            return false;
        },

        changePassword: function(account) {
            if (Settings.getVersion() >= 10) {
                return changePassword(account);
            }
            return false;
        },

        getCount: function(url, callback) {
            if (Settings.getVersion() >= 10) {
                return getCount(url, callback);
            }
            return handleVersionError(callback);
        },

        changeSubmit: function(url, account) {
            if (Settings.getVersion() >= 11) {
                return changeSubmit(url, account);
            }
            return false;
        },

        setHasStar: function(account) {
            if (Settings.getVersion() >= 11) {
                return setHasStar(account);
            }
            return false;
        },

        getLastAccount: function() {
            return _lastAccount;
        },

        hasToken: function() {
            return getToken() ? true : false;
        },

        getToken: function(callback) {
            callback({
                token: getToken()
            });
            return false;
        },

        resetToken: function() {
            setToken(null);
            return false;
        }
    };
})();