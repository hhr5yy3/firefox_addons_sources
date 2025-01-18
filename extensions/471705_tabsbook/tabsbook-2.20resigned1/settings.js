/*
* Settings to open or not express panel on new tab
* settingsChanged is called from z_tabsbook_background.saveAllBrowser
* or on message "ztabsbook_update_settings" from page
* 
* The problem is get settings while tabsbook is not available
* and at start browser while default page is opened
* To solve this problem we cache settings in local storage and get it on start
*/
var extensionSettings = {
	current: null,

    // Вызывается при обновлении статуса иконки
	settingsChanged: function(settings) {
        //alert("settings:" + JSON.stringify(settings));
		this.current = settings;

        //console.log("SETTINGS CHANGED");
        //console.log(this.current);
        
		if (settings.open_tabsbook_on_new_tab) {
	        z_express_panel.enable();
	    }
	    else {
	        z_express_panel.disable();
	    }
        // Save settings in local storage for useing on start or on reinstall
        browser.storage.local.set({"settings" : this.current}, function() {});
	},
    getSettingsFromStorage : function() {
        //console.log("GET SETTINGS FROM STORAGE");
        
        var $this = this;
        browser.storage.local.get({"settings" : this.current}, function(data) {
            if(data["settings"]) {
                $this.settingsChanged(data["settings"]);
            }
        });
    },

    // Вызывается, при обновлении статуса иконки и если сервер не поддерживает эту настройку
	settingsUnavailable: function () {
		this.current = null;
		z_express_panel.enable();
	}
};
// Get settings on start to know open or not express panel
extensionSettings.getSettingsFromStorage();