var tabId = null

function toBackground(event, param1 = undefined, param2 = undefined) {
    if (tabId !== null) {
        browser.runtime.sendMessage({
            event: event,
            tabId: tabId,
            arg1: param1,
            arg2: param2,
        })
    }
}

function doPostRequest(url, postData) {
    let form = document.createElement("form");
    form.action = "";
    form.method = "post";
    form.target = "_top";
    form.style.display = "none";

    if (postData) {
        Object.keys(postData).forEach(function (key, index) {
            let node = document.createElement("input");
            node.type = "hidden";
            node.name = key;
            node.value = postData[key];
            form.appendChild(node);
        });
    }

    document.body.appendChild(form);
    form.submit();
}

browser.runtime.onMessage.addListener((message) => {
    if (message.event == "set-tab-id") {
        tabId = message.tabId
    } else if (message.event == "reload-post") {
        let loc = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search + window.location.hash;
        doPostRequest(loc, message.postData)
    }
    })