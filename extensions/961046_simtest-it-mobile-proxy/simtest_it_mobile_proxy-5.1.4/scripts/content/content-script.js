

window.addEventListener("message", (event) => {
    try {
        browser.runtime.sendMessage(
            event.data
        ).then(
            function(success){},
            function(error){}
        );
    } catch (e) {
        console.error('Failed to emit ' + e.message, event, e);
    }
});


var initBrowsingButton = document.getElementById("simtest-browsing-start");
if(initBrowsingButton) {
    initBrowsingButton.addEventListener("click", function () {
//get data from button
        window.postMessage({
            simtestData : {
                proxyHttp: "app.simtest.it",
                proxyHttpPort: "8080",
                userAgentStr: "",
                browserLanguage: "",
                simtestProxyUrl: document.getElementById("simtest-browsing-start-form-simtestProxyUrl").value,
                simtestProxyPort: document.getElementById("simtest-browsing-start-form-simtestProxyPort").value,
                username: document.getElementById("simtest-browsing-start-form-username").value,
                password: document.getElementById("simtest-browsing-start-form-password").value,
                simtestProxyConfirmationTimeout: 5000,
                simtestApiUrl: document.getElementById("simtest-browsing-start-form-simtestApiUrl").value,
                simtestApiUsername:  document.getElementById("simtest-browsing-start-form-username").value,
                simtestApiPassword:  document.getElementById("simtest-browsing-start-form-password").value,
                
            },
            direction: "from-page-script",
            message: "simtest-browsing-start"
        }, "*");
    });
}

var importBrowsingButton = document.getElementById("simtest-browsing-import");
if(importBrowsingButton) {
    importBrowsingButton.addEventListener("click", function () {
//get data from button
        window.postMessage({
            simtestData : {
                proxyHttp: "app.simtest.it",
                proxyHttpPort: "8080",
                userAgentStr: "",
                browserLanguage: "",
                simtestProxyUrl: document.getElementById("simtest-browsing-start-form-simtestProxyUrl").value,
                simtestProxyPort: document.getElementById("simtest-browsing-start-form-simtestProxyPort").value,
                username: document.getElementById("simtest-browsing-start-form-username").value,
                password: document.getElementById("simtest-browsing-start-form-password").value,
                simtestProxyConfirmationTimeout: 5000,
                simtestApiUrl: document.getElementById("simtest-browsing-start-form-simtestApiUrl").value,
                simtestApiUsername:  document.getElementById("simtest-browsing-start-form-username").value,
                simtestApiPassword:  document.getElementById("simtest-browsing-start-form-password").value, 

            },
            direction: "from-page-script",
            message: "simtest-browsing-import"
        }, "*");
    });
}

var stopBrowsingButton = document.getElementById("simtest-browsing-stop");
if(stopBrowsingButton) {
    stopBrowsingButton.addEventListener("click", function () {

        window.postMessage({
            simtestData : {},
            direction: "from-page-script",
            message: "simtest-browsing-stop"
        }, "*");
    });
}