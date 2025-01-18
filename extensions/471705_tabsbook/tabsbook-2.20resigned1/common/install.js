var z_tabsbook_install = {
    main_object : false,
    ext_ids : {},
    ext_names : {},
    ext_destination : false, // задаем назначение сообщений из контент скрипта
    tabsbookExtVer : false,
    tabsbookNewtabExtVer : false,
    tabsbookNewtabId : false,
    tabsbookId : false,
    
    
    // Определение браузера
    isOpera : function() {
        if(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent) || /OPR\/(\d+\.\d+)/.test(navigator.userAgent))
            return true;
        return false;
    },
    
    // Вызывается на старте браузера или при установке/старте плагина
    onStart : function() {
        
        // Определяем, что за браузер сейчас и выбираем в зависимости от этого стартовую страницу
        if(this.isOpera())
            z_express_panel.newTabUrl = "opera://startpage/";
        
        var $this = this;
        this.getExtensionsNames(function() {
            // Включаем вспомогательный плагин, если вдруг выключен
            //$this.enableTabsbookNewtabPlugin();
        });
        
        // Отправка на сервер сигнала об установке плагина
        this.installExtension();
    },
    
    // Выключаем плагин newtab
    disableTabsbookNewtabPlugin : function(callback) {
        if(this.tabsbookNewtabExtVer && this.ext_names["Tabsbook Newtab"]) {
            browser.management.setEnabled(this.ext_names["Tabsbook Newtab"], false, function() {
                callback();
            });
        }
    },
    
    // Включаем плагин newtab
    enableTabsbookNewtabPlugin : function(callback) {
        if(!callback)
            callback = function() {};
        if(!this.tabsbookNewtabExtVer && this.tabsbookNewtabId) {
            //alert("enable : " + this.tabsbookNewtabExtVer + " id " + this.tabsbookNewtabId);
            browser.management.setEnabled(this.tabsbookNewtabId, true, function() {
                //alert("enabled");
                callback();
            });
            //alert("after en");
        }
    },
    
    // Включаем основной плагин
    enableTabsbookPlugin : function(callback) {
        if(!callback)
            callback = function() {};
        if(!this.tabsbookExtVer && this.tabsbookId) {
            browser.management.setEnabled(this.tabsbookId, true, function() {
                callback();
            });
        }
    },
    
    // Получаем список всех установленных расширений и сохраняем их названия и id
    getExtensionsNames : function(callback) {
        if(!callback)
            callback = function() {};
        var $this = this;
        
        $this.tabsbookExtVer = "2.19";
        $this.tabsbookId = true;
        callback();
        //return;
        
        //console.log(browser.management);
        /*browser.management.get(function(infos) {
            console.log(infos);
            var el;
            $this.tabsbookNewtabId = false;
            $this.tabsbookId = false;
            $this.tabsbookExtVer = false;
            $this.tabsbookNewtabExtVer = false;
            $this.ext_ids = {};
            $this.ext_names = {};
            for(el in infos) {
                if(infos[el]["type"] == "extension" && ( infos[el]["name"] == "Tabsbook" || infos[el]["name"] == "Tabsbook Yandex Browser" || infos[el]["name"] == "Tabsbook Newtab") ) {
                    // Отдельно сохраняем id Tabsbook Newtab для включения в любой момент
                    if(infos[el]["name"] == "Tabsbook Newtab")
                        $this.tabsbookNewtabId = infos[el]["id"];
                    if(infos[el]["name"] == "Tabsbook" || infos[el]["name"] == "Tabsbook Yandex Browser")
                        $this.tabsbookId = infos[el]["id"];
                    // Записываем только включенные расширения
                    if(infos[el]["enabled"]) {
                        $this.ext_ids[infos[el]["id"]] = infos[el]["name"];
                        $this.ext_names[infos[el]["name"]] = infos[el]["id"];
                        if(infos[el]["name"] == "Tabsbook" || infos[el]["name"] == "Tabsbook Yandex Browser")
                            $this.tabsbookExtVer = infos[el]["version"];
                        if(infos[el]["name"] == "Tabsbook Newtab")
                            $this.tabsbookNewtabExtVer = infos[el]["version"];
                    }                    
                }
            }
            // Если мы в Tabsbook Newtab, то ставим в качестве назначение id плагина Tabsbook
            $this.ext_destination = false;
            if(browser.runtime.getManifest().name == "Tabsbook Newtab")
                if($this.tabsbookExtVer)
                    $this.ext_destination = $this.ext_names["Tabsbook"];
                    
            //alert("ext_ids: " + JSON.stringify(z_tabsbook_install.ext_ids) + " ext_names: " + JSON.stringify(z_tabsbook_install.ext_names) + 
            //" ext_destination: " + $this.ext_destination + " tabsbook ver: " + $this.tabsbookExtVer + "tabsbook newtab ver: " + $this.tabsbookNewtabExtVer );
            callback();
        });        */
    },
    
    // Вызывается при установке другого плагина
    onInstall : function(info) {
        this.getExtensionsNames();
    },
    
    // Отправка на сервер сигнала об установке плагина
    installExtension : function() {
        var el;
        var name = browser.runtime.getManifest().name;
        for(el in z_domains.domains)
            this.main_object.sendAjax({domain: z_domains.domains[el]}, {}, {install_extension: true, version: browser.runtime.getManifest().version, name: name}, "https://" + z_domains.domains[el] + "/___ajax___/loyalty.php", function(req) {});
    },
    
    // Отправка на сервер сигнала об удалении плагина
    uninstallExtension : function(id) {
        var el;
        if(!this.ext_ids[id])
            return;
        var name = this.ext_ids[id];
        for(el in z_domains.domains)
            this.main_object.sendAjax({domain: z_domains.domains[el]}, {}, {uninstall_extension: true, name: name}, "https://" + z_domains.domains[el] + "/___ajax___/loyalty.php", function(req) {});
        
        this.getExtensionsNames();
    },
    
    // Вызывается при выключении соседнего плагина
    // Отправляем данные на сервер и переделываем список доступных плагинов
    disableExtension : function(info) {
        var el;
        if(!this.ext_ids[info.id])
            return;
        var name = this.ext_ids[info.id];
        for(el in z_domains.domains)
            this.main_object.sendAjax({domain: z_domains.domains[el]}, {}, {disable_extension: true, name: name}, "https://" + z_domains.domains[el] + "/___ajax___/loyalty.php", function(req) {});
        
        this.getExtensionsNames();
    },
    
    enableExtension : function(info) {
        this.getExtensionsNames();
    },
    onMessage : function(message, sender, sendResponse) {
        var $this = z_tabsbook_install;
        if(message.type == "ztabsbook_ext_destination") {
            $this.enableTabsbookPlugin();
            sendResponse(z_tabsbook_install.ext_destination);
        }
        
        if(message.type == "ztabsbook_get_tabsbook_ext_status") {
            sendResponse({is_installed: $this.tabsbookId ? true : false, version: $this.tabsbookExtVer});
        }
    }
};



/*browser.management.onUninstalled.addListener(function(id) {z_tabsbook_install.uninstallExtension(id);});
browser.management.onInstalled.addListener(function(info) {z_tabsbook_install.onInstall(info);});
browser.management.onDisabled.addListener(function(info) {z_tabsbook_install.disableExtension(info);});
browser.management.onEnabled.addListener(function(info) {z_tabsbook_install.enableExtension(info);});*/

/*var runtimeOrExtension = browser.runtime && browser.runtime.sendMessage ?
                         'runtime' : 'extension';*/
browser.runtime.onMessage.addListener(z_tabsbook_install.onMessage);