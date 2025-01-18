//look for the transfer license button on a page to easily transfer and update licenses


function audit_getAndSaveUser(userKey) {
    fetch("https://api.eye-able.com/user?adminApiKey=" + userKey + "&apiKey=" + userKey)
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    chrome.storage.local.set({ eyeAble_User: data[0] }, function () {
                    });
                });
            } else {
                console.log(response);
                audit_dispatchError("User Error", response);
            }
        })
        .catch((error) => {
            console.log(error);
            audit_dispatchError("User Error", response);
        });
}

function audit_dispatchError(txt, details) {
    let event = new CustomEvent("eyeable:license_error", {
        detail: {
            message: txt,
            details: details
        }
    });
    document.dispatchEvent(event);
}

function audit_dispatchSuccess(txt) {
    let event = new CustomEvent("eyeable:license_success", {
        detail: {
            message: txt
        }
    });
    document.dispatchEvent(event);
}

function audit_updateLicense(apiKey) {
    //get the license text from a hidden text;
    if (apiKey.length !== 16) {
        audit_dispatchError("License key is not valid");
    } else {
        try {
            fetch("https://api.eye-able.com/checkerLicense?apiKey=" + apiKey)
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            audit_getAndSaveUser(apiKey);
                            if (data.length > 0) {
                                eyeAbleAudit_settings["licenses"] = data;
                                eyeAbleAudit_settings["apiKey"] = apiKey;
                                chrome.storage.local.set({ eyeAble_Settings: eyeAbleAudit_settings }, function () {
                                    audit_dispatchSuccess("License updated");
                                    console.log(eyeAbleAudit_settings);
                                });
                            } else {
                                audit_dispatchError("No licenses found", response);
                            }
                        });
                    } else {
                        audit_dispatchError("API Error", response);
                    }
                })
                .catch((error) => {
                    audit_dispatchError("API Error", error);
                });
        } catch (error) {
            audit_dispatchError("License key is not valid");
        }

    }
}

function auditLicenseActions() {
    if(document.querySelector(".eyeAbleAudit_licenseTransferButton")) {
        //add listener to all buttons
        document.querySelectorAll(".eyeAbleAudit_licenseTransferButton").forEach(function (button) {

            //listen and print both events
            document.addEventListener("eyeable:license_error", function (e) {
                console.log(e.detail.message, e.detail.details);
            });
            document.addEventListener("eyeable:license_success", function (e) {
                console.log(e.detail.message);
            });


            button.addEventListener("click",  function() {
                audit_updateLicense(document.querySelector(".eyeAbleAudit_licenseText").textContent);
            });
            //also look for the enter key
            button.addEventListener("keydown", function (e) {
                if(e.key === "Enter") {
                    audit_updateLicense(document.querySelector(".eyeAbleAudit_licenseText").textContent);
                }
            });

        });
    }
}

//look for license sync buttons
if(document.readyState === "complete") {
    auditLicenseActions();
} else {
    window.addEventListener("load", function () {
        auditLicenseActions();
    });
}

//listen for eyeable:license_update event
document.addEventListener("eyeable:license_update", function (e) {
    console.log(e);
    audit_updateLicense(e.detail.apiKey);
});