var Data = (function createData() {
    D.func();

    var _currentAccount = null;
    var _currentCard = null;

    function setCurrentAccount(url, account) {
        D.func(url);
        _currentAccount = {
            url: url,
            account: Object.assign({}, account),
            time: Date.now()
        };
    }

    function getCurrentAccount(url) {
        D.func(url);
        if (_currentAccount && _currentAccount.url == url) {
            var account = Object.assign({}, _currentAccount.account);
            account.time = _currentAccount.time;
            if (account.oneTimePassword) {
                // generate passcode
                var secretKey = TOTP.getSecretKey(account.oneTimePassword);
                if (secretKey) {
                    account.passcode = TOTP.getPasscode(secretKey);
                }
            }
            return account;
        }
        return null;
    }

    function setCurrentCard(card) {
        D.func();
        _currentCard = Object.assign({}, card);
    }

    function getCurrentCard(url) {
        D.func();
        return _currentCard;
    }

    return {

        setCurrentAccount: function(url, account, callback) {
            setCurrentAccount(url, account);
            if (callback) {
                callback(getCurrentAccount(url));
                return false;
            } else {
                return account;
            }
        },

        getCurrentAccount: function(url, callback) {
            var account = getCurrentAccount(url);
            if (callback) {
                callback(account);
                return false;
            } else {
                return account;
            }
        },

        setCurrentCard: function(card, callback) {
            setCurrentCard(card);
            if (callback) {
                callback(getCurrentCard());
                return false;
            } else {
                return account;
            }
        },

        getCurrentCard: function(callback) {
            var card = getCurrentCard();
            if (callback) {
                callback(card);
                return false;
            } else {
                return card;
            }
        }
    };

})();