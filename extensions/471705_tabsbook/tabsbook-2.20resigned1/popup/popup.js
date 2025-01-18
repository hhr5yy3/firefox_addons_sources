window.addEventListener("message", function(e) {z_ext_popup.onMessageFromIFrame(e);});
var z_ext_popup = {
    callIndexPage : function() {
        
        $("#z_main_frame").bind("load", function() {
            $("#b-popup-loader").hide();
        });
        // to prevent showing white square
        setTimeout(function() {
            
            browser.runtime.sendMessage({type: "ztabsbook_get_popup_domain"}, function(domain) {
                chrome.windows.getCurrent({populate: true}, function(window) {
                    var currentUrl = "";
                    for(el in window.tabs)
                        if(window.tabs[el]["active"])
                            currentUrl = window.tabs[el]["url"]
                    var version = encodeURIComponent(chrome.runtime.getManifest().version);
                    var currentUrl = encodeURIComponent(currentUrl);
                    var get_params = "?ver=" + version + "&url=" + currentUrl;
                    $("#z_main_frame").attr("src", "https://" + domain + "/popup/" + get_params);
                });
            });
        }, 1);
    },
    onMessageFromIFrame : function(event) {
        if(event.data.src == "FROM_PAGE_IN_IFRAME_EXT" && event.data.remove_error_message) {
            z_connection_error.removeErrorMessage();
        }
        if(event.data.type == "close_popup") {
            browser.runtime.sendMessage({type: "ztabsbook_on_close_popup"});
            window.close();
        }
    }
};
$(document).ready(function() {z_ext_popup.callIndexPage();});
