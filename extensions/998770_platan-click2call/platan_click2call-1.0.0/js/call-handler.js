const CallMonitorApiV1 = 1;
const CallMonitorApiV2 = 2;

function callTo(targetNumber) {
    browser.storage.local.get(["usedClient", "userExtension", "serverUrl", "callMonitorApiVersion"],
        function (data) {
            const clearedNumber = targetNumber
                .replace(/[a-zA-Z]+/g, "")
                .replace(/[^0-9\+\,]/g, "");

            if (data.usedClient == "cti") {
                const url = "pcti://" + clearedNumber;
                window.location.href = url;
                return;
            }

            const targetUrl = getApiUrl(data.serverUrl, data.callMonitorApiVersion);

            if (data.callMonitorApiVersion == CallMonitorApiV2) {
                sendApiV2CallRequest(targetUrl, data.userExtension, clearedNumber);
                return;
            }
            sendApiV1CallRequest(targetUrl, data.userExtension, clearedNumber);
        });
}

function sendApiV2CallRequest(serverUrl, callerNumber, calleeNumber) {
    return $.ajax({
        url: serverUrl,
        type: "POST",
        data: JSON.stringify({
            CallerNumber: callerNumber,
            CalleeNumber: calleeNumber
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) { },
        error: function (err) {
            console.log(err);
        }
    });
}

function sendApiV1CallRequest(serverUrl, callerNumber, calleeNumber) {
    const requestUrl = `${serverUrl}/${callerNumber}/${calleeNumber}`
    return $.ajax({
        url: requestUrl,
        type: "GET",
        success: function (response) { },
        error: function (err) {
            console.log(err);
        }
    });
}

function getApiUrl(serverUrl, apiVersion) {
    if (serverUrl == "" ||
        !serverUrl.startsWith("http")) {
        alert("Bład konfiguracji serwera CallMonitor");
        return;
    }

    if (apiVersion == CallMonitorApiV1) {
        return `${serverUrl}/Home/api/callto`;
    }

    if (apiVersion == CallMonitorApiV2) {
        return `${serverUrl}/api/Integration/c2c`;
    }

    alert("Nieznana wersja API");
}
