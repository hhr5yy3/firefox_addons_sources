// Web page creates an event for this listener.
document.addEventListener("ping", ping);
document.addEventListener("clientCallPlugin", clientCallPlugin);

function ping(e) {
    // "getExtensionResponseWebPage" event is defined on web page.
    var pluginResponseEvent = new CustomEvent("getExtensionResponseWebPage", { "detail": "Firefox extension found" });
    document.dispatchEvent(pluginResponseEvent);
    return true;
}

// Function linked to the listener.
function clientCallPlugin(e) {
    // This works.
    return browser.runtime.sendMessage(e.detail)
        .then(response => {
            // "getPluginResponseWebPage" event is defined on web page.
            var pluginResponseEvent = new CustomEvent("getPluginResponseWebPage", { "detail": JSON.stringify(response) });
            document.dispatchEvent(pluginResponseEvent);
            return response;
        })
        .catch(error => console.log(error));
}
