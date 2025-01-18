var GaCollect = (function () {
    var instance;
    var cid;
    var agentName;
    
    function genCid() {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    
    function checkConfig() {
        cid = getGlobalValue(GlovalKey.cid);
        
        if (cid == null) {
            cid = genCid();
            setGlobalValue(GlovalKey.cid, cid);
        }
        
        agentName = getBrowserInfoEx().appname;
    }
    
    function trackPageImpl(resid, pageName) {
        try {
            var request = new XMLHttpRequest();
            var message =
                "v=1&tid=" + resid + "&cid=" + cid + "&ds=" + agentName + "&dt=" + agentName + "&t=pageview&dp=" + encodeURI(pageName) + "&aip=1";
            request.open("POST", "https://www.google-analytics.com/collect", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(message);
        } catch (e) {
        }
    }
    
    function sendEventImpl(resid, type, action, label) {
        try {
            var request = new XMLHttpRequest();
            var message =
                "v=1&tid=" + resid + "&cid=" + cid + "&ds=" + agentName + "&t=event&ec=" + type + "&ea=" + action + "&el=" + label + "&aip=1";
            request.open("POST", "https://www.google-analytics.com/collect", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(message);
        } catch (e) {
        }
    }
    
    function init() {
        checkConfig();
        
        return {
            trackPage: function(resid, pageName) {
                trackPageImpl(resid, pageName);
            },
            sendEvent: function(resid, type, action, label) {
                sendEventImpl(resid, type, action, label);
            }
        };
    }
    
    return {
        getIns: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();