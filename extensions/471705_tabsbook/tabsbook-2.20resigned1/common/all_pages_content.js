var z_all_pages_content = {
    _url : false,
    /**
    * Detect url change (to simulate state change event)
    * and if changed send history info into extension
    */
    sendHistory : function() {
        if(this._url != document.location.href) {
            this._url = document.location.href;
            this.sendMessageToExt({type: "ztabsbook_tab_history", history_length: window.history.length});
        }        
        // Trigger history state every second
        setTimeout(function() {z_all_pages_content.sendHistory();}, 1000);
    },
    /**
    * Send message to extension
    */
    sendMessageToExt : function(message, sender_callback) {
        if(!sender_callback)
            sender_callback = function(res) {};
        browser.runtime.sendMessage({type: "ztabsbook_ext_destination"}, function(destination) {
            if(destination)
                browser.runtime.sendMessage(destination, message, sender_callback);
            else
                browser.runtime.sendMessage(message, sender_callback);
        });
    }
};

/**
* Send current history length to determine if user made forward navigation
*/
z_all_pages_content.sendHistory();