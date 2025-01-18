(function() {
    /*
        export get_scannerHelper
    */
    window.get_scannerHelper = function(WebsiteOrBrowser) {
        if(TMExt_$.inArray(WebsiteOrBrowser, AllSites) !== -1){
            // is website
            return get_siteHelper(WebsiteOrBrowser);
        }else if(TMExt_$.inArray(WebsiteOrBrowser, AllBrowsers) !== -1){
            // is browser
            return get_browserHelper(WebsiteOrBrowser);
        }
    };
    
     /*
        expose API for QA use --> reset all settings to dangerous
    */
    window.resetAll = function(SiteOrBrowser){
        if(SiteOrBrowser === "IE"){
            SiteOrBrowser = "INTERNET_EXPLORER";
        }
        get_scannerHelper(SiteOrBrowser).resetAllSettingToDangerous();
    }
})();
