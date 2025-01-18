var WEBEXT_ROMIR_DEBUG = 1;

function _log(string) {
    if (WEBEXT_ROMIR_DEBUG) {
        console && console.debug && console.debug.apply(this, arguments);
    }
}

var Ext = (function () {
    const URL_BASE = 'https://webext.romir.ru';

    function getRandomToken() {
        // E.g. 8 * 32 = 256 bits token
        var randomPool = new Uint8Array(32);
        crypto.getRandomValues(randomPool);
        var hex = '';
        for (var i = 0; i < randomPool.length; ++i) {
            hex += randomPool[i].toString(16);
        }
        // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
        return hex;
    }

    function testToken(token, result) {
        $.ajax({
            type: 'get',
            url: URL_BASE + '/api/v01/token/test',
            data: {token: token || ''},
            dataType: 'json',
            success: function (j) {
                result(true);
            },
            error: function () {
                result(false);
            }
        });
    }

    return new function () {
        var self = this;

        this.deviceId = null;
        this.user = null;
        this.onUserStateChanged = null;

        this._setUser = function (data) {
            chrome.storage.sync.set({
                user: data || null
            }, function () {
                self.user = data || null;
                self.onUserStateChanged && self.onUserStateChanged(data || null);
            });
        };

        this.trackTab = function (tab) {
            if (self.user && self.user.token) {
                _log("Tracking tab", tab);

                $.ajax({
                    type: 'post',
                    url: URL_BASE + '/api/v01/track',
                    data: {
                        token: self.user.token,
                        url: tab.url,
                        deviceId: self.deviceId
                    },
                })
            }
        };

        this.logout = function () {
            _log("Logout");

            $.ajax({
                type: 'post',
                url: URL_BASE + '/api/v01/track/stop',
                data: { token: self.user.token },
            });

            self._setUser(null);
        };

        this.loginInternal = function (username, time, sign) {
            $.ajax({
                type: 'get',
                url: URL_BASE + '/api/v01/token',
                data: {
                    username: username,
                    password: sign,
                    ts: time
                },
                dataType: 'json',
                success: function (j) {
                    self._setUser({
                        token: j.token,
                        name: j.username
                    });
                },
                error: function () {
                    self._setUser(null);
                }
            });
        };

        this.login = function (username, password) {
            var time = new Date().getTime();
            self.loginInternal(username, time, md5('' + time + md5(password)));
        };

        chrome.storage.sync.get({
            deviceId: null,
            user: null

        }, function (items) {
            console.log(items);

            if (items.deviceId) {
                self.deviceId = items.deviceId;

            } else {
                chrome.storage.sync.set({
                    deviceId: self.deviceId = getRandomToken()
                });
            }

            _log("Testing token...");
            testToken(items.user && items.user.token, function (result) {
                _log("Token okay", result);
                self._setUser(result ? items.user : '');
            });
        });
    };
})();

if (chrome && chrome.tabs) {
    chrome.tabs.onUpdated.addListener(function (id, data, tab) {
        if ("complete" === data.status && tab.active) {
            Ext.trackTab(tab);
        }
    });

    chrome.runtime.onMessage.addListener(function (msg) {
        if (msg && msg.cmd === "updateAuthData" && msg.data) {
            Ext.loginInternal(msg.data.username, msg.data.ts, msg.data.s);
        }
    });
}
