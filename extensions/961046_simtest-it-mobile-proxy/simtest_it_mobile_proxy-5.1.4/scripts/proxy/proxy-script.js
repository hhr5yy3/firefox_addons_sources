
let skipProxyFor = {

};

let proxyPac = {
    protocol: "HTTP",
    host: null,
    port: null
};

let PROXY_RUNNING = false;

const SThelper = {

    runtimeSendMessage: function (message, success, fail, options, extensionId) {
        browser.runtime.sendMessage(
            extensionId,
            message,
            options
        ).then(success, fail);
    },


    mustProxyHost: function(url) {
        if( !PROXY_RUNNING ) {
            return false;
        }
        let hosts = Object.keys(skipProxyFor);
        for(let hi in hosts) {
            if (url.indexOf(hosts[hi]) > -1) return false;
        }
        return true;
    }
};

//-----------------------------
//-----------------------------

(function () {

    // listen for updates to the blocked host list

    browser.runtime.onMessage.addListener(proxyListenerHandler);

    // tell the background script that we are ready
    initialize();

    function proxyListenerHandler(message, sender, sendResponse) {
        if (message == null) {
            sendResponse({'proxyInitFailed' : true});
            return;
        }
        SThelper.runtimeSendMessage({msg: ' === PROXY IN  === ', detail: message});
        if(Object.prototype.toString.call(message) == '[object String]') {
            message = JSON.parse(message);
        }

        configReceiver(message);
    }

    function configReceiver(message) {
        if (message == null) {
            return;
        }
        SThelper.runtimeSendMessage(' === PROXY INIT configReceiver  ===  ' + JSON.stringify(message));

        if(message.hasOwnProperty('reset') && message.reset) {
            proxyPac.host = null;
            proxyPac.port = null;
            PROXY_RUNNING = false;
            skipProxyFor = {'app.simtest.it': 1, 'api.simtest.it' : 1, 'localhost': 1, "127.0.0.1" : 1, "::1" : 1};
        }

        if (message.hasOwnProperty('pac')) {
            proxyPac.host = message.pac.host;
            proxyPac.port = message.pac.port;
            PROXY_RUNNING = true;
        }
        if (message.hasOwnProperty('skipProxyFor')) {
            var skipProxies = message.skipProxyFor;
            for(let skip in skipProxies) {
                skipProxyFor[skipProxies[skip]] = 1;
            }
        }

    }


    function initialize() {
        SThelper.runtimeSendMessage(
            "init",
            function(success) {
                configReceiver(success)
            }, //success
            function (e) { // error
                SThelper.runtimeSendMessage(' === PROXY INIT FAILED  ===  ' + e);
            });
    }

})();


// required PAC function that will be called to determine
// if a proxy should be used.
function FindProxyForURL(url, host) {

    var retVal = 'DIRECT';
    if (proxyPac.host && proxyPac.port && SThelper.mustProxyHost(url)) {
        if(proxyPac.port == 9090) {
            proxyPac.protocol = "SOCKS5";
        }
        switch (proxyPac.protocol) {
            case "HTTPS":
                retVal =  "HTTPS "+proxyPac.host+":"+proxyPac.port;
                break;
            case "SOCKS4":
                retVal =   "SOCKS4 "+proxyPac.host+":"+proxyPac.port;
                break;
            case "SOCKS5":
                retVal =   "SOCKS5 "+proxyPac.host+":"+proxyPac.port;
                break;
            case "HTTP":
            default:
                retVal =  "PROXY "+proxyPac.host+":"+proxyPac.port;
        }
    }

    SThelper.runtimeSendMessage({msg: ' === PROXY FindProxyForURL('+url+', '+host+')' , pac: proxyPac, returning:  retVal,  skipProxyFor: skipProxyFor } );

    return retVal;
}