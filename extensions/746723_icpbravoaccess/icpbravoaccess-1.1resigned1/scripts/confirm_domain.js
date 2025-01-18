chrome.runtime.onMessage.addListener(function (response) {
    fillFields(response);
});


function fillFields(response) {
    document.getElementById("thumbprint").innerHTML = response.message.thumbprint;
    document.getElementById("subjectName").innerHTML = response.message.subjectName;
    document.getElementById("issuerName").innerHTML = response.message.issuerName;
    document.getElementById("domain").innerHTML = response.message.domain;
}

window.onload = function () {
    document.getElementById('authorize').addEventListener("submit", function (event) {
        event.preventDefault();
        chrome.runtime.getBackgroundPage(function (event_page) {
            event_page.checkAuthorization(
                authorization = {
                    thumbprint: document.getElementById("thumbprint").innerHTML,
                    domain: document.getElementById("domain").innerHTML,
                    isAuthorized: true
                }
            );
            window.close();
        });
    });

    document.getElementById('unauthorize').addEventListener("submit", function (event) {
        event.preventDefault();
        chrome.runtime.getBackgroundPage(function (event_page) {
            event_page.checkAuthorization(
                authorization = {
                    thumbprint: document.getElementById("thumbprint").innerHTML,
                    domain: document.getElementById("domain").innerHTML,
                    isAuthorized: false
                }
            );
            window.close();
        });
    });
};

window.onbeforeunload = function (event) {
    event.preventDefault();
    chrome.runtime.getBackgroundPage(function (event_page) {
        event_page.checkAuthorization(
            authorization = {
                thumbprint: document.getElementById("thumbprint").innerHTML,
                domain: document.getElementById("domain").innerHTML,
                isAuthorized: false
            }
        );
    });
};
