$("body").height("100%");
$(document).ready(function() {
    $("#z_iframe").load(function() {
        // TO fix height bug while loading iframe. Bottom chrome menu after dissapearing not fitted by iframe
        $("body").height("100%");
    });
});

// To track AJAX redirect and change history object properly
var z_newtab_first_redirect = true;
window.addEventListener("popstate", function(e) {
    z_newtab_first_redirect = true;
    //alert("popstate: is_frame:" + e.state["is_frame"]);
});

// For different browsers different utm params
(function() {
    var iframe_url = $("#z_iframe").attr("zsrc");
        iframe_url += "?utm_medium=ext&utm_source=ff-ext";
    $("#z_iframe").attr("src", iframe_url);
})();

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source.top !== window)
        return;
    if (event.data.src && (event.data.src == "FROM_PAGE_IN_IFRAME")) {
        if(event.data["title"] !== undefined) {
            document.title = event.data["title"];
        }
        if(event.data["url"]) {
            // Detect 38 version, because of bug: extension crashes while using history object
            // https://code.google.com/p/chromium/issues/detail?id=396830
            
            // In Firefox we dont need it
            var version = 40;
            /*var version = navigator.userAgent.match(/Chrome\/(\d+)/);
            alert(navigator.userAgent);
            if(version[1] !== undefined)
            version = parseInt(version[1]);*/

            if(event.data["ajax"]) {
                if(z_newtab_first_redirect) {
                    //history.go(-1);
                    //alert("AJAX FIRST REDIRECT");
                    if(version < 38)
                        history.pushState({ajax: true}, false, event.data["url"]); // we need to do push to get visible url in address bar
                    z_newtab_first_redirect = false;
                } else {
                    if(version < 38)
                        history.replaceState({ajax: true}, false, event.data["url"]);
                }
            } else {
                // Если поменялся URL iframe, значит надо перейти на этот URL основному окну-родителю
                var iframe_url = $("#z_iframe").attr("src").split("?"); // Delete get params with UTM params
                iframe_url = iframe_url[0];
                if($("#z_iframe").attr("src") != event.data.url) {
                    //if(z_newtab_first_redirect)
                    //    history.replaceState({}, false, iframe_url); // set iframe url without get params to be used as back url
                    ////$("#z_iframe").remove();
                    document.location = event.data.url;
                }
            }
        }
    }
    if (event.data.src && (event.data.src == "FROM_PAGE_IN_IFRAME_EXT")) {
        /*
        * Remove connection error message if connection recovered
        * and prevent apearing error message
        */
        if(event.data["remove_error_message"]) {
            z_connection_error.deny = true;
            $("#b-error-message").remove();
        }
    }
});