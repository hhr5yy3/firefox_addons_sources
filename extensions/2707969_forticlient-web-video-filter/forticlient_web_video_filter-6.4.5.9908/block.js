/*
 * Copyright (c) 2019 Fortinet Technologies (Canada) Inc. All rights reserved.
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
    var message = {action:"get_warning_web_page_info", id:0};
    var rating_url;
    message.id = tabid;
    chrome.runtime.sendMessage(message, function(response) {
        var info;

        console.log("get_block_web_page_info has been sent");

        console.log("response.rating_url:" + response.rating_url);
        console.log("response.home_url:" + response.home_url);
        console.log("response.category:" + response.category);
        console.log("response.time:" + response.time);

        document.getElementsByClassName('url')[0].setAttribute("title", response.rating_url);
        document.getElementsByClassName('url')[0].innerHTML=decodeURIComponent(response.rating_url);

        if (response.rating == 0){
            var appBanners = document.getElementsByClassName('reason');

            for (var i = 0; i < appBanners.length; i ++) {
                appBanners[i].style.display = 'none';
            }
        }
        else
            document.getElementsByClassName('category')[0].innerHTML=response.category;

    });

});
