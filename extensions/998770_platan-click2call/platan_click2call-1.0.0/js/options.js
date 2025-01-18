window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false);
    extension.init();
}, false);

var extension = {
    init: function () {
        let selectedClient = document.getElementById('selectUsedClient');
        let userExtension = document.getElementById('txtUserExtension');
        let ctiCallMonitorUrl = document.getElementById('txtCallMonitorUrl');
        let saveConfig = document.getElementById('btnSaveConfig');
        let selectedApiVersion = document.getElementById('selectCallMonitorApiVersion');
        let client;

        browser.storage.local.get(['usedClient', 'userExtension', 'serverUrl', 'callMonitorApiVersion'], function (data) {
            if (data && data.hasOwnProperty('usedClient')) {
                client = data.usedClient;
            } else {
                client = "cti";
            }

            selectedClient.value = client;

            if (client == "callMonitor") {
                $("#hiddenContent").removeClass('hidden');
            }

            userExtension.value = (data && data.hasOwnProperty('userExtension')) ? data.userExtension : "";
            ctiCallMonitorUrl.value = (data && data.hasOwnProperty('serverUrl')) ? data.serverUrl : "";
            selectedApiVersion.value = (data && data.hasOwnProperty('callMonitorApiVersion')) ? data.callMonitorApiVersion : 2;
        })

        saveConfig.addEventListener('click', function (e) {
            if (selectedClient.value == "callMonitor") {
                if (!userExtension.value ||
                    isNaN(userExtension.value))
                {
                    showAlertBar("Brak lub niepoprawny numer abonenta serwera PBX", "alert-danger", false);
                    return;
                }

                if (!isValidUrl(ctiCallMonitorUrl.value))
                {
                    showAlertBar("Nieprawidłowy adres serwera Call Monitor", "alert-danger", false);
                    return;
                }
            }

            browser.storage.local.set({
                'usedClient' : selectedClient.value,
                'userExtension': userExtension.value,
                'serverUrl': ctiCallMonitorUrl.value,
                'callMonitorApiVersion' : selectedApiVersion.value 
            });

            showAlertBar("Zapisano konfigurację", "alert-success", true);
        });
    }
};

$(function () {
    $('#selectUsedClient').on('change', function (e) {
        if (this.value == "callMonitor") {
            $("#hiddenContent").removeClass('hidden');
            return;
        }
        $("#hiddenContent").addClass('hidden');
    });
});

function showAlertBar(message, alertType, showFade) {
    const alertHtml = `<div class='alert ${alertType} alert-dismissible fade show' role='alert'> 
        <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
        <span aria-hidden='true'>&times;</span></button>${message}</div>`
   
    $("#alert-area").html($(alertHtml));
    
    if (showFade == true) {
        $(".alert").delay(4000).fadeOut("slow", function () {
            $(this).remove();
        });
    }
}

function isValidUrl(url) {
    if (!url ||
        !url.startsWith("http") ||
        !url.split('://')[1])
    {
        return false;
    }
    return true;
}
