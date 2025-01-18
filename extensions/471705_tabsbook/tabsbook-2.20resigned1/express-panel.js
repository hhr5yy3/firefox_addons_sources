// отвечает за замену стандартной новой вкладки на экспресс панель
var z_express_panel = {
    enabled: true, // enable tabsbook express panel by default

    //newTabUrl : "chrome-internal://newtab/",
    //newTabUrl : "https://www.google.ru/_/chrome/newtab?espv=210&ie=UTF-8",
    //newTabUrl : "chrome-search://local-ntp/local-ntp.html",
    newTabUrl : "about:home",
    //newTabUrl : "https://www.google.ru/_/chrome/newtab?espv=2&ie=UTF-8", // Problem: How use for different countries domains
    // NTP - new tab page

    firstRun: true,

    // Является ли url начальным?
    isPageNew : function(url) {
        // In FF we can't see page url on tab created event, we use update event instead
        //url.substr(0, 51) == "https://www.google.ru/webhp?sourceid=chrome-instant")
        if(/https:\/\/www\.google\.[a-z]+\/_\/chrome\/newtab/.test(url))
            return true;
        // Special url after redirect from (.com) https://www.google.com/_/chrome/newtab?espv=2&ie=UTF-8
        if(/https:\/\/www\.google\.[a-z]+\/webhp\?sourceid=chrome-instant/.test(url))
            return true;
        return url == "chrome://newtab/" || url == "about:blank" || url == "about:newtab" ||
            url.substr(0, 17) == "opera://startpage" || url.substr(0, 19) == "browser://startpage" || 
            url == "chrome-search://local-ntp/local-ntp.html";
            
        // In FF we can't see page url on tab created event, we use update event instead
    },

    // загружает экспресс панель в таб
    loadEpressPanelIntoTab : function(tabId, forceUpdate) {
        //("LOAD EXPRESS PANEL " + tabId + " enabled: " + this.enabled);
        var $this = this;
        // переход теперь работает с попощью оверрайда
        if (this.enabled) {
            // Включаем экспресс-панель на лету только для оперы
            // для хрома она вставляется через манифест
            if(z_tabsbook_install.isOpera()) {
                browser.tabs.update(tabId, {url: browser.extension.getURL("/newtab.html")});
            } else if(forceUpdate) {
                // Обновляем страницы по умолчанию, чтобы вставить туда tabsbook
                // Если вставляем internal-chrome://newtab/ то ничего не происходит
                // отменяем обновление, так как при запуске браузера, получается двойное обновление.
                //browser.tabs.update(tabId, {url: "chrome://newtab/"});
            }
        } else {
            // Принудительно ставим страницу по умолчанию, так как в хроме вставляется экспресс панель через манифест
            if(!z_tabsbook_install.isOpera())
                this.goToDefaultPage(tabId);
        }
    },

    // калбек на создание таба
    onTabsCreated: function(tab) {
        // In FF we can't see page url on tab created event, we use update event instead
        //if(!this.isPageNew(tab.url))
        //    return;
        //this.loadEpressPanelIntoTab(tab.id, false);
    },

    // калбек на обновление урл таба
    onTabsUpdated: function(tab) {
        var $this = this;
        browser.tabs.get(tab, function(t) {
            if(t.url.match(/moz-extension:\/\/[a-z0-9\-]+\/newtab\.html/g)) {
                //console.log("UPDATED " + t.id + " " + t.url);
                $this.loadEpressPanelIntoTab(t.id, false);
            }
            if(t.url == "chrome-extension://invalid/")
                $this.loadEpressPanelIntoTab(t.id, false);
        });
    },
    // проверяет все табы и вставляет экспресс панель в пустые
    checkAllTabs: function() {
        var _this = this;

        browser.windows.getLastFocused({}, function(window) {
            browser.tabs.query({}, function(tabs) {                
                // В local storage сохраняем количество текущих табов
                // При загрузке браузера (расширения), смотрим, если это количество было больше 1,
                // а количество табов при открытии = 1, значит случился crash и обновлять начальную страницу не нужно
                browser.storage.local.get("tabs_count", function(value) {
                    if(value["tabs_count"] && value["tabs_count"] > 1 && tabs.length == 1) {
                        // Crash! никих апдейтов страниц, чтобы не исчезла кнопка "Восстановить"
                    } else {
                        for(el in tabs) {
                            //console.log(tabs[el].id + " URL " + tabs[el].url);
                            if(_this.isPageNew(tabs[el].url)) {
                                // Открыть новую страницу с force_update = true
                                _this.loadEpressPanelIntoTab(tabs[el].id, true);
                            }
                        }
                    }
                });
                browser.storage.local.set({tabs_count: tabs.length}, function() {});
            });
        });
    },
    // загружает стандартную страницу в таб
    goToDefaultPage: function(tabId) { 
        //console.log("GO TO DEFAULT " + tabId);
        browser.tabs.update(tabId, {url: this.newTabUrl});
    },
    // включить отображение экспресс панели на пустых вкладках
    enable: function() {
        // If current status is disabled - update all tabs on first run
        // It's necessary for OPERA, because it does not support newtab override in manifest
        // IN FF WE CANT TURN ABOUT:BLANK TO EXPRESS PANEL
        /*if (this.enabled) {
            if (this.firstRun)
                this.checkAllTabs();
        }*/

        this.enabled = true;
        this.firstRun = false;
    },
    // выключить отображение экспресс панели на пустых вкладках
    disable: function() {
        // If current status is enabled - update all tabs on first run
        // It's necessary for chrome because it needs to update tab to disable overriding newtab
        // IN FF WE CANT TURN ABOUT:BLANK TO EXPRESS PANEL
        /*if (this.enabled) {
            if(this.firstRun)
                this.checkAllTabs();
        }*/
        
        this.enabled = false;
        this.firstRun = false;
    }
};

browser.tabs.onCreated.addListener(z_express_panel.onTabsCreated.bind(z_express_panel));
browser.tabs.onUpdated.addListener(z_express_panel.onTabsUpdated.bind(z_express_panel));