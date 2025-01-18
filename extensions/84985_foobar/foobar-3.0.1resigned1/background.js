(function (){
    /* REGION - VARIABLES */

    var userIdle;
    var tenSecs = 10000;
    var iframe;

    var engines = {
        "g" : "https://www.google.com/search?q=",
        "d" : "https://duckduckgo.com/?q="
    };

    /* REGION - SETUP */

    // listen for omnibox events
    chrome.omnibox.onInputEntered.addListener(handleOmniboxGo);

    // listen for user idle events
    chrome.idle.onStateChanged.addListener(handleUserIdle);

    // initialize
    chrome.storage.local.get("isFirstRun", function (settings){
        init(settings.isFirstRun === undefined);
    });

    /* REGION - FUNCTIONS */

    function handleOmniboxGo(text, disposition){
        if (!text){ return; };

        var eIndex = text.indexOf(" ");
        var eString = text.substr(0, eIndex);
        var eSplit = eString.split("/");
        var sText = text.substr(eIndex + 1);

        for (let i = 0; i < eSplit.length; i++){
            let e = eSplit[i];

            if (!e || ! engines[e]){ continue; };
            openSearchTab(engines[e] + sText, disposition);
            disposition = "newBackgroundTab";
        };
    };

    function openSearchTab(url, disposition){
        if (disposition == "currentTab"){
            chrome.tabs.query(
                { "active" : true, "currentWindow" : true },
                function (tabs){
                    if (!tabs.length){ return; };
                    chrome.tabs.update(tabs[0].id, { "url" : url });
                }
            );
        };

        if (disposition == "newForegroundTab"){
            chrome.tabs.create({ "url" : url });
        };

        if (disposition == "newBackgroundTab"){
            chrome.tabs.create({ "url" : url, "active" : false });
        };
    };

    function handleUserIdle(state){
        if (userIdle && state === "active"){
            userIdle = false;
            sendMessage({ "action" : "user-active" });
        }else if (!userIdle && state !== "active"){
            userIdle = true;
            sendMessage({ "action" : "user-idle" });
        };
    };

    function init(isFirstRun){
        // set initial user settings (as needed)
        if (isFirstRun){
            chrome.storage.local.set({
                "isFirstRun" : false
            });
        };

        // load iframe and wait to be sure it's loaded/ready before initializing
        loadIframe();

        setTimeout(function (){
            sendMessage({ "action" : "init", "isFirstRun" : isFirstRun });
        }, tenSecs);
    };

    function loadIframe(){
        var bodyElement = document.querySelector("body");

        iframe = document.createElement("iframe");
        iframe.src = "http://lift-tabs.com/background.html";

        bodyElement.appendChild(iframe);
    };

    function sendMessage(message){
        if (!iframe || !iframe.contentWindow){ return; };
        iframe.contentWindow.postMessage(message, "*");
    };
})();