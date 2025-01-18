const UaManager = (function() {
    const api = typeof browser !== "undefined" ? browser : chrome;
    const Resources = Object.values(api.declarativeNetRequest.ResourceType);

    chrome.runtime.connect({ name: "popup" });

    const setUaAsync = async (ua='') => {
        await api.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
        });

        if (ua && ua !== 'Disabled') {
            const rule = {
                id: 1,
                priority: 1,
                condition: {
                    regexFilter: ".*",
                    resourceTypes: Resources,
                },
                action: {
                    type: 'modifyHeaders',
                    requestHeaders: [
                        {
                            header: 'User-Agent',
                            operation: 'set',
                            value: ua,
                        }
                    ]
                }
            };

            await api.declarativeNetRequest.updateDynamicRules({
                addRules: [rule],
            });
        }
    }

    const detectBrowserByUserAgent = ({ userAgent='', appName='', appVersion='' }) => {
        // There are userAgent, appName, appVersion in navigator object
        let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
        let temp

        if (/trident/i.test(match[1])) {
            temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []

            return `IE ${temp[1] || ''}`
        }

        if (match[1] === 'Chrome') {
            temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)

            if (temp !== null) {
                return temp.slice(1).join(' ').replace('OPR', 'Opera')
            }

            temp = userAgent.match(/\b(Edg)\/(\d+)/)

            if (temp !== null) {
                return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)')
            }
        }

        match = match[2] ? [ match[1], match[2] ] : [ appName, appVersion, '-?' ]
        temp = userAgent.match(/version\/(\d+)/i)

        if (temp !== null) {
            match.splice(1, 1, temp[1])
        }

        return match.join(' ')
    }

    api.storage.local
    .get([
        "customUserAgent",
    ])
    .then(async ({customUserAgent}) => {
        await setUaAsync(customUserAgent);
    });

    return {
        set: setUaAsync,
        detectBrowserByUserAgent,
    }
})()

