"use strict";

docReady(() => {
    initVersionCheck();

    byId("options").addEventListener("click", () => {
        openUrl("options.html");
    });

    selectorAll("a.inherit").forEach(el => {
        el.addEventListener("click", function(event) {
            openUrl(el.href);
            event.preventDefault();
        })
    });
});