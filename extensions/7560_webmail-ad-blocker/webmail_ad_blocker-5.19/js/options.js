"use strict";

docReady(() => {

    initVersionCheck();

    chrome.permissions.getAll(response => {
        response.origins.forEach(origin => {
            if (origin.includes("mail.google.com")) {
                byId("gmail").checked = true;
            } else if (origin.includes("outlook.live.")) {
                byId("outlook").checked = true;
            } else if (origin.includes("mail.yahoo.com")) {
                byId("yahoo").checked = true;
            }
        });
    });

    byId("disable").addEventListener('click', () => {
        location.href = "https://support.google.com/chrome_webstore/answer/2664769?p=enable_extensions&visit_id=637478667260646380-4261326449&rd=1#extensionpermissions";
    });

    selectorAll("#webmails input[origin]").forEach(input => {
        input.addEventListener("change", function() {
            if (this.checked) {
                chrome.permissions.request({
                    origins: [input.getAttribute("origin")]
                }, result => {
                    if (result) {
                        byId("reload-tabs").style.opacity = "1";
                        setTimeout(() => {
                            byId("reload-tabs").style.opacity = "0";
                        }, 5000);
                    } else {
                        this.checked = false;
                    }
                });
            } else {
                chrome.permissions.remove({
                    origins: [input.getAttribute("origin")]
                }, result => {
                    if (chrome.runtime.lastError) {
                        this.checked = true;
                        const dialog = byId('dialog');
                        byId("dialog-message").textContent = chrome.runtime.lastError.message;
                        dialog.showModal();
                    } else {
                        if (!result) {
                            this.checked = false;
                        }
                    }
                });
            }
        });
    });

});