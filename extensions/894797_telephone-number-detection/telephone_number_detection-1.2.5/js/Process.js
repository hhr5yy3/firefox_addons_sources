/*
*	Telephone Number Detection
*	Source © CTI Telephony
*	CTITelephony@GMail.com
*/

var Process = function() {
    var updateBadge = function(text, color, icon, title) {
        browser.browserAction.setBadgeText({ 'text': text });
        browser.browserAction.setBadgeBackgroundColor({ 'color': color });
        browser.browserAction.setIcon({ path: icon });
        browser.browserAction.setTitle({ title: title });
    };

    var sendPageRequest = function(request) {
        var requestOptions = {};
        switch (request) {
            case 'parseDOM':
                requestOptions.parseDOM = true;
                break;
            case 'clearDOM':
                requestOptions.clearDOM = true;
                break;
			case 'isPageComplete':
                requestOptions.isPageComplete = true;
                break;
        }
		
		browser.tabs.query({}, function(tabs) {
			for (var i=0; i<tabs.length; ++i) {
				browser.tabs.sendMessage(tabs[i].id, requestOptions);
			}
		});

    };

    var pref = Preferences; // alias for the Preferences object
    return {
        init: function() {
            var ON = pref.get('enabled');
            if (ON) {
                this.enable();
            } else {
                this.disable();
            }
        },
        enable: function() {
            pref.set('enabled', true);
            var text = pref.get('badgeOnText');
            var color = pref.get('badgeOnColor');
            var icon = pref.get('badgeOnIcon');
            var title = pref.get('badgeOnTitle');
            updateBadge(text, color, icon, title);
            sendPageRequest('parseDOM');
        },
        disable: function() {
            pref.set('enabled', false);
            var text = pref.get('badgeOffText');
            var color = pref.get('badgeOffColor');
            var icon = pref.get('badgeOffIcon');
            var title = pref.get('badgeOffTitle');
            updateBadge(text, color, icon, title);
            sendPageRequest('clearDOM');
        },
		isPageComplete: function() {
            sendPageRequest('isPageComplete');
        },
        toggle: function() {
            var ON = pref.get('enabled');
            if (ON) {
                this.disable();
            } else {
                this.enable();
            }
        }
    }
}

var Preferences = {
    defaults: {
        timeout: 3000,
        enabled: true,
        badgeOnColor: [0, 200, 0, 100],
        badgeOffColor: [200, 0, 0, 100],
        badgeOnText: '',
        badgeOffText: '',
        badgeOnTitle: 'Click to disable',
        badgeOffTitle: 'Click to enable',
        badgeOnIcon: 'images/Enabled.png',
        badgeOffIcon: 'images/Disabled.png'
    },
    set: function(name, value) { window.localStorage[name] = JSON.stringify(value); chrome.storage.sync.set({'telEnabled': value}); },
    get: function(name) {
        var value = window.localStorage[name];
        if (value == null || value == undefined) { value = this.defaults[name]; }
        else { value = JSON.parse(value); }
        return value;
    }
}