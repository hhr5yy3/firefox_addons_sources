const config = {
    //'proxy_state': {'value': 'false',},
    'proxy_current': {'value': '',},
    'proxy_list': {'value': '',},

    'reload_current_tab': {'value': 'false',},
    'reload_other_tabs': {'value': 'false',},
    'remove_cookies': {'value': 'false',},
    'remove_cache': {'value': 'false',},
};

let proxy_config = {'type': 'direct'};

class Proxy {
    static get_proxylist() {
        let proxy_list = get_option('proxy_list');
        if (!proxy_list)
            return [];

        try {
            proxy_list = JSON.parse(proxy_list);
            if (proxy_list === null)
                return [];
        } catch (err) {
            return [];
        }

        return proxy_list;
    }

    static get_proxylist_to_textarea() {
        let proxy_list = this.get_proxylist();
        if (!proxy_list)
            return '';

        //ip:port:login:password
        let raw_proxy_list = [];
        for (let i in proxy_list) {
            let el = proxy_list[i];
            let proxy = []
            proxy.push(el.ip)
            proxy.push(el.port)
            proxy.push(el.user)
            proxy.push(el.pass)
            raw_proxy_list.push(proxy.join(':'));
        }

        if (!raw_proxy_list.length)
            return '';

        return raw_proxy_list.join("\n");
    }

    static save_proxylist_from_import(proxylist) {
        if (!proxylist.length) {
            return set_option('proxy_list', '');
        }

        let proxy_list = [];
        let proxylist_arr = proxylist.split("\n")

        proxylist_arr.forEach((el) => {
            el = el.trim();
            if (!el.length)
                return;

            if (el.indexOf('@') !== -1) { // log:pass@ip:port
                let els = el.split('@')
                let el1 = els[0].split(':') // log:pass
                let el2 = els[1] ? els[1].split(':') : ['', '',] // ip:port
                proxy_list.push({
                    ip: el2[0],
                    port: el2[1],
                    user: el1[0],
                    pass: el1[1],
                });
                return;
            }

            let el_arr = el.split(':')  // ip:port:log:pass / ip:port
            proxy_list.push({
                ip: el_arr[0],
                port: el_arr[1],
                user: el_arr[2] ? el_arr[2] : '',
                pass: el_arr[3] ? el_arr[3] : '',
            });
        });

        return set_option('proxy_list', JSON.stringify(proxy_list));
    }

    static set_proxy(ip, port, login, password) {
        let proxy = {ip: ip, port: port, user: login, pass: password,}
        set_option('proxy_current', JSON.stringify(proxy));
        update_browser_icon();

        let browserCode = getBrowserCode();
        if (browserCode === 'chrome') {
            let config_proxy = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        host: ip,
                        port: parseInt(port, 10),
                    },
                }
            };
            chrome.proxy.settings.set({value: config_proxy, scope: "regular"})
        } else if (browserCode === 'firefox') {
            /*
            let config_proxy = {
                proxyType: "manual",
                http: "https://" + ip + ":" + parseInt(port, 10),
                httpProxyAll: true,
            };
            browser.proxy.settings.set({value: config_proxy});
            //
            proxy_config = {
                'host': ip,
                'port': parseInt(port, 10),
            }
            proxy_config.type = ((/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/i).test(proxy_config.host)) ? 'http' : 'https';
            if (!chrome.proxy.onRequest.hasListener(this.handle_request))
                chrome.proxy.onRequest.addListener(this.handle_request, {urls: ["<all_urls>"]});
            */
        }
    }

    static reset_proxy() {
        set_option('proxy_current', '');
        update_browser_icon();

        let browserCode = getBrowserCode();
        if (browserCode === 'chrome') {
            let config_proxy = {
                mode: "system"
            };
            chrome.proxy.settings.set({value: config_proxy, scope: "regular"})
        } else if (browserCode === 'firefox') {
            /*
            let config_proxy = {
                proxyType: "system",
            };
            browser.proxy.settings.set({value: config_proxy});
            //
            if (chrome.proxy.onRequest.hasListener(this.handle_request))
                chrome.proxy.onRequest.removeListener(this.handle_request);
            proxy_config = {'type': 'direct'};
            */
        }
    }

    /*
    static handle_request() {
        return proxy_config;
    }
    */
    static get_current_proxy() {
        let current_proxy = get_option('proxy_current');
        if (!current_proxy)
            return false;

        try {
            current_proxy = JSON.parse(current_proxy);
            if (current_proxy === null)
                return false;
        } catch (err) {
            return false;
        }

        return current_proxy;
    }
}

function get_option(key) {
    let _local = localStorage[key];
    _local = _local !== undefined ? _local : config[key]['value'];

    if (typeof _local === 'string') {
        switch (_local) {
            case 'true':
                return true;
            case 'false':
                return false;
        }
    }

    return _local;
}

function set_option(key, value) {
    localStorage[key] = value;
    return get_option(key);
}

function update_browser_icon() {
    let cp = Proxy.get_current_proxy();
    let postfix = cp ? 'enabled' : 'disabled';
    chrome.browserAction.setIcon({
        path: {
            "16": "static/images/icon16_" + postfix + ".png",
            "24": "static/images/icon24_" + postfix + ".png",
            "32": "static/images/icon32_" + postfix + ".png"
        }
    });

    let badge = {
        'text': cp ? 'proxy' : '',
    }
    chrome.browserAction.setBadgeText(badge);
}

// https://stackoverflow.com/a/41820692/2166371
function getBrowserCode() {
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    let isFirefox = typeof InstallTrigger !== 'undefined';
    let isIE = !!document.documentMode;
    let isEdge = !isIE && !!window.StyleMedia;
    let isChrome = !isOpera && !isFirefox && !isIE && !isEdge;
    let isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isOpera) {
        return 'opera';
    } else if (isFirefox) {
        return 'firefox';
    } else if (isIE) {
        return 'ie';
    } else if (isEdge) {
        return 'edge';
    } else if (isChrome) {
        return 'chrome';
    } else if (isBlink) {
        return 'blick';
    }

    return 'none';
}

/*
function extrapolateUrlFromCookie(cookie) {
    let prefix = (cookie.secure ? 'https' : 'http') + '://';
    if (cookie.domain.charAt(0) === '.')
        prefix += 'www';

    return prefix + cookie.domain + cookie.path;
}
*/