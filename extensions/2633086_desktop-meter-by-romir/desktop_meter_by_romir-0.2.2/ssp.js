function addScript(e) {
    var t = document.createElement("script");
    t.textContent = e;
    (document.head || document.documentElement).appendChild(t)
}

addScript("extensionInstalled=true;extensionState='installed';var event = new CustomEvent('extensionEvent',{detail:'installed'}); document.documentElement.dispatchEvent(event);")

window.onload = function() {
    var e = window.document.getElementById('pluginAuthData');
    if (e && e.innerHTML) {
        try {
            chrome.runtime.sendMessage({
                cmd: 'updateAuthData',
                data: JSON.parse(e.innerHTML)
            });

        } catch (e) {
            console.log(e);
        }
    }
};
