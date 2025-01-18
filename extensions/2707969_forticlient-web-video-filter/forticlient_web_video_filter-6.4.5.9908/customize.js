/*
 * Copyright (c) 2015 Fortinet Technologies (Canada) Inc. All rights reserved.  
 *
 *   FortiClient Web Filter for google Chromebook
 *
 */

document.addEventListener('DOMContentLoaded', function() {

    // get tab id
    var url = window.location.href;
    var position;
    var tabid;

    position = url.indexOf("?tabid=");
    if (position == -1)
        return;

    tabid = Number(url.substr(position + 7));

    // get information for this tab id(url, rate category name/group name, )
    var message = {action:"get_customized_web_page", id:0};
    var rating_url;
    message.id = tabid;
    chrome.runtime.sendMessage(message, function(response) {
        var info;

        console.log("get_customized_web_page has been sent");

        document.documentElement.innerHTML = response.customized_page;

    });

});
