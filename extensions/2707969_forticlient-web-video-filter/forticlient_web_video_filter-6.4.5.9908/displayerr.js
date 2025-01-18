/*
 * Copyright (c) 2015 Fortinet Technologies (Canada) Inc. All rights reserved.  
 *
 *   FortiClient Web Filter for google Chromebook
 *
 */

document.addEventListener('DOMContentLoaded', function() {

    var message = {action:"get_last_error"};

    chrome.runtime.sendMessage(message, function(response) {
        var info = document.getElementById("info");
        //info.textContent = "test";
        //info.innerHTML = "test";

        if (response.error){
            info.innerHTML = response.error;
        }
    });
});
