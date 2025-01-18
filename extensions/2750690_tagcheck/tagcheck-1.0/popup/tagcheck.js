
browser.tabs.executeScript({file: "/popup/tagcheck_cs.js"}).then(() => {
    browser.runtime.onMessage.addListener(message => {
        Object.keys(message).forEach((key) => {
            var status = document.querySelector(`#${key}-status`);
            if(status != null) {
                status.textContent = [...new Set(message[key])].join(", ");
                status.style.color = "green";
                status.style.fontWeight = "bold";
            }
        })
        console.log(message);
    });
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "getstatus"
        });
        document.querySelector("#loading").remove();
        document.querySelector("#status-info").style.display = null;
    });    
});
