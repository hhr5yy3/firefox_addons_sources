chrome.runtime.onInstalled.addListener(details => {
    const cookie_settings = {
        inclusive:true,
        filters:[]
    };
    const initStorageValues = {
        'autorefresh': false,
        'floatbtn': false,
        'cookie_settings': JSON.stringify(cookie_settings),
        'dataToRemove': JSON.stringify(['history', 'cache']),
        'timePeriod': 'last_hour'
    };
    chrome.storage.local.set(initStorageValues, result => {});
})

class Background {
    constructor() {
        this.initMessageListeners();
    }
    initMessageListeners() {
        chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
            switch (msg.action) {
                case 'clear':
                    this.clearData(msg.tab);
                    break;
                case 'clearBtn':
                    this.handleClearBtn();
                default:
                    console.log('another message')
            }
        })
    }

    clearData(tab) {
        this.getStorageData()
            .then(data => {
                const { timePeriod, dataToRemove, autorefresh, cookieFilters } = data;
                const sinceTime = this.getTimeInterval(timePeriod);
                const removeObject = this.getRemoveObject(dataToRemove);
                let customCookiesRemove = false;
                if (removeObject.cookies) {
                    if (cookieFilters.filters.length) {
                        removeObject.cookies = false;
                        customCookiesRemove = true;
                    }
                } 
                chrome.browsingData.remove({since: sinceTime}, removeObject);
                if (customCookiesRemove) this.accuracyDeleteCookies(cookieFilters)
                if (autorefresh) chrome.tabs.reload(tab.id, () => { });
            })
    }
    handleClearBtn() {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            this.clearData(tabs[0]);
        })
    }
    
    accuracyDeleteCookies(cookieFilters) {
        if (cookieFilters.inclusive) {
            cookieFilters.filters.forEach(filterDomain => {
                chrome.cookies.getAll({
                    domain: filterDomain
                }, cookies => {
                    cookies.forEach(cookie => this.deleteCookie(cookie));
                } )
            })
        } else {
            const obj = {};
            cookieFilters.filters.forEach(filterDomain => {
                const splittedDomain = filterDomain.split('.');
                if (filterDomain.indexOf('.') !== 0 && filterDomain.indexOf("http") !== 0 && filterDomain !== 'localhost') {
                    if (splittedDomain.length > 2 || splittedDomain[2] !== 'local') filterDomain = '.' + filterDomain;
                }
                obj[filterDomain] = true;
            });
            chrome.cookies.getAll({}, cookies => {
                cookies.forEach(cookie => {
                    // if (cookie.domain.indexOf('facebook') !== -1) console.log(cookie.domain, '---------------')
                    // if (!obj[cookie.domain]){
                    //     // console.warn('cookie must be deleted ', cookie);
                    // } else {
                    //     console.log('cookie must be saved ', cookie);
                    // }
                    if (!obj[cookie.domain] ) {
                        this.deleteCookie(cookie);
                    }
                })
            })
        }
    }
    deleteCookie(cookie) {
        const protocol = cookie.secure ? "https://" : "http://";
        const deleteConfig = {
            url: protocol + cookie.domain,
            name: cookie.name
        };
        chrome.cookies.remove(deleteConfig, function() {})
    }
    getTimeInterval(period) {
        switch (period) {
            case "last_hour":
                return new Date().getTime() - 3600000;
            case "last_day":
                return new Date().getTime() - 86400000;
            case "last_week":
                return new Date().getTime() - 604800000;
            case "last_month":
                return new Date().getTime() - 2419200000;
            case "everything":
            default:
                return 0;
        }
    }
    getStorageData() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(store => {
                const timePeriod = store.timePeriod;
                const dataToRemove = JSON.parse(store.dataToRemove);
                const autorefresh = store.autorefresh;
                const cookieFilters = JSON.parse(store.cookie_settings);
                resolve({timePeriod, dataToRemove, autorefresh, cookieFilters});
            });
        })
    }
    getRemoveObject(dataToRemove) {
        const resultObj = {};
        dataToRemove.forEach(item => resultObj[item] = true);
        return resultObj;
    }
}

const guruBackground = new Background();