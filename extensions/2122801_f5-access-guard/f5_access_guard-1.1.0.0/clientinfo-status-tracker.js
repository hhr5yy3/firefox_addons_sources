'use strict';

var clientInfoStatusTracker =  (function ClientInfoStatusTracker() {
    var trackerInstance;

    function init() {
        // Private methods and members
        var _clientInfoSentStatusMap    =   {};
        const _MAX_ENTRIES_COUNT        =   1000;
        var _currentCount               =   0;

        function _clearMapIfFull() {
            if(_currentCount >= _MAX_ENTRIES_COUNT) {
                // If we have reached/crossed the maximum allowed entries
                // invalidate the whole map
                _clientInfoSentStatusMap = {};
                _currentCount = 0;
                return;
            }
        };

        function _addHostnameToMap(hostname) {
            _clearMapIfFull();
            _clientInfoSentStatusMap[hostname] = {};
            _currentCount++;
        };

        // Public methods and members
        return {
            getMaxEntriesLimit: function() {
                return _MAX_ENTRIES_COUNT;
            },
            getCurrentEntryCount: function() {
                return _currentCount;
            },
            getClientInfoSentStatusMap: function () {
                return _clientInfoSentStatusMap;
            },
            clearClientInfoSentStatusMap: function () {
                _clientInfoSentStatusMap = {};
                _currentCount = 0;
            },
            getValidityForHostname: function (hostname) {
                try {
                    if (typeof _clientInfoSentStatusMap[hostname].validity !== "undefined") {
                        return _clientInfoSentStatusMap[hostname].validity;
                    }
                } catch (e) {}
                return false;
            },
            setValidityForHostname: function (hostname, validity) {
                if (typeof hostname !== "string" ||
                    typeof validity !== "boolean") {
                    return;
                }
                if (typeof _clientInfoSentStatusMap[hostname] === "undefined") {
                    // Entry does not exist
                    _addHostnameToMap(hostname);
                }
                _clientInfoSentStatusMap[hostname].validity = validity;
            },
            getHealthDataSentForHostname: function (hostname) {
                try {
                    if (typeof _clientInfoSentStatusMap[hostname].healthData !== "undefined") {
                        return _clientInfoSentStatusMap[hostname].healthData;
                    }
                } catch (e) {}
                return "";
            },
            setHealthDataForHostname: function (hostname, healthData) {
                if (typeof hostname !== "string" ||
                    typeof healthData !== "string") {
                    return;
                }
                if (typeof _clientInfoSentStatusMap[hostname] === "undefined") {
                    // Entry does not exist
                    _addHostnameToMap(hostname);
                }
                _clientInfoSentStatusMap[hostname].healthData = healthData;
            },
            shouldSendClientInformationHeader: function (hostname, healthData) {
                if ((typeof hostname !== "string") ||
                    (typeof healthData !== "string")) {
                    return false;
                }
                if (typeof _clientInfoSentStatusMap[hostname] ===
                    "undefined") {
                    // hostname key is not in the map. Probably the first time.
                    return true;
                }

                if (false === this.getValidityForHostname(hostname)) {
                    // we still haven't received validity=1 for the hostname from server
                    // or we set it to false due to some error/exception
                    return true;
                }

                // hostname key in the dict and validity is true (we received validity=1 from server)
                // check if health data that we last sent for this server URL is different
                // than current health. If it is same, send it. Otherwise do not.
                if (healthData === this.getHealthDataSentForHostname(hostname)) {
                    return false;
                }
                // Send client information because healthData changed.
                // Invalidate the "validity" field because we will need to know if server
                // accepted this new healthData
                this.setValidityForHostname(hostname, false);
                return true;
            }
        };
    }

    return {
        // Create a trackerInstance if it does not exist
        getInstance: function() {
            if(!trackerInstance) {
                trackerInstance = init();
            }
            return trackerInstance;
        }
    }
})();
