var utilMap = {
    openNewTab: function () {
    }
};


utilMap.openNewTab = function (url, focusType, timeOut) {
    return openUrl(url, focusType, timeOut);
};

var storageUtil = {
    setItem: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, JSON.stringify(value));
    },

    setItemVal: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, value);
    },

    getItem: function (name) {
        var data = storageReplacer.getLocalStorageItem(name);
        try {
            return JSON.parse(data);
        } catch (err) {
        }
        return data;
    }
};

var optInStorageUtil = {
    setItem: function (name, value) {
        storageUtil.setItem(name, value);
    },

    getItem: function (name) {
        return storageUtil.getItem(name);
    }
};

// from here
var extSpecFeatureStorageUtil = {
    setItem: function (name, value) {
        if (optInDecider.hasExtSpecFeatureOptIn())
            storageUtil.setItem(name, value);
    },

    getItem: function (name) {
        if (optInDecider.hasExtSpecFeatureOptIn())
            return storageUtil.getItem(name);
    }
};


var requestEnum = {
    GET: "GET",
    HEAD: "HEAD",
    POST: "POST"
};

var networkCallTimeout = 5 * 1000;

var networkUtil = {
    networkCall: function (requestType, url, data, config) {
        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if(this.status >= 200 && this.status < 300) {
                        try {
                            resolve(JSON.parse(xhttp.responseText));
                        } catch (e) {
                            resolve(xhttp.responseText);
                        }
                    }
                    else {
                        reject(xhttp);
                    }
                }
            };
            xhttp.open(requestType, url, true);
            xhttp.timeout = config.timeout || networkCallTimeout;
            if(requestType == requestEnum.POST) {
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(data);
            } else {
                xhttp.send();
            }
        });
    },

    getCall: function (url, config) {
        config = config || {};
        return this.networkCall(requestEnum.GET, url, null, config);
    }
};


function openUrl(url, focusType, delay) {
    return new Promise(function (resolve, reject) {
        delay = delay || 0;
        var config = {'active': focusType};
        if (!!url) {
            config['url'] = url;
        }
        setTimeout(function () {
            try {
                chrome.tabs.create(config, function (tab) {
                    resolve(tab.id)
                });
            } catch (e) {
                console.log(e);
            }
        }, delay);
    });
}

function setUninstallUrl() {
    var uninstallUrl = getUninstallUrl();
    try {
        chrome.runtime.setUninstallURL(uninstallUrl);
    } catch (err) {
        console.log("error setting uninstall page", err);
    }
}

function getUninstallUrl() {
    return UNINSTALL_PAGE;
}

