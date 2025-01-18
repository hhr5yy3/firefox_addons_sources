

if ('undefined'===typeof browser && 'undefined'===typeof safari)
    var browser=typeof chrome !== 'undefined' ? chrome : null;

(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);


var verifrom = {
    appInfo : extensionConfig.appInfo,
    extension: {
        name: function() {
            return ("undefined" !== typeof safari) ? verifrom.appInfo.version : chrome.runtime.getManifest().name;
        },
        version: function() {
            return ("undefined" !== typeof safari) ? verifrom.appInfo.version : chrome.runtime.getManifest().version;
        },
        onInstalled:function(callback) {
            if (verifrom.appInfo.safari===true) {
                if (safari.extension.settings.hasRun!==true)
                {
                    safari.extension.settings.hasRun = true;
                    callback();
                }
            } else chrome.runtime.onInstalled.addListener(callback);
        },
        openOptions:function(query) {
            if ("string"===typeof query && query.length>0)
                query=query.replace(/^\?(.*)/,'$1');
            else query="";
            if (verifrom.appInfo.safari===true) {
                verifrom.tabs.create({'url':verifrom.getURL("html/options.html") + ("string" === typeof query ? '?' + query : '')});
            } else {
                if (verifrom.appInfo.quantum && browser && browser.windows && "function" === typeof browser.windows.create) {
                    browser.windows.create({
                        allowScriptsToClose: true,
                        titlePreface: "Options",
                        url: verifrom.getURL('/html/options.html' + ("string" === typeof query ? '?' + query : ''))
                    });
                }
                else if (!query && chrome && chrome.runtime && "function" === typeof chrome.runtime.openOptionsPage)
                    chrome.runtime.openOptionsPage();
                else if (!query && browser && browser.runtime && "function" === typeof browser.runtime.openOptionsPage)
                    browser.runtime.openOptionsPage();
                else if ("undefined" !== typeof chrome && "undefined" !== typeof chrome.runtime)
                    verifrom.tabs.create({'url': 'chrome://extensions/?options=' + chrome.runtime.id+ ("string" === typeof query ? '&' + query : '')});
            }
        }
    },
    windows: {
        getCurrent:function() {
            if (verifrom.appInfo.quantum)
                return browser.windows.getLastFocused();
            else {
                return new Promise(function (resolve, reject) {
                    chrome.tabs.getSelected(function (tab) {
                        void 0;
chrome.tabs.query({currentWindow: true}, function (tabs) {
                            void 0;

                            if (tabs && tabs.length > 0)
                                resolve({id: tabs[0].windowId});
                            else reject("no window selected");
                        });
                    });

                });
            }
        }
    },
    tabs : {
        create: function(options,callback) {
            if (verifrom.appInfo.safari===true)
            {
                if (!options.url)
                    return;
                if (!safari.application || !safari.application.activeBrowserWindow || "function" !== typeof safari.application.activeBrowserWindow.openTab)
                    return;
                var newTab = safari.application.activeBrowserWindow.openTab();
                newTab.url = options.url;
                if ("function"===typeof newTab.activate)
                    newTab.activate();
                return;
            } else {
                var promise=chrome.tabs.create(options,function(tab){
                    if (typeof callback==='function')
                        setTimeout(function() {
                            callback(tab.id);
                        },0);
                });
                if (promise && promise instanceof Promise)
                    promise.then(function(tab) {
                        if (typeof callback==='function')
                            callback(tab.id)
                    },function() {
                    }).catch(()=>{});
            }
        },
        reload: function(pattern) {
            if (verifrom.appInfo.safari) {
                var patternRE=new RegExp(pattern.join('|').replace(/\*/g,'.*'));
                for (var i=0;i<safari.application.browserWindows.length;i++) {
                    for (var j=0;j<safari.application.browserWindows[i].tabs.length;j++) {
                        var url=safari.application.browserWindows[i].tabs[j].url;
                        if (patternRE.test(url))
                            safari.application.browserWindows[i].tabs[j].url=url;
                    }
                }
            } else {
                chrome.tabs.query({url: pattern},
                    function (Tabs) {
                        for (var i = 0; i < Tabs.length; i++) {
                            if (Tabs[i].id) {
                                chrome.tabs.reload(Tabs[i].id);
                            }
                        }
                    });
            }
        },
        query: function(options, callback) {
            if (verifrom.appInfo.safari) {
                var tabs=[];
                for (var i=0;i<safari.application.browserWindows.length;i++) {
                    if ((options.currentWindow===true && safari.application.browserWindows[i].visible===true) || options.currentWindow!==true) {
                        var win=safari.application.browserWindows[i];
                        if (options.active===true)
                            tabs.push(win.activeTab)
                        else for (var j=0;j<win.tabs.length;j++) {
                            tabs.push(win.tabs[j]);
                        }
                    }
                }
                setTimeout(function() {
                    callback(tabs);
                },0);
            } else chrome.tabs.query(options,callback);
        },
        update: function(tabId, options) {
            if (verifrom.appInfo.safari)
            {
                var tab=verifrom.message.getTabById(tabId);
                tab.url=options.url;
            } else browser.tabs.update(tabId, options);
        },
        activate: function(tabId,winId) {
            void 0;
            if (!verifrom.appInfo.quantum) {
                verifrom.tabs.update(tabId,{active:true,highlighted:true});
            }
            else verifrom.tabs.update(tabId,{active:true,highlighted:true});
        },
        get: function(tabId,callback) {
            if (verifrom.appInfo.quantum)
            {
                var promise=browser.tabs.get(tabId);
                promise.then(function(tabInfo) {
                    callback(tabInfo);
                }).catch(function(reason){
                    callback({error:reason});
                });
            }
            else {
                chrome.tabs.get(tabId,callback);
            }
        },
        close: function(options, callback) {
            var matchingURL=options.url;
            var queryOptions=verifrom.merge(options);
            delete queryOptions.url;
            verifrom.tabs.query(queryOptions,function(tabs){
                if (matchingURL instanceof RegExp) {
                    for (let i=0;i<tabs.length;i++) {
                        if (tabs[i].url && matchingURL.test(tabs[i].url))
                            if (verifrom.appInfo.safari)
                                tabs[i].close();
                            else browser.tabs.remove(tabs[i].id);
                    }
                } else if ("string"===typeof machingURL) {
                    for (let i=0;i<tabs.length;i++) {
                        if (tabs[i].url && tabs[i].url===matchingURL)
                            if (verifrom.appInfo.safari)
                                tabs.close();
                            else browser.tabs.remove(tabs[i].id);
                    }
                }
            })
        }
    },
    console : {
        log: function ()
        {
            if (verifrom.appInfo.logLevel<=0)
                return;
            var argArray=Array.prototype.constructor.apply(null,arguments);
            if (argArray.length>1 && typeof argArray[0]==='number')
            {
                if (argArray[0]<=verifrom.appInfo.logLevel) {
                    argArray[0]=verifrom.appInfo.extensionCodeName+':';
                    console.debug.apply(console,argArray);
                }
            }
            else if (verifrom.appInfo.logLevel>1)
            {
                argArray.unshift(verifrom.appInfo.extensionCodeName+':');
                console.debug.apply(console,argArray);
            }
        },
        error: function ()
        {
            if (verifrom.appInfo.logLevel<=0)
                return;
            var argArray=Array.prototype.constructor.apply(null,arguments);
            if (argArray.length>1 && typeof argArray[0]==='number')
            {
                if (argArray[0]<=verifrom.appInfo.logLevel) {
                    argArray[0]=verifrom.appInfo.extensionCodeName+':';
                    console.error.apply(console,argArray);
                }
            }
            else if (verifrom.appInfo.logLevel>1)
            {
                argArray.unshift(verifrom.appInfo.extensionCodeName+':');
                console.error.apply(console,argArray);
            }
        },
        trace: function ()
        {
            if (verifrom.appInfo.logLevel<=0)
                return;
            var argArray=Array.prototype.constructor.apply(null,arguments);
            if (argArray.length>1 && typeof argArray[0]==='number')
            {
                if (argArray[0]<=verifrom.appInfo.logLevel) {
                    argArray[0]=verifrom.appInfo.extensionCodeName+':';
                    console.trace.apply(console,argArray);
                }
            }
            else if (verifrom.appInfo.logLevel>1)
            {
                argArray.unshift(verifrom.appInfo.extensionCodeName+':');
                console.trace.apply(console,argArray);
            }
        }
    },
    time: {
        secondsFromNow: function (delay) {
            var currentTime= +new Date();
            return (currentTime+(delay*1000));
        },
        now: function() {
            return (+new Date());
        }
    },
    date: {
        toString: function (timeStamp) {
            function pad(number) {
                return number < 10 ? '0' + number : number;
            }

            var dateToFormat=new Date(timeStamp);
            return dateToFormat.getFullYear() +
                '-' + pad( dateToFormat.getMonth() + 1 ) +
                '-' + pad( dateToFormat.getDate() ) +
                ' ' + pad( dateToFormat.getHours() ) +
                ':' + pad( dateToFormat.getMinutes() ) +
                ':' + pad( dateToFormat.getSeconds() ) +
                '.' + (dateToFormat.getMilliseconds() / 1000).toFixed(3).slice(2, 5);
        }
    },
    insertSource: function (source,type,csp,callback) {
        verifrom.message.addListener({channel:"getFile"},function(msg){
            var s = document.createElement('script');
            s.setAttribute('defer','true');
            s.setAttribute('verifromExtensionCodeName',verifrom.appInfo.extensionCodeName);
            if (csp === true) {
                let scp=window.top.document.body.querySelectorAll("script[nonce]");
                if (scp && scp.length > 0) {
                    let id = scp[0].getAttribute("nonce");
                    s.setAttribute('nonce',id);
                }
            }
            s.append(msg.data);
            (document.head||document.documentElement).appendChild(s);
            if (typeof callback === "function")
                setTimeout(callback,500);
        });
        verifrom.message.toBackground({"source":source,"type":type},{channel:"getFile"});
    },
    insertSourceWebExt: function (scriptFileName, def='true') {
        var s = document.createElement('script');
        s.setAttribute('defer',def);
        s.setAttribute('verifromExtensionCodeName',verifrom.appInfo.extensionCodeName);
        s.src = verifrom.getURL(verifrom.appInfo.scriptFilesFolder+scriptFileName);
        s.onload = function() {
            this.parentNode.removeChild(this);
        };
        (document.head||document.documentElement).appendChild(s);
    },
    insertCSSSheet: function (domElement) {
        if (domElement.ownerDocument===window.top.document || !(domElement.ownerDocument))
            return;
        var CSSlink=$('link#'+verifrom.appInfo.extensionCodeName, domElement.ownerDocument);
        if (CSSlink.length>0)
            return;
        var stylesheetURL = verifrom.getURL(verifrom.appInfo.cssFilesFolder+verifrom.appInfo.sidebarCSSFileName);
        var s=document.createElement('link');
        s.setAttribute('href', stylesheetURL);
        s.setAttribute('rel','stylesheet');
        s.setAttribute('type','text/css');
        s.setAttribute('id',verifrom.appInfo.extensionCodeName);
        domElement.ownerDocument.head.appendChild(s);
    },
    parseUrl:function(url) {
        var splitRegExp = new RegExp(
            '^' +
            '(?:' +
            '([^:/?#.]+)' +                         
            ':)?' +
            '(?://' +
            '(?:([^/?#]*)@)?' +                     
            '([\\s\\w\\d\\-\\u0100-\\uffff.%]*)' +     
            '(?::([0-9]+))?' +                      
            ')?' +
            '([^?#]+)?' +                           
            '(?:\\?([^#]*))?' +                     
            '(?:#(.*))?' +                          
            '$');

        var split = url.match(splitRegExp);
        var splitUserPwd = split[2] ? split[2].match(/([^:@]*):{0,1}(.*)/) : undefined;
        return {
            'scheme':split[1]===undefined ? "" : split[1],
            'host':split[3]===undefined ? "" : split[3],
            'domain':split[3]===undefined ? "" : split[3].split('.').splice(-2,2).join('.'),
            'port':split[4]===undefined ? "" : split[4],
            'path':split[5]===undefined ? "" : split[5],
            'query':split[6]===undefined ? "" : '?'+split[6],
            'searchObject': undefined,
            'hash':split[7]===undefined ? "" : '#'+split[7],
            'href':url,
            'username':splitUserPwd ? splitUserPwd[1] : '',
            'password':splitUserPwd ? splitUserPwd[2] : ''
        }
    },
    normalizeHostName: function(hostname)
    {
        var decodedHostname=unescape(hostname);
        while (decodedHostname !== unescape(decodedHostname))
            decodedHostname=unescape(decodedHostname);
        decodedHostname=decodedHostname.replace(/([^:]*:[\/]{1,2})(.*)/,'$2');
        decodedHostname=decodedHostname.replace(/^\.*/,'');
        decodedHostname=decodedHostname.replace(/\.*$/,'');
        decodedHostname=decodedHostname.toLowerCase();
        decodedHostname=decodedHostname.replace(/^www\./,'');
        decodedHostname=escape(decodedHostname);
        return decodedHostname;
    },
    getExtensionURL: function(documentName) {
        return chrome.extension.getURL(verifrom.appInfo.htmlFilesFolder+documentName);
    },
    getURL: function(documentPathName) {
        return (extensionConfig.appInfo.safari===true) ? (safari.extension.baseURI+documentPathName).replace(/([^:])\/{2,}/g,'$1/') : browser.extension.getURL(documentPathName);
    },
    chunkString :function(str, len) {
        const size = Math.ceil(str.length/len)
        const r = Array(size)
        let offset = 0
        for (let i = 0; i < size; i++) {
            r[i] = str.substr(offset, len)
            offset += len
        }
        return r;
    },
    cookie: {
        set:function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        get:function(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return null;
        }
    },
    customEvent: {
        customEventListeners:new Map(),
        oneEventListeners:new Map(),
        one:function(eventName, eventHandler) {
            if (verifrom.customEvent.oneEventListeners.has(eventName) && verifrom.customEvent.oneEventListeners.get(eventName)===eventHandler)
                return;
            verifrom.customEvent.oneEventListeners.set(eventName, eventHandler);
            $(window.top.document).one(verifrom.appInfo.extensionCodeName+eventName, eventHandler);
        },
        addEventListener:function(eventName, eventHandler) {
            if (verifrom.customEvent.customEventListeners.has(eventName) && verifrom.customEvent.customEventListeners.get(eventName)===eventHandler)
                return;
            verifrom.customEvent.customEventListeners.set(eventName, eventHandler);
            window.top.document.addEventListener(verifrom.appInfo.extensionCodeName+eventName, eventHandler);
        },
        removeEventListener:function(eventName, eventHandler) {
            verifrom.customEvent.customEventListeners.delete(eventName);
            window.top.document.removeEventListener(verifrom.appInfo.extensionCodeName+eventName, eventHandler);
        },
        dispatchEvent:function(event) {
            window.postMessage(event,window.top.location.origin);
        },
        CustomEvent:function(eventName, eventDetails) {
            if (eventDetails && eventDetails.detail) {
                eventDetails.verifrom = true;
                eventDetails.name = eventName;
                eventDetails.type = eventName;
                eventDetails.extensionCodeName = verifrom.appInfo.extensionCodeName;
                eventDetails.detail.extensionCodeName = verifrom.appInfo.extensionCodeName;
            }
            else {
                eventDetails={};
                eventDetails.verifrom = true;
                eventDetails.name = eventName;
                eventDetails.type = eventName;
                eventDetails.extensionCodeName = verifrom.appInfo.extensionCodeName;
                eventDetails.detail={extensionCodeName:verifrom.appInfo.extensionCodeName};
            }
            return eventDetails;
        }
    },
    dbStorage:
        {
            cachedData:null,
            _changeListeners:[],
            changeHandler:function(change,area) {
                if (area && area!=="local")
                    return;
                void 0;
                let k = Object.keys(change);
                for (let i=0;i<k.length;i++) {
                    let _data = change[k[i]].newValue;
                    if (!_data) {
                        delete verifrom.dbStorage.cachedData[k[i]];
                        continue;
                    }
                    if (_data.c)
                        _data.d=verifrom.LZString.decompressFromBase64(_data.d);
                    delete _data.c;
                    if (!verifrom.dbStorage.cachedData)
                        verifrom.dbStorage.cachedData = {};
                    verifrom.dbStorage.cachedData[k[i]] = _data;
                }
                for (let i=0;i<verifrom.dbStorage._changeListeners.length;i++)
                    setTimeout(verifrom.dbStorage._changeListeners[i],100);
            },
            onChange:function(callback) {
                if (verifrom.dbStorage._changeListeners.includes(callback)===false)
                    verifrom.dbStorage._changeListeners.push(callback);
            },
            init:function() {
                let onChanged = browser.storage.local.onChanged || browser.storage.onChanged;
                if (onChanged.hasListener(verifrom.dbStorage.changeHandler)===false)
                    onChanged.addListener(verifrom.dbStorage.changeHandler);
                return new Promise((resolve,reject)=>{
                    try {
                        browser.storage.local.get(null, (d) => {
                            if (d) {
                                let k = Object.keys(d);
                                verifrom.dbStorage.cachedData = {};
                                for (let i = 0; i < k.length; i++) {
                                    let _data = d[k[i]];
                                    if (_data.c) {
                                        let s=_data.d;
                                        _data.d = verifrom.LZString.decompressFromBase64(s);
                                    }
                                    verifrom.dbStorage.cachedData[k[i]] = _data;
                                }
                            } else d = {};
                            verifrom.dbStorage.cachedData = d;
                            resolve();
                        });
                    } catch(e) {
                        void 0;
                        reject(e);
                    }
                    if (localStorage && typeof localStorage.clear==="function")
                        localStorage.clear();
                });
            },
            clear:function() {
                void 0;
                verifrom.dbStorage.cachedData = {};
                browser.storage.local.clear();
            },
            removeItem:function(id) {
                delete verifrom.dbStorage.cachedData[id];
                browser.storage.local.remove(id);
            },
            remove:function(id) {
                delete verifrom.dbStorage.cachedData[id];
                browser.storage.local.remove(id);
            },
            get:function(id) {
                var item=verifrom.dbStorage.cachedData[id];
                if (item===undefined || item===null)
                    return undefined;
                else {
                    try {
                        if (typeof item !== "object")
                            item=jQuery.parseJSON(item);
                        if (item && item.DBtimeout)
                        {
                            var currentTime= +new Date();
                            if (item.DBtimeout>=currentTime)
                                return item.d;
                            else {
                                delete verifrom.dbStorage.cachedData[id];
                                browser.storage.local.remove(id);
                                return undefined;
                            }
                        }
                        return item ? item.d : item;
                    } catch (e) {
                        void 0;
                        return undefined;
                    }
                }
            },
            set:function(id, data, timeout, tries=0) {
                let _data = verifrom.dbStorage.cachedData[id] || {};
                _data.d=data;
                if (timeout)
                    _data.DBtimeout=timeout;
                verifrom.dbStorage.cachedData[id] = _data;
                let _d = {};
                if (typeof _data.d==="string" && _data.d.length>=1000000) {
                    let _dd={};
                    _dd.d = verifrom.LZString.compressToBase64(_data.d);
                    _dd.c=true;
                    if (_data.DBtimeout)
                        _dd.DBtimeout = _data.DBtimeout;
                    _d[id] = _dd;
                } else _d[id] = _data;
                browser.storage.local.set(_d, function() {
                    let error = (chrome && chrome.runtime) ? chrome.runtime.lastError : undefined;
                    if (error && tries > 3)
                        return;
                    if (error && /MAX_WRITE_OPERATIONS/.test(error.message)) {
                        void 0;
                        tries++;
                        setTimeout(()=>{
                            verifrom.dbStorage.set(id, data, timeout, tries);
                        },30000*tries);
                    }
                });
                return true;
            }
        },
    merge: function(){
        if (arguments.length===0)
            return {};
        var a = [].slice.call( arguments ), i = 0;
        if (!a || a.length<=0)
            return {};
        while( a[i] )
            a[i] = JSON.stringify( a[i++] ).slice( 1,-1 );
        return JSON.parse( "{"+ a.join().replace(/,*$/g,'') +"}" );
    },
    db:
        {
            removeItem:function(id) {
                return sessionStorage.removeItem(id);
            },
            remove:function(id) {
                return sessionStorage.removeItem(id);
            },
            get:function(id) {
                var item=sessionStorage.getItem(id);
                if (item===undefined || item===null)
                    return undefined;
                else {
                    try {
                        item=jQuery.parseJSON(item);
                        if (item && item.DBtimeout)
                        {
                            var currentTime= +new Date();
                            if (item.DBtimeout>=currentTime)
                            {
                                delete item['DBtimeout'];
                                return item;
                            }
                            else {
                                sessionStorage.removeItem(id);
                                return undefined;
                            }
                        }
                        return item;
                    } catch (e) {
                        return undefined;
                    }
                }
            },

            set:function(id, data, timeout) {
                try {
                    if (timeout)
                    {
                        data['DBtimeout']=timeout;
                    }
                    sessionStorage.setItem(id, JSON.stringify(data));
                    return true;
                } catch (e) {
                    void 0;
                    return null;
                }
            }
        },
    indexeddb : {
        openedDBs:[],
        close(dbName)
        {
            if (verifrom.indexeddb.openedDBs[dbName])
            {
                verifrom.indexeddb.openedDBs[dbName].close();
                delete verifrom.indexeddb.openedDBs[dbName];
            }
        },
        open : function(dbName, objectStoreName, objectStoreOptions, dbVersion, onSuccessCallBack, onErrorCallBack, onUpgradeCallBack)
        {
            var openRequest;

            if ((typeof onSuccessCallBack !== 'function') || (typeof onErrorCallBack !== 'function'))
                throw 'VF - missing argument for opening indexedDB';

            if (verifrom.indexeddb.openedDBs[dbName] && verifrom.indexeddb.openedDBs[dbName].objectStoreNames.contains(objectStoreName))
                return onSuccessCallBack(verifrom.indexeddb.openedDBs[dbName]);
            else openRequest = indexedDB.open(dbName,dbVersion);

            openRequest.onupgradeneeded = function(dbEvent) {
                var thisDB = dbEvent.target.result;

                if(!thisDB.objectStoreNames.contains(objectStoreName)) {
                    var objectStore=verifrom.indexeddb.objectStore.create(thisDB, objectStoreName, objectStoreOptions);
                    if (typeof onUpgradeCallBack === 'function')
                        objectStore.transaction.oncomplete=onUpgradeCallBack(dbEvent);
                    return;
                }
                if (typeof onUpgradeCallBack === 'function')
                    onUpgradeCallBack(dbEvent);
            };
            openRequest.onsuccess = function(dbEvent) {
                var objectStore;

                verifrom.indexeddb.openedDBs[dbName]=dbEvent.target.result;
                verifrom.indexeddb.openedDBs[dbName].onversionchange = function(event) {
                    verifrom.indexeddb.close(dbName);
                };
                if(!verifrom.indexeddb.openedDBs[dbName].objectStoreNames.contains(objectStoreName)) {
                    objectStore=verifrom.indexeddb.objectStore.create(verifrom.indexeddb.openedDBs[dbName], objectStoreName, objectStoreOptions);
                    objectStore.transaction.oncomplete=onSuccessCallBack;
                }
                else {
                    onSuccessCallBack(dbEvent);
                }
            };
            openRequest.onerror = function(dbEvent) {
                void 0;
                onErrorCallBack(dbEvent);
            };
        },
        get : function(dbName)
        {
            return verifrom.indexeddb.openedDBs[dbName];
        },
        transaction : function(dbName, objectStores, transactionMode) {
            if (verifrom.indexeddb.openedDBs[dbName])
            {
                return verifrom.indexeddb.openedDBs[dbName].transaction(typeof objectStores==='string' ? [objectStores] : objectStores, transactionMode);
            }
            else throw 'Database '+dbName+' not opened';
        },
        objectStore: {
            create: function(dbObject, objectStoreName, objectStoreOptions) {
                return dbObject.createObjectStore(objectStoreName, objectStoreOptions);
            },
            get : function(dbName, objectStoreName, options)
            {
                if (verifrom.indexeddb.openedDBs[dbName] && verifrom.indexeddb.openedDBs[dbName].objectStoreNames.contains(objectStoreName))
                    return verifrom.indexeddb.openedDBs[dbName].transaction(objectStoreName, options?options:"readwrite").objectStore(objectStoreName);
                else throw 'DB '+dbName+' with '+objectStoreName+' is not opened';
            },
            createIndex: function(objectStore, indexName, keyId, indexOptions) {
                objectStore.createInxdex(indexName, keyId, indexOptions);
            },
            clear : function(dbName, objectStoreName, onSuccessCallBack) {
                var store=get(dbName, objectStoreName);
                store.clear().onsuccess = function (dbEvent) {
                    void 0;
                    if (typeof onSuccessCallBack === 'function')
                        onSuccessCallBack(dbEvent);
                };
            },
            operationItem: function(dbName, storeName, operation, object, onSuccessCallBack, onErrorCallBack) {
                var transaction=verifrom.indexeddb.transaction(dbName,[storeName],'readwrite');
                var addedItemsCounter=0;

                transaction.oncomplete=function(dbEvent){
                    void 0;

                    if (object.forEach)
                    {
                        if (addedItemsCounter===object.length && typeof onSuccessCallBack==='function')
                            onSuccessCallBack();
                        else if (typeof onErrorCallBack==='function')
                            onErrorCallBack()
                        else throw 'Error in DB operation '+arguments.caller;
                    } else if (typeof onSuccessCallBack==='function')
                        onSuccessCallBack(dbEvent);
                };
                transaction.onerror=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                transaction.onabort=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                var objectStore=transaction.objectStore([storeName]);

                if (!object || !objectStore || !objectStore.add)
                    throw 'Store is not accessible';
                if (object.forEach)
                {
                    object.forEach(function(item) {
                        var request=objectStore[operation](item);
                        request.onsuccess=function(dbEvent) {
                            addedItemsCounter++;
                        };
                        request.onerror=function(dbEvent) {
                            if (typeof onErrorCallBack==='function')
                                onErrorCallBack(dbEvent);
                            else throw 'Error updating item';
                        };
                    });
                }
                else {
                    var request=objectStore[operation](object);
                    request.onsuccess=function(dbEvent) {
                    };
                    request.onerror=function(dbEvent) {
                    };
                }
            },
            addItem: function(dbName, storeName, object, onSuccessCallBack, onErrorCallBack) {
                verifrom.indexeddb.objectStore.operationItem(dbName, storeName, 'add', object, onSuccessCallBack, onErrorCallBack);
            },
            putItem: function(dbName, storeName, object, onSuccessCallBack, onErrorCallBack) {
                verifrom.indexeddb.objectStore.operationItem(dbName, storeName, 'put', object, onSuccessCallBack, onErrorCallBack);
            },
            deleteItem: function(dbName, storeName, keyValue, onSuccessCallBack, onErrorCallBack) {
                if (!keyValue) {
                    void 0;
                    throw `deleteItem - missing keyValue - keyValue=${keyValue}`;
                    return;
                }
                var request;
                var transaction=verifrom.indexeddb.transaction(dbName,[storeName],'readwrite');
                transaction.oncomplete=function(dbEvent){
                    void 0;
                };
                transaction.onerror=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                transaction.onabort=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                var objectStore=transaction.objectStore([storeName]);

                if (objectStore && typeof objectStore.delete === 'function' && keyValue)
                {
                    request=objectStore.delete(keyValue);
                    request.onsuccess=onSuccessCallBack.bind(request);
                    request.onerror=onErrorCallBack;
                }
                else {
                    if (objectStore)
                        throw `deleteItem - Bad store argument - keyValue=${keyValue} objectStore=${objectStore} - no get`;
                    else throw `deleteItem - Bad store argument - keyValue=${keyValue} objectStore=${objectStore} - no keyValue`;
                }
            },
            getItem: function(dbName, storeName, keyValue, onSuccessCallBack, onErrorCallBack) {
                var getRequest;
                var transaction=verifrom.indexeddb.transaction(dbName,[storeName],'readonly');
                transaction.oncomplete=function(dbEvent){
                    void 0;
                };
                transaction.onerror=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                transaction.onabort=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                var objectStore=transaction.objectStore([storeName]);

                if (objectStore && objectStore.get && keyValue)
                {
                    getRequest=objectStore.get(keyValue);
                    getRequest.onsuccess=onSuccessCallBack.bind(getRequest);
                    getRequest.onerror=onErrorCallBack;
                }
                else throw 'Bad store argument';
            },
            getAllItems: function(dbName, objectStoreName, onSuccessCallBack, onErrorCallBack) {
                var itemsArray=[];
                var transaction=verifrom.indexeddb.transaction(dbName,[objectStoreName],'readonly');
                transaction.oncomplete=function(dbEvent){
                    void 0;
                    if (typeof onSuccessCallBack==='function')
                    {
                        onSuccessCallBack.bind(itemsArray)(dbEvent);
                    }
                };
                transaction.onerror=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                transaction.onabort=function(dbEvent){
                    void 0;
                    if (typeof onErrorCallBack==='function')
                        onErrorCallBack(dbEvent);
                };
                var objectStore=transaction.objectStore(objectStoreName);

                var request=objectStore.openCursor();
                request.onsuccess = function(dbEvent) {
                    var cursor = dbEvent.target.result;
                    if (cursor)
                    {
                        itemsArray.push(cursor.value);
                        cursor.continue();
                    }
                };
            }
        }
    },
    dom: {
        createSanitizedDoc: function(title, htmlContent, callback)
        {
            verifrom.sanitizer.getSanitizedHTMLContent(htmlContent,function(sanitizedContent){
                var doc = document.implementation.createHTMLDocument(title);
                var range=doc.createRange();
                range.selectNode(doc.body);
                var parser=new DOMParser;
                var newdoc=parser.parseFromString(sanitizedContent, "text/html");
                var newNode=doc.importNode(newdoc.documentElement,true);
                doc.replaceChild(newNode,doc.documentElement);
                callback(doc);
            });
        },
        location:{
            href:window.top.document.location.href,
            hostname:window.top.document.location.hostname,
            domainname:window.top.document.location.hostname.replace(/.*?([^\.]+\.[^\.]+)$/,"$1"),
            pathname:window.top.document.location.pathname
        },
        isIframe:function() {
            return (window.self !== window.top);
        }
    },

    JSON: {
        parse:function(string) {
            return jQuery.parseJSON(string);
        }
    },

    request: {
        Queue:function() {
            this.requestsQueue=[];
            this.requestsQueueParams=[];
            this.nbRequestsQueued=0;
            this.nbError=0;
            this.nbSuccess=0;
            this.callback=undefined;
        },
        get:function(paramObject) {
            if (!paramObject.url || !paramObject.onSuccess || !paramObject.onFailure || !paramObject.contentType || !paramObject.responseDataType)
                throw "Missing argument";

            if (verifrom.appInfo.safari===true && /^safari-extension/.test(paramObject.url)) {
                var onSuccessHandler=paramObject.onSuccess;
                verifrom.message.addListener({channel:paramObject.url},onSuccessHandler);
                delete paramObject.onSuccess;
                delete paramObject.onFailure;
                verifrom.message.toBackground(paramObject,{channel:"loaduri"});
            } else {
                jQuery.support.cors = true;
                $.ajax({url:paramObject.url, context: paramObject.context,
                    success:paramObject.onSuccess,
                    error:paramObject.onFailure,
                    contentType:paramObject.contentType,
                    type:"get",
                    dataType:paramObject.responseDataType,
                    crossDomain:true,
                    headers:paramObject.additionalRequestHeaders ?  paramObject.additionalRequestHeaders : {},
                    timeout:paramObject.timeout ? paramObject.timeout : 20000
                });
            }
        },
        post:function(paramObject,values) {
            if (!paramObject.url || !paramObject.onSuccess || !paramObject.onFailure || !paramObject.contentType || !paramObject.responseDataType)
                throw "Missing argument";

            if (verifrom.appInfo.safari===true && /^safari-extension/.test(paramObject.url)) {
                var onSuccessHandler=paramObject.onSuccess;
                verifrom.message.addListener({channel:paramObject.url},onSuccessHandler);
                delete paramObject.onSuccess;
                delete paramObject.onFailure;
                verifrom.message.toBackground(paramObject,{channel:"loaduri"});
            } else {
                jQuery.support.cors = true;
                $.ajax({url:paramObject.url, context: paramObject.context,
                    success:paramObject.onSuccess,
                    error:paramObject.onFailure,
                    contentType:paramObject.contentType,
                    type:"post",
                    dataType:paramObject.responseDataType,
                    crossDomain:true,
                    headers:paramObject.additionalRequestHeaders ?  paramObject.additionalRequestHeaders : {},
                    timeout:paramObject.timeout ? paramObject.timeout : 20000,
                    data:values
                });
            }
        }
    },

    setTimeout:function(callback, timer) {
        return window.setTimeout(callback, timer);
    },

    clearTimeout:function(timeoutID) {
        if(typeof timeoutID == "number")
            window.clearTimeout(timeoutID);
    },

    openURL:function(optionObject) {
        if (optionObject && optionObject.url && optionObject.where)
            window.open(optionObject.url, '_blank');
    },
    notifications : {
        enabled:false,
        checkEnabled:function() {
            if (extensionConfig.appInfo.safari===true)
                return;
            if (extensionConfig.appInfo.quantum) {
                verifrom.notifications.enabled=true;
            } else {
                if (!chrome.notifications || !chrome.notifications.getPermissionLevel)
                    return;
                chrome.notifications.getPermissionLevel(function(level) {
                    void 0;
                    verifrom.notifications.enabled=(level==='granted');
                });
                if (!chrome.notifications || !chrome.notifications.onPermissionLevelChanged)
                    return;
                chrome.notifications.onPermissionLevelChanged.addListener(function(level){
                    void 0;
                    verifrom.notifications.enabled=(level==='granted');
                });
            }
        },
        clickHandlers:{},
        clickHandlerSet:false,
        onClosedSet:false,
        onClosed:function(notificationId,byUser){
            void 0;
            if (typeof verifrom.notifications.clickHandlers[notificationId]==='function')
                delete verifrom.notifications.clickHandlers[notificationId];
        },
        clickHandler:function(notificationId, buttonIndex) {
            void 0;
            if (typeof verifrom.notifications.clickHandlers[notificationId]==='function')
            {
                verifrom.notifications.clickHandlers[notificationId]();
            } else void 0;
        },
        clear:function(id, callback) {
            void 0;
            if (typeof verifrom.notifications.clickHandlers[id]==='function')
                delete verifrom.notifications.clickHandlers[id];
            chrome.notifications.clear(id,function(cleared){
                if (typeof callback==='function')
                    setTimeout(function() {
                        callback(cleared);
                    },0);
            });
        },
        display:function(msg) {
            if (!verifrom.notifications.enabled)
            {
                void 0;
                return;
            }
            try {
                var id=extensionConfig.appInfo.extensionName+(msg.id || "Message");
                verifrom.notifications.clear(id,function(cleared){
                    var n={
                        "type": "basic",
                        "iconUrl": msg.iconUrl ? verifrom.getURL(msg.iconUrl) : verifrom.getURL("img/icon65.png"),
                        "title": msg.title ? msg.title : extensionConfig.appInfo.extensionName,
                        "message": msg.message ? msg.message : ""
                    };
                    if (typeof msg.onClicked==='function') {
                        if (verifrom.notifications.clickHandlerSet===false)
                            chrome.notifications.onClicked.addListener(verifrom.notifications.clickHandler);
                        verifrom.notifications.clickHandlerSet=true;
                        n.isClickable=true;
                        verifrom.notifications.clickHandlers[id]=msg.onClicked;
                    }
                    if (verifrom.notifications.onClosedSet===false) {
                        chrome.notifications.onClosed.addListener(verifrom.notifications.onClosed);
                        verifrom.notifications.onClosedSet=true;
                    }
                    chrome.notifications.create(id,n);
                    void 0;
                });
            } catch (e) {
                void 0;
            }
        }
    },
    contextMenus: extensionConfig.appInfo.safari===false ? (browser.contextMenus || chrome.contextMenus) : null,
    browserAction: {
        onClicked:function(callback) {
            if (verifrom.appInfo.safari===true)
                safari.application.addEventListener("command", callback, false);
            else chrome.browserAction.onClicked.addListener(callback);
        },
        popups:{
            "html/notListening.html":"NotListening",
            "html/notReady.html":"NotReady",
            "html/reminder.html":"Reminder",
            "html/empty.html":"Update",
            "html/notAuthentified.html":"notAuthentified",
            "html/reportphishing.html":"ReportPhishing",
            "html/notAvailable.html":"notAvailable"
        },
        setTitle:function(options) {
            if (verifrom.appInfo.safari)
                safari.extension.toolbarItems[0].toolTip=options.title;
            else browser.browserAction.setTitle({"title": options.title});
        },
        setPopup:function(popupObject) {
            if (popupObject && popupObject.popup && popupObject.popup.length>0 && !verifrom.browserAction.popups[popupObject.popup])
                throw "Unknown popup Id :"+popupObject.popup;
            if (verifrom.appInfo.safari) {
                if (popupObject && popupObject.popup.length>0)
                    safari.extension.toolbarItems[0].popover=safari.extension.popovers[verifrom.browserAction.popups[popupObject.popup]];
            } else {
                browser.browserAction.setPopup({"tabId": popupObject.tabId, "popup": popupObject.popup});
            }
        },
        openPopup:function() {
            if (verifrom.appInfo.safari)
                safari.extension.toolbarItems[0].showPopover();
            else if (verifrom.appInfo.quantum)
                browser.browserAction.openPopup();
            else throw "openPopup : unsupported feature";
        },
        setBadgeText:function(option) {
            browser.browserAction.setBadgeText(option);
        }
    },
    settings: {
        options:null,
        cache:null,
        nextWriteOp: null,
        get:function(defaults,callback) {
            if (verifrom.appInfo.safari) {
                callback(verifrom.merge(defaults,safari.extension.settings,safari.extension.secureSettings));
            } else {
                if (verifrom.settings.cache===null)
                    chrome.storage.sync.get(defaults,(items) => {
                        verifrom.settings.cache = Object.assign(defaults, items);
                        callback(verifrom.settings.cache);
                    });
                else callback(verifrom.settings.cache)
            }
        },
        set:function(items,callback, tries = 0) {
            if (verifrom.appInfo.safari) {
                Object.keys(items).forEach(function (item) {
                    if (item==='password')
                        safari.extension.secureSettings[item] = items[item];
                    else if (item!=='password')
                        safari.extension.settings[item] = items[item];
                    else throw "Cannot set settings for item "+item;
                });
                callback(verifrom.merge(safari.extension.settings,safari.extension.secureSettings));
            } else {
                if (verifrom.settings.nextWriteOp) {
                    clearTimeout(verifrom.settings.nextWriteOp);
                    verifrom.settings.nextWriteOp = null;
                }
                verifrom.settings.nextWriteOp = setTimeout(()=>{
                    chrome.storage.sync.set(verifrom.settings.cache, () =>{
                        tries++;
                        let error = (chrome && chrome.runtime) ? chrome.runtime.lastError : undefined;
                        if (error && tries > 10)
                            return;
                        if (error && /MAX_WRITE_OPERATIONS/.test(error.message)) {
                            void 0;
                            setTimeout(()=>{
                                verifrom.settings.set(items, null, tries);
                            },30000*tries);
                            return;
                        }
                    });
                },tries*10000);
                if (verifrom.settings.cache && tries===0) {
                    verifrom.settings.cache = Object.assign(verifrom.settings.cache, items);
                    if (callback)
                        callback.call(this, verifrom.settings.cache);
                } else if (!verifrom.settings.cache) {
                    verifrom.settings.cache = Object.assign({}, items);
                    if (callback)
                        callback.call(this, verifrom.settings.cache);
                }

            }
        },
        onChangedSafariHandler:function(event) {
            if (event.key==="open" && event.newValue!==event.oldValue)
            {
                void 0;
                verifrom.extension.openOptions();
                return;
            } else if (event.key==="open")
            {
                void 0;
                return;
            }
            if (event.newValue===event.oldValue)
            {
                void 0;
                return;
            }
            if ('function'===typeof this)
                this(verifrom.merge(safari.extension.settings,safari.extension.secureSettings));
        },
        onChanged: {
            addListener:function(callback) {
                if (verifrom.appInfo.safari) {
                    safari.extension.settings.addEventListener("change", verifrom.settings.onChangedSafariHandler.bind(callback), false);
                    safari.extension.secureSettings.addEventListener("change", verifrom.settings.onChangedSafariHandler.bind(callback), false);
                }
                else
                    chrome.storage.onChanged.addListener(function(items,areaName){
                        if (areaName==='sync')
                            callback(items);
                    });
            }
        }
    },
    messageSafari:{
        tabId:null,
        messageChannels:{},
        connectListener:false,
        setTabId: function() {
            if (verifrom.message.tabId===null)
                verifrom.message.tabId=Math.floor(Math.random() * Math.floor(10000))+"-"+Date.now();
        },
        messageHandler:function(event) {
            verifrom.message.setTabId();
            void 0;
            var channel=event.name || event.message.channel;
            if (channel && verifrom.message.messageChannels[channel])
            {
                if (event.tabId && event.tabId!==verifrom.messageSafari.tabId)
                {
                    void 0;
                    return;
                }
                delete event.channel;
                verifrom.message.messageChannels[channel](event.message);
            }
        },
        addListener:function(optionObject, callback)
        {
            if (!(typeof callback === "function"))
                throw "Callback is not a function";
            var context=safari.application || safari.self;
            this.messageChannels[optionObject.channel]=callback;
            if (this.connectListener===false)
            {
                context.addEventListener(
                    "message",
                    verifrom.message.messageHandler,
                    false);
                this.connectListener=true;
            }
        },
        removeListener:function(channel) {
            if (typeof channel==="object")
                delete this.messageChannels[channel.channel]
            else delete verifrom.message.messageChannels[channel];
        },
        toBackground:function(message, optionObject)
        {
            var request=message;

            if (optionObject && optionObject.channel)
            {
                try
                {
                    verifrom.message.setTabId();
                    void 0;
                    request['_channel']=optionObject.channel;
                    request['_tabId']=verifrom.message.tabId;
                    safari.extension.dispatchMessage(optionObject.channel, request);
                } catch(e)
                {
                    void 0;
                }

            }
        }
    },
    messageWebExt: {
        messageChannels:{},
        listeningChannels:false,
        connectListner: ("undefined" !== typeof chrome) ? chrome.runtime.onConnect.addListener(function(port) { messagePorts[port.name]=port;}) : undefined,
        addListener:function(optionObject, callback)
        {
            if (!(typeof callback === "function"))
                throw "Callback is not a function";
            if (browser && browser.runtime && "object" === typeof browser.runtime.onMessage)
            {
                this.messageChannels[verifrom.appInfo.extensionCodeName+optionObject.channel]=callback;
                if (verifrom.message.listeningChannels)
                {
                    void 0;
                    return;
                }
                verifrom.message.listeningChannels=true;
                browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                    void 0;
                    if (request.channel && typeof verifrom.message.messageChannels[request.channel]==='function')
                    {
                        var _response=request['_response'];
                        var channel=request.channel;
                        delete request['channel'];
                        delete request['_response'];
                        setTimeout(verifrom.message.messageChannels[channel].bind(null,request, sender, _response ? sendResponse : false),1);
                        return _response ? true : false;
                    }
                });
            }
        },
        removeListener:function(channel) {
            delete verifrom.message.messageChannels[channel];
        },
        toBackground:function(message, optionObject)
        {
            if (chrome)
            {
                void 0;

                var request=message;
                if (optionObject && optionObject.channel)
                    request['channel']=verifrom.appInfo.extensionCodeName+optionObject.channel;
                try {
                    if (typeof optionObject.response==='function') {
                        var responseHandler=optionObject.response;
                        request['_response']=true;
                        if (verifrom.appInfo.quantum===true) {
                            var sending=browser.runtime.sendMessage(request);
                            sending.then(responseHandler,function() {
                                void 0;
                            }.bind(optionObject));
                        } else {
                            browser.runtime.sendMessage(request,responseHandler);
                        }
                    } else {
                        request['_response']=false;
                        browser.runtime.sendMessage(request);
                    }
                } catch(e)
                {
                    void 0;
                }
            }
        },
        toAllTabs:function(message, optionObject,callback)
        {
            var request=message;
            var anyTab=false;
            try {
                if (optionObject && optionObject.channel)
                    request['channel']=verifrom.appInfo.extensionCodeName+optionObject.channel;
                chrome.tabs.query({status:undefined},function(Tabs) {
                    for (var i=0;i<Tabs.length;i++)
                    {
                        if (Tabs[i].id)
                        {
                            let p=browser.tabs.sendMessage(Tabs[i].id, request);
                            if (p instanceof Promise)
                                p.catch(reason=>{
                                   void 0;
                                });
                            anyTab=true;
                        }
                    }
                    if ("function"===typeof callback)
                        setTimeout(function() {
                            callback(anyTab);
                        },0);
                });
            } catch(e)
            {
                void 0;
                if ("function"===typeof callback)
                    setTimeout(function() {
                        callback(anyTab);
                    },0);
            }
        },
        toActiveTabs:function(message, optionObject)
        {
            var request=message;
            if (optionObject && optionObject.channel)
                request['channel']=verifrom.appInfo.extensionCodeName+optionObject.channel;

            try {
                chrome.tabs.query({active:true, currentWindow:true},function(Tabs) {
                    for (var i=0;i<Tabs.length;i++)
                    {
                        if (Tabs[i].id)
                        {
                            browser.tabs.sendMessage(Tabs[i].id, request);
                        }
                    }
                });
            } catch(e)
            {
                void 0;
            }
        },
        toTab:function(tabID, message, optionObject)
        {
            var request=message;
            if (optionObject && optionObject.channel)
                request['channel']=verifrom.appInfo.extensionCodeName+optionObject.channel;
            try {
                browser.tabs.sendMessage(tabID, request);
            } catch(e)
            {
                void 0;
            }
        },
        getFullChannel:function(channelSuffix)
        {
            return verifrom.appInfo.extensionCodeName+channelSuffix;
        }
    },
    message: null,
    sanitizer: {
        getSanitizedURLContent:function(url) {
            return new Promise((resolve,reject)=>{
                try {
                    if (typeof window.fetch==="function") {
                        fetch(url).then(r=>{
                            r.blob().then(b=>{
                                if (typeof b.text !== "function")
                                    throw "Could not get content " + url + " to sanitize : b.text is not a function";
                                b.text().then(content=>{
                                    let purifiedContent = DOMPurify.sanitize(content,{ADD_ATTR: ['data-VerifromLocalize','yes','no','target'],WHOLE_DOCUMENT: true, ADD_TAGS: ['link','iframe']});
                                    resolve(purifiedContent);
                                }).catch(reason=>{
                                    reject(reason);
                                });
                            }).catch(reason=>{
                                reject(reason);
                            });
                        }).catch(reason=>{
                            reject(reason);
                        });
                    } else {
                        verifrom.request.get({
                            url: url,
                            onSuccess: function (content) {
                                let purifiedContent = DOMPurify.sanitize(content,{ADD_ATTR: ['data-VerifromLocalize','yes','no','target'],WHOLE_DOCUMENT: true, ADD_TAGS: ['link','iframe']});
                                resolve(purifiedContent);
                            },
                            onFailure: function (httpCode) {
                                reject ("Could not get content " + url + " to sanitize : " + httpCode);
                            },
                            contentType:'application/x-www-form-urlencoded',
                            responseDataType:'html'
                        });
                    }
                }catch(e){
                    void 0;
                    reject(e);
                }
            });
        },
        getSanitizedHTMLContent:function(htmlContent, onSuccessCallBack)
        {
            var sanitizedContent=DOMPurify.sanitize(htmlContent, {ADD_ATTR: ['data-VerifromLocalize'], WHOLE_DOCUMENT: true, ADD_TAGS: ['link','iframe']});
            if ("function"===typeof onSuccessCallBack)
                setTimeout(function(){
                    onSuccessCallBack(sanitizedContent);
                },100);
            return sanitizedContent;
        }
    },
    Sidebar: function(sidebarParams, localizeData)
    {
        void 0;
        this.sidebarTheme = sidebarParams.theme ? sidebarParams.theme : 'default';
        this.sidebarId = verifrom.appInfo.extensionCodeName+'SideBar'+(new Date()).getTime();
        this.sidebarClassBase = verifrom.appInfo.extensionName+'SideBar';
        this.stylesheetURL = verifrom.getURL(verifrom.appInfo.cssFilesFolder+verifrom.appInfo.sidebarCSSFileName);
        this.sidebarParams=sidebarParams;
        this.lastSideBarTypeDisplayed=undefined;
        this.views={};

        $('.'+this.sidebarClassBase).remove();

        var divElement  = document.createElement ("div");
        divElement.setAttribute('id',this.sidebarId);
        divElement.setAttribute('class',this.sidebarClassBase+' '+this.sidebarClassBase+'-container');

        var divContent = document.createElement ("div");
        divContent.setAttribute('class',this.sidebarClassBase+'-content-theme-'+this.sidebarTheme+' '+this.sidebarClassBase+'-content-right-theme-'+this.sidebarTheme);

        var divHeader = document.createElement ("div");
        divHeader.setAttribute('class',this.sidebarClassBase+'-header-theme-'+this.sidebarTheme);

        var divTitle = document.createElement ("span");
        divTitle.setAttribute('class',this.sidebarClassBase+'-title-theme-'+this.sidebarTheme);
        if (sidebarParams.title.content)
            divTitle.textContent=sidebarParams.title.content;

        if (sidebarParams.title.close)
        {
            var divClose = document.createElement ("div");
            divClose.setAttribute('class',this.sidebarClassBase+'-close-theme-'+this.sidebarTheme);
            divClose.setAttribute('id',this.sidebarId+'-close');
        }

        var divBody = document.createElement ("div");
        divBody.setAttribute('class',this.sidebarClassBase+'-body-theme-'+this.sidebarTheme);


        divHeader.appendChild(divTitle);
        divHeader.appendChild(divClose);
        divContent.appendChild(divHeader);
        divContent.appendChild(divBody);
        divElement.appendChild(divContent);
        if (!sidebarParams.openOnInstall)
            $(divElement).addClass(this.sidebarClassBase+'-container-closed');

        if (sidebarParams.opacity)
            $(divElement).css('opacity', sidebarParams.opacity);
        if (sidebarParams.width)
            $(divElement).css('width', sidebarParams.width);
        if (sidebarParams.height)
            $(divElement).css('height', sidebarParams.height);

        document.body.insertBefore(divElement, document.body.lastChild);

        if (sidebarParams.events && sidebarParams.events.onShow && (typeof sidebarParams.events.onShow === "function"))
            $(divElement).on('show', sidebarParams.events.onShow);
        if (sidebarParams.events && sidebarParams.events.onHide && (typeof sidebarParams.events.onHide === "function"))
            $(divElement).on('hide', sidebarParams.events.onHide);

        if (sidebarParams.title.close)
        {
            if (sidebarParams.closeAction.indexOf('click')>=0)
                $('#'+this.sidebarId+'-close').get(0).addEventListener('click', $.proxy(this.close,this,this));
            if (sidebarParams.closeAction.indexOf('dblclick')>=0)
                $('#'+this.sidebarId+'-close').get(0).addEventListener('dblclick', $.proxy(this.close,this,this));
        }
        if (sidebarParams.scrollbars!==undefined && sidebarParams.scrollbars===false)
            $(divBody).css('overflow','hidden');

        if (sidebarParams.views && sidebarParams.views.length>0)
        {
            for (var i=0;i<sidebarParams.views.length;i++) {

                var viewParams=sidebarParams.views[i];
                this.addView(viewParams.id, viewParams.url, viewParams.sanitize, viewParams.localize, localizeData, viewParams.head);
            }
        }
        return this;
    },
    notifier:
        {
            createdNotifiers:new Map(),
            divElement:undefined,
            show: function(notifierParams, closeEventCallback, showEventCallback)
            {
                function insertNotifier(params,callback)
                {
                    var frameElement=document.createElement("iframe");
                    var frameElementId='notifier'+params.position;
                    frameElement.onload=function(event){
                        var ntfElement=document.createElement('div');
                        ntfElement.setAttribute('class','verifromNotifier-ntf');
                        ntfElement.setAttribute('style','display: block;');
                        ntfElement.setAttribute('width',params.width);

                        var divContent=document.createElement('div');
                        divContent.setAttribute('class','verifromNotifier-ntf-content-theme-'+(params.theme ? params.theme : 'default'));
                        divContent.setAttribute('style','cursor:default');

                        var divClose=document.createElement('div');
                        divClose.setAttribute('class','verifromNotifier-close-theme-'+(params.theme ? params.theme : 'default'));

                        var divHeader=document.createElement('div');
                        divHeader.setAttribute('class','verifromNotifier-header-theme-'+(params.theme ? params.theme : 'default'));

                        var divTitle=document.createElement('span');
                        divTitle.setAttribute('class','verifromNotifier-title-theme-'+(params.theme ? params.theme : 'default'));
                        divTitle.textContent=params.title;

                        var divBody=document.createElement('div');
                        divBody.setAttribute('class','verifromNotifier-body-theme-'+(params.theme ? params.theme : 'default'));
                        if (params.body) {
                            divBody.innerHTML=verifrom.sanitizer.getSanitizedHTMLContent(params.body);
                        } else if (params.url) {
                            verifrom.sanitizer.getSanitizedURLContent(params.url).then(htmlcontent=>{
                                divBody.innerHTML=htmlcontent;
                            }).catch(reason=>{
                                void 0;
                            });
                        }
                        if (params.localize===true) {
                            verifrom.localize(params.localizeOptions,divBody);
                        }

                        divHeader.appendChild(divTitle);
                        divContent.appendChild(divClose);
                        divContent.appendChild(divHeader);
                        divContent.appendChild(divBody);
                        ntfElement.appendChild(divContent);

                        var headers=notifierParams.head;
                        if (headers) {
                            var headersTags=Object.keys(headers);
                            void 0;
                            for (var i=0;i<headersTags.length;i++){
                                var headTag=headersTags[i];
                                var newHeaderElement=frameElement.contentDocument.createElement(headTag);
                                var tagAttributes=Object.keys(headers[headTag]);
                                void 0;
                                for (var j=0;j<tagAttributes.length;j++) {
                                    void 0;
                                    newHeaderElement.setAttribute(tagAttributes[j],headers[headTag][tagAttributes[j]]);
                                }
                                void 0;
                                frameElement.contentDocument.head.appendChild(newHeaderElement);
                            }
                        }

                        frameElement.contentDocument.body.appendChild(ntfElement);
                        setTimeout(function() {
                            callback(frameElement);
                        },0);
                    };
                    frameElement.setAttribute('id',frameElementId);
                    if (verifrom.appInfo.quantum)
                        frameElement.setAttribute('src',verifrom.getURL('/html/empty.html'));
                    frameElement.setAttribute('sandbox','allow-same-origin allow-scripts allow-popups');
                    frameElement.setAttribute('class','verifromNotifier-'+params.position);
                    if (params.height)
                        frameElement.setAttribute('style','width: '+(params.width)+'; height: '+parseInt(params.height)+10+'px; border: none; overflow-x: hidden; overflow-y: hidden; display:block; visibility:visible;');
                    else frameElement.setAttribute('style','width: '+(params.width)+'; border: none; overflow-x: hidden; overflow-y: hidden; display:block; visibility:visible;');

                    window.top.document.body.insertBefore(frameElement, window.top.document.body.firstChild);
                }

                function updateNotifier(params, notifierIframe)
                {
                    var notifierIframe=notifierIframe;
                    if (params.height)
                        notifierIframe.setAttribute('style','width: '+(params.width)+'; height: '+(params.height)+'; border: none; overflow-x: hidden; overflow-y: hidden; display:block; visibility:visible;');
                    else notifierIframe.setAttribute('style','width: '+(params.width)+'; border: none; overflow-x: hidden; overflow-y: hidden; display:block; visibility:visible;');

                    var ntfElement=notifierIframe.contentDocument.body.querySelector('.verifromNotifier-ntf');
                    ntfElement.setAttribute('style','display: block;');
                    ntfElement.setAttribute('width',params.width);
                    var divContent=ntfElement.childNodes[0];

                    divContent.setAttribute('class','verifromNotifier-ntf-content-theme-'+(params.theme ? params.theme : 'default'));

                    var divClose=divContent.childNodes[0];
                    divClose.setAttribute('class','verifromNotifier-close-theme-'+(params.theme ? params.theme : 'default'));

                    var divHeader=divContent.childNodes[1];
                    divHeader.setAttribute('class','verifromNotifier-header-theme-'+(params.theme ? params.theme : 'default'));

                    var divBody=divContent.childNodes[2];
                    divBody.setAttribute('class','verifromNotifier-body-theme-'+(params.theme ? params.theme : 'default'));
                    if (params.body)
                        divBody.innerHTML=verifrom.sanitizer.getSanitizedHTMLContent(params.body);
                    else if (params.url) {
                        verifrom.sanitizer.getSanitizedURLContent(params.url).then(htmlcontent=>{
                            divBody.innerHTML=htmlcontent;
                        }).catch(reason=>{
                            void 0;
                        });
                    }
                    if (params.localize===true) {
                        verifrom.localize(params.localizeOptions, divBody);
                    }

                    var divTitle=divHeader.childNodes[0];
                    divTitle.setAttribute('class','verifromNotifier-title-theme-'+(params.theme ? params.theme : 'default'));
                    divTitle.textContent=params.title;
                }

                function onceLoaded(notifierParams, notifierIframe) {

                    if (notifierParams.localize===true) {
                        verifrom.localize(notifierParams.localizeOptions, notifierIframe.contentDocument.body);
                    }


                    if (!notifierParams.close)
                    {
                        $('.verifromNotifier-close-theme-'+(notifierParams.theme ? notifierParams.theme : 'default')).css('display','none');
                    }
                    else {
                        $('.verifromNotifier-close-theme-'+(notifierParams.theme ? notifierParams.theme : 'default')).css('display','block');
                        $('.verifromNotifier-close-theme-'+(notifierParams.theme ? notifierParams.theme : 'default')).css("background", "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAYAAACiyHcXAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oCBwA7AkracCQAAAbVSURBVEjHlZdfTBTbHce/szMD7Lq7w/6B5S57XUBhlwa2otKS4N2amKARvcaajbHVlhsMpoa+mWsf1Ia0vmg0JgQMSQ32rTGpxnB94EGLJtTUkosYTbTRK+hdugLSC/t3dmfm14eeocO4op7k93J2z/l95nd+fzmsvTgm2L59uyWZTHK5XI6TZZk7duyYYLPZuMHBwTwAlJWVkcPhoLGxMY2dJSZFF9H/fxLWUG5hwodCITEcDltDoZAtl8sJs7OzxPO8SxAE3mazzTY1NSEYDNLMzIz85MmT7Pz8vAJABaAxoQ99abE9HgBfUVEhtrS02Do7Oyubm5vXNzc3/0ySpKgoim3GA4qiPEwmk/+cnJwcGRgYePTgwYOkLMv5+fn5AoNRzSBGS5iXhVnHWlNTUx6LxdZfuXJlWzKZ/CuZViKRUKenp1Xz/tLS0l9CoVBtS0uL3+VySQCs7E6LGUIXswUEALZAIOA+fPjwxps3b36pquo0EVE+n9eGhobyHR0dGQBJo7S2tqYvXLiQz2azGvvvw9u3bx/asmXLekmSXABs7G5uLQgdwOp0Ot07d+7ceO3atf1EJBMRjY6OKsFgMGVWbpZwOJyemJhQdKuMjo7+MhwO1zAQqxGkGAQPoBSAFIlEas+dO7dLUZQZIqLh4eE8z/PJDwHowvN88uzZs7IOcvny5f1+v/9zABLTwQPgzBAcABGA3ev1+o8fP75tcXHxG90CnwJglMHBwTwRUTKZ/DuAHwGoAmBnuixmCAuAMqfT6Y5Go41Xr179iogonU6rgUBg1RNs3rw53d7e/o5PVFZWprq7u3M2m21lr6SkJBmPxwtERHfv3v19IBCoB+AGUAaALwaxzmaz+WOx2LaXL1/+mYiov78/b1TU1NSU1k3c19cn6/t1dXXpeDyuERENDQ2tOtPT05MjIlpYWPgbgAiAz5g1BDMED0CSJKlu9+7duzKZzEMiora2tlVfHAwGU5lMhowg9fX1KwBEROfPn5eNZzweT0pR/uen5eXlUQC1AMoBlJghBAAen8/XtG/fvl8QES0vL6vF3rmzszNjBFleXl4BuH79eqGY/0xNTclERCdPnvytw+EIA/ACKDNCWABwdrud93q91oqKCi8AJBKJouns1q1baiwWy8qyDABwOBwcANy4cUOJxWI5VVXfOTMzMwMAqKmpCWiathId5gwJTdN4juNEVVXLAKBQKLw3pb548YJSqdQqyMePH2vFAABA39c0rTSdTvMMwvIORCaT4ebm5vD8+fMsAFRVVRW9MBwOW8bGxqwej4czKjh9+nRJX19fSbEzfr9fA4Dp6emk1WoV3lOvIALwi6L409ra2u58Pj9HRGQOT0mSUolEYpUP7N27d5WP9Pb25syJa2lpqUBEFIlEfiOK4k8AVANYZ/YJvfZrNptNef369VMAOHDgwKoy39jYaPH5fKt8YGRkRI3FYtlsNgsAiEajvPHMjh07eKfTKbx58+bxo0ePfigUCur7yroIoFIUxU0NDQ0HL168+CdWJQvG5KPHfW9vb84cBa2trem+vj7ZbL179+6liYhGRkZGAPwcwI8B+ABYi4YogMbS0tLdgUDg63g8Plks7j9Furq6sixtz3o8npMAdgFoLBaiK8kKQK0gCF+43e7uo0ePDunv3NXVlf1UgPb29kyhUFCJiAYGBm4A+ArAF2slKwuAdSylbuJ5fr/P5/vd4ODgSiNz5syZj7bIkSNHsrlcTiUiGh8ffwDgawD7AGxaK21bWFFxA9gIIMrz/K9dLtcf+/v7b+ogT58+zR08eDBr9hNdOjo6Mvfv318JlfHx8W8B/AHArwBE2d1FCxhnaGhKGaUXQDXP80G73V536NChxlOnTjVWV1fXA4Asy9qzZ8+UiYkJAoBIJIKGhgbe6XQKALC4uDg7PDz8rxMnTvwDwHcAZgDEASwASAGQAahEpJkbXZ6BlAFwMpDPeJ4PlJaWfp7JZKovXbrUsGfPHu+GDRtCxULs1atX3925c+dtT0/Pk0Kh8D2A1wC+B/BvBrAMIAdAAaCRoaXiTB22yEAczHQ+JlVWq7Uym826JUkq37p1a0VbW5sLACYnJ5empqYW4vH4WwCLAOYAJAC8YbLIniwHQO++ydxbmlv9EsPTSABcLITdzLPtgiBYAQiKokAQBEXTtKymaSkAPzClbwH8B8CS4Qnyxtb/fRAwDDwig7GyyHEwsbPOWa+GYBfLADJMoe6saQBZprxgGITwIQjj9CUw0S2jS4lpjtDYO+cZjGz4ckX3gbWGH+4Dk5kOZBwLuSLn9LnTOPYZFdNasyiHj18f+1/6qD8ZIP4Lrw+QeE+J9dAAAAAASUVORK5CYII=\") no-repeat");
                    }

                    if (!notifierParams.sticky)
                    {
                        verifrom.setTimeout(function() {
                                $(notifierIframe).fadeOut(500);
                                notifierIframe.setAttribute('style','width: '+(notifierParams.width)+'; border: none; overflow-x: hidden; overflow-y: hidden; display:none; visibility:hidden;');
                                if (typeof closeEventCallback === 'function')
                                    closeEventCallback(notifierIframe.contentDocument.body);
                            },
                            (notifierParams.fadeAfter ? notifierParams.fadeAfter : 10000)
                        );
                    }

                    if (notifierParams.closeWhenClicked && notifierParams.closeWhenClicked===true)
                    {
                        $(notifierIframe.contentDocument.body).click(function() {
                            $(notifierIframe).fadeOut(500);
                            notifierIframe.setAttribute('style','width: '+(notifierParams.width)+'; border: none; overflow-x: hidden; overflow-y: hidden; display:none; visibility:hidden;');
                            if (typeof closeEventCallback === 'function')
                                closeEventCallback(notifierIframe.contentDocument.body);
                        });
                    }

                    $('.verifromNotifier-close-theme-'+(notifierParams.theme ? notifierParams.theme : 'default'), notifierIframe.contentDocument.body).click(function() {
                        $('.verifromNotifier-'+notifierParams.position).fadeOut(500);
                        notifierIframe.setAttribute('style','width: '+(notifierParams.width)+'; border: none; overflow-x: hidden; overflow-y: hidden; display:none; visibility:hidden;');
                        if (typeof closeEventCallback === 'function')
                            closeEventCallback(notifierIframe.contentDocument.body);
                    });

                    $(notifierIframe).fadeIn(500);
                    if ("function" === typeof showEventCallback)
                        setTimeout(showEventCallback.bind(null,notifierIframe.contentDocument.body),100);
                }


                var notifierIframe=verifrom.notifier.createdNotifiers.get(notifierParams.position)

                if (!notifierIframe) {
                    void 0;
                    insertNotifier(notifierParams, function(iframe){
                        verifrom.notifier.createdNotifiers.set(notifierParams.position, iframe);
                        setTimeout(onceLoaded.bind(null,notifierParams, iframe),50);
                    });
                } else {
                    void 0;
                    updateNotifier(notifierParams, notifierIframe);
                    setTimeout(onceLoaded.bind(null,notifierParams, notifierIframe),50);
                }
            }
        }
};

verifrom.message = extensionConfig.appInfo.safari ? verifrom.messageSafari : verifrom.messageWebExt;

verifrom.Sidebar.prototype = {
    show:function(sidebarType)
    {
        $('#'+this.sidebarId).removeClass(this.sidebarClassBase+'-container-closed');
        this.lastSideBarTypeDisplayed=sidebarType;
    },
    open:function(sidebarType)
    {
        $('#'+this.sidebarId).removeClass(this.sidebarClassBase+'-container-closed');
        this.lastSideBarTypeDisplayed=sidebarType;
    },
    hide:function(sidebarType)
    {
        if (typeof sidebarType === 'undefined' || sidebarType===this.lastSideBarTypeDisplayed)
        {
            $('#'+this.sidebarId).addClass(this.sidebarClassBase+'-container-closed');
            this.lastSideBarTypeDisplayed=undefined;
        }
    },
    empty:function()
    {
        $('.'+this.sidebarClassBase+'-body-theme-default','#'+this.sidebarId).empty();
    },
    appendBody:function(htmlCode)
    {
        $('.'+this.sidebarClassBase+'-body-theme-default','#'+this.sidebarId).append(htmlCode);
    },
    displaySanitizedBody:function(htmlCode, sidebarType)
    {
        this.empty();
        var divBody=$('.'+this.sidebarClassBase+'-body-theme-default','#'+this.sidebarId).get(0);
        verifrom.sanitizer.getSanitizedHTMLContent(htmlCode,function(sanitizedContent){
            $(divBody).empty();
            divBody.innerHTML=sanitizedContent;
            this.show(sidebarType);
            this.open(sidebarType);
        }.bind(this));
    },
    getViewFrame:function(viewId) {
        if ("undefined"===typeof this.views[viewId])
            return undefined;
        else return this.views[viewId].frame;
    },
    addView:function(viewId, documentUrl, sanitize, localize, localizeOptions, headers, callbackOnceLoaded) {
        if ("undefined"!==typeof this.getViewFrame(viewId))
            return this.views[viewId];
        if (!sanitize)
            sanitize=true;
        if (!sanitize && documentUrl && new RegExp("^"+verifrom.getURL('/')).test(documentUrl)===false)
            throw "addView: bad URL origin :"+documentUrl;

        try {
            var divBody=$('.'+this.sidebarClassBase+'-body-theme-default','#'+this.sidebarId).get(0);
            var divFrame = document.createElement("iframe");
            var sidebarFrameId='iframe'+this.sidebarId+viewId;
            divFrame.setAttribute('id',sidebarFrameId);
            divFrame.setAttribute('sandbox','allow-same-origin allow-scripts allow-popups');
            divBody.appendChild(divFrame);

            this.views[viewId]={frame:divFrame, frameId:sidebarFrameId, id:viewId, sanitize:sanitize, localize:localize, localizeOptions:localizeOptions};

            if (documentUrl)
                this.setViewURL(viewId, documentUrl, sanitize, headers, callbackOnceLoaded);
            else if ("function" === typeof callbackOnceLoaded) {
                $(divFrame).one("load",function(){
                    setTimeout(function() {
                        callbackOnceLoaded(divFrame);
                    },0);
                });
            }
        }catch(e) {
            void 0;
            void 0;
        }
        return divFrame;
    },
    removeView:function(viewId) {
        if ("undefined"===typeof this.getViewFrame(viewId))
            throw "Unknown viewId "+viewId;
        var divFrame= this.getViewFrame(viewId);
        divFrame.remove();
        delete this.views[viewId];
    },
    showView:function(viewId) {
        if ("undefined"===typeof this.getViewFrame(viewId))
            throw "Unknown viewId "+viewId;

        verifrom.localize(this.views[viewId].localizeOptions, this.getViewFrame(viewId).contentDocument.body);


        var keys=Object.keys(this.views);
        for (var i=0;i<keys.length;i++) {
            var otherViewId=keys[i];

            if (otherViewId===viewId) {
                $(this.getViewFrame(otherViewId)).css('visibility','visible');
                $(this.getViewFrame(otherViewId)).css('display','block');
            }
            else {
                $(this.getViewFrame(otherViewId)).css('visibility','invisible');
                $(this.getViewFrame(otherViewId)).css('display','none');
                this.hideView(otherViewId);
            }
        }
        this.show();
        this.open();
    },
    hideView:function(viewId) {
        if ("undefined"===typeof this.getViewFrame(viewId))
            throw "Unknown viewId "+viewId;
        var divFrame= this.views[viewId];
        $(divFrame).hide();
        $(divFrame).attr('display','none');
    },
    setContent:function(viewId, documentUrl, sanitize, headers, callbackOnceLoaded, htmlContent) {
        let frameNode = this.getViewFrame(viewId);
        void 0;
        void 0;
        var range = document.createRange();
        range.selectNode(frameNode);
        var parser = new DOMParser();
        var newdoc = parser.parseFromString(htmlContent, "text/html");
        if (headers) {
            for (let k=0;k<headers.length;k++) {
                let header=headers[k];
                let headersTags=Object.keys(header);
                void 0;
                for (let i=0;i<headersTags.length;i++){
                    var headTag=headersTags[i];
                    if (headTag==="base" && verifrom.appInfo.quantum) {
                        void 0;
                        continue;
                    }
                    var newHeaderElement=document.createElement(headTag);
                    var tagAttributes=Object.keys(header[headTag]);
                    void 0;
                    for (let j=0;j<tagAttributes.length;j++) {
                        void 0;
                        newHeaderElement.setAttribute(tagAttributes[j],header[headTag][tagAttributes[j]]);
                    }
                    void 0;
                    newdoc.head.appendChild(newHeaderElement);
                }
            }
        }
        window.requestAnimationFrame(()=>{
            var newNode = frameNode.contentDocument.importNode(newdoc.documentElement, true);
            frameNode.contentDocument.documentElement.replaceWith(newNode);
            void 0;
            void 0;


            if ("function" === typeof callbackOnceLoaded)
                setTimeout(function() {
                    callbackOnceLoaded(frameNode.contentWindow.document);
                },0);
        });

    },
    setViewURL:function(viewId, documentUrl, sanitize, headers, callbackOnceLoaded) {
        try {
            if ("undefined" === typeof this.getViewFrame(viewId))
                throw "Unknown viewId " + viewId;
            if (!sanitize && new RegExp("^" + verifrom.getURL('/')).test(documentUrl) === false)
                throw "setViewURL: unsanitized content from a risky URL origin :" + documentUrl;

            if (!sanitize) {
                let frameNode = this.getViewFrame(viewId);
                void 0;
                void 0;
                frameNode.src=documentUrl;
                this.show();
                this.open();
            }
            else {
                let o=this;
                verifrom.sanitizer.getSanitizedURLContent(documentUrl)
                    .then(htmlContent=>{
                            o.setContent(viewId, documentUrl, sanitize, headers, callbackOnceLoaded, htmlContent);
                    })
                    .catch(reason=>{
                        void 0;
                    });
            }
        }catch(e)
        {
            void 0;
            void 0;
        }
    },
    localizeView:function(viewId, selector, localesFileprefix,localizeStandOpts) {
        if ("undefined"===typeof this.getViewFrame(viewId))
            throw "Unknown viewId "+viewId;
        var divFrame= this.getViewFrame(viewId);
        $(selector, divFrame.contentDocument.body).localize(localesFileprefix, localizeStandOpts);
        verifrom.localize(localizeStandOpts, divFrame.contentDocument.body);
    },
    updateElementView:function(viewId,selector,attribute,value) {
        if ("undefined" === typeof this.getViewFrame(viewId))
            throw "Unknown viewId " + viewId;
        var divFrame = this.getViewFrame(viewId);
        var elements=$(selector,divFrame.contentWindow.document.body);
        for (var i=0;i<elements.length;i++) {
            var element=$(selector,divFrame.contentWindow.document.body).get(i);
            if (element)
                element[attribute]=value;
        }
    },
    updateTemplateElementAttr:function(viewId,selector,attribute,value) {
        if ("undefined" === typeof this.getViewFrame(viewId))
            throw "Unknown viewId " + viewId;
        var divFrame = this.getViewFrame(viewId);
        $(selector,divFrame.contentWindow.document.body).attr(attribute,value);
    },
    updateTemplateView:function(viewId,selector,data) {
        if ("undefined" === typeof this.getViewFrame(viewId))
            throw "Unknown viewId " + viewId;
        var divFrame = this.getViewFrame(viewId);
        if (!selector && typeof data==='object' && data.length)
        {
            var selectors=Object.keys(data);
            for (var i=0;i<selectors.length;i++) {
                $(selectors[i],divFrame.contentWindow.document.body).text(data[selectors[i]]);
            }
        } else {
            $(selector,divFrame.contentWindow.document.body).text(data);
        }
    },
    addViewListener:function(viewId, event, selector, onceOnly, data, listener) {
        if ("undefined" === typeof this.getViewFrame(viewId))
            throw "Unknown viewId " + viewId;
        if ("function" !== typeof listener) {
            void 0;
            throw "addViewListener - listener is not a function";
        }
        var divFrame = this.getViewFrame(viewId);
        var selectedElements=$(selector, divFrame.contentWindow.document.body);
        if (!selectedElements || selectedElements.length===0)
            return;
        selectedElements.off();
        if (data) {
            if (!onceOnly)
                selectedElements.on(event,data,listener);
            else selectedElements.one(event,data,listener);
        } else {
            if (!onceOnly)
                selectedElements.on(event,listener);
            else selectedElements.one(event,listener);
        }
    },
    getElementValue:function(viewId, selector, elementAttr) {
        if ("undefined" === typeof this.getViewFrame(viewId))
            throw "Unknown viewId " + viewId;
        var divFrame = this.getViewFrame(viewId);
        var selectedElements=$(selector, divFrame.contentWindow.document.body);
        if (!selectedElements || selectedElements.length===0)
            return;
        return selectedElements.get(0)[elementAttr];
    },
    close:function(sidebarToClose, evt)
    {
        if (sidebarToClose.sidebarParams.events && sidebarToClose.sidebarParams.events.onClose && (typeof sidebarToClose.sidebarParams.events.onClose === "function"))
            sidebarToClose.sidebarParams.events.onClose();
        $('#'+sidebarToClose.sidebarId).toggleClass(this.sidebarClassBase+'-container-closed');
    },
    insertCSSSheet:function(parentNode, url)
    {
        var s=document.createElement('link');
        s.setAttribute('href',"undefined" === typeof url ? this.stylesheetURL : url);
        s.setAttribute('rel','stylesheet');
        s.setAttribute('type','text/css');
        if ("undefined" === typeof parentNode)
            (document.head||document.documentElement).appendChild(s);
        else
            parentNode.appendChild(s);
    }
}

verifrom.request.Queue.prototype = {
    addRequest:function(requestParams)
    {
        this.nbRequestsQueued++;
        var params=$.extend(true,{},requestParams);
        params.context=this;
        if (typeof params.headers === 'undefined')
            params.headers={};
        this.requestsQueueParams.push(params);
    },
    runInBackground:function(callbackAfter) {
        let reqId = Date.now().toString()+"-"+Math.round(Math.random());
        var onRequestResult = function(msg) {
            if (msg.hasOwnProperty("allRequestsOnError") && msg.allRequestsOnError===true) {
                this.nbSuccess=0;
                this.nbError=this.nbRequestsQueued;
                setTimeout(callbackAfter,0);
                return;
            }
            if (typeof this.requestsResults==='undefined')
                this.requestsResults=[];
            if (typeof this.requestsResults[msg.reqNumber]==='undefined')
                this.requestsResults[msg.reqNumber]={data:[],parts:msg.parts-1};
            else this.requestsResults[msg.reqNumber].parts--;
            this.requestsResults[msg.reqNumber].data[msg.part]=msg.data;
            if (this.requestsResults[msg.reqNumber].parts===0) {
                try {
                    this.nbRequestsQueued--;
                    let data=msg.parts===1 ? this.requestsResults[msg.reqNumber].data[0] : this.requestsResults[msg.reqNumber].data.join("");
                    this.requestsQueue.push(JSON.parse(data));
                    this.nbSuccess++;
                } catch(e) {
                    this.nbError++;
                }
            }
            if (this.nbRequestsQueued===0) {
                setTimeout(callbackAfter,0);
                return;
            }
        }.bind(this);
        for (let i=0;i<this.requestsQueueParams.length;i++) {
            delete this.requestsQueueParams[i].context;
        }
        verifrom.message.addListener({channel:"corsRequestResult"+reqId},onRequestResult);
        verifrom.message.toBackground({requests:JSON.stringify(this.requestsQueueParams),cookie:window.top.document.cookie,id:reqId},{channel:"corsRequest"});
    },
    run:function(callbackAfter) {
        if (this.requestsQueueParams.length===0 && this.nbRequestsQueued===0) {
            setTimeout(callbackAfter,0);
            return;
        }
        let req = this.requestsQueueParams.shift();
        var onSuccess=function(data, textStatus, jqXHR) {
            this.nbRequestsQueued--;
            this.nbSuccess++;
            this.run(callbackAfter);
        };
        var onError=function(jqXHR, textStatus, errorThrown) {
            void 0;
            this.nbRequestsQueued--;
            this.nbError++;
            this.run(callbackAfter);
        };
        $.support.cors = true;
        if (typeof req.context==='undefined')
            req.context = this;
        var jqxhr=$.ajax(req);
        this.requestsQueue.push(jqxhr);
        jqxhr.done(onSuccess);
        jqxhr.fail(onError);
    },
    done:function(callback, background)
    {
        if ("function" === typeof callback)
            this.callback=callback;
        if (extensionConfig.appInfo.safari===true)
            background=true;
        let executeQueue = background===true ? this.run.bind(this) : this.runInBackground.bind(this);
        executeQueue(function() {
            if (this.nbError>0 && this.nbSuccess===0 && background!==true) 
            {
                this.nbError = 0;
                this.nbSuccess = 0;
                this.done(callback,true);
                return;
            }
            if (this.callback && this.nbRequestsQueued===0 && this.nbSuccess>0)
                this.callback(this.requestsQueue);
            else if (this.callback && this.nbRequestsQueued===0 && this.nbSuccess<=0)
                this.callback([]);
        }.bind(this));
    }
};
verifrom.LZString = (function() {

    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};

    function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for (var i=0 ; i<alphabet.length ; i++) {
                baseReverseDic[alphabet][alphabet.charAt(i)] = i;
            }
        }
        return baseReverseDic[alphabet][character];
    }

    var LZString = {
        compressToBase64 : function (input) {
            if (input == null) return "";
            var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
            switch (res.length % 4) { 
                default: 
                case 0 : return res;
                case 1 : return res+"===";
                case 2 : return res+"==";
                case 3 : return res+"=";
            }
        },

        decompressFromBase64 : function (input) {
            if (input == null) return "";
            if (input == "") return null;
            return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
        },

        compressToUTF16 : function (input) {
            if (input == null) return "";
            return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
        },

        decompressFromUTF16: function (compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
        },

        compressToUint8Array: function (uncompressed) {
            var compressed = LZString.compress(uncompressed);
            var buf=new Uint8Array(compressed.length*2); 

            for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
                var current_value = compressed.charCodeAt(i);
                buf[i*2] = current_value >>> 8;
                buf[i*2+1] = current_value % 256;
            }
            return buf;
        },

        decompressFromUint8Array:function (compressed) {
            if (compressed===null || compressed===undefined){
                return LZString.decompress(compressed);
            } else {
                var buf=new Array(compressed.length/2); 
                for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
                    buf[i]=compressed[i*2]*256+compressed[i*2+1];
                }

                var result = [];
                buf.forEach(function (c) {
                    result.push(f(c));
                });
                return LZString.decompress(result.join(''));

            }

        },


        compressToEncodedURIComponent: function (input) {
            if (input == null) return "";
            return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
        },

        decompressFromEncodedURIComponent:function (input) {
            if (input == null) return "";
            if (input == "") return null;
            input = input.replace(/ /g, "+");
            return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
        },

        compress: function (uncompressed) {
            return LZString._compress(uncompressed, 16, function(a){return f(a);});
        },
        _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null) return "";
            var i, value,
                context_dictionary= {},
                context_dictionaryToCreate= {},
                context_c="",
                context_wc="",
                context_w="",
                context_enlargeIn= 2, 
                context_dictSize= 3,
                context_numBits= 2,
                context_data=[],
                context_data_val=0,
                context_data_position=0,
                ii;

            for (ii = 0; ii < uncompressed.length; ii += 1) {
                context_c = uncompressed.charAt(ii);
                if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                }

                context_wc = context_w + context_c;
                if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
                    context_w = context_wc;
                } else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                        if (context_w.charCodeAt(0)<256) {
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i=0 ; i<8 ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1) | value;
                                if (context_data_position ==bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i=0 ; i<16 ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for (i=0 ; i<context_numBits ; i++) {
                            context_data_val = (context_data_val << 1) | (value&1);
                            if (context_data_position == bitsPerChar-1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }


                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                }
            }

            if (context_w !== "") {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                    if (context_w.charCodeAt(0)<256) {
                        for (i=0 ; i<context_numBits ; i++) {
                            context_data_val = (context_data_val << 1);
                            if (context_data_position == bitsPerChar-1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                        }
                        value = context_w.charCodeAt(0);
                        for (i=0 ; i<8 ; i++) {
                            context_data_val = (context_data_val << 1) | (value&1);
                            if (context_data_position == bitsPerChar-1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    } else {
                        value = 1;
                        for (i=0 ; i<context_numBits ; i++) {
                            context_data_val = (context_data_val << 1) | value;
                            if (context_data_position == bitsPerChar-1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for (i=0 ; i<16 ; i++) {
                            context_data_val = (context_data_val << 1) | (value&1);
                            if (context_data_position == bitsPerChar-1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                } else {
                    value = context_dictionary[context_w];
                    for (i=0 ; i<context_numBits ; i++) {
                        context_data_val = (context_data_val << 1) | (value&1);
                        if (context_data_position == bitsPerChar-1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }


                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
            }

            value = 2;
            for (i=0 ; i<context_numBits ; i++) {
                context_data_val = (context_data_val << 1) | (value&1);
                if (context_data_position == bitsPerChar-1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                } else {
                    context_data_position++;
                }
                value = value >> 1;
            }

            while (true) {
                context_data_val = (context_data_val << 1);
                if (context_data_position == bitsPerChar-1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                }
                else context_data_position++;
            }
            return context_data.join('');
        },

        decompress: function (compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
        },

        _decompress: function (length, resetValue, getNextValue) {
            var dictionary = [],
                next,
                enlargeIn = 4,
                dictSize = 4,
                numBits = 3,
                entry = "",
                result = [],
                i,
                w,
                bits, resb, maxpower, power,
                c,
                data = {val:getNextValue(0), position:resetValue, index:1};

            for (i = 0; i < 3; i += 1) {
                dictionary[i] = i;
            }

            bits = 0;
            maxpower = Math.pow(2,2);
            power=1;
            while (power!=maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb>0 ? 1 : 0) * power;
                power <<= 1;
            }

            switch (next = bits) {
                case 0:
                    bits = 0;
                    maxpower = Math.pow(2,8);
                    power=1;
                    while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 1:
                    bits = 0;
                    maxpower = Math.pow(2,16);
                    power=1;
                    while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 2:
                    return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            while (true) {
                if (data.index > length) {
                    return "";
                }

                bits = 0;
                maxpower = Math.pow(2,numBits);
                power=1;
                while (power!=maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb>0 ? 1 : 0) * power;
                    power <<= 1;
                }

                switch (c = bits) {
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2,8);
                        power=1;
                        while (power!=maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb>0 ? 1 : 0) * power;
                            power <<= 1;
                        }

                        dictionary[dictSize++] = f(bits);
                        c = dictSize-1;
                        enlargeIn--;
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2,16);
                        power=1;
                        while (power!=maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb>0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize-1;
                        enlargeIn--;
                        break;
                    case 2:
                        return result.join('');
                }

                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }

                if (dictionary[c]) {
                    entry = dictionary[c];
                } else {
                    if (c === dictSize) {
                        entry = w + w.charAt(0);
                    } else {
                        return null;
                    }
                }
                result.push(entry);

                dictionary[dictSize++] = w + entry.charAt(0);
                enlargeIn--;

                w = entry;

                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }

            }
        }
    };
    return LZString;
})();
verifrom.notifications.checkEnabled();
