/*
* Для обновления рабочего стола используется метод saveAllBrowser
* который проходит по всем доменам и отправляет состояние браузера
* Если возвращен код отсутствия логина, домен удаляется из очереди (z_domains.domains)
* При запуске расширения запускается обход доменов и проверка авторизации
* При входе на сайт, на каждой странице (в том числе в popup) при запросе версии, происходит обновление списка допустимых доменов
*/
var z_tabsbook_background = {
    domains_to_check : z_domains.domains,
    registeredContentScriptTabs : {},
    tabs : [],
    updatedTabs : {}, // Массив для хранения обновленных табов, для предотвращения повторной отправки статуса браузера на сервер
    ajaxSendTimes : {},
    sendResponseFunction : false,
    tabsFirstUrls : {},
    browserDefaultPage : false, // Флаг, который говорит, что сейчас открывается страница браузера, newtab не должно обновлять страницу, при включении
                                // в него сохраняем id таба, чтобы потом, при включении плагина обновить страницы не равные этому табу
    onInitExtension : function() {
        z_tabsbook_install.onStart();
        // Check if user logged in
        var $this = this;
        var el;
        // Не проверяем домены, так как они путают настройку открытия экспресс панели
        /*for(el in this.domains_to_check) {
            this.sendAjax({domain: this.domains_to_check[el]}, {}, {init_browser: true}, "https://" + this.domains_to_check[el] + "/___ajax___/no_upd_sess/save_context.php", function(req) {
                var data = JSON.parse(req.responseText);
                if(data["user_id"]) {
                    z_domains.addDomain(req.z_context.domain);
                    $this.getAllTabs($this.saveAllBrowserWithSaveToDB);
                } else
                    z_domains.removeDomain(req.z_context.domain);
            });
        }*/

        /*bookmarksImporter.updateHtml(function() {

        });*/
    },
    modifyUrl : function(url, addparams, deleteparams) {
        if(!url)
            url = new String(document.location);

        var newadd = "";
        var tmp = url.split("?");
        var tmp2 = new String("");
        var base = "";
        var params = {};
        var anchor = "";
        if(tmp[1]) {
            var add = new String(tmp[1]);
            add = add.split("#");
            if(add[1])
            anchor = "#" + add[1];
            add = add[0];
            base = tmp[0];
        }            
        else {
            var add = new String(tmp[0]);
            add = add.split("#");
            if(add[1])
                anchor = "#" + add[1];
            base = add[0];
            add = "";
        }
        if(add) {
            var tmp = add.split("&");
            for( el in tmp ) {
                tmp2 = tmp[el].split("=");
                params[tmp2[0]] = tmp2[1];
            }
        }
        for(el in addparams) {
            params[el] = addparams[el];
        }
        for(el in deleteparams) {
            delete params[deleteparams[el]];
        }
        add = [];
        for(el in params) {
            add.push(el + "=" + params[el]);
        }
        add = (add != "") ? "?" + add.join("&") : "";
        return (base + add + anchor);
    },
    sendAjax : function(context, get_params, post_params, url, callback, time_label) {
        get_params["r"] = new Date().getTime();
        var _url = this.modifyUrl(url, get_params);
        context["z_callback"] = callback;
        if(time_label) {
            this.ajaxSendTimes[time_label] = get_params["r"];
            post_params["time"] = get_params["r"];
        }
        var $this = this;
        //alert(_url);
        var req = new XMLHttpRequest();
        req.open("POST", _url, true);
        req.onload = function() {
            this["z_context"] = context;
            //alert(this.responseText);
            if(time_label && $this.ajaxSendTimes[time_label]) {
                var data = JSON.parse(this.responseText);
                if(data.time == $this.ajaxSendTimes[time_label])
                    callback(this);
            } else
                callback(this);
        };
        var params = "";
        for(el in post_params) {
            params = params + "&" + el + "=" + encodeURIComponent(JSON.stringify(post_params[el]));
        }
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //req.setRequestHeader("Content-length", params.length);
        //req.setRequestHeader("Connection", "close");
        req.send(params);
    },
    setIcon : function(type) {
        if(type == "in_bookmarks") {
            browser.browserAction.setIcon({path: "icons/favicon_in_bookmark_38.png"});
        }
        
        if(type == "in_bookmarks_and_desktop") {
            browser.browserAction.setIcon({path: "icons/favicon_in_bookmark_and_desktop_38.png"});
        }
        
        if(type == "on_desktop") {
            browser.browserAction.setIcon({path: "icons/favicon_on_desktop_38.png"});
        }
        
        if(type == "not_in_bookmarks") {
            browser.browserAction.setIcon({path: "icons/favicon_not_in_bookmark_38.png"});
        }        
        
        if(type == "refresh") {
            browser.browserAction.setIcon({path: "icons/favicon_refresh_38.png"});
        }
        
        if(type == "no_connection") {
            
        }
        
    },
    onTabsCreated : function(tab) {
        //alert("on created");
        // Не надо лишний раз отправлять запрос при создании закладки, в любом случае вызовется метод onTabsUpdated
        //z_tabsbook_background.getAllTabs(z_tabsbook_background.saveAllBrowserWithSaveToDB);
        z_tabsbook_background.updateDesktop();
        //var tab = typeof(tab) == "object" ? tab : browser.select
        //alert("created" + tab + " id " + tab.id + " url " + tab.url);
        if(tab.url != "about:blank") {
            z_tabsbook_background.tabsFirstUrls[tab.id] = tab.url;
        }
     },
    
    onTabsUpdated : function(tab) {
        var $this = z_tabsbook_background;
        browser.tabs.get(tab, function(t) {
            // Проверяем нет ли в кеше уже такого url принадлежащему такому tab_id
            if($this.updatedTabs[t.id] != t.url) {
                //alert("send");
                z_tabsbook_background.getAllTabs(z_tabsbook_background.saveAllBrowserWithSaveToDB);
                // Message to content script for search in websearch to track url change, which cannot be tracked by JS
                browser.tabs.sendMessage(t.id, {type: "tab_updated"}, function(response) {
                    //console.log(response);
                });
            }
            $this.updatedTabs[t.id] = t.url;
        });
        
        z_tabsbook_background.updateDesktop();
        
        
    },
    onTabsMoved : function() {
        z_tabsbook_background.updateDesktop();
        //alert("moved");
    },
    onTabsActivated : function() {
        z_tabsbook_background.getAllTabs(z_tabsbook_background.saveAllBrowserWithoutSaveToDB);
        //alert("activated");
    },
    onTabsHighlighted : function() {
        //alert("highlighted");
    },
    onTabsDetached : function() {
        //alert("detached");
    },
    onTabsAttached : function() {
        //alert("atached");
    },
    onTabsRemoved : function(tabId) {
        setTimeout(function() {
            z_tabsbook_background.getAllTabs(z_tabsbook_background.saveAllBrowserWithSaveToDB);
            z_tabsbook_background.updateDesktop();
            bookmarksImporter.checkRemovedTab(tabId);
        }, 200);
    },
    onTabsReplaced : function() {
        z_tabsbook_background.getAllTabs(z_tabsbook_background.saveAllBrowserWithSaveToDB);
        z_tabsbook_background.updateDesktop();
    },
    
    getAllTabs : function(callback) {
        var $this = this;
        var tmp_updatedTabs = {};
        browser.windows.getLastFocused({}, function(window) {
            browser.tabs.query({}, function(tabs) {
                // В local storage сохраняем количество текущих табов
                // При загрузке браузера (расширения), смотрим, если это количество было больше 1,
                // а количество табов при открытии = 1, значит случился crash и обновлять начальную страницу не нужно
                // иначе прячется кнопка "восстановить"
                browser.storage.local.set({tabs_count: tabs.length}, function() {});
                var ztabs = [];
                //var tmp = "";
                for(el in tabs) {
                    // Чистим кеш от несуществующих табов
                    tmp_updatedTabs[tabs[el].id] = $this.updatedTabs[tabs[el].id]
                    //tmp = tmp + "\n" + tabs[el]["url"];
                    if($this.tabsFirstUrls[tabs[el]["id"]])
                        tabs[el]["first_url"] = $this.tabsFirstUrls[tabs[el]["id"]];
                    else
                        tabs[el]["first_url"] = "";
                    if(window && tabs[el]["windowId"] == window.id)
                        tabs[el]["in_current_window"] = true;
                    else
                        tabs[el]["in_current_window"] = false;
                    if(tabs[el]["url"].substr(0, 4) == "http")
                        ztabs.push(tabs[el]);
                }
                
                $this.updatedTabs = tmp_updatedTabs;
                
                //alert(tmp);
                callback(ztabs);
            });
        });
    },
    saveAllBrowserWithSaveToDB : function(tabs) {
        z_tabsbook_background.saveAllBrowser(tabs, true);
    },
    saveAllBrowserWithoutSaveToDB : function(tabs) {
        z_tabsbook_background.saveAllBrowser(tabs, false);
    },
    // Save to db - если не установлен, просто возвращается статус открытой закладки, без сохранения в БД
    saveAllBrowser : function(tabs, save_to_db) {
        var $this = z_tabsbook_background;
        $this.tabs = tabs;
        var el;
        var out = [];
        for(el in tabs) {
            
            // Для Opera сохраняем только активную страницу, так как модераторы ругаются на передачу всего состояния браузера
            // Добавляем если активная страница в текущем окне, или не Opera
            if(!z_tabsbook_install.isOpera() || (tabs[el]["active"] && tabs[el]["in_current_window"]))
                out.push({
                    u: tabs[el]["url"],
                    t: tabs[el]["id"],
                    w: tabs[el]["windowId"],
                    incw: tabs[el]["in_current_window"],
                    a: tabs[el]["active"],
                    ti: tabs[el]["title"]
                });
        }
        $this.setIcon("refresh");
        //for(el in z_domains.domains) {
            $this.sendAjax({domain: z_domains.popup_domain}, {}, {save_browser: true, tabs: out, save_to_db: save_to_db}, "https://" + z_domains.popup_domain + "/___ajax___/no_upd_sess/save_context.php", function(req) {
                var data = JSON.parse(req.responseText);
                var el;
                if(!data.user_id) {
                    // Delete permitted domain from z_domains.domains
                    z_domains.removeDomain(req.z_context.domain)
                } else {
                    if (data.extension_settings) {
                        extensionSettings.settingsChanged(data.extension_settings);
                    }
                    else {
                        extensionSettings.settingsUnavailable();
                    }

                    if(data.current_page.in_bookmarks && data.current_page.on_desktop)
                        $this.setIcon("in_bookmarks_and_desktop");
                    else if(data.current_page.in_bookmarks)
                        $this.setIcon("in_bookmarks");
                    else if(data.current_page.on_desktop)
                        $this.setIcon("on_desktop");
                    else
                        $this.setIcon("not_in_bookmarks");
                }
            });
        //}
    },
    updateDesktop : function() {
        var $this = this;
        this.getAllTabs(function(tabs) {
            $this.sendToAllContentScripts({type: "ztabsbook_to_page__get_opened_tabs", data: {tabs: tabs}});
        });
    },
    // При соединении от контент скрипта
    onConnect : function(port) {
        var $this = z_tabsbook_background;
        var name = port.name.split("__");
        if(name[0] == "tabsbook_content_script") {
            z_tabsbook_background.registeredContentScriptTabs[name[1]] = port;
            // В случае disconnect (например при выключении newtab во время открытия стандартной начальной)
            port.onDisconnect.addListener(function() {z_tabsbook_background.registeredContentScriptTabs[name[1]] = false;});
        }
    },
    onMessage : function(message, sender, sendResponse) {
        var $this = z_tabsbook_background;
        var el;        
        
        if(message.type == "z_tabsbook_force_update_extension") {
            sendResponse();
            browser.runtime.requestUpdateCheck(function(status, details) {});
        }
        if(message.type == "ztabsbook_on_close_popup") {
            z_tabsbook_background.getAllTabs(z_tabsbook_background.saveAllBrowserWithoutSaveToDB);
        }
        if(message.type == "ztabsbook_get_popup_domain") {
            sendResponse(z_domains.popup_domain);
        }
        if(message.type == "ztabsbook_add_domain") {
            z_domains.addDomain(message.domain);
        }
        if(message.type == "ztabsbook_goto_tab") {
            browser.tabs.update(parseInt(message.tab_id), {active: true});
            browser.tabs.get(parseInt(message.tab_id), function(tab) {
                // Make window active too.
                if(tab && tab.windowId)
                    browser.windows.update(tab.windowId, {focused: true});
            });            
        }
        if(message.type == "ztabsbook_close_tabs") {
            for(el in message.tabs)
                browser.tabs.remove(parseInt(message.tabs[el].tab_id));
        }
        if(message.type == "ztabsbook_open_tabs") {
            var active;
            if (!message.tabs.length) return;

            if (message.tabs[0].nw) {
                var urls = [];

                for(el in message.tabs) {
                    urls.push(message.tabs[el].url);
                }

                //console.log("opening urls: " + JSON.stringify(urls));
                
                browser.windows.create({
                    url: [],
        		    left: 0,
        		    top: 0
                }, function(browserWindow) {
                    browser.windows.update(browserWindow.id, {state: "maximized"});
                    
                    for (var i = 0; i < urls.length; i++) {
                        (function(url) {
                            browser.tabs.create({url: url, windowId: browserWindow.id}, function(tab) {
                                //console.log("opened url: " + url + " in tab " + tab.id);
                                z_tabsbook_background.tabsFirstUrls[tab.id] = url;
                            });
                        })(urls[i]);
                    }
                    browser.tabs.remove([browserWindow.tabs[0].id]);
                })
            }
            else {
                for(el in message.tabs) {
                    active = message.tabs[el]["active"] == undefined ? false : message.tabs[el]["active"];
                    (function(url, active) {
                        //console.log("opening url: " + url);
                        browser.tabs.create({url: url, active: active}, function(tab) {
                            //console.log("opened url: " + url + " in tab " + tab.id);
                            z_tabsbook_background.tabsFirstUrls[tab.id] = url;
                        });
                    })(message.tabs[el].url, active);
                }
            }
        }
        if(message.type == "ztabsbook_get_opened_tabs") {
            $this.getAllTabs(function(tabs) {
                //console.log(tabs);
                sendResponse({type: "get_opened_tabs", data: {tabs: tabs}});
            });
            return true;
        }        
        if(message.type == "ztabsbook_register_tab_for_messages") {
            if(!sender || !sender.tab)
                return;
            if(sender.tab.id > 0)
                $this.registeredContentScriptTabs[sender.tab.id] = true;
            sendResponse(sender.tab.id);
            $this.updateDesktop();
        }
        if(message.type == "ztabsbook_open_default_page") {
            z_express_panel.goToDefaultPage(sender.tab.id)
        }
        // Вызывается из newtab при запуске, для проверки, надо ли обновлять начальные страницы (для случая обновления расш.)
        if(message.type == "ztabsbook_browser_default_page_flag") {
            sendResponse($this.browserDefaultPage);
            $this.browserDefaultPage = false;
        }
        if (message.type == 'ztabsbook_update_settings') {
            extensionSettings.settingsChanged(message.settings);
        }
        // This message is sent when page is started or refreshed or url changed
        // we receive history_length to determine page status on express panel later
        if(message.type == 'ztabsbook_tab_history') {
            if(!sender || !sender.tab)
                return;
            if(sender.tab.id > 0) {
                // To define array item
                if(!z_tabsbook_background.tabsFirstUrls[sender.tab.id])
                    z_tabsbook_background.tabsFirstUrls[sender.tab.id] = false;
                   
                // delete first url to disable opened status on Express panel 
                // it must be first url AND
                // history_length > 2
                // OR first url AND history_length == 2 and first page is not default page
                if( z_tabsbook_background.tabsFirstUrls[sender.tab.id] &&
                    ( message.history_length > 2 || (message.history_length == 2 && !z_express_panel.isPageNew(z_tabsbook_background.tabsFirstUrls[sender.tab.id])) )
                    ) {
                    //alert("delete first url: " + z_tabsbook_background.tabsFirstUrls[sender.tab.id]);
                    z_tabsbook_background.tabsFirstUrls[sender.tab.id] = false;
                    z_tabsbook_background.updateDesktop();
                }
            }
        }
        if (message.type == 'ztabsbook_import_bookmarks') {
            if(!sender || !sender.tab)
                return;

            // прерывание текущего импорта при необходимости
            if(message.force) {
                bookmarksImporter.stopImport();
            }

            // если есть незавершенный импорт - возвращаем соответствующее сообщение
            if(!bookmarksImporter.checkImportPosability()) {
                browser.tabs.sendMessage(sender.tab.id, {type: 'ztabsbook_to_page__other_import_in_progress', data:{
                    type: 'other_import_in_progress',
                    src: 'FROM_CONTENT_SCRIPT'
                }}); 
                return;
            }

            // если все в порядке - начинаем таки импорт
            bookmarksImporter.import(function() {
                browser.tabs.sendMessage(sender.tab.id, {type: 'ztabsbook_to_page__bookmarks_converted', data:{
                    type: 'bookmarks_converted',
                    src: 'FROM_CONTENT_SCRIPT'
                }});     
            }, function(progress) {
                browser.tabs.sendMessage(sender.tab.id, {type: 'ztabsbook_to_page__bookmarks_upload_progress', data:{
                    type: 'bookmarks_upload_progress',
                    progress: progress,
                    src: 'FROM_CONTENT_SCRIPT'
                }});  
            }, function(complete) {
                if (complete) {
                    browser.tabs.sendMessage(sender.tab.id, {type: 'ztabsbook_to_page__bookmarks_uploaded', data:{
                        type: 'bookmarks_uploaded',
                        src: 'FROM_CONTENT_SCRIPT'
                    }});  
                }
                else {
                    browser.tabs.sendMessage(sender.tab.id, {type: 'ztabsbook_to_page__bookmarks_upload_error', data:{
                        type: 'bookmarks_upload_error',
                        src: 'FROM_CONTENT_SCRIPT'
                    }});  
                }
            }, sender.tab.id);
        }
        if (message.type == 'go_to_current_import') {
            bookmarksImporter.goToCurrentImport();
        }        
        if (message.type == 'import_complete') {
            bookmarksImporter.importComplete();
        }
    },
    sendToAllContentScripts : function(message) {
        var tab_id;
        for(el in z_tabsbook_background.registeredContentScriptTabs) {
            tab_id = parseInt(el);
            if(!tab_id) {
                delete z_tabsbook_background.registeredContentScriptTabs[el];
            }
            //console.log("tab_id:" + tab_id + " = " + z_tabsbook_background.registeredContentScriptTabs[el]);
            (function(tab_id, message, value) {
                //alert("sendToAllContentScripts\ntab_id " + tab_id + " registeredContentScriptTabs[tab_id] " + value);
                browser.tabs.get(tab_id, function(tab) { 
                    if(tab) {
                        //console.log("SEND: " + tab.id + " CONTENT: " + JSON.stringify(message));
                        if(value === true)
                            browser.tabs.sendMessage(tab.id, message);
                        else if(value)
                            value.postMessage(message);
                    } else {
                        //alert("delete tab id " + tab_id);
                        delete z_tabsbook_background.registeredContentScriptTabs[tab_id];
                    }
                });
            })(tab_id, message, z_tabsbook_background.registeredContentScriptTabs[el]);
        }
    }
};


z_tabsbook_install.main_object = z_tabsbook_background;
z_tabsbook_background.onInitExtension();
browser.tabs.onCreated.addListener(z_tabsbook_background.onTabsCreated);
browser.tabs.onUpdated.addListener(z_tabsbook_background.onTabsUpdated);
browser.tabs.onMoved.addListener(z_tabsbook_background.onTabsMoved);
browser.tabs.onActivated.addListener(z_tabsbook_background.onTabsActivated);
browser.tabs.onHighlighted.addListener(z_tabsbook_background.onTabsHighlighted);
browser.tabs.onDetached.addListener(z_tabsbook_background.onTabsDetached);
browser.tabs.onAttached.addListener(z_tabsbook_background.onTabsAttached);
browser.tabs.onRemoved.addListener(z_tabsbook_background.onTabsRemoved);
if(browser.tabs.onReplaced)
    browser.tabs.onReplaced.addListener(z_tabsbook_background.onTabsReplaced);

browser.runtime.onMessage.addListener(z_tabsbook_background.onMessage);
browser.runtime.onConnect.addListener(z_tabsbook_background.onConnect);
browser.runtime.onConnectExternal.addListener(z_tabsbook_background.onConnect);
browser.runtime.onMessageExternal.addListener(z_tabsbook_background.onMessage);